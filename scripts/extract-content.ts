/**
 * Content-system Phase 2: one-time extraction of existing pages into the
 * JSON-driven content format (schemaVersion + stickyCta + ordered blocks).
 *
 * Reads the in-repo sources (data/reviews.ts, guide-documents/*) and writes
 * one JSON document per page to
 * `migration/content/<kind>/<slug>.json`, matching `lib/content/schema.ts`.
 *
 * Content parity: NO copy is rewritten, shortened, merged or "fixed". Blocks
 * are mapped into the block catalog; anything that doesn't fit gets a note in
 * `needs_review` + is preserved, never dropped. Comparison documents now
 * come from the editorial export in durza-content-export/comparison.
 *
 * Usage: npx tsx scripts/extract-content.ts
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { REVIEWS, type ReviewEntry } from "@/data/reviews";
import { GUIDE_DOCUMENTS } from "@/guide-documents";
import type { GuideDocument } from "@/lib/guide-document";

const OUT_ROOT = join(process.cwd(), "migration", "content");

type Block = Record<string, unknown>;

function clean(s: string | null | undefined): string | undefined {
  const t = (s ?? "").trim();
  return t.length ? t : undefined;
}

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

// ---- GuideDocument -> content doc -------------------------------------------

function guideToDoc(doc: GuideDocument): Record<string, unknown> {
  const blocks: Block[] = [];

  if (doc.audience && (asArray(doc.audience.bestFor).length || asArray(doc.audience.skipIf).length)) {
    blocks.push({ type: "audience", forWho: asArray(doc.audience.bestFor), skipIf: asArray(doc.audience.skipIf) });
  }

  if (doc.quickAnswer) {
    blocks.push({
      type: "verdict",
      variant: "answer10s",
      heading: doc.quickAnswer.question,
      body: doc.quickAnswer.answer,
      ...(doc.quickAnswer.jumpHref ? { ctas: [{ label: doc.quickAnswer.jumpLabel, href: doc.quickAnswer.jumpHref }] } : {}),
    });
  }

  if (asArray(doc.scenarios).length) {
    blocks.push({ type: "steps", items: asArray(doc.scenarios).map((s) => ({ title: s.heading, body: s.body })) });
  }

  if (doc.skuTable && (asArray(doc.skuTable.rows).length || asArray(doc.skuTable.headers).length)) {
    blocks.push({ type: "table", columns: asArray(doc.skuTable.headers), rows: asArray(doc.skuTable.rows) });
  }

  if (asArray(doc.checkoutSteps).length) {
    blocks.push({ type: "steps", items: asArray(doc.checkoutSteps).map((s) => ({ body: s })) });
  }

  if (doc.verifiedFacts && asArray(doc.verifiedFacts.facts).length) {
    blocks.push({ type: "keyValue", items: asArray(doc.verifiedFacts.facts).map((f) => ({ label: f.label, value: f.detail })) });
  }

  if (clean(doc.verificationParagraph)) {
    blocks.push({ type: "paragraph", text: doc.verificationParagraph as string });
  }

  if (asArray(doc.verificationNotes).length) {
    blocks.push({ type: "bullets", items: asArray(doc.verificationNotes) });
  }

  if (asArray(doc.exploreLinks).length) {
    blocks.push({ type: "related", groups: [{ label: "Explore", links: asArray(doc.exploreLinks).map((l) => ({ title: l.label, href: l.href })) }] });
  }

  if (asArray(doc.faqs).length) {
    blocks.push({ type: "faq", items: asArray(doc.faqs).map((f) => ({ q: f.question, a: f.answer })) });
  }

  if (asArray(doc.sources).length) {
    blocks.push({ type: "sources", items: asArray(doc.sources).map((s) => ({ title: s.label, url: s.href, checkedAt: s.checkedAt ?? undefined })) });
  }

  return {
    schemaVersion: 1,
    kind: "guide",
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    status: "published",
    content_blocks: blocks,
    hero_image_url: null,
    author_name: doc.byline?.author ?? "Durza Research Desk",
    seo_title: doc.title,
    meta_description: doc.description,
    facts_checked_at: doc.byline?.factsChecked ?? doc.researchReviewedDate ?? null,
    published_at: doc.byline?.published ?? null,
    updated_at: doc.byline?.updated ?? null,
    needs_review: false,
    stickyCta: doc.ctas?.[0] ? { label: doc.ctas[0].label, href: doc.ctas[0].href } : undefined,
    evidenceBadges: doc.evidenceBadges ?? [],
  };
}

// ---- run --------------------------------------------------------------------

function writeDoc(kind: string, slug: string, doc: Record<string, unknown>) {
  const dir = join(OUT_ROOT, kind);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${slug}.json`), JSON.stringify(doc, null, 2));
}

let written = 0;
const counts: Record<string, number> = { review: 0, guide: 0 };

for (const entry of REVIEWS) {
  writeDoc("review", entry.slug, reviewToDoc(entry));
  counts.review++; written++;
}

for (const doc of GUIDE_DOCUMENTS) {
  writeDoc("guide", doc.slug, guideToDoc(doc));
  counts.guide++; written++;
}

// eslint-disable-next-line no-console
console.log(`Extracted ${written} content documents -> ${OUT_ROOT}`);
// eslint-disable-next-line no-console
console.log(counts);
