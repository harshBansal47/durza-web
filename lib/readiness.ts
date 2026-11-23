import type { CollectionEntry } from "@/data/collections";
import { validateCollection } from "@/lib/collection-integrity";
import type { EvidenceRow } from "@/lib/api/admin";

export interface CollectionReadiness {
  slug: string;
  title: string;
  items: number;
  sourcedItems: number;
  gate: boolean;
  reasons: string[];
}

export function collectionReadiness(entry: CollectionEntry): CollectionReadiness {
  const reasons = validateCollection(entry);
  const sourcedItems = entry.picks.filter(
    (pick) => pick.evidence && pick.evidence !== "No source date yet",
  ).length;
  if (sourcedItems < entry.picks.length) {
    reasons.push(`${entry.picks.length - sourcedItems} item(s) lack a source date`);
  }
  return {
    slug: entry.slug,
    title: entry.title,
    items: entry.picks.length,
    sourcedItems,
    gate: reasons.length === 0,
    reasons,
  };
}

export function publishableOffers(offers: readonly EvidenceRow[]) {
  const live = offers.filter((offer) => offer.is_active && offer.evidence_tier !== "unknown");
  const byStore = new Map<string, number>();
  const byTier = new Map<string, number>();
  for (const offer of live) {
    const store = offer.store_slug ?? "unknown";
    byStore.set(store, (byStore.get(store) ?? 0) + 1);
    byTier.set(offer.store_tier, (byTier.get(offer.store_tier) ?? 0) + 1);
  }
  return { total: live.length, byStore: [...byStore.entries()], byTier: [...byTier.entries()] };
}
