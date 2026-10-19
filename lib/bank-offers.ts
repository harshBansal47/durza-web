import type { CouponPublic, Store } from "./types";

/**
 * Bank & card offer matching.
 *
 * This module turns Durza's live coupon catalogue into a bank-centric hub. It
 * deliberately keys off the store's *own* words — the coupon title, description
 * and the restrictions/terms we recorded when the offer was researched — so an
 * offer only appears under a bank when the bank is actually named in the
 * source. It never invents a bank offer to fill a slot.
 *
 * Keep the taglines general: they describe the kind of benefit a bank usually
 * runs, and the live list below them is always the real, sourced data.
 */

export interface BankConfig {
  /** Stable id, used as a React key and in the page's in-page anchors. */
  id: string;
  /** Display name shown in the hero strip and section headings. */
  name: string;
  /** Short name for chips and the comparison table. */
  shortName: string;
  /** Matches the bank's own name as it appears in offer copy. */
  match: RegExp;
  /** The kind of benefit this bank typically runs. General, not a live claim. */
  typicalBenefit: string;
  /** What this bank's offers are usually best for. */
  bestFor: string;
}

export const BANKS: BankConfig[] = [
  {
    id: "hdfc",
    name: "HDFC Bank",
    shortName: "HDFC",
    match: /\bHDFC\b/i,
    typicalBenefit: "Instant discount and no-cost EMI at electronics, fashion and travel stores",
    bestFor: "Big-ticket electronics and appliances",
  },
  {
    id: "icici",
    name: "ICICI Bank",
    shortName: "ICICI",
    match: /\bICICI\b/i,
    typicalBenefit: "Instant discount and EMI across travel, electronics and lifestyle",
    bestFor: "Travel bookings and mid-range electronics",
  },
  {
    id: "sbi",
    name: "SBI Card",
    shortName: "SBI",
    match: /\bSBI\b/i,
    typicalBenefit: "Cashback and EMI on large purchases",
    bestFor: "Shoppers who prefer simple cashback",
  },
  {
    id: "axis",
    name: "Axis Bank",
    shortName: "Axis",
    match: /\bAxis\b/i,
    typicalBenefit: "Instant discount and accelerated rewards online",
    bestFor: "Frequent online shoppers",
  },
  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    shortName: "Kotak",
    match: /\bKotak\b/i,
    typicalBenefit: "Discounts and EMI at partner stores",
    bestFor: "Mid-range electronics and appliances",
  },
  {
    id: "idfc",
    name: "IDFC First Bank",
    shortName: "IDFC",
    match: /\bIDFC\b/i,
    typicalBenefit: "Flat EMI discounts on electronics",
    bestFor: "Fixed, predictable discounts on appliances",
  },
  {
    id: "rbl",
    name: "RBL Bank",
    shortName: "RBL",
    match: /\bRBL\b/i,
    typicalBenefit: "Flat percentage discounts on travel and hotels",
    bestFor: "Hotel and travel bookings",
  },
  {
    id: "indusind",
    name: "IndusInd Bank",
    shortName: "IndusInd",
    match: /\bIndusInd\b/i,
    typicalBenefit: "Flat discounts plus interest-free EMI on travel",
    bestFor: "Flights, hotels and holiday packages",
  },
  {
    id: "federal",
    name: "Federal Bank",
    shortName: "Federal",
    match: /\bFederal Bank\b/i,
    typicalBenefit: "Flat discounts plus interest-free EMI on travel",
    bestFor: "Flights and hotel bookings",
  },
  {
    id: "yes",
    name: "YES Bank",
    shortName: "YES",
    match: /\bYES Bank\b/i,
    typicalBenefit: "Instant discount on EMI at electronics stores",
    bestFor: "Electronics purchased on EMI",
  },
  {
    id: "citi",
    name: "Citi",
    shortName: "Citi",
    match: /\bCiti(?:bank)?\b/i,
    typicalBenefit: "Instant discount and EMI at select stores",
    bestFor: "Cardholders shopping at partner retailers",
  },
  {
    id: "hsbc",
    name: "HSBC",
    shortName: "HSBC",
    match: /\bHSBC\b/i,
    typicalBenefit: "Instant discount and EMI at select stores",
    bestFor: "Cardholders shopping at partner retailers",
  },
  {
    id: "sc",
    name: "Standard Chartered",
    shortName: "Standard Chartered",
    match: /\bStandard Chartered\b/i,
    typicalBenefit: "Instant discount and EMI at select stores",
    bestFor: "Cardholders shopping at partner retailers",
  },
  {
    id: "bob",
    name: "Bank of Baroda",
    shortName: "Bank of Baroda",
    match: /\bBank of Baroda\b/i,
    typicalBenefit: "Instant discount and EMI at select stores",
    bestFor: "Cardholders shopping at partner retailers",
  },
  {
    id: "pnb",
    name: "Punjab National Bank",
    shortName: "PNB",
    match: /\bPNB\b/i,
    typicalBenefit: "Instant discount and EMI at select stores",
    bestFor: "Cardholders shopping at partner retailers",
  },
  {
    id: "canara",
    name: "Canara Bank",
    shortName: "Canara",
    match: /\bCanara Bank\b/i,
    typicalBenefit: "Instant discount and EMI at select stores",
    bestFor: "Cardholders shopping at partner retailers",
  },
];

export interface BankOfferGroup {
  bank: BankConfig;
  /** Live coupons that name this bank, best first (most reports, then clicks). */
  coupons: CouponPublic[];
  /** The stores those coupons belong to, resolved once and de-duplicated. */
  stores: Store[];
}

/** Every string on a coupon that could name a bank. */
function bankHaystack(coupon: CouponPublic): string {
  const restrictions = coupon.restrictions as Record<string, unknown> | null | undefined;
  const terms = typeof restrictions?.terms === "string" ? restrictions.terms : "";
  const sourceUrl = typeof restrictions?.source_url === "string" ? restrictions.source_url : "";
  return [coupon.title, coupon.description ?? "", terms, sourceUrl].join(" \n ");
}

/** Group live coupons by the banks they name. Banks with no live offers are dropped. */
export function buildBankGroups(coupons: CouponPublic[], stores: Store[]): BankOfferGroup[] {
  const groups = new Map<string, BankOfferGroup>();

  for (const bank of BANKS) {
    const matched = coupons.filter((coupon) => bank.match.test(bankHaystack(coupon)));
    if (matched.length === 0) continue;
    // De-duplicate in case a coupon names the same bank twice.
    const seen = new Set<string>();
    const unique = matched.filter((coupon) => {
      if (seen.has(coupon.id)) return false;
      seen.add(coupon.id);
      return true;
    });
    // Evidence first: coupons with real shopper reports, then the most-clicked.
    unique.sort(
      (a, b) =>
        b.success_count + b.fail_count - (a.success_count + a.fail_count) || b.clicks_count - a.clicks_count,
    );
    const matchedStoreIds = new Set(unique.map((coupon) => coupon.store_id));
    const matchedStores = stores.filter((store) => matchedStoreIds.has(store.id));
    groups.set(bank.id, { bank, coupons: unique, stores: matchedStores });
  }

  return [...groups.values()].sort((a, b) => b.coupons.length - a.coupons.length);
}

/** Count of distinct banks that currently have at least one live offer. */
export function liveBankCount(groups: BankOfferGroup[]): number {
  return groups.length;
}
