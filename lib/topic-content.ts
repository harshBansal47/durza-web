/**
 * Server-only adapter that turns Durza's two existing content systems into one
 * list of discoverable editorial items for topic hubs and the homepage.
 *
 * Nothing here introduces new content. It only reads what is already
 * published — the hand-authored datafiles in data/ and the published rows
 * served by /api/v1/editorial — and normalizes them into DiscoverableContent.
 */

import "server-only";

import { api } from "@/lib/api";
import { editorialPath } from "@/lib/editorial-path";
import { priorityForGuide } from "@/lib/static-editorial";
import { COMPARISONS } from "@/data/comparisons";
import { REVIEWS } from "@/data/reviews";
import { COLLECTIONS } from "@/data/collections";
import { STORE_GUIDES } from "@/data/store-guides";
import {
  classifyCategory,
  classifyText,
  type DiscoverableContent,
  type TopicId,
} from "@/lib/topics";
import type { EditorialContent } from "@/lib/types";

/** Static entries carry display labels like "Updated 14/11/2026". */
function parseUpdatedLabel(label: string | null | undefined): string | null {
  if (!label) return null;
  const trimmed = label.trim();
  const dated = trimmed.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
  if (dated) {
    const [, day, month, year] = dated;
    const iso = new Date(Number(year), Number(month) - 1, Number(day)).toISOString();
    if (Number.isFinite(new Date(iso).getTime())) return iso;
  }
  const parsed = new Date(trimmed);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : null;
}

function entry(
  value: Omit<DiscoverableContent, "topicId"> & { category: string },
): DiscoverableContent | null {
  const topicId = classifyCategory(value.category) ?? classifyText(`${value.title} ${value.summary}`);
  if (!topicId) return null;
  // Destructure the category out so it never leaks into the DTO.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { category, ...rest } = value;
  return { ...rest, topicId };
}

/** Content that lives in the repository today (no DB required). */
export function staticDiscoverableContent(): DiscoverableContent[] {
  const items: (DiscoverableContent | null)[] = [];

  for (const comparison of COMPARISONS) {
    items.push(entry({
      id: `static-comparison-${comparison.slug}`,
      category: comparison.category,
      contentType: "comparison",
      title: comparison.title,
      summary: comparison.summary,
      href: `/compare/${comparison.slug}`,
      heroImage: comparison.heroImage,
      updatedAt: parseUpdatedLabel(comparison.updatedLabel),
      authorName: "Durza Research Desk",
      priority: 6,
      hasMethod: comparison.table.rows.length > 0 && comparison.insider.points.length > 0,
      hasFaq: comparison.faqs.length > 0,
    }));
  }

  for (const review of REVIEWS) {
    items.push(entry({
      id: `static-review-${review.slug}`,
      category: review.category,
      contentType: "review",
      title: review.title,
      summary: review.summary,
      href: `/reviews/${review.slug}`,
      heroImage: review.heroImage,
      updatedAt: parseUpdatedLabel(review.updatedLabel),
      authorName: "Durza Research Desk",
      priority: 6,
      hasMethod: review.factTable.length > 0,
      hasFaq: review.faqs.length > 0,
    }));
  }

  for (const collection of COLLECTIONS) {
    items.push(entry({
      id: `static-collection-${collection.slug}`,
      category: collection.category,
      contentType: "collection",
      title: collection.title,
      summary: collection.summary,
      href: `/collections/${collection.slug}`,
      heroImage: collection.heroImage,
      updatedAt: parseUpdatedLabel(collection.updatedLabel),
      authorName: "Durza Research Desk",
      priority: 5,
      hasMethod: collection.kitSummary.length > 0,
      hasFaq: collection.faqs.length > 0,
    }));
  }

  for (const guide of STORE_GUIDES) {
    items.push(entry({
      id: `static-guide-${guide.slug}`,
      category: guide.category,
      contentType: "guide",
      title: guide.seo.title,
      summary: guide.summary,
      href: `/guides/${guide.slug}`,
      heroImage: guide.heroImage ?? null,
      updatedAt: guide.auditedOn ?? null,
      authorName: "Durza Research Desk",
      priority: priorityForGuide(guide.slug),
      hasMethod: guide.blocks.length > 0,
      hasFaq: guide.faqs.length > 0,
    }));
  }

  return items.filter((item): item is DiscoverableContent => item !== null);
}

function fromEditorial(content: EditorialContent): DiscoverableContent | null {
  if (!content.is_indexable) return null;
  const structured = (content.structured_data ?? {}) as Record<string, unknown>;
  const declaredCategory = typeof structured.category === "string" ? structured.category : null;
  const topicId = classifyCategory(declaredCategory)
    ?? classifyText(`${content.title} ${content.summary ?? ""}`);
  if (!topicId) return null;

  return {
    id: `editorial-${content.id}`,
    topicId,
    contentType: content.content_type,
    title: content.title,
    summary: content.summary ?? "",
    href: editorialPath(content),
    heroImage: content.hero_image_url ?? null,
    updatedAt: content.updated_at || content.published_at || null,
    authorName: content.author_name ?? null,
    priority: 5,
    hasMethod:
      content.content_type === "guide" ? typeof structured.methodology === "string" : content.content_blocks.length > 0,
    hasFaq: content.faqs.length > 0,
  };
}

/** Static content first; DB rows are appended when the API is reachable. */
export async function discoverableContent(): Promise<DiscoverableContent[]> {
  const staticItems = staticDiscoverableContent();
  let dbItems: DiscoverableContent[] = [];
  try {
    const page = await api.listEditorial({ limit: 200 });
    dbItems = page.items.map(fromEditorial).filter((item): item is DiscoverableContent => item !== null);
  } catch {
    // A backend outage must never blank the editorial layer.
  }

  const seen = new Set<string>();
  return [...staticItems, ...dbItems].filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

export function contentForTopic(items: DiscoverableContent[], topicId: TopicId): DiscoverableContent[] {
  return items.filter((item) => item.topicId === topicId);
}
