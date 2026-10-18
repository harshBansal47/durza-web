import type { CouponPublic } from "./types";

/** One divider every this many cards in the deals feed. */
export const DEAL_FEED_DIVIDER_EVERY = 7;

/** A divider only names a stretch when at least this many cards follow it. */
const MIN_LABELLED_BLOCK = 4;

/**
 * The label for a divider that opens the block starting at `localIndex`.
 *
 * The feed keeps the backend's order — the frontend never re-ranks — so this
 * is a signpost, not a grouping claim: it names the category most of the next
 * stretch belongs to ("More fashion deals"), computed from exactly the cards
 * the visitor is about to scroll through. A mixed stretch stays generic
 * rather than pointing at a category most of its cards do not belong to.
 * Callers add the uppercase styling; the returned text is plain.
 */
export function dealFeedDividerLabel(
  coupons: CouponPublic[],
  localIndex: number,
  categoryName: (id: string) => string | null | undefined,
): string | null {
  const block = coupons.slice(localIndex, localIndex + DEAL_FEED_DIVIDER_EVERY);
  if (block.length < MIN_LABELLED_BLOCK) return null;

  const counts = new Map<string, number>();
  for (const coupon of block) {
    counts.set(coupon.category_id, (counts.get(coupon.category_id) ?? 0) + 1);
  }

  let bestId: string | null = null;
  let bestCount = 0;
  // Ties keep the category that appears first in the block.
  for (const coupon of block) {
    const count = counts.get(coupon.category_id) ?? 0;
    if (bestId === null || count > bestCount) {
      bestId = coupon.category_id;
      bestCount = count;
    }
  }

  const name = bestId ? categoryName(bestId) : null;
  if (!name || bestCount < 2) return "More deals";
  return `More ${name.toLowerCase()} deals`;
}

/**
 * The steepest discount the list can back, for the mobile spotlight: the
 * biggest percentage first, then the biggest fixed amount, then the list's
 * own first card. The list itself is never re-ordered.
 */
export function pickSpotlightDeal(coupons: CouponPublic[]): CouponPublic | undefined {
  function steepest(type: "percentage" | "fixed"): CouponPublic | undefined {
    let best: CouponPublic | undefined;
    for (const coupon of coupons) {
      if (coupon.discount_type !== type || coupon.discount_value == null) continue;
      if (!best || coupon.discount_value > (best.discount_value ?? 0)) best = coupon;
    }
    return best;
  }

  return steepest("percentage") ?? steepest("fixed") ?? coupons[0];
}
