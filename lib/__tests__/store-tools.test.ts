import { describe, expect, it } from "vitest";
import {
  FEATURED_TOOLS,
  STORE_TOOLS,
  TOOLS_BY_ID,
  TOOL_CATEGORIES,
  bldcSavings,
  toolsByCategory,
} from "@/lib/store-tools";

describe("registry integrity", () => {
  it("has unique ids and valid categories", () => {
    const ids = STORE_TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    const cats = new Set(TOOL_CATEGORIES.map((c) => c.id));
    for (const t of STORE_TOOLS) expect(cats.has(t.category)).toBe(true);
    expect(STORE_TOOLS.map((t) => t.id)).toEqual(["bldc", "protein"]);
  });

  it("features only the two kept calculators, in order", () => {
    expect(FEATURED_TOOLS.map((t) => t.id)).toEqual(["bldc", "protein"]);
  });

  it("every tool links back to a site route", () => {
    for (const t of STORE_TOOLS) expect(t.href).toMatch(/^\/stores\/[a-z0-9-]+/);
  });

  it("looks tools up by id and filters by category and query", () => {
    expect(TOOLS_BY_ID.get("bldc")?.storeName).toBe("Havells");
    expect(TOOLS_BY_ID.get("protein")?.storeName).toBe("Alpino");
    expect(toolsByCategory("all").length).toBe(STORE_TOOLS.length);
    expect(toolsByCategory("fashion")).toEqual([]);
    expect(toolsByCategory("all", "protein").map((t) => t.id)).toEqual(["protein"]);
    expect(toolsByCategory("home", "protein")).toEqual([]);
  });
});

describe("BLDC savings calculator", () => {
  it("uses published defaults (75W vs 28W, 16h, ₹7)", () => {
    const r = bldcSavings({ regularWatts: 75, bldcWatts: 28, hoursPerDay: 16, tariff: 7 });
    expect(Math.round(r.monthlySavings)).toBe(158);
    expect(Math.round(r.yearlySavings)).toBe(1895);
    expect(Math.round(r.annualKwhSaved)).toBe(274);
    expect(r.paybackMonths).toBeCloseTo(2500 / r.monthlySavings, 5);
  });

  it("has no payback when there is no saving", () => {
    expect(bldcSavings({ regularWatts: 28, bldcWatts: 28, hoursPerDay: 10, tariff: 7 }).paybackMonths).toBeNull();
  });
});
