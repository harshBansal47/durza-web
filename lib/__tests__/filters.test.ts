import { describe, expect, it } from "vitest";
import {
  DEFAULT_SORT,
  activeChips,
  carriedParams,
  filterCount,
  parseFilters,
  resolveIds,
  toCouponQuery,
} from "../filters";

const stores = [
  { id: "s1", slug: "amazon" },
  { id: "s2", slug: "ebay" },
];
const categories = [{ id: "c1", slug: "fashion" }];

describe("parseFilters", () => {
  it("falls back to an unfiltered state for an empty or garbage URL", () => {
    expect(parseFilters({})).toEqual({
      q: "",
      store: "",
      category: "",
      type: "",
      code: "",
      confirmed: "",
      rate: "",
      expires: "",
      sort: DEFAULT_SORT,
    });
    expect(parseFilters({ type: "bogus", sort: "nope", rate: "120" }).type).toBe("");
    expect(parseFilters({ type: "bogus", sort: "nope", rate: "120" }).sort).toBe(DEFAULT_SORT);
    expect(parseFilters({ type: "bogus", sort: "nope", rate: "120" }).rate).toBe("");
  });

  it("accepts the legacy `search` param and the first value of a repeated one", () => {
    expect(parseFilters({ search: "shoes" }).q).toBe("shoes");
    expect(parseFilters({ q: ["shoes", "boots"] }).q).toBe("shoes");
    // `q` wins over the alias so an old link with both still means one search.
    expect(parseFilters({ q: "boots", search: "shoes" }).q).toBe("boots");
  });

  it("keeps every option a listing page offers", () => {
    const filters = parseFilters({
      store: "amazon",
      category: "fashion",
      type: "percentage",
      code: "codes",
      confirmed: "7d",
      rate: "80",
      expires: "30",
      sort: "ending_soon",
    });
    expect(filters).toEqual({
      q: "",
      store: "amazon",
      category: "fashion",
      type: "percentage",
      code: "codes",
      confirmed: "7d",
      rate: "80",
      expires: "30",
      sort: "ending_soon",
    });
  });
});

describe("toCouponQuery", () => {
  it("sends only the filters that are set", () => {
    const query = toCouponQuery(parseFilters({}), { store_id: "s1" }, { skip: 0, limit: 20 });
    expect(query).toEqual({
      store_id: "s1",
      sort: DEFAULT_SORT,
      active_only: true,
      skip: 0,
      limit: 20,
    });
    expect(query.discount_type).toBeUndefined();
    expect(query.has_code).toBeUndefined();
    expect(query.verified).toBeUndefined();
    expect(query.min_success_rate).toBeUndefined();
    expect(query.expires_within_days).toBeUndefined();
  });

  it("maps every control to the API's own vocabulary", () => {
    const filters = parseFilters({
      q: "shoes",
      category: "fashion",
      type: "fixed",
      code: "deals",
      confirmed: "30d",
      rate: "95",
      expires: "7",
      sort: "trending",
    });
    expect(toCouponQuery(filters, { category_id: "c1" }, { skip: 40, limit: 20 })).toEqual({
      search: "shoes",
      category_id: "c1",
      discount_type: "fixed",
      has_code: false,
      verified_within_hours: 24 * 30,
      min_success_rate: 0.95,
      expires_within_days: 7,
      sort: "trending",
      active_only: true,
      skip: 40,
      limit: 20,
    });
  });

  it("distinguishes 'confirmed at least once' from a recency window", () => {
    const once = toCouponQuery(parseFilters({ confirmed: "once" }), {}, { skip: 0, limit: 20 });
    expect(once.verified).toBe(true);
    expect(once.verified_within_hours).toBeUndefined();

    const week = toCouponQuery(parseFilters({ confirmed: "7d" }), {}, { skip: 0, limit: 20 });
    expect(week.verified).toBeUndefined();
    expect(week.verified_within_hours).toBe(24 * 7);
  });

  it("treats codes-only and deals-only as opposite booleans", () => {
    const codes = toCouponQuery(parseFilters({ code: "codes" }), {}, { skip: 0, limit: 20 });
    const deals = toCouponQuery(parseFilters({ code: "deals" }), {}, { skip: 0, limit: 20 });
    expect(codes.has_code).toBe(true);
    expect(deals.has_code).toBe(false);
  });
});

describe("resolveIds", () => {
  it("resolves slugs to ids", () => {
    expect(resolveIds(parseFilters({ store: "amazon", category: "fashion" }), stores, categories)).toEqual({
      store_id: "s1",
      category_id: "c1",
      unresolved: null,
    });
  });

  it("reports an unknown slug instead of silently dropping the filter", () => {
    expect(resolveIds(parseFilters({ store: "shopify" }), stores, categories)).toEqual({
      unresolved: "store",
    });
    expect(resolveIds(parseFilters({ category: "toys" }), stores, categories)).toEqual({
      unresolved: "category",
    });
    expect(resolveIds(parseFilters({}), stores, categories)).toEqual({
      store_id: undefined,
      category_id: undefined,
      unresolved: null,
    });
  });
});

describe("chips", () => {
  it("lists every narrowing filter with a human label, but not the query or sort", () => {
    const filters = parseFilters({ store: "amazon", type: "deal", rate: "80", q: "shoes", sort: "newest" });
    expect(activeChips(filters, { store: "Amazon" })).toEqual([
      { key: "store", label: "Amazon" },
      { key: "type", label: "Deal, no code" },
      { key: "rate", label: "80%+ success" },
    ]);
  });

  it("falls back to the raw slug when the server did not resolve a name", () => {
    expect(activeChips(parseFilters({ store: "amazon" }), {})).toEqual([
      { key: "store", label: "amazon" },
    ]);
  });

  it("counts a non-default sort as an active choice", () => {
    expect(filterCount(parseFilters({}))).toBe(0);
    expect(filterCount(parseFilters({ sort: "newest" }))).toBe(1);
    expect(filterCount(parseFilters({ code: "codes", confirmed: "once" }))).toBe(2);
  });
});

describe("carriedParams", () => {
  it("re-attaches filters to pagination links and drops everything else", () => {
    expect(carriedParams({ q: "shoes", store: "amazon", skip: "20", utm_source: "x" })).toEqual({
      q: "shoes",
      store: "amazon",
    });
    expect(carriedParams({})).toEqual({});
  });
});
