
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
  if (level === "verified") return `${reports} shopper reports said it worked recently`;
  if (level === "low-data") return `No votes yet from enough shoppers`;
  return "Fresh — be the first to try";
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

export function savedCount(items: unknown[]): number {
  return items.length;
}
