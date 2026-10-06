import type { CouponListParams } from "./api";
import type { CouponSort, DiscountType } from "./types";

/**
 * The coupon listing's filter vocabulary, in one place.
 *
 * State lives in the URL: every listing page (/coupons, /search, /categories/[slug],
 * /deals) parses the same params, asks the API for the same shape, and renders the
 * same controls. Nothing here filters a result list in the browser — a client-side
 * filter only ever sees one page, so its counts are wrong for page two onward and
 * its "128 results" headline is a guess. The backend narrows the row set first and
 * paginates second, which is what makes `total` exact.
 */

export interface CouponFilters {
  /** Keyword. `search` is accepted as a legacy alias when parsing. */
  q: string;
  /** Store slug — resolved to an id by the server before querying. */
  store: string;
  /** Category slug — resolved to an id by the server before querying. */
  category: string;
  type: DiscountType | "";
  /** `codes` = a shopper types a code, `deals` = auto-applied offer. */
  code: "" | "codes" | "deals";
  /** How much confirmation evidence the offer must carry. */
  confirmed: ConfirmedKey;
  /** Minimum community success rate, as a percentage string ("80"). */
  rate: RateKey;
  /** Only coupons that really expire within this many days. */
  expires: ExpiresKey;
  sort: CouponSort;
}

export type ConfirmedKey = "" | "once" | "24h" | "7d" | "30d";
export type RateKey = "" | "50" | "80" | "95";
export type ExpiresKey = "" | "1" | "7" | "30" | "90";

export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
  /** Secondary line rendered under the control while this option is selected. */
  hint?: string;
}

export const SORT_OPTIONS: FilterOption<CouponSort>[] = [
  { value: "recommended", label: "Recommended" },
  { value: "trending", label: "Trending this week", hint: "Only offers with real clicks in the last 7 days." },
  { value: "newest", label: "Newest first" },
  { value: "recently_verified", label: "Recently confirmed", hint: "Only offers somebody has confirmed." },
  { value: "top_rated", label: "Highest success rate", hint: "Only offers with at least 5 reports." },
  { value: "biggest_discount", label: "Biggest discount", hint: "Percentage offers only — a flat amount and a percentage can't be compared." },
  { value: "ending_soon", label: "Ending soonest", hint: "Only offers with an expiry date." },
  { value: "most_used", label: "Most used" },
];

export const DEFAULT_SORT: CouponSort = "recommended";

export const TYPE_OPTIONS: FilterOption<DiscountType | "">[] = [
  { value: "", label: "Any kind" },
  { value: "percentage", label: "Percentage off" },
  { value: "fixed", label: "Fixed amount off" },
  { value: "deal", label: "Deal, no code" },
];

export const CODE_OPTIONS: FilterOption<CouponFilters["code"]>[] = [
  { value: "", label: "Codes and deals" },
  { value: "codes", label: "Codes only" },
  { value: "deals", label: "Deals only" },
];

export const CONFIRMED_OPTIONS: FilterOption<ConfirmedKey>[] = [
  { value: "", label: "Any, confirmed or not" },
  { value: "once", label: "Confirmed at least once", hint: "Somebody has reported this working." },
  { value: "24h", label: "Confirmed in the last 24h" },
  { value: "7d", label: "Confirmed this week" },
  { value: "30d", label: "Confirmed this month" },
];

export const RATE_OPTIONS: FilterOption<RateKey>[] = [
  { value: "", label: "Any success rate" },
  { value: "50", label: "50% and up" },
  { value: "80", label: "80% and up" },
  { value: "95", label: "95% and up" },
];

export const EXPIRES_OPTIONS: FilterOption<ExpiresKey>[] = [
  { value: "", label: "Any expiry" },
  { value: "1", label: "Ending today" },
  { value: "7", label: "Ending this week" },
  { value: "30", label: "Ending this month" },
  { value: "90", label: "Ending in 3 months" },
];

/** Hours behind each `confirmed` value; `once` is "ever", which has no window. */
const CONFIRMED_HOURS: Record<string, number | undefined> = {
  "24h": 24,
  "7d": 24 * 7,
  "30d": 24 * 30,
};

/** Params every listing page understands. Anything else in the URL is left alone. */
export const FILTER_KEYS = [
  "q",
  "store",
  "category",
  "type",
  "code",
  "confirmed",
  "rate",
  "expires",
  "sort",
] as const;

type SearchParamsLike = URLSearchParams | Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/** Reads one param from either a Next `ReadonlyURLSearchParams` or a plain record. */
function read(sp: SearchParamsLike, key: string): string {
  const fromGet = (sp as URLSearchParams).get;
  return typeof fromGet === "function" ? (fromGet.call(sp, key) ?? "") : first((sp as Record<string, string | string[] | undefined>)[key]);
}

function pick<T extends string>(options: { value: T }[], raw: string, fallback: T): T {
  return options.some((o) => o.value === raw) ? (raw as T) : fallback;
}

export function parseFilters(sp: SearchParamsLike): CouponFilters {
  const keyword = read(sp, "q") || read(sp, "search");
  return {
    q: keyword.trim(),
    store: read(sp, "store").trim(),
    category: read(sp, "category").trim(),
    type: pick(TYPE_OPTIONS, read(sp, "type"), ""),
    code: pick(CODE_OPTIONS, read(sp, "code"), ""),
    confirmed: pick(CONFIRMED_OPTIONS, read(sp, "confirmed"), ""),
    rate: pick(RATE_OPTIONS, read(sp, "rate"), ""),
    expires: pick(EXPIRES_OPTIONS, read(sp, "expires"), ""),
    sort: pick(SORT_OPTIONS, read(sp, "sort"), DEFAULT_SORT),
  };
}

export interface ResolvedIds {
  store_id?: string;
  category_id?: string;
}

/**
 * Filters a slug the API has no id for. Dropping it is deliberate: passing an
 * unknown id would 422, and keeping it in the UI would advertise a filter that
 * is not applied. The pages turn `unresolved` into an empty state instead.
 */
export function resolveIds(
  filters: CouponFilters,
  stores: { id: string; slug: string }[],
  categories: { id: string; slug: string }[],
): ResolvedIds & { unresolved: "store" | "category" | null } {
  const store = filters.store ? stores.find((s) => s.slug === filters.store) : undefined;
  const category = filters.category
    ? categories.find((c) => c.slug === filters.category)
    : undefined;
  if (filters.store && !store) return { unresolved: "store" };
  if (filters.category && !category) return { unresolved: "category" };
  return {
    store_id: store?.id,
    category_id: category?.id,
    unresolved: null,
  };
}

/** The API request for a page of results. Every filter is applied server-side. */
export function toCouponQuery(
  filters: CouponFilters,
  resolved: ResolvedIds,
  page: { skip: number; limit: number },
): CouponListParams {
  const hours = CONFIRMED_HOURS[filters.confirmed];
  return {
    search: filters.q || undefined,
    store_id: resolved.store_id,
    category_id: resolved.category_id,
    discount_type: filters.type || undefined,
    has_code: filters.code === "" ? undefined : filters.code === "codes",
    verified: filters.confirmed === "once" ? true : undefined,
    verified_within_hours: hours,
    min_success_rate: filters.rate ? Number(filters.rate) / 100 : undefined,
    expires_within_days: filters.expires ? Number(filters.expires) : undefined,
    sort: filters.sort,
    active_only: true,
    skip: page.skip,
    limit: page.limit,
  };
}

export interface FilterChip {
  key: (typeof FILTER_KEYS)[number];
  label: string;
}

/** The removable chips above a result list. `q` and `sort` are not chips: the
 * query has its own box and the sort has its own control. */
export function activeChips(
  filters: CouponFilters,
  labels: { store?: string; category?: string },
): FilterChip[] {
  const chips: FilterChip[] = [];
  if (filters.store) chips.push({ key: "store", label: labels.store ?? filters.store });
  if (filters.category) chips.push({ key: "category", label: labels.category ?? filters.category });
  if (filters.type) chips.push({ key: "type", label: labelOf(TYPE_OPTIONS, filters.type)! });
  if (filters.code) chips.push({ key: "code", label: labelOf(CODE_OPTIONS, filters.code)! });
  if (filters.confirmed)
    chips.push({ key: "confirmed", label: labelOf(CONFIRMED_OPTIONS, filters.confirmed)! });
  if (filters.rate) chips.push({ key: "rate", label: `${filters.rate}%+ success` });
  if (filters.expires)
    chips.push({ key: "expires", label: labelOf(EXPIRES_OPTIONS, filters.expires)! });
  return chips;
}

export function labelOf<T extends string>(options: FilterOption<T>[], value: T): string | undefined {
  return options.find((o) => o.value === value)?.label;
}

export function hintOf<T extends string>(options: FilterOption<T>[], value: T): string | undefined {
  return options.find((o) => o.value === value)?.hint;
}

export function filterCount(filters: CouponFilters): number {
  return activeChips(filters, {}).length + (filters.sort === DEFAULT_SORT ? 0 : 1);
}

/** The filter params to re-attach to every pagination link. */
export function carriedParams(sp: SearchParamsLike): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of [...FILTER_KEYS, "search"]) {
    const value = read(sp, key);
    if (value) out[key] = value;
  }
  return out;
}
