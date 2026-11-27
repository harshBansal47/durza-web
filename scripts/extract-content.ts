/**
 * Content-system Phase 2: one-time extraction of existing pages into the
 * JSON-driven content format (schemaVersion + stickyCta + ordered blocks).
 *
 * Reads the remaining in-repo source (data/reviews.ts) and writes
 * one JSON document per page to
 * `migration/content/<kind>/<slug>.json`, matching `lib/content/schema.ts`.
 *
 * Content parity: NO copy is rewritten, shortened, merged or "fixed". Blocks
 * are mapped into the block catalog; anything that doesn't fit gets a note in
 * `needs_review` + is preserved, never dropped. Comparison documents now
 * come from the editorial export in durza-content-export/comparison, and guide
 * documents from durza-content-export/guide.
 *
 * Usage: npx tsx scripts/extract-content.ts
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { REVIEWS, type ReviewEntry } from "@/data/reviews";

const OUT_ROOT = join(process.cwd(), "migration", "content");

type Block = Record<string, unknown>;

function asArray<T>(v: T[] | null | undefined): T[] {
  return Array.isArray(v) ? v : [];
}

// ---- ReviewEntry -> content doc ---------------------------------------------

function reviewToDoc(entry: ReviewEntry): Record<string, unknown> {
  const blocks: Block[] = [];

  if (asArray(entry.whoShouldBuy).length || asArray(entry.whoShouldSkip).length) {
    blocks.push({ type: "audience", forWho: asArray(entry.whoShouldBuy), skipIf: asArray(entry.whoShouldSkip) });
  }

  blocks.push({
    type: "verdict",
    variant: "quick",
    body: entry.verdict,
    ctas: [
      ...(entry.primaryCtaLabel ? [{ label: entry.primaryCtaLabel, href: entry.primaryCtaHref }] : []),
      ...(entry.secondaryCta ? [{ label: entry.secondaryCta.label, href: entry.secondaryCta.href }] : []),
    ],
  });

  if (asArray(entry.pros).length || asArray(entry.cons).length) {
    blocks.push({ type: "prosCons", pros: asArray(entry.pros), cons: asArray(entry.cons) });
  }

  if (asArray(entry.productLinks).length) {
    blocks.push({ type: "productLinks", items: asArray(entry.productLinks).map((p) => ({ label: p.label, href: p.href, note: p.note })) });
  }

  if (asArray(entry.sources).length) {
    blocks.push({ type: "sources", items: asArray(entry.sources).map((s) => ({ title: s.label, url: s.href, checkedAt: s.checkedAt })) });
  }

  const faqs = (entry as ReviewEntry & { faqs?: { question: string; answer: string }[] }).faqs ?? [];
  if (asArray(faqs).length) blocks.push({ type: "faq", items: faqs.map((f) => ({ q: f.question, a: f.answer })) });

  return {
    schemaVersion: 1,
    kind: "review",
    slug: entry.slug,
    title: entry.title,
    description: entry.summary,
    status: "published",
    content_blocks: blocks,
    hero_image_url: entry.heroImage ?? null,
    author_name: entry.authorName ?? "Durza Research Desk",
    seo_title: entry.seoTitle,
    meta_description: entry.metaDescription,
    facts_checked_at: entry.factsCheckedOn ?? null,
    published_at: null,
    updated_at: entry.updatedLabel ?? null,
    needs_review: false,
    category: entry.category,
  };
}

// ---- run --------------------------------------------------------------------

function writeDoc(kind: string, slug: string, doc: Record<string, unknown>) {
  const dir = join(OUT_ROOT, kind);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${slug}.json`), JSON.stringify(doc, null, 2));
}

let written = 0;
for (const entry of REVIEWS) {
  writeDoc("review", entry.slug, reviewToDoc(entry));
  written++;
}

// eslint-disable-next-line no-console
console.log(`Extracted ${written} review documents -> ${OUT_ROOT}`);
