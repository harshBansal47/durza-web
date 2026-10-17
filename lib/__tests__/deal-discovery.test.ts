import { describe, expect, it } from "vitest";
import { parseDealFilters, resolveDealFacets, toDealQuery } from "../deal-discovery";

describe("deal discovery query", () => {
  it("parses and deduplicates multi-select facets and backend time filters", () => {
    const filters = parseDealFilters({
      stores: ["amazon,ebay", "amazon"],
      categories: "fashion,electronics",
      verified_within_hours: "168",
      expires_within_days: "30",
      sort: "biggest_percent",
    });

    expect(filters).toEqual({
      stores: ["amazon", "ebay"],
      categories: ["fashion", "electronics"],
      verifiedWithinHours: 168,
      expiresWithinDays: 30,
      sort: "biggest_percent",
    });
  });

  it("resolves every selected facet and applies them server-side", () => {
    const filters = parseDealFilters({
      stores: "amazon,ebay",
      categories: "fashion",
      verified_within_hours: "24",
      expires_within_days: "7",
      sort: "trending",
    });
    const facets = resolveDealFacets(
      filters,
      [{ id: "s1", slug: "amazon" }, { id: "s2", slug: "ebay" }],
      [{ id: "c1", slug: "fashion" }],
    );

    expect(facets).toEqual({
      store_ids: ["s1", "s2"],
      category_ids: ["c1"],
      unresolved: false,
    });
    expect(toDealQuery(filters, facets, { skip: 20, limit: 20 })).toEqual({
      store_id: "s1",
      category_id: "c1",
      verified_within_hours: 24,
      expires_within_days: 7,
      sort: "trending",
      active_only: true,
      skip: 20,
      limit: 20,
    });
  });

  it("does not silently discard an unknown selected facet", () => {
    const facets = resolveDealFacets(
      parseDealFilters({ stores: "missing" }),
      [],
      [],
    );
    expect(facets.unresolved).toBe(true);
  });
});
