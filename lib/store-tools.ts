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
  { id: "beauty", label: "Beauty & care" },
  { id: "fashion", label: "Fashion & style" },
  { id: "home", label: "Home & kitchen" },
  { id: "tech", label: "Tech & money" },
  { id: "family", label: "Family & gifting" },
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
  /* Health & fitness */
  { id: "bldc", store: "havells", storeName: "Havells", category: "home", title: "BLDC Power Calculator", desc: "Right wattage & sweep for your room", time: "~10s", icon: "zap", tone: "amber", href: "/stores/havells/bldc-calculator", hrefLabel: "BLDC savings calculator", featured: true, kind: "native", nativeId: "bldc" },
  { id: "protein", store: "alpino", storeName: "Alpino", category: "fitness", title: "Protein Cost Decoder", desc: "₹ per 25g of actual protein", time: "~15s", icon: "flask", tone: "green", href: "/stores/alpino#protein-decoder", hrefLabel: "protein-per-rupee guide", featured: true, kind: "native", nativeId: "protein" },
  { id: "cup-size", store: "sirona", storeName: "Sirona", category: "beauty", title: "Menstrual Cup Size Finder", desc: "S, M or L, matched to your body", time: "~20s", icon: "heart", tone: "magenta", href: "/stores/sirona#cup-size-finder", hrefLabel: "cup size finder", featured: true, brandSupplied: true,
    kind: "chooser", defaultId: "m",
    footnote: "Switching to a cup saves roughly ₹15,000 in disposable pad expenses over 5 years — the cup costs ₹299 and lasts a decade.",
    options: SIRONA_CUP_SIZES.map((s) => ({ id: s.id, label: s.label, title: s.size, body: s.detail, cta: cta(`Shop Size ${s.id.toUpperCase()} Cup on Sirona`, s.url, s.sub) })) },
  { id: "gst", store: "moglix", storeName: "Moglix", category: "tech", title: "GST Tool Matcher", desc: "Free vs paid filing software", time: "~15s", icon: "calc", tone: "blue", href: "/stores/moglix#gst-net-cost", hrefLabel: "true net cost calculator", featured: true, kind: "native", nativeId: "gst" },

  { id: "bldc-savings", store: "havells", storeName: "Havells", category: "home", title: "BLDC Energy Savings Calculator", desc: "Yearly savings and payback vs a regular fan", time: "~15s", icon: "zap", tone: "amber", href: "/stores/havells/bldc-calculator", hrefLabel: "BLDC savings calculator", kind: "calc", calc: "bldc-savings" },
  { id: "fitspire-stack", store: "fitspire", storeName: "Fitspire", category: "fitness", title: "Smart Shopper's Stacking Calculator", desc: "FIT20 + prepaid discount on your cart", time: "~10s", icon: "cart", tone: "green", href: "/stores/fitspire", hrefLabel: "Fitspire page", kind: "calc", calc: "fitspire-stack" },
  { id: "protein-per-rupee", store: "alpino", storeName: "Alpino", category: "fitness", title: "Protein-Per-Rupee Stacking Guide", desc: "Peanut butter + oats combo maths", time: "~10s", icon: "flask", tone: "green", href: "/stores/alpino#protein-decoder", hrefLabel: "Alpino page", brandSupplied: true,
    kind: "guide", paragraphs: ["Alpino All-Natural 1kg (₹449) delivers 300g pure plant protein → Just ~₹1.49 per gram of clean protein.", "Add 1kg Natural PB (₹449) + 1kg Rolled Oats (₹299) = ₹748. Unlock Free Shipping + Flat 10% with ALPINO10 + 5% UPI savings."], cta: cta("Shop Breakfast Stack on Alpino", "https://alpino.store/collections/combos", "breakfast_stack") },
  { id: "beast-scoop", store: "beast-life", storeName: "BeastLife", category: "fitness", title: "Stack & Cost-Per-Scoop Guide", desc: "Creatine + whey stacking maths", time: "~10s", icon: "flask", tone: "green", href: "/stores/beast-life", hrefLabel: "BeastLife page", brandSupplied: true,
    kind: "guide", paragraphs: ["Creatine Tub = ₹799 for 83 Servings → Just ₹9.60 per workout session.", "Add Creatine (₹799) to Whey (₹2,399) to get free shipping + flat 10% with BEAST10 + extra 5% UPI savings."], cta: cta("Build Complete Beast Stack", "https://beastlife.in/collections/combos", "stack_builder") },
  { id: "hkvitals-day", store: "hkvitals", storeName: "HK Vitals", category: "fitness", title: "Cost-Per-Day Pill Counter", desc: "What a daily multivitamin really costs", time: "~5s", icon: "pill", tone: "green", href: "/stores/hkvitals", hrefLabel: "HK Vitals page", brandSupplied: true,
    kind: "guide", paragraphs: ["HK Vitals Multivitamin costs ₹499 for 60 days = Just ~₹8.30/day for complete 100% RDA micronutrient coverage."] },
  { id: "kapiva-day", store: "kapiva", storeName: "Kapiva", category: "fitness", title: "Cost-Per-Day Habit Guide", desc: "Daily cost of an Ayurvedic routine", time: "~10s", icon: "leaf", tone: "green", href: "/stores/kapiva", hrefLabel: "Kapiva page", brandSupplied: true,
    kind: "guide", paragraphs: ["Kapiva Himalayan Shilajit (20g @ ₹1,099) gives 60 servings = Just ~₹18/day for pure cellular energy & endurance.", "Combine 1 Shilajit Resin (₹1,099) + 1 Dia Free Juice (₹549) = ₹1,648. Unlock Free Shipping + Flat 15% with STAMINA15 + 5% UPI savings."], cta: cta("Start My Health Routine", "https://kapiva.in", "health_routine") },
  { id: "truebasics-matrix", store: "truebasics", storeName: "TrueBasics", category: "fitness", title: "Patent vs Generic Ingredient Matrix", desc: "KSM-66® and Triple Strength compared", time: "~15s", icon: "scale", tone: "green", href: "/stores/truebasics", hrefLabel: "TrueBasics page", brandSupplied: true,
    kind: "chooser", defaultId: TRUEBASICS_COMPARISONS[0].id, cta: cta("Shop Clinical Formulations", "https://www.truebasics.com", "patent_matrix"),
    options: TRUEBASICS_COMPARISONS.map((c) => ({ id: c.id, label: c.id === "ashwagandha" ? "KSM-66® vs Generic" : "Triple Strength vs Standard", compare: { left: c.generic, right: c.patented } })) },
  { id: "zeroharm-nano", store: "zeroharm", storeName: "ZeroHarm", category: "fitness", title: "Why Nano-Encapsulation Beats Standard Tablets", desc: "Brand's absorption claims, side by side", time: "~10s", icon: "pill", tone: "green", href: "/stores/zeroharm", hrefLabel: "ZeroHarm page", brandSupplied: true,
    kind: "chooser", defaultId: "nano", cta: cta("Shop Nano-Formulated Nutrition", "https://www.zeroharm.in/collections/all-products", "nano_explainer"),
    options: ZEROHARM_TECH.map((t) => ({ id: t.id, label: t.label, points: t.points })) },

  /* Beauty & care */
  { id: "kama-levels", store: "kama-ayurveda", storeName: "Kama Ayurveda", category: "beauty", title: "Luxury Cart Optimization Guide", desc: "Free samples, delivery and gift tiers", time: "~10s", icon: "sparkles", tone: "magenta", href: "/stores/kama-ayurveda", hrefLabel: "Kama Ayurveda page", brandSupplied: true,
    kind: "guide", ordered: false, steps: [{ detail: "Level 1 (Any Order): 3 Free Handpicked Luxury Mini Sachets/Vials." }, { detail: "Level 2 (Above ₹1,499): 100% Free Doorstep Delivery." }, { detail: "Level 3 (Above ₹2,999): Unlock Complimentary Deluxe Gift (Kumkumadi Mini Scrub/Cream)." }], cta: cta("Build My Luxury Box", "https://www.kamaayurveda.com", "luxury_box") },
  { id: "nourish-card", store: "nourish-mantra", storeName: "Nourish Mantra", category: "beauty", title: "Clean Formulation Confidence Card", desc: "What's in the formulas and how to stack discounts", time: "~10s", icon: "leaf", tone: "magenta", href: "/stores/nourish-mantra", hrefLabel: "Nourish Mantra page", brandSupplied: true,
    kind: "guide", ordered: true, intro: "Why Nourish Mantra formulas convert — and how to stack the discounts.", steps: NOURISH_CONFIDENCE, cta: cta("Build My Clean Routine", "https://nourishmantra.in/collections/combos", "confidence_card") },
  { id: "natural-wash-cart", store: "the-natural-wash", storeName: "The Natural Wash", category: "beauty", title: "Clean Beauty Cart-Filler Assistant", desc: "See when you cross free shipping and TNW15", time: "~10s", icon: "cart", tone: "magenta", href: "/stores/the-natural-wash", hrefLabel: "The Natural Wash page",
    kind: "basket", intro: "Tap items to see when you cross ₹450 for free shipping and qualify for TNW15.", items: NATURAL_WASH_CART_FILLERS, defaults: ["potato"], rules: { code: "TNW15", percent: 0.15, freeShipAt: 450 }, cta: cta("Shop Best Sellers on TNW", "https://www.thenaturalwash.com/collections/best-sellers", "cart_filler") },
  { id: "man-beard", store: "the-man-company", storeName: "The Man Company", category: "beauty", title: "Patchy Beard Solution Decoder", desc: "A 3-step routine and the kit discount", time: "~10s", icon: "sparkles", tone: "magenta", href: "/stores/the-man-company", hrefLabel: "The Man Company page", brandSupplied: true,
    kind: "guide", ordered: true, steps: MAN_COMPANY_STEPS, cta: cta("Shop the Beard Growth Pro Kit", "https://www.themancompany.com/products/beard-growth-kit", "beard_decoder") },
  { id: "iba-wudhu", store: "iba-cosmetics", storeName: "Iba Cosmetics", category: "beauty", title: "Halal Beauty & Wudhu-Friendliness Decoder", desc: "How breathable nail colour works for ablution", time: "~5s", icon: "shield", tone: "magenta", href: "/stores/iba-cosmetics", hrefLabel: "Iba Cosmetics page", brandSupplied: true,
    kind: "guide", paragraphs: ["Iba Breathable Nail Color uses a patented permeable membrane that allows water and air molecules to penetrate to the nail bed, ensuring valid ablution (Wudhu) without removal. 100% free from Carmine and animal fat."] },
  { id: "mymuse-privacy", store: "mymuse", storeName: "MyMuse", category: "beauty", title: "3-Point Privacy & Safety Guarantee", desc: "Packaging, billing and materials", time: "~10s", icon: "lock", tone: "magenta", href: "/stores/mymuse", hrefLabel: "MyMuse page", brandSupplied: true,
    kind: "guide", ordered: true, steps: MYMUSE_GUARANTEES, cta: cta("Shop Discreetly on MyMuse", "https://mymuse.in/collections/bestsellers", "privacy_guarantee") },
  { id: "neesh-concentration", store: "neesh-perfumes", storeName: "Neesh Perfumes", category: "beauty", title: "Extrait vs EDP Concentration Guide", desc: "How strength changes projection in Indian heat", time: "~10s", icon: "sparkles", tone: "magenta", href: "/stores/neesh-perfumes", hrefLabel: "Neesh Perfumes page", brandSupplied: true,
    kind: "chooser", defaultId: "extrait", cta: cta("Shop Discovery Sets", "https://neeshperfumes.com/collections/discovery-sets", "concentration_guide"),
    footnote: "Testing first? The Discovery Set (flat ₹300 off with DISCOVERY) lets you sample the flagship five scents with full credit toward your first full bottle — no blind buys.",
    options: NEESH_CONCENTRATIONS.map((c) => ({ id: c.id, label: c.label, title: c.headline, points: c.points })) },

  /* Fashion */
  { id: "levis-cart", store: "levis", storeName: "Levi's", category: "fashion", title: "Fit-Number Decoder & Cart Threshold Hack", desc: "Which fit is which, and what your cart qualifies for", time: "~15s", icon: "shirt", tone: "blue", href: "/stores/levis", hrefLabel: "Levi's page", brandSupplied: true,
    kind: "chooser", defaultId: "plus_tee",
    facts: [{ title: "501® = Classic Straight", detail: "Button-fly, straight leg, 100% heavyweight cotton." }, { title: "511™ = Modern Slim", detail: "Slim through thigh and leg with light stretch." }, { title: "512™ = Slim Taper", detail: "Slim thigh with a tailored narrow ankle opening." }],
    options: LEVIS_CARTS.map((c) => ({ id: c.id, label: c.label, rows: [["Cart total", c.total]] as [string, string][], body: c.outcome, cta: cta("Apply Cart Hack on Levi.in", c.url, c.sub) })) },
  { id: "bear-multiplier", store: "the-bear-house", storeName: "The Bear House", category: "fashion", title: "Smart 2-Item Wardrobe Multiplier", desc: "Shirt + chino with BUNDLE500", time: "~10s", icon: "shirt", tone: "blue", href: "/stores/the-bear-house", hrefLabel: "The Bear House page",
    kind: "basket", intro: "Pick a complete head-to-toe workwear look and watch BUNDLE500 + 5% UPI stack.",
    items: [{ id: "shirt", label: "Oxford Shirt (₹1,399)", amount: 1399 }, { id: "chino", label: "Stretch Chino (₹1,699)", amount: 1699 }], defaults: ["shirt", "chino"],
    rules: { code: "BUNDLE500", flat: 500, minSubtotal: 2999, upiPct: 0.05 }, cta: cta("Build My 2-Piece Look", "https://thebearhouse.com/collections/best-sellers", "wardrobe_multiplier") },
  { id: "lavie-capacity", store: "lavie-world", storeName: "Lavie", category: "fashion", title: "What Fits Inside? Capacity Guide", desc: "Pick your daily carry, get the right bag", time: "~10s", icon: "bag", tone: "blue", href: "/stores/lavie-world", hrefLabel: "Lavie page", brandSupplied: true,
    kind: "chooser", defaultId: "laptop", intro: "Select your daily carry and we will surface the exact bag for it.",
    options: LAVIE_CARRY.map((c) => ({ id: c.id, label: c.label, title: c.result, body: c.detail, rows: [["Stacking math", c.math]] as [string, string][], cta: cta(`Shop ${c.result} on Lavie`, c.url, c.sub) })) },

  /* Home & kitchen */
  { id: "milton-usecase", store: "milton", storeName: "Milton", category: "home", title: "Insulation & Use-Case Advisor", desc: "Flask, tiffin or copper bottle for your day", time: "~10s", icon: "coffee", tone: "amber", href: "/stores/milton", hrefLabel: "Milton page", brandSupplied: true,
    kind: "chooser", defaultId: MILTON_NEEDS[0].id, options: MILTON_NEEDS.map((n) => ({ id: n.id, label: n.label, title: n.result, body: n.detail, note: n.note, cta: cta(`Shop ${n.result}`, n.url, n.sub) })) },
  { id: "wonderchef-safety", store: "wonderchef", storeName: "Wonderchef", category: "home", title: "Cookware Safety & Wattage Advisor", desc: "Coating, cooktop fit and stacking formula", time: "~10s", icon: "shield", tone: "amber", href: "/stores/wonderchef", hrefLabel: "Wonderchef page", brandSupplied: true,
    kind: "guide", ordered: true, steps: WONDERCHEF_ADVISOR, cta: cta("Shop Granite Cookware Sets", "https://www.wonderchef.com/collections/cookware-sets", "safety_advisor") },
  { id: "nilkamal-checker", store: "nilkamalfurniture", storeName: "Nilkamal", category: "home", title: "Ergonomic WFH & Assembly Checker", desc: "Mesh, assembly and coupon stacking", time: "~10s", icon: "home", tone: "amber", href: "/stores/nilkamalfurniture", hrefLabel: "Nilkamal page", brandSupplied: true,
    kind: "guide", ordered: true, steps: NILKAMAL_CONFIDENCE, cta: cta("Shop Best Sellers on Nilkamal", "https://www.nilkamalfurniture.com/collections/best-sellers", "confidence_checker") },
  { id: "zoff-grinding", store: "zoff-foods", storeName: "ZOFF Foods", category: "home", title: "Why Cool-Grinding Matters", desc: "Traditional milling vs cool-grinding", time: "~10s", icon: "leaf", tone: "amber", href: "/stores/zoff-foods", hrefLabel: "ZOFF Foods page", brandSupplied: true,
    kind: "chooser", defaultId: "coolgrind", options: ZOFF_GRINDING.map((t) => ({ id: t.id, label: t.label, points: t.points })) },
  { id: "zoff-restock", store: "zoff-foods", storeName: "ZOFF Foods", category: "home", title: "Smart Restock Hack — Full Monthly Pantry", desc: "Build a combo and see PANTRY20 + UPI", time: "~10s", icon: "cart", tone: "amber", href: "/stores/zoff-foods", hrefLabel: "ZOFF Foods page",
    kind: "basket", intro: "Tap items to build your combo; PANTRY20 + 5% UPI apply at checkout.", items: ZOFF_RESTOCK_ITEMS, defaults: ["masala", "almonds"], rules: { code: "PANTRY20", percent: 0.2, upiPct: 0.05, freeShipAt: 499 }, cta: cta("Shop Pantry Combos on ZOFF", "https://zofffoods.com/collections/combos", "restock_hack") },

  /* Tech & money */
  { id: "moglix-net-cost", store: "moglix", storeName: "Moglix", category: "tech", title: "True Net Cost Calculator", desc: "Retail vs GST-registered buyer", time: "~10s", icon: "calc", tone: "blue", href: "/stores/moglix#gst-net-cost", hrefLabel: "true net cost calculator", brandSupplied: true,
    kind: "chooser", defaultId: MOGLIX_BUYERS[0].id, intro: "Same ₹4,299 pressure washer — very different net cost depending on who is buying.", cta: cta("Shop with GST Invoice on Moglix", "https://www.moglix.com", "net_cost_calculator"),
    options: MOGLIX_BUYERS.map((b) => ({ id: b.id, label: b.label, rows: b.lines as [string, string][], note: b.note })) },
  { id: "nordpass-plan", store: "nordpass", storeName: "NordPass", category: "tech", title: "Plan Cost & Device Multiplier", desc: "Per-person cost of the family plan", time: "~10s", icon: "lock", tone: "blue", href: "/stores/nordpass", hrefLabel: "NordPass page", kind: "calc", calc: "nordpass-plan" },
  { id: "bytepe-fee", store: "bytepe", storeName: "BytePe", category: "tech", title: "Platform Fee Transparency Guide", desc: "Convenience fees on recharges and bills", time: "~10s", icon: "wallet", tone: "blue", href: "/stores/bytepe", hrefLabel: "BytePe page", brandSupplied: true,
    kind: "guide", paragraphs: ["Other payment apps charge ₹2 to ₹5 platform fee per mobile recharge.", "BytePe Charges: ₹0 Platform Fee + Gives up to 5% instant cashback with code RECHARGE10.", "Net Saving Highlight: Save ₹150–₹300/year just by eliminating convenience fees on everyday utility bills."], cta: cta("Calculate My Bill Savings on BytePe", "https://bytepe.com", "fee_calculator") },
  { id: "boult-audio", store: "boult", storeName: "Boult", category: "tech", title: "Audio Decision Snippet", desc: "Gaming, calling or battery: which earbuds", time: "~10s", icon: "headphones", tone: "blue", href: "/stores/boult", hrefLabel: "Boult page", kind: "store-link" },
  { id: "guvi-career", store: "guvi", storeName: "GUVI", category: "tech", title: "Vernacular Tech Career Matcher", desc: "Pick a goal and language, see the course", time: "~15s", icon: "cap", tone: "blue", href: "/stores/guvi", hrefLabel: "GUVI page", kind: "store-link" },

  /* Family & gifting */
  { id: "firstcry-club", store: "firstcry", storeName: "FirstCry", category: "family", title: "Club Break-Even Calculator", desc: "Is FirstCry Club worth it for your spend?", time: "~10s", icon: "baby", tone: "magenta", href: "/stores/firstcry/club-calculator", hrefLabel: "Club calculator", kind: "calc", calc: "firstcry-club" },
  { id: "firstcry-diapers", store: "firstcry", storeName: "FirstCry", category: "family", title: "Diaper Cost-Per-Pant Tracker", desc: "Compare brands by price per pant", time: "~5s", icon: "baby", tone: "magenta", href: "/stores/firstcry/diaper-cost-tracker", hrefLabel: "Diaper tracker", brandSupplied: true, kind: "table", table: "diapers", cta: cta("Shop Diapers on FirstCry", "https://www.firstcry.com/diapers", "diaper_tracker") },
  { id: "firstcry-gear", store: "firstcry", storeName: "FirstCry", category: "family", title: "Baby Gear Fit & Safety Matrix", desc: "Strollers and car seats at a glance", time: "~5s", icon: "baby", tone: "magenta", href: "/stores/firstcry/baby-gear-finder", hrefLabel: "Baby gear finder", brandSupplied: true, kind: "table", table: "gear" },
  { id: "igp-slot", store: "igp", storeName: "IGP", category: "family", title: "Delivery Slot & Timing Advisor", desc: "Midnight, same-day or planned gifts", time: "~5s", icon: "gift", tone: "magenta", href: "/stores/igp", hrefLabel: "IGP page", brandSupplied: true,
    kind: "chooser", defaultId: "midnight", cta: cta("Check Delivery Slots on IGP", "https://www.igp.com", "delivery_advisor"),
    options: [
      { id: "midnight", label: "Tonight at 12:00 AM", body: "Recommended: Fresh Cakes & Floral Bouquets with Midnight Slot guidance." },
      { id: "sameday", label: "Today in 2-3 Hours", body: "Recommended: Express local dispatch items available today." },
      { id: "custom", label: "In 2 to 4 Days", body: "Recommended: Personalized Photo Crystals & Caricatures." },
    ] },
  { id: "astro-checklist", store: "life-changing-astro", storeName: "Life Changing Astro", category: "family", title: "Authenticity & Consultation Checklist", desc: "What to look for before you buy or book", time: "~10s", icon: "list", tone: "magenta", href: "/stores/life-changing-astro", hrefLabel: "Life Changing Astro page", brandSupplied: true,
    kind: "guide", ordered: true, steps: ASTRO_CHECKLIST, cta: cta("Book a consultation", "https://lifechangingastro.com", "confidence_checklist") },
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
