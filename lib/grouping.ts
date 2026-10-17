import type { CouponPublic } from "./types";

/**
 * Title with a trailing "with code XXXX" clause removed, normalized so that
 * "Myntra: extra discount on selected styles with code BFF300" and
 * "... with code MYNTRA500" land in the same bucket.
 */
export function groupKey(title: string): string {
  return title
    .replace(/\s*[-–—]?\s*with code\s+\S+\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** Same normalization, but keeping the original casing for display. */
function displayLabel(title: string): string {
  return title
    .replace(/\s*[-–—]?\s*with code\s+\S+\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export type GroupedItem =
  | { kind: "coupon"; coupon: CouponPublic }
  | { kind: "group"; key: string; label: string; coupons: CouponPublic[] };

/**
 * Collapse near-identical offers (same title apart from the code) into one
 * entry, but only when at least `min` offers share that title — two similar
 * offers are not a wall of duplicates. Position is preserved: a group takes
 * the place of its first member.
 */
export function groupSimilar(coupons: CouponPublic[], min = 3): GroupedItem[] {
  const buckets = new Map<string, CouponPublic[]>();
  for (const coupon of coupons) {
    const key = groupKey(coupon.title);
    const bucket = buckets.get(key);
    if (bucket) bucket.push(coupon);
    else buckets.set(key, [coupon]);
  }

  const grouped = new Map<string, { label: string; coupons: CouponPublic[] }>();
  for (const [key, items] of buckets) {
    if (items.length >= min) {
      grouped.set(key, { label: displayLabel(items[0].title), coupons: items });
    }
  }

  const out: GroupedItem[] = [];
  const emitted = new Set<string>();
  for (const coupon of coupons) {
    const key = groupKey(coupon.title);
    const group = grouped.get(key);
    if (!group) {
      out.push({ kind: "coupon", coupon });
      continue;
    }
    if (emitted.has(key)) continue;
    emitted.add(key);
    out.push({ kind: "group", key, label: group.label, coupons: group.coupons });
  }
  return out;
}
