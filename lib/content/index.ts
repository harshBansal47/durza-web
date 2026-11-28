import { cache } from "react";
import { api, resilient } from "@/lib/api";
import { parseInlineText, type InlineToken } from "@/lib/content/inline";
import {
  contentPageSchema,
  type ContentBlock,
  type ContentKind,
  type ContentPage,
} from "@/lib/content/schema";
import type { EditorialContent, EditorialType } from "@/lib/types";

/**
 * Content system — Phase 1 data layer: getPage / listPages.
 *
 * Server-side reads of the JSON content document from the editorial API
 * (`GET /api/v1/editorial/{kind}/{slug}` and `GET /api/v1/editorial?kind=...`),
 * validated in-process with the Zod schema in `lib/content/schema.ts`.
 *
 * Fail-soft in production: an invalid document skips the page (readers log and
 * degrade) rather than throwing into a cached 500. In development and in the seed
 * script an invalid document throws — a bad document must fail loudly while
 * building/curating, never silently on a live page.
 */

const isDev = process.env.NODE_ENV === "development";

function contentKindOf(content: EditorialContent): ContentKind | null {
  if (
    content.content_type === "guide" ||
    content.content_type === "review" ||
    content.content_type === "comparison" ||
    content.content_type === "collection"
  ) {
    return content.content_type;
  }
  return null;
}

function toContentPage(content: EditorialContent, kind: ContentKind): ContentPage | null {
  const parsed = contentPageSchema.safeParse({
    kind,
    slug: content.slug,
    title: content.title,
    description: content.meta_description ?? content.summary ?? "",
    status: content.status,
    content_blocks: content.content_blocks ?? [],
    structured_data: content.structured_data ?? {},
    hero_image_url: content.hero_image_url ?? null,
    author_name: content.author_name ?? null,
    seo_title: content.seo_title ?? null,
    meta_description: content.meta_description ?? null,
    canonical_url: content.canonical_url ?? null,
    is_indexable: content.is_indexable,
    is_featured: content.is_featured,
    published_at: content.published_at ?? null,
    updated_at: content.updated_at ?? null,
    needs_review: (content as EditorialContent & { needs_review?: boolean }).needs_review,
    facts_checked_at: (content as EditorialContent & { facts_checked_at?: string | null }).facts_checked_at ?? null,
    faqs: (content.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer, sort_order: f.sort_order })),
    stickyCta: (content.structured_data as { stickyCta?: { label: string; href: string } } | undefined)?.stickyCta,
  });
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const message = `Invalid content JSON for /${kind}/${content.slug}: ${issue?.path?.join(".") ?? "root"} — ${issue?.message ?? "schema mismatch"}`;
    if (isDev || process.env.CONTENT_SEED === "true") {
      throw new Error(message);
    }
    console.error(`[content] skipping invalid document: ${message}`);
    return null;
  }
  return parsed.data;
}

/**
 * Fetch and validate one content page. Returns null when the page is genuinely
 * absent (404) or when an invalid document was skipped in production.
 */
export const getPage = cache(async function getPage(
  kind: ContentKind,
  slug: string,
): Promise<ContentPage | null> {
  // no-store: preview always reads fresh content; production relies on tagged
  // revalidation (editorial:* + sitemap) triggered by content writes/upsert.
  // React cache dedupes this across generateMetadata and the page renderer.
  const content = await api.getEditorialFresh(kind, slug).catch(() => null);
  if (!content) return null;
  const resolvedKind = contentKindOf(content);
  if (resolvedKind === null) return null;
  return toContentPage(content, resolvedKind);
});

/**
 * List content pages, optionally filtered by kind. Index pages use this to
 * render hubs from the same validated document shape.
 */
export async function listPages(
  kind?: ContentKind,
  opts: { skip?: number; limit?: number } = {},
): Promise<ContentPage[]> {
  // The editorial API caps `limit` at 100; asking for more yields a 422 that
  // the resilient client turns into an empty feed.
  const limit = Math.min(opts.limit ?? 100, 100);
  const skip = opts.skip ?? 0;
  const query = { content_type: kind, skip, limit };
  // Dev reads fresh so an import is visible immediately. Production uses the
  // tagged cached fetch, invalidated by editorial writes via ISR.
  const contents = isDev
    ? await api.listEditorialFresh(query).catch(() => resilient.listEditorial(query))
    : await resilient.listEditorial(query);
  const pages: ContentPage[] = [];
  for (const content of contents.items ?? []) {
    const resolvedKind = contentKindOf(content);
    if (resolvedKind === null) continue;
    const page = toContentPage(content, resolvedKind);
    if (page) pages.push(page);
  }
  return pages;
}

export { parseInlineText };
export type { ContentBlock, ContentPage, ContentKind, ContentStatus } from "@/lib/content/schema";
export type { EditorialContent, EditorialType } from "@/lib/types";
export type { InlineToken } from "@/lib/content/inline";
