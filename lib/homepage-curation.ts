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
  "movavi", // Russian/East-European video editor — off-target for Indian shoppers; stays visible on its own hub
  "italojewerly", // US-focused jewellery retailer — off-target for Indian shoppers; stays visible on its own hub
  // Explicitly excluded from public grids/sitemaps/listings pending backend deactivation.
  "ixigo",
  "ixigo-com-travel-cps-india",
  "makemytrip",
  "make-my-trip",
  "mmt",
  "swiggy",
  "zomato",
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

/**
 * Phase 1 T9 — presentation-only merchant tiers, built from the T0 production
 * offer counts (docs/phase1/NOTES.md). Tiers NEVER affect routing, click
 * tracking, monetisation or whether a store exists. Tier B is the default;
 * Tier C is the existing off-topic blocklist above.
 *
 * A store with zero live offers cannot be Tier A. Zero-offer custom pages stay
 * Tier B (directory + existing page retained, not featured).
 */
export const TIER_A_STORE_SLUGS: readonly string[] = [
  "amazon-in",          // 35 offers
  "ajio-com-ecommerce-cps-india", // 30
  "tatacliq-com-ecommerce-cps-india", // 23 (13 codes + 10 deals)
  "baccabucci-com-ecommerce-cps-india", // 20
  "salty",              // 18 codes, dual network
  "dot-and-key",        // 8
  "nuawoman-com-ecommerce-cps-india", // 7 codes
  "boldfit",            // 7
  "indus-valley",       // 6
  "igp",                // 5
  "milton",             // 4, dual network
  "acer",               // 3 codes
  "firstcry",           // 2 codes, dual network
];

const TIER_A_SET = new Set(TIER_A_STORE_SLUGS);

export type MerchantTier = "A" | "B" | "C";

export function merchantTier(slug: string | null | undefined): MerchantTier {
  if (!slug) return "C";
  if (HOMEPAGE_EXCLUDED_STORE_SLUGS.has(slug)) return "C";
  return TIER_A_SET.has(slug) ? "A" : "B";
}
