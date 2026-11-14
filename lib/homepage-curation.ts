/**
 * What the homepage will show and what it will not.
 *
 * The default catalogue includes offers aimed at a global B2B, hosting, VPN and
 * developer-tools audience — irrelevant for the Indian online shopper who comes
 * here for fashion, food, beauty, electronics and home. Those offers still live
 * on their store pages; they just never print on the homepage.
 *
 * Indian D2C brands with no currency in the DB are kept — they are exactly the
 * audience this section is for.
 */

export const HOMEPAGE_EXCLUDED_STORE_SLUGS = new Set([
  "thordata", // residential proxy plans — paid API, not an Indian consumer offer
  "prohoster", // Russian-hosted VPS, priced in USD and aimed outside India
  "turbovpn", // global VPN with no India-specific campaign
  "purevpn-com-utility-cpa-worldwide", // worldwide CPA funnel, off-target
  "2ndnumber-tel-virtual-sms", // global virtual-SMS pool, not a shopping brand
  "boggbag-com-ecommerce-cps-united-states", // US tote bags — audience outside India
  "tenxyou-com-ecommerce-cps-india", // origin/audience unclear; kept off the front
  "invideo", // video-editor SaaS for businesses — belongs on its own store page
  "glasseslit", // US-only eyeglasses retailer, prices in USD — off-target for Indian shoppers
]);

export function isHomepageIndiaRelevant(storeSlug: string | null | undefined): boolean {
  if (!storeSlug) return false;
  return !HOMEPAGE_EXCLUDED_STORE_SLUGS.has(storeSlug);
}


/**
 * The IDs of stores worth showing an Indian shopper today — every store we
 * can call Indian-relevant, minus the off-target list above. Used for the
 * listing pages (coupons, deals, categories, search) where the API filter
 * is an allow-list; pass these to `listCoupons({ store_ids })` and totals
 * stay consistent with what the page shows.
 */
export function allowedStoreIds(stores: readonly { id: string; slug: string }[]): string[] {
  return stores.filter((s) => isHomepageIndiaRelevant(s.slug)).map((s) => s.id);
}
