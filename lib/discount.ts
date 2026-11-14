import type { CouponPublic } from "./types";

const NUM = /[0-9]+(?:\.[0-9]+)?/g;
function numbers(value: unknown): number[] {
  if (value == null) return [];
  const text =
    typeof value === "string"
      ? value
      : typeof value === "number"
        ? String(value)
        : String(value ?? "");
  const out: number[] = [];
  for (const m of text.matchAll(NUM)) out.push(Number.parseFloat(m[0]));
  return out;
}

/**
 * Best-effort percentage off MRP from `restrictions.price` and `restrictions.mrp`
 * (Heritage fields like "₹549" / "Rs. 1,499.00" / "₹1,99,900" — Indian formatting included).
 * Returns null when the data is absent, unusable, or simply not a real discount.
 */
export function percentageOffFromRestrictions(coupon: CouponPublic): number | null {
  const raw = coupon.restrictions as Record<string, unknown> | null | undefined;
  if (!raw || typeof raw !== "object") return null;
  const price = numbers(raw.price)[0];
  const mrp = numbers(raw.mrp)[0];
  if (price == null || mrp == null || mrp <= 0 || mrp <= price) return null;
  const pct = Math.round(((mrp - price) / mrp) * 100);
  return pct > 0 ? pct : null;
}

/**
 * The "Mega Deals" heading — a single marketing line that an India-shopper
 * understands for codes-less big-save offers.
 *
 * Spec: this never overclaims. If the computed discount is >= 40%, we print the
 * literal "Mega Deals — 40% OFF & Beyond!" line you asked for. Otherwise the
 * same base head shows the *actual* computed saving ("Mega Deals — 15% off"),
 * never a made-up figure.
 */
export function megaDealLabel(computedPct: number | null): string {
  if (computedPct !== null && computedPct >= 40) {
    return "MEGA DEALS — 40% OFF & Beyond!";
  }
  if (computedPct !== null) {
    return `MEGA DEALS — ${computedPct}% OFF`;
  }
  return "MEGA DEALS — No Code Needed";
}

/** Convenience: one-shot call used by formatters. */
export function megaDealFromCoupon(coupon: CouponPublic): string | null {
  const discount =
    coupon.discount_type === "percentage" && typeof coupon.discount_value === "number"
      ? Number(coupon.discount_value)
      : percentageOffFromRestrictions(coupon);
  return megaDealLabel(discount);
}
