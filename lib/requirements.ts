import type { CouponPublic } from "./types";
import { formatDate } from "./format";

/**
 * Per-offer requirements extracted from what the store itself stated.
 *
 * Everything here is derived from text we already hold — the offer title, the
 * store's paraphrased terms and the `restrictions` block from the API (minimum
 * order, source page, check date). Nothing is guessed: if a condition was not
 * stated by the store, no label is produced. The goal is to replace blanket
 * "applies at checkout" copy with the actual conditions ("card EMI only",
 * "members only", "first order") wherever the source states them.
 */

/** Banks/cards seen in Indian store offer pages. Order longest-match first. */
const BANKS: { label: string; pattern: RegExp }[] = [
  { label: "HDFC Bank", pattern: /\bhdfc\b/i },
  { label: "ICICI Bank", pattern: /\bicici\b/i },
  { label: "IDFC FIRST Bank", pattern: /\bidfc\b/i },
  { label: "Axis Bank", pattern: /\baxis\b/i },
  { label: "SBI Card", pattern: /\bsbi\b|\bsbi card\b|state bank/i },
  { label: "YES Bank", pattern: /\byes bank\b|\byes\b(?!terday)/i },
  { label: "Kotak Bank", pattern: /\bkotak\b/i },
  { label: "HSBC", pattern: /\bhsbc\b/i },
  { label: "Punjab National Bank", pattern: /\bpnb\b|punjab national/i },
  { label: "Federal Bank", pattern: /federal bank/i },
  { label: "American Express", pattern: /\bamex\b|american express/i },
  { label: "Citi", pattern: /\bciti\b/i },
];

/** Named memberships that appear in store offers. */
const MEMBERSHIPS: { label: string; pattern: RegExp }[] = [
  { label: "Swiggy One", pattern: /swiggy one/i },
  { label: "Lenskart Gold", pattern: /lenskart gold/i },
  { label: "Zomato Gold", pattern: /zomato gold/i },
  { label: "Myntra Insider", pattern: /myntra insider/i },
  { label: "Flipkart Plus", pattern: /flipkart plus/i },
];

const FIRST_ORDER = /first order|first purchase|new customer|new users?|first-time/i;
const EXCLUSIONS = /exclud/i;

export interface OfferRequirements {
  banks: string[];
  memberships: string[];
  minimumOrder: string | null;
  newUsersOnly: boolean;
  excludedProducts: boolean;
  /** Full paraphrased terms, verbatim from the store. */
  terms: string | null;
  sourceUrl: string | null;
  sourceKind: string | null;
  /** ISO date the offer's source page was checked. */
  checkedOn: string | null;
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function detect<T extends { label: string; pattern: RegExp }>(rules: T[], haystack: string): string[] {
  return rules.filter((rule) => rule.pattern.test(haystack)).map((rule) => rule.label);
}

/** Everything a shopper needs to know before trying this offer. */
export function getRequirements(coupon: CouponPublic): OfferRequirements {
  const restrictions = (coupon.restrictions ?? {}) as Record<string, unknown>;
  const terms = text(restrictions.terms);
  const haystack = [coupon.title, coupon.description ?? "", terms ?? ""].join(" \n ");

  return {
    banks: detect(BANKS, haystack),
    memberships: detect(MEMBERSHIPS, haystack),
    minimumOrder: text(restrictions.minimum_order),
    newUsersOnly: FIRST_ORDER.test(haystack),
    excludedProducts: terms !== null && EXCLUSIONS.test(terms),
    terms,
    sourceUrl: text(restrictions.source_url),
    sourceKind: text(restrictions.source_kind),
    checkedOn: text(restrictions.checked_on),
  };
}

/** Short labels for chips on cards and offer pages. Empty when nothing is stated. */
export function requirementLabels(coupon: CouponPublic): string[] {
  const req = getRequirements(coupon);
  const labels: string[] = [];
  if (req.banks.length > 0) labels.push(`Bank offer: ${req.banks.join(", ")}`);
  for (const membership of req.memberships) labels.push(`Requires ${membership}`);
  if (req.newUsersOnly) labels.push("New users only");
  if (req.minimumOrder) labels.push(`Min order ${req.minimumOrder}`);
  if (req.excludedProducts) labels.push("Excluded products apply");
  return labels;
}

/**
 * One line for a compact card. Null when the offer states no conditions — the
 * caller then falls back to "no code needed" only if it is really code-less.
 */
export function cardRequirementLine(coupon: CouponPublic, maxBanks = 2): string | null {
  const req = getRequirements(coupon);
  if (req.banks.length > 0) {
    const shown = req.banks.slice(0, maxBanks).join(" · ");
    const extra = req.banks.length > maxBanks ? ` +${req.banks.length - maxBanks} more` : "";
    return `Bank offer: ${shown}${extra}`;
  }
  if (req.memberships.length > 0) return `Requires ${req.memberships[0]}`;
  if (req.newUsersOnly) return "New users only";
  if (req.minimumOrder) return `Min order ${req.minimumOrder}`;
  if (req.excludedProducts) return "Excluded products apply";
  return null;
}

export interface SourceLine {
  /** e.g. "store T&C page · checked 17 Oct 2026" */
  text: string;
  /** Just the formatted check date, for compact cards. */
  checkedDate: string | null;
  /** The store's own page the offer was read from, when known. */
  url: string | null;
}

/**
 * Where an offer came from and when it was last checked. Prefers the
 * per-offer provenance recorded by the researcher; falls back to the API's
 * `last_checked_at`. Returns null when there is nothing honest to show.
 */
export function sourceLine(coupon: CouponPublic): SourceLine | null {
  const req = getRequirements(coupon);
  const checkedDate = req.checkedOn
    ? formatDate(req.checkedOn)
    : coupon.last_checked_at
      ? formatDate(coupon.last_checked_at)
      : null;

  const parts: string[] = [];
  if (req.sourceKind) parts.push(capitalize(req.sourceKind));
  if (checkedDate) parts.push(`checked ${checkedDate}`);
  if (parts.length === 0) return null;

  return { text: parts.join(" · "), checkedDate, url: req.sourceUrl };
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
