import type { CouponPublic } from "@/lib/types";

export interface StoreStats {
  /** Offers verified within the last 30 days. */
  verifiedRecently: number;
  /** Average reported success rate, 0–100, or null when no data exists. */
  avgRate: number | null;
  /** Most recent source check across all offers (ISO), or null. */
  latestCheck: string | null;
  /** Total shopper reports (worked + didn't work). */
  totalReports: number;
}

/**
 * Trust strip inputs for store pages — computed from DB coupons/deals, never
 * invented. Empty buckets return null and the UI hides those segments.
 */
export function computeStoreStats(coupons: CouponPublic[], deals: CouponPublic[] = []): StoreStats {
  const all = [...coupons, ...deals];
  const thirtyDays = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const verifiedRecently = all.filter(
    (c) => c.last_verified_at && Date.parse(c.last_verified_at) > thirtyDays,
  ).length;
  const rates = all
    .map((c) => c.success_rate)
    .filter((r): r is number => typeof r === "number");
  const avgRate = rates.length ? Math.round(rates.reduce((a, b) => a + b, 0) / rates.length) : null;
  const latestChecked = all
    .map((c) => c.last_checked_at)
    .filter((t): t is string => Boolean(t))
    .sort();
  const latestCheck = latestChecked.length ? latestChecked[latestChecked.length - 1] : null;
  const totalReports = all.reduce((n, c) => n + (c.success_count ?? 0) + (c.fail_count ?? 0), 0);
  return { verifiedRecently, avgRate, latestCheck, totalReports };
}
