/**
 * Registry of every shopping tool on the site, in one place.
 *
 * The tools used to live inside ~30 separate store pages (app/stores/<slug>/client.tsx).
 * This registry lists them all so the home page, the /tools hub and the command search
 * can find and run any of them. Content is copied verbatim from the store pages
 * (lib/store-tools-content.ts); nothing here reads the live catalogue.
 *
 * Kinds, from most to least "computed":
 *   native       maths in lib/hero-tools.ts (BLDC sizing, protein cost, GST tier)
 *   calc         a small calculator with its own pure function below
 *   basket       tap items, see the stacked discount (shared maths: basketTotals)
 *   table        a sorted/filtered table of brand-listed items
 *   chooser      pick an option, read the brand's recommendation
 *   guide        a short checklist or explainer from the store page
 *   store-link   needs live product data, so it opens on the store page
 *
 * Pure data and functions only (no React, no affiliate calls): the UI builds the
 * tracked outbound link with getAffiliateLink(store, url, sub), exactly as the
 * store pages do.
 */
import type { AffiliateBrand } from "@/lib/affiliate";
import {
  ASTRO_CHECKLIST,
  FIRSTCRY_DIAPERS,
  FIRSTCRY_GEAR,
  LAVIE_CARRY,
  LEVIS_CARTS,
  MAN_COMPANY_STEPS,
  MILTON_NEEDS,
  MOGLIX_BUYERS,
  MYMUSE_GUARANTEES,
  NATURAL_WASH_CART_FILLERS,
  NEESH_CONCENTRATIONS,
  NILKAMAL_CONFIDENCE,
  NOURISH_CONFIDENCE,
  SIRONA_CUP_SIZES,
  TRUEBASICS_COMPARISONS,
  WONDERCHEF_ADVISOR,
  ZEROHARM_TECH,
  ZOFF_GRINDING,
  ZOFF_RESTOCK_ITEMS,
} from "@/lib/store-tools-content";

export type ToolCategory = "fitness" | "beauty" | "fashion" | "home" | "tech" | "family";

export const TOOL_CATEGORIES: { id: ToolCategory; label: string }[] = [
  { id: "fitness", label: "Health & fitness" },
  { id: "home", label: "Home & kitchen" },
];

export type ToolTone = "amber" | "green" | "magenta" | "blue";
export type ToolIcon =
  | "zap" | "flask" | "heart" | "calc" | "wallet" | "sparkles" | "shirt" | "home" | "bag" | "gift"
  | "baby" | "shield" | "list" | "coffee" | "scale" | "clock" | "pill" | "leaf" | "lock" | "cap" | "headphones" | "cart";

export interface ToolCta {
  label: string;
  url: string;
  sub: string;
}

export interface ChooserOption {
  id: string;
  label: string;
  /** Bold "Recommended: …" line. */
  title?: string;
  body?: string;
  points?: string[];
  rows?: [string, string][];
  note?: string;
  /** Two-column comparison (e.g. generic vs patented). */
  compare?: { left: { label: string; points: string[] }; right: { label: string; points: string[] } };
  /** Per-option call to action; falls back to the tool's own. */
  cta?: ToolCta;
}

export interface BasketItem {
  id: string;
  label: string;
  amount: number;
}

export interface BasketRules {
  code: string;
  /** Percent off the subtotal (0.2 = 20%). */
  percent?: number;
  /** Flat ₹ off once the subtotal reaches `minSubtotal`. */
  flat?: number;
  minSubtotal?: number;
  /** Extra instant UPI discount applied after the code (0.05 = 5%). */
  upiPct?: number;
  freeShipAt?: number;
}

export type ToolBody =
  | { kind: "native"; nativeId: "bldc" | "protein" | "gst" }
  | { kind: "calc"; calc: "bldc-savings" | "fitspire-stack" | "nordpass-plan" | "firstcry-club" }
  | { kind: "basket"; intro: string; items: BasketItem[]; defaults: string[]; rules: BasketRules; cta: ToolCta }
  | { kind: "table"; table: "diapers" | "gear"; cta?: ToolCta }
  | { kind: "chooser"; intro?: string; facts?: { title: string; detail: string }[]; options: ChooserOption[]; defaultId: string; cta?: ToolCta; footnote?: string }
  | { kind: "guide"; intro?: string; paragraphs?: string[]; steps?: { title?: string; detail: string }[]; ordered?: boolean; cta?: ToolCta }
  | { kind: "store-link" };

export type StoreTool = {
  id: string;
  store: AffiliateBrand;
  storeName: string;
  category: ToolCategory;
  title: string;
  desc: string;
  time: string;
  icon: ToolIcon;
  tone: ToolTone;
  /** Where the longer version lives on the site. */
  href: string;
  hrefLabel: string;
  /** Shown first in the home hub. */
  featured?: boolean;
  /** Content is the brand's own wording and figures, not Durza's analysis. */
  brandSupplied?: boolean;
} & ToolBody;

/* ------------------------------------------------------------------ */
/* Pure calculators                                                   */
/* ------------------------------------------------------------------ */

/** Typical price gap between a BLDC fan and a similar regular fan, used for the payback line. */
export const BLDC_FAN_PREMIUM = 2500;

export interface BldcSavingsInput {
  regularWatts: number;
  bldcWatts: number;
  hoursPerDay: number;
  tariff: number;
}

export function bldcSavings({ regularWatts, bldcWatts, hoursPerDay, tariff }: BldcSavingsInput) {
  const diffKw = (regularWatts - bldcWatts) / 1000;
  const annualKwhSaved = diffKw * hoursPerDay * 365;
  const monthlySavings = diffKw * hoursPerDay * 30 * tariff;
  const yearlySavings = monthlySavings * 12;
  return {
    annualKwhSaved,
    monthlySavings,
    yearlySavings,
    tenYearSavings: yearlySavings * 10,
    paybackMonths: monthlySavings > 0 ? BLDC_FAN_PREMIUM / monthlySavings : null,
  };
}

/** Fitspire: FIT20 (20% off), then 5% prepaid off the remainder, ₹70 delivery saved from ₹499. */
export function fitspireStack(cartTotal: number) {
  const fit20 = Math.round(cartTotal * 0.2);
  const prepaid = Math.round((cartTotal - fit20) * 0.05);
  const shipping = cartTotal >= 499 ? 70 : 0;
  const final = cartTotal - fit20 - prepaid - shipping;
  return { fit20, prepaid, shipping, final, saved: cartTotal - final };
}

export const NORDPASS_FAMILY_MONTHLY = 249;
export const NORDPASS_INDIVIDUAL_MONTHLY = 129;

export function nordpassPlan(members: number) {
  const perPerson = Math.round(NORDPASS_FAMILY_MONTHLY / Math.max(1, members));
  return { perPerson, savingsPct: Math.round((1 - perPerson / NORDPASS_INDIVIDUAL_MONTHLY) * 100) };
}

/** FirstCry Club: 7% back on monthly spend plus ₹100/month of perks, against the membership fee. */
export function firstcryClub(spend: number, months: 3 | 12) {
  const membership = months === 12 ? 999 : 499;
  const savings = Math.round(spend * 0.07 * months + 100 * months);
  return { membership, savings, net: savings - membership };
}

export function basketTotals(items: readonly BasketItem[], selected: readonly string[], rules: BasketRules) {
  const subtotal = items.filter((i) => selected.includes(i.id)).reduce((sum, i) => sum + i.amount, 0);
  const codeMet = rules.minSubtotal == null || subtotal >= rules.minSubtotal;
  const discount = rules.percent != null ? Math.round(subtotal * rules.percent) : rules.flat != null && codeMet ? rules.flat : 0;
  const upi = rules.upiPct != null ? Math.round((subtotal - discount) * rules.upiPct) : 0;
  const freeShip = rules.freeShipAt != null ? subtotal >= rules.freeShipAt : null;
  return {
    subtotal,
    discount,
    codeMet,
    upi,
    net: subtotal - discount - upi,
    freeShip,
    shortfall: rules.freeShipAt != null && subtotal < rules.freeShipAt ? rules.freeShipAt - subtotal : 0,
  };
}

/** Diapers sorted by cost per pant, cheapest first. */
export function diaperRanking() {
  return FIRSTCRY_DIAPERS.map((d) => ({ ...d, perPant: d.price / d.pack })).sort((a, b) => a.perPant - b.perPant);
}

export function gearFor(type: "All" | "Stroller" | "Car Seat") {
  return type === "All" ? FIRSTCRY_GEAR : FIRSTCRY_GEAR.filter((g) => g.type === type);
}

/* ------------------------------------------------------------------ */
/* Registry                                                           */
/* ------------------------------------------------------------------ */

const cta = (label: string, url: string, sub: string): ToolCta => ({ label, url, sub });

export const STORE_TOOLS: StoreTool[] = [
  /* Kept: genuine calculators with a direct affiliate destination. */
  { id: "bldc", store: "havells", storeName: "Havells", category: "home", title: "BLDC Power Calculator", desc: "Right wattage & sweep for your room", time: "~10s", icon: "zap", tone: "amber", href: "/stores/havells/bldc-calculator", hrefLabel: "BLDC savings calculator", featured: true, kind: "native", nativeId: "bldc" },
  { id: "protein", store: "alpino", storeName: "Alpino", category: "fitness", title: "Protein Cost Decoder", desc: "₹ per 25g of actual protein", time: "~15s", icon: "flask", tone: "green", href: "/stores/alpino#protein-decoder", hrefLabel: "protein-per-rupee guide", featured: true, kind: "native", nativeId: "protein" },
];

export const TOOLS_BY_ID: ReadonlyMap<string, StoreTool> = new Map(STORE_TOOLS.map((t) => [t.id, t]));

/** The four tools shown as chips under the hero search. */
export const FEATURED_TOOLS: StoreTool[] = STORE_TOOLS.filter((t) => t.featured);

export function toolsByCategory(category: ToolCategory | "all", query = ""): StoreTool[] {
  const q = query.trim().toLowerCase();
  return STORE_TOOLS.filter(
    (t) => (category === "all" || t.category === category) && (!q || `${t.title} ${t.desc} ${t.storeName}`.toLowerCase().includes(q)),
  );
}
