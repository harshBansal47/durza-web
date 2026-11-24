import { describe, expect, it } from "vitest";
import { buildHeroResults, splitHighlight } from "@/lib/hero-search";

const deal = (id: string, title: string, store: string, code: string | null, category: string | null = null) => ({
  id,
  title,
  code,
  category,
  store: { name: store },
});
const deals = [
  deal("1", "Extra 10% off on whey", "HealthKart", "SV10VC", "Fitness"),
  deal("2", "Flat ₹300 off on earbuds", "GoBoult", "BOULT300", "Electronics"),
  deal("3", "Up to 40% off sitewide", "Bewakoof", null, "Fashion"),
];
const stores = [
  { slug: "healthkart", name: "HealthKart" },
  { slug: "goboult", name: "GoBoult" },
  { slug: "bewakoof", name: "Bewakoof" },
];
const pool = { deals, featured: deals.slice(0, 2), stores, popularStores: stores.slice(0, 2) };
const types = (r: ReturnType<typeof buildHeroResults<(typeof deals)[number], (typeof stores)[number]>>) =>
  r.map((x) => x.type);

describe("buildHeroResults", () => {
  it("shows starter picks for an empty query in every scope", () => {
    expect(types(buildHeroResults("", "all", pool))).toEqual(["deal", "deal", "deal"]);
    expect(buildHeroResults("", "code", pool).every((r) => r.type === "deal" && r.deal.code)).toBe(true);
    expect(buildHeroResults("", "deal", pool).every((r) => r.type === "deal" && !r.deal.code)).toBe(true);
    expect(types(buildHeroResults("", "store", pool))).toEqual(["store", "store"]);
  });

  it("matches title, store, category and code, case-insensitively", () => {
    const ids = (q: string) => buildHeroResults(q, "all", pool).flatMap((r) => (r.type === "deal" ? [r.deal.id] : []));
    expect(ids("whey")).toEqual(["1"]);
    expect(ids("goboult")).toEqual(["2"]);
    expect(ids("fashion")).toEqual(["3"]);
    expect(ids("sv10vc")).toEqual(["1"]);
  });

  it("groups stores alongside deals in All", () => {
    expect(types(buildHeroResults("health", "all", pool))).toEqual(["deal", "store"]);
  });

  it("filters by scope", () => {
    expect(types(buildHeroResults("off", "code", pool))).toEqual(["deal", "deal"]);
    expect(buildHeroResults("off", "deal", pool).map((r) => (r.type === "deal" ? r.deal.id : ""))).toEqual(["3"]);
    expect(types(buildHeroResults("health", "store", pool))).toEqual(["store"]);
    expect(buildHeroResults("gst", "store", pool)).toEqual([]);
  });

  it("shows live offers in All when the featured pool is empty", () => {
    expect(types(buildHeroResults("", "all", { ...pool, featured: [] }))).toEqual(["deal", "deal", "deal"]);
    expect(types(buildHeroResults("", "store", { ...pool, popularStores: [] }))).toEqual(["store", "store", "store"]);
  });

  it("returns nothing for a miss", () => {
    expect(buildHeroResults("zzzz", "all", pool)).toEqual([]);
  });
});

describe("splitHighlight", () => {
  it("splits around the first match, preserving original casing", () => {
    expect(splitHighlight("HealthKart whey", "kart")).toEqual(["Health", "Kart", " whey"]);
  });
  it("returns the text untouched without a query or match", () => {
    expect(splitHighlight("abc", "")).toEqual(["abc", "", ""]);
    expect(splitHighlight("abc", "z")).toEqual(["abc", "", ""]);
  });
});
