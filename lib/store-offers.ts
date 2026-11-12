import type { CouponPublic } from "@/lib/types";

/**
 * Maps rows from the coupons table (restrictions.kind = "offer" | "product",
 * seeded in production) into the card shapes the custom brand-store pages
 * render. Everything user-facing on a brand page — offer codes, product
 * names, specs, prices, MRP — comes from the database via this mapper and
 * lib/api.ts, so a price change is a row update, not a redeploy.
 */

export interface StoreOfferCard {
  id: string;
  code: string;
  badge: string;
  title: string;
  description: string | null;
  targetUrl: string;
  subId: string;
  /** ISO expiry; null when the offer never expires. */
  expiresAt: string | null;
  /** 0-based catalog order, from restrictions.sort. */
  sort: number;
}

export interface StoreProductCard {
  tab: string;
  name: string;
  specs: string;
  price: string;
  mrp: string | null;
  discount: string | null;
  variant: string | null;
  image: string | null;
  languages: string[] | null;
  targetUrl: string;
  subId: string;
  /** 0-based catalog order, from restrictions.sort. */
  sort: number;
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function intOrMax(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
}

function restrictionsOf(c: CouponPublic): Record<string, unknown> {
  return (c.restrictions as Record<string, unknown> | null) ?? {};
}

function sortKey(c: CouponPublic): number {
  return intOrMax(restrictionsOf(c).sort);
}

/** The four evergreen promo cards rendered on each brand page (has a code). */
export function toOfferCards(coupons: CouponPublic[]): StoreOfferCard[] {
  return coupons
    .filter((c) => c.code && restrictionsOf(c).kind === "offer")
    .map((c) => {
      const r = restrictionsOf(c);
      return {
        id: c.id,
        code: c.code as string,
        badge: str(r.badge) ?? "OFFER",
        title: c.title,
        description: c.description,
        targetUrl: str(r.target_url) ?? "",
        subId: str(r.sub_id) ?? c.slug,
        expiresAt: c.expires_at,
        sort: sortKey(c),
      };
    })
    .sort((a, b) => a.sort - b.sort);
}

/** The "matcher" product catalog on each brand page (code-less, kind=product). */
export function toProductCards(deals: CouponPublic[]): StoreProductCard[] {
  return deals
    .filter((c) => restrictionsOf(c).kind === "product")
    .map((c) => {
      const r = restrictionsOf(c);
      const languages = Array.isArray(r.languages)
        ? (r.languages.filter((l): l is string => typeof l === "string") as string[])
        : null;
      return {
        tab: str(r.tab) ?? "Offers",
        name: c.title,
        specs: str(r.specs) ?? "",
        price: str(r.price) ?? "",
        mrp: str(r.mrp),
        discount: str(r.discount),
        variant: str(r.variant),
        image: str(r.image),
        languages,
        targetUrl: str(r.target_url) ?? "",
        subId: str(r.sub_id) ?? c.slug,
        sort: sortKey(c),
      };
    })
    .sort((a, b) => a.sort - b.sort);
}

/** Distinct matcher tabs, in catalog order. */
export function productTabs(products: StoreProductCard[]): string[] {
  const seen = new Set<string>();
  for (const product of products) seen.add(product.tab);
  return [...seen];
}
