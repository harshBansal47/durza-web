import { describe, expect, it } from "vitest";
import { buildHeroResults, splitHighlight } from "@/lib/hero-search";

const deal = (id: string, title: string, store: string, code: string | null, category: string | null = null) => ({ id, title, code, category, store: { name: store } });
const deals = [
  deal("1", "Extra 10% off on whey", "HealthKart", "SV10VC", "Fitness"),
  deal("2", "Flat ₹300 off on earbuds", "GoBoult", "BOULT300", "Electronics"),
  deal("3", "Up to 40% off sitewide", "Bewakoof", null, "Fashion"),
];
const stores = [{ slug: "healthkart", name: "HealthKart" }, { slug: "goboult", name: "GoBoult" }, { slug: "bewakoof", name: "Bewakoof" }];
const tools = [
  { id: "protein", title: "Protein Cost Decoder", desc: "₹ per 25g of actual protein", storeName: "Alpino" },
  { id: "gst", title: "GST Tool Matcher", desc: "Free vs paid filing software", storeName: "Moglix" },
  { id: "t3", title: "Diaper Tracker", desc: "Cost per pant", storeName: "FirstCry" },
  { id: "t4", title: "Diaper Bag Guide", desc: "What to pack", storeName: "FirstCry" },
  { id: "t5", title: "Diaper Deals", desc: "Packs compared", storeName: "FirstCry" },
  { id: "t6", title: "Diaper Sizes", desc: "Pick a size", storeName: "FirstCry" },
];
const pool = { deals, featured: deals.slice(0, 2), stores, popularStores: stores.slice(0, 2), tools };
const types = (r: ReturnType<typeof buildHeroResults<(typeof deals)[number], (typeof stores)[number], (typeof tools)[number]>>) => r.map((x) => x.type);

describe("buildHeroResults", () => {
  it("shows starter picks for an empty query in every scope", () => {
    expect(types(buildHeroResults("", "all", pool))).toEqual(["deal", "deal", "tool", "tool"]);
    expect(buildHeroResults("", "code", pool).every((r) => r.type === "deal" && r.deal.code)).toBe(true);
    expect(buildHeroResults("", "deal", pool).every((r) => r.type === "deal" && !r.deal.code)).toBe(true);
    expect(types(buildHeroResults("", "store", pool))).toEqual(["store", "store"]);
    expect(types(buildHeroResults("", "tool", pool))).toEqual(["tool", "tool", "tool", "tool"]);
  });

  it("matches title, store, category and code, case-insensitively", () => {
    const ids = (q: string) => buildHeroResults(q, "all", pool).flatMap((r) => (r.type === "deal" ? [r.deal.id] : []));
    expect(ids("whey")).toEqual(["1"]);
    expect(ids("goboult")).toEqual(["2"]);
    expect(ids("fashion")).toEqual(["3"]);
    expect(ids("sv10vc")).toEqual(["1"]);
  });

  it("groups stores and tools alongside deals in All", () => {
    expect(types(buildHeroResults("protein", "all", pool))).toEqual(["tool"]);
    expect(types(buildHeroResults("health", "all", pool))).toEqual(["deal", "store"]);
  });

  it("filters by scope", () => {
    expect(types(buildHeroResults("off", "code", pool))).toEqual(["deal", "deal"]); // only the two with codes
    expect(buildHeroResults("off", "deal", pool).map((r) => (r.type === "deal" ? r.deal.id : ""))).toEqual(["3"]);
    expect(types(buildHeroResults("health", "store", pool))).toEqual(["store"]);
    expect(types(buildHeroResults("gst", "tool", pool))).toEqual(["tool"]);
    expect(buildHeroResults("gst", "store", pool)).toEqual([]);
  });

  it("matches tools by store name and caps tools in the All scope", () => {
    expect(buildHeroResults("alpino", "tool", pool).map((r) => (r.type === "tool" ? r.tool.id : ""))).toEqual(["protein"]);
    expect(buildHeroResults("diaper", "all", pool).filter((r) => r.type === "tool")).toHaveLength(3); // capped
    expect(buildHeroResults("diaper", "tool", pool).filter((r) => r.type === "tool")).toHaveLength(4); // all matches in the Tools scope
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
