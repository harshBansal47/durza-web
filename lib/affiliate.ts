import { VCOMMISSION_CAMPAIGNS as VCOMMISSION_CAMPAIGN_REGISTRY } from "@/data/vcommission-campaigns";

/**
 * vCommission affiliate deep links. The campaign registry lives in
 * `data/vcommission-campaigns.ts`; this module builds links and re-exports the
 * campaign map for brand pages and guides, so we never maintain two lists.
 *
 * Every outbound click on a brand page goes through `getAffiliateLink`, so the
 * campaign mapping lives in exactly one place. Campaign IDs are public (they
 * ship in every outbound link); the only thing that breaks in production is a
 * placeholder ID, which `logAffiliateConfigWarnings` flags loudly.
 *
 * Link format:
 *   https://track.vcommission.com/click?campaign_id=$ID&pub_id=$PUB&url=$ENCODED&p1=$SUB_ID
 *
 * The `p1` parameter carries the per-placement `subId` (e.g. "store_hub",
 * "offer_card"), which is how downstream reports split a brand's traffic by
 * placement. Backend-recorded clicks (via `/go/{store-slug}`) are attributed
 * separately through `click_id`, so they do not depend on this helper.
 */

/** Durza's vCommission publisher ID — identical for every brand. */
export const VCOMMISSION_PUB_ID = "133499";

/**
 * Admitad — used for Acer and other Admitad-routed programs. The per-offer
 * campaign hashes (matched against Acer's coupon_sources rows) live here, with
 * an env-var fallback for rotating them without a redeploy. When the hash
 * doesn't match, use the Admitad deep link as configured in .env.
 */
export const ADMITAD_ACER_CAMPAIGNS: Record<string, { campaignUrl: string }> = {
  AD232KL: { campaignUrl: "https://tjzuh.com/g/miev580u89b8e4e2707a759e60847d/?i=3" },
  AD233KGL: { campaignUrl: "https://tjzuh.com/g/9zblsyb5mcb8e4e2707a759e60847d/?i=3" },
  TABLET500: { campaignUrl: "https://tjzuh.com/g/mfscb8aremb8e4e2707a759e60847d/?i=3" },
};

function admitadBaseUrl(code: string): string | undefined {
  const mapped = ADMITAD_ACER_CAMPAIGNS[code.toUpperCase()]?.campaignUrl;
  const env = process.env.NEXT_PUBLIC_ADMITAD_ACER_BASE_URL;
  return mapped ?? env;
}

/**
 * Build an Admitad deep link for a specific Acer offer — or the global base
 * URL if the per-code campaign hash isn't in the table. The result has the
 * tracker baked in and the destination on Acer as `ulp` (or inlined into the
 * hash for campaigns that don't use `ulp`), plus a subid for placement
 * attribution.
 */
export function getAcerAdmitadLink(
  targetUrl: string,
  code: string,
  subId: string,
): string | undefined {
  const base = admitadBaseUrl(code);
  if (!base) {
    if (process.env.NODE_ENV === "production") {
      console.warn(`[affiliate] Acer Admitad base URL not configured for code ${code} — link untracked`);
    }
    return undefined;
  }
  // Admitad deep-link format: ulp=<destination>&subid=<placement tag>
  try {
    const u = new URL(base);
    u.searchParams.set("ulp", encodeURIComponent(targetUrl));
    u.searchParams.set("subid", subId);
    return u.toString();
  } catch {
    return `${base}${base.includes("?") ? "&" : "?"}ulp=${encodeURIComponent(targetUrl)}&subid=${encodeURIComponent(subId)}`;
  }
}

// Single source of truth lives in `data/vcommission-campaigns.ts` (parity with
// `data/admitad-programs.ts`). This module derives the kebab store-slug →
// campaign id map every brand page and guide uses, so the two never drift.
// Campaign IDs are public (they ship in every outbound link); the only thing
// that breaks in production is a placeholder ID, which `logAffiliateConfigWarnings` flags loudly.
const DERIVED_CAMPAIGN_IDS = Object.fromEntries(
  Object.values(VCOMMISSION_CAMPAIGN_REGISTRY).map((campaign) => [campaign.slug, campaign.id]),
) as { [Slug in (typeof VCOMMISSION_CAMPAIGN_REGISTRY)[keyof typeof VCOMMISSION_CAMPAIGN_REGISTRY]["slug"]]: string };

/** Per-brand campaign IDs issued by the vCommission dashboard, keyed by store hub slug. */
export const VCOMMISSION_CAMPAIGNS = DERIVED_CAMPAIGN_IDS;

export type AffiliateBrand = keyof typeof VCOMMISSION_CAMPAIGNS;

const PLACEHOLDER = /placeholder|your[-_]?pub[-_]?id|xx+|todo|changeme|\$\{|_id$/i;
const VALID_ID = /^\d{4,6}$/;

function envCampaignId(brand: AffiliateBrand): string | undefined {
  const key = `NEXT_PUBLIC_VCOMMISSION_${brand.toUpperCase().replace(/-/g, "_")}_CAMPAIGN_ID`;
  const value = process.env[key];
  return value && value.trim() ? value.trim() : undefined;
}

function campaignIdFor(brand: AffiliateBrand): string {
  return envCampaignId(brand) ?? VCOMMISSION_CAMPAIGNS[brand];
}

/**
 * Amazon Associates — used for all Amazon.in outbound clicks from guides and
 * deal cards. Endorsed as the canonical Amazon route, replacing any vCommission
 * loop for Amazon. The tag never changes; the placement tag is `ascsubtag`.
 *
 * Works on product, search, deals or any Amazon.in URL — never a fake coupon
 * code. Throws into a `tag=durza02-21` default if the env var is absent.
 */
export function getAmazonAffiliateLink(
  targetUrl: string = "https://www.amazon.in",
  subId: string = "guide_hub",
): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "durza02-21";
  try {
    const u = new URL(targetUrl);
    // Preserve any existing query params, enforce our tag + placement tag.
    u.searchParams.set("tag", tag);
    u.searchParams.set("ascsubtag", subId);
    return u.toString();
  } catch {
    const sep = targetUrl.includes("?") ? "&" : "?";
    return `${targetUrl}${sep}tag=${tag}&ascsubtag=${subId}`;
  }
}

/**
 * Every configuration problem worth surfacing. Empty when the map is healthy.
 */
export function affiliateConfigWarnings(): string[] {
  const warnings: string[] = [];
  if (!VCOMMISSION_PUB_ID || !VALID_ID.test(VCOMMISSION_PUB_ID) || PLACEHOLDER.test(VCOMMISSION_PUB_ID)) {
    warnings.push(`NEXT_PUBLIC_VCOMMISSION_PUB_ID is unset or placeholder ("${VCOMMISSION_PUB_ID}")`);
  }
  for (const brand of Object.keys(VCOMMISSION_CAMPAIGNS) as AffiliateBrand[]) {
    const envId = envCampaignId(brand);
    const id = campaignIdFor(brand);
    if (!id || !VALID_ID.test(id) || PLACEHOLDER.test(id)) {
      warnings.push(`campaign for "${brand}" is unset or placeholder ("${id}")`);
    } else if (envId !== undefined && !VALID_ID.test(envId)) {
      warnings.push(`NEXT_PUBLIC_VCOMMISSION_${brand.toUpperCase().replace(/-/g, "_")}_CAMPAIGN_ID is invalid ("${envId}")`);
    }
  }
  return warnings;
}

let warningsLogged = false;

/** Logs any configuration problems once per process. Called by every link builder. */
export function logAffiliateConfigWarnings(): void {
  if (warningsLogged) return;
  warningsLogged = true;
  for (const warning of affiliateConfigWarnings()) {
    console.warn(`[affiliate] ${warning} — outbound links for this brand will be untracked or broken`);
  }
}

/**
 * Build the vCommission click URL for a brand.
 * @param brand   key into VCOMMISSION_CAMPAIGNS
 * @param targetUrl destination on the advertiser's site (any https URL)
 * @param subId   per-placement tag ("store_hub", "offer_card", "hero_cta", …)
 */
export function getAffiliateLink(
  brand: AffiliateBrand,
  targetUrl: string,
  subId: string,
): string {
  logAffiliateConfigWarnings();
  const campaignId = campaignIdFor(brand);
  return (
    `https://track.vcommission.com/click` +
    `?campaign_id=${campaignId}` +
    `&pub_id=${VCOMMISSION_PUB_ID}` +
    `&url=${encodeURIComponent(targetUrl)}` +
    `&p1=${encodeURIComponent(subId)}`
  );
}
