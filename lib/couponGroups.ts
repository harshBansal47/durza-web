import type { CouponPublic } from "./types";

/**
 * Row de-duplication for coupon lists.
 *
 * A row of offers often contains several near-identical entries from the same
 * store (the same offer type published with different codes). Showing each one
 * as its own card makes the row look thin and repetitive, so they are grouped
 * into a single ticket with a "+N more codes" expander.
 *
 * The second rule — no store may fill more than two cards in one row — keeps a
 * row from becoming a single-store wall of cards.
 *
 * Both rules live in this pure helper so they can be unit tested without a
 * renderer.
 */

export interface CouponGroup {
  /** The offer the ticket shows. */
  primary: CouponPublic;
  /** Same store, same offer type — shown behind the "+N more codes" expander. */
  extra: CouponPublic[];
  storeId: string;
  offerType: CouponPublic["discount_type"];
}

export interface GroupOptions {
  /** How many cards one store may occupy in a row. Defaults to 2. */
  maxGroupsPerStore?: number;
}

/** Two offers are "the same kind of offer" when they share the offer type. */
export function offerTypeKey(coupon: CouponPublic): string {
  return coupon.discount_type;
}

export function groupCouponsForRow(
  coupons: CouponPublic[],
  options: GroupOptions = {},
): CouponGroup[] {
  const maxGroupsPerStore = options.maxGroupsPerStore ?? 2;
  if (!coupons || coupons.length === 0) return [];

  const order: string[] = [];
  const buckets = new Map<string, CouponPublic[]>();

  for (const coupon of coupons) {
    const key = `${coupon.store_id}|${offerTypeKey(coupon)}`;
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.push(coupon);
    } else {
      buckets.set(key, [coupon]);
      order.push(key);
    }
  }

  const groupsPerStore = new Map<string, number>();
  const groups: CouponGroup[] = [];

  for (const key of order) {
    const bucket = buckets.get(key)!;
    const storeId = bucket[0].store_id;
    const used = groupsPerStore.get(storeId) ?? 0;
    if (used >= maxGroupsPerStore) continue;
    groupsPerStore.set(storeId, used + 1);
    groups.push({
      primary: bucket[0],
      extra: bucket.slice(1),
      storeId,
      offerType: bucket[0].discount_type,
    });
  }

  return groups;
}
