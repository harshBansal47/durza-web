import type { CouponListParams } from "./api";

export const DEAL_SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "trending", label: "Trending" },
  { value: "recently_verified", label: "Recently verified" },
  { value: "top_rated", label: "Top rated" },
  { value: "biggest_percent", label: "Biggest percentage" },
] as const;

export type DealSort = (typeof DEAL_SORT_OPTIONS)[number]["value"];

export interface DealFilters {
  stores: string[];
  categories: string[];
  verifiedWithinHours: number | undefined;
  expiresWithinDays: number | undefined;
  sort: DealSort;
}

type SearchParams = Record<string, string | string[] | undefined>;

function read(params: SearchParams, key: string): string {
  const value = params[key];
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

function readList(params: SearchParams, key: string): string[] {
  return [...new Set((params[key] ?? [])
    .toString()
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean))];
}

function positiveNumber(value: string): number | undefined {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : undefined;
}

export function parseDealFilters(params: SearchParams): DealFilters {
  const rawSort = read(params, "sort");
  const selectedSort = DEAL_SORT_OPTIONS.find((option) => option.value === rawSort);
  return {
    stores: readList(params, "stores"),
    categories: readList(params, "categories"),
    verifiedWithinHours: positiveNumber(read(params, "verified_within_hours")),
    expiresWithinDays: positiveNumber(read(params, "expires_within_days")),
    sort: selectedSort?.value ?? "recommended",
  };
}

export function resolveDealFacets(
  filters: DealFilters,
  stores: { id: string; slug: string }[],
  categories: { id: string; slug: string }[],
) {
  const storeIds = filters.stores.map((slug) => stores.find((store) => store.slug === slug)?.id);
  const categoryIds = filters.categories.map((slug) =>
    categories.find((category) => category.slug === slug)?.id,
  );

  return {
    store_ids: storeIds.filter((id): id is string => Boolean(id)),
    category_ids: categoryIds.filter((id): id is string => Boolean(id)),
    unresolved: storeIds.some((id) => !id) || categoryIds.some((id) => !id),
  };
}

export function toDealQuery(
  filters: DealFilters,
  facets: { store_ids: string[]; category_ids: string[] },
  page: { skip: number; limit: number },
): CouponListParams {
  return {
    store_ids: facets.store_ids.length ? facets.store_ids : undefined,
    category_ids: facets.category_ids.length ? facets.category_ids : undefined,
    verified_within_hours: filters.verifiedWithinHours,
    expires_within_days: filters.expiresWithinDays,
    sort: filters.sort,
    active_only: true,
    skip: page.skip,
    limit: page.limit,
  };
}
