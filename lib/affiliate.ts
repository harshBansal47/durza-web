/**
 * Single source of truth for vCommission affiliate deep links.
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

/** Per-brand campaign IDs issued by the vCommission dashboard. */
export const VCOMMISSION_CAMPAIGNS = {
  "alpino": "13512",
  "beast-life": "13808",
  "boldfit": "13749",
  "boult": "10323",
  "brillare": "13375",
  "bytepe": "13363",
  "dot-and-key": "12957",
  "firstcry": "10081",
  "fitspire": "13768",
  "fuelone": "13114",
  "gritzo": "13113",
  "guvi": "10782",
  "havells": "13307",
  "healthkart": "10109",
  "hirafragrance": "13740",
  "hkvitals": "10111",
  "iba-cosmetics": "12939",
  "igp": "11874",
  "indus-valley": "12859",
  "kama-ayurveda": "10125",
  "kapiva": "10126",
  "lavie-world": "13524",
  "levis": "11501",
  "life-changing-astro": "13860",
  "milton": "12749",
  "moglix": "10351",
  "mymuse": "10666",
  "neesh-perfumes": "10175",
  "nilkamalfurniture": "11875",
  "nordpass": "10181",
  "nourish-mantra": "12144",
  "sirona": "13441",
  "the-bear-house": "13462",
  "the-man-company": "10248",
  "the-natural-wash": "12839",
  "truebasics": "10255",
  "wonderchef": "12979",
  "zeroharm": "10514",
  "zoff-foods": "13859",
} as const satisfies Record<string, string>;

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
