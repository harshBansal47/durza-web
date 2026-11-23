import { BANKS } from "./bank-offers";
import type { CouponPublic } from "./types";

/** One place that turns a coupon row into an honest, single offer-type label. */

export type OfferType =
  | "coupon_code"
  | "bank_offer"
  | "product_offer"
  | "store_promotion"
  | "no_code_deal"
  | "affiliate_link";

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
  return "no_code_deal";
}

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

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Only a real last_checked_at produces a line; no placeholder when absent. */
export function lastCheckedLine(coupon: CouponPublic): string {
  const date = formatDate(text(coupon.last_checked_at));
  return date ? `Last checked ${date}` : "";
}

/** Only a verified coded offer is a checkout-tested claim. */
export function isCheckoutTested(coupon: CouponPublic): boolean {
  return coupon.verification_status === "verified" && Boolean(coupon.code);
}

export function affiliateLinkLabel(): string {
  return "Visit store — we may earn a commission";
}
