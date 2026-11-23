import { BANKS } from "./bank-offers";
import type { CouponPublic } from "./types";

/**
 * Phase 1 T4 — one place that turns a coupon row into an honest offer type and
 * evidence statement. Uses only fields that already exist in `CouponPublic`;
 * no schema, feed or product data is assumed.
 */

export type OfferType =
  | "coupon_code"
  | "bank_offer"
  | "product_offer"
  | "store_promotion"
  | "no_code_deal"
  | "affiliate_link";

export type EvidenceTier = "source_seen" | "feed_reported" | "checkout_tested" | "unknown";

const STORE_SOURCE_KINDS = new Set([
  "store homepage",
  "store offers page",
  "store terms page",
]);

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function restrictions(coupon: CouponPublic): Record<string, unknown> {
  return coupon.restrictions && typeof coupon.restrictions === "object" ? coupon.restrictions : {};
}

/** Strong evidence only: the bank is named in the offer's own source text. */
function namesBank(coupon: CouponPublic): boolean {
  const r = restrictions(coupon);
  const haystack = [coupon.title, coupon.description, r.source_title, r.source_kind]
    .map(text)
    .join(" ");
  return BANKS.some((bank) => bank.match.test(haystack));
}

export function offerType(coupon: CouponPublic): OfferType {
  if (coupon.code) return "coupon_code";
  const r = restrictions(coupon);
  if (namesBank(coupon)) return "bank_offer";
  if (text(r.kind) === "product") return "product_offer";
  if (STORE_SOURCE_KINDS.has(text(r.source_kind).toLowerCase())) return "store_promotion";
  // Unknown no-code offers stay conservative: never claim an automatic discount
  // without explicit checkout evidence (discount_type='deal' proves nothing).
  return "no_code_deal";
}

/** Public label for a type. Never renders a bare "Verified" claim. */
export function offerTypeLabel(type: OfferType): string {
  switch (type) {
    case "coupon_code":
      return "Coupon code";
    case "bank_offer":
      return "Bank / payment offer";
    case "product_offer":
      return "Product offer";
    case "store_promotion":
      return "Store promotion";
    case "no_code_deal":
      return "Deal — no code listed";
    case "affiliate_link":
      return "Affiliate shopping link";
  }
}

export function evidenceTier(coupon: CouponPublic): EvidenceTier {
  const r = restrictions(coupon);
  if (coupon.verification_status === "verified" && coupon.code) return "checkout_tested";
  if (text(r.source_url) && text(r.checked_on)) return "source_seen";
  if (coupon.last_checked_at) return "feed_reported";
  return "unknown";
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** A single, short evidence line for offer cards. Exact tier text, no generic badge. */
export function evidenceLine(coupon: CouponPublic): string {
  const r = restrictions(coupon);
  switch (evidenceTier(coupon)) {
    case "checkout_tested":
      return "Checked out with this code";
    case "source_seen": {
      const date = formatDate(text(r.checked_on));
      return date ? `Source page seen ${date}` : "Source page seen";
    }
    case "feed_reported": {
      const date = formatDate(coupon.last_checked_at as string);
      return date ? `Reported by source ${date}` : "Reported by source";
    }
    default:
      return "No source date yet";
  }
}

/** Store-level CTA wording — deliberately never a coupon or discount claim. */
export function affiliateLinkLabel(): string {
  return "Visit store — we may earn a commission";
}
