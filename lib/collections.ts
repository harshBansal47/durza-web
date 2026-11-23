import { COLLECTIONS, type CollectionEntry, type CollectionPick } from "@/data/collections";
import { api, resilient } from "@/lib/api";
import type { EditorialContent } from "@/lib/types";

/**
 * Phase 2 T4 — merge editor-published DB collections with the curated static
 * ones. Static content remains the fallback when the API is unavailable;
 * the publish gate is enforced server-side, not here.
 */

function pickFromBlock(block: Record<string, unknown>): CollectionPick | null {
  if (block.type !== "collection_item") return null;
  const why = typeof block.why === "string" ? block.why.trim() : "";
  if (!why) return null;
  const name = typeof block.title === "string" && block.title.trim() ? block.title.trim() : "Curated item";
  const target = typeof block.target_url === "string" && block.target_url.trim() ? block.target_url.trim() : null;
  const storeId = typeof block.store_id === "string" ? block.store_id : null;
  const href = target || (storeId ? `/stores/${storeId}` : "/stores");
  return {
    name,
    storeBadge: typeof block.store_badge === "string" ? block.store_badge : "Curated pick",
    tier: "Essential First Buy",
    why,
    skipIf: typeof block.skip_if === "string" ? block.skip_if : "",
    ctaLabel: "View offer",
    ctaHref: href,
    external: href.startsWith("http"),
    offerType: typeof block.offer_type === "string" ? block.offer_type : "curated_pick",
  };
}

export function collectionFromEditorial(
  content: EditorialContent,
  blocks: Record<string, unknown>[] = content.content_blocks,
): CollectionEntry | null {
  const picks = blocks.map(pickFromBlock).filter((pick): pick is CollectionPick => pick !== null);
  if (picks.length < 3) return null;
  return {
    slug: content.slug,
    category: "Gifting & Lifestyle",
    title: content.title,
    seoTitle: content.seo_title || content.title,
    metaDescription: content.meta_description || content.summary,
    heroImage: content.hero_image_url || "",
    summary: content.summary,
    updatedLabel: "Editor reviewed",
    itemCountLabel: `${picks.length} picks`,
    kitSummary: content.summary,
    keywords: [],
    picks,
    faqs: content.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    relatedCollections: [],
    relatedGuides: [],
    relatedCompares: [],
    relatedStores: [],
  };
}

export async function mergedCollections(): Promise<CollectionEntry[]> {
  try {
    const response = await resilient.listEditorial({ content_type: "collection", limit: 100 });
    const published: CollectionEntry[] = [];
    for (const item of response.items.filter((entry) => entry.status === "published" && entry.is_indexable)) {
      let blocks = item.content_blocks;
      try {
        // Only items whose referenced offer is still live are shown.
        blocks = (await api.getCollectionLiveItems(item.slug)).items;
      } catch {
        blocks = item.content_blocks;
      }
      const entry = collectionFromEditorial(item, blocks);
      if (entry) published.push(entry);
    }
    // Static curated sets keep their place; editor-published sets lead.
    return [...published, ...COLLECTIONS];
  } catch {
    return COLLECTIONS;
  }
}
