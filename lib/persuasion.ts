import type { PricePoint } from "./types";

export type TrustLevel = "verified" | "low-data" | "no-data";
export type ExpiryTone = "expired" | "warning" | "calm" | "none";

/** Minimum reports before a shopper-success claim is shown. */
export const MIN_REPORTS = 5;
/** Warning window for expiry labels, in milliseconds. */
export const EXPIRY_WARNING_MS = 48 * 60 * 60 * 1000;

export function trustLevel(
  rate: number | null,
  reports: number,
  minReports = MIN_REPORTS,
): TrustLevel {
  if (rate === null || reports < minReports) return reports === 0 ? "no-data" : "low-data";
  return "verified";
}

export function trustCopy(level: TrustLevel, reports: number): string {
  if (level === "verified") return `Verified working by ${reports} Durza users recently`;
  if (level === "low-data") return `No votes yet from enough shoppers`;
  return "No votes yet";
}

export function expiryTone(expiresAt: string | null, now: Date = new Date()): ExpiryTone {
  if (!expiresAt) return "none";
  const expiry = new Date(expiresAt).getTime();
  if (Number.isNaN(expiry)) return "none";
  const remaining = expiry - now.getTime();
  if (remaining < 0) return "expired";
  return remaining < EXPIRY_WARNING_MS ? "warning" : "calm";
}

function monthsBetween(from: Date, to: Date): number {
  return Math.max(
    0,
    (to.getFullYear() - from.getFullYear()) * 12 +
      (to.getMonth() - from.getMonth()) -
      (to.getDate() < from.getDate() ? 1 : 0),
  );
}

/**
 * “Lowest in N months” is only valid when the current price equals the lowest
 * price in the supplied window. The window must contain real points.
 */
export function priceInsight(
  points: PricePoint[],
  currentPrice: number,
  now: Date = new Date(),
): string | null {
  if (points.length === 0 || currentPrice <= 0) return null;
  const latest = points
    .map((point) => new Date(point.captured_at))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];
  if (!latest) return null;

  const window30 = points.filter((point) => now.getTime() - new Date(point.captured_at).getTime() <= 30 * 24 * 60 * 60 * 1000);
  const window90 = points.filter((point) => now.getTime() - new Date(point.captured_at).getTime() <= 90 * 24 * 60 * 60 * 1000);
  const min30 = Math.min(...window30.map((point) => point.price));
  const min90 = Math.min(...window90.map((point) => point.price));
  if (currentPrice <= min90) {
    const months = Math.min(3, Math.max(1, monthsBetween(latest, now) || 1));
    return `Lowest price in ${months} month${months === 1 ? "" : "s"}`;
  }
  if (currentPrice <= min30) return "Lowest price in 1 month";
  return null;
}

/** Saved-item count is a real number, not an estimated savings amount. */
export function savedCount(items: unknown[]): number {
  return items.length;
}
