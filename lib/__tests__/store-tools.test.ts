import { describe, expect, it } from "vitest";
import {
  FEATURED_TOOLS,
  STORE_TOOLS,
  TOOLS_BY_ID,
  TOOL_CATEGORIES,
  basketTotals,
  bldcSavings,
  diaperRanking,
  firstcryClub,
  fitspireStack,
  gearFor,
  nordpassPlan,
  toolsByCategory,
} from "@/lib/store-tools";

describe("registry integrity", () => {
  it("has unique ids and valid categories", () => {
    const ids = STORE_TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    const cats = new Set(TOOL_CATEGORIES.map((c) => c.id));
    for (const t of STORE_TOOLS) expect(cats.has(t.category)).toBe(true);
    expect(STORE_TOOLS.length).toBeGreaterThanOrEqual(35);
  });

  it("features exactly the four hero tools, in order", () => {
    expect(FEATURED_TOOLS.map((t) => t.id)).toEqual(["bldc", "protein", "cup-size", "gst"]);
  });

  it("every tool links back to a site route", () => {
    for (const t of STORE_TOOLS) expect(t.href).toMatch(/^\/stores\/[a-z0-9-]+/);
  });

  it("choosers and baskets have valid defaults and options", () => {
    for (const t of STORE_TOOLS) {
      if (t.kind === "chooser") {
        expect(t.options.length).toBeGreaterThan(0);
        expect(t.options.some((o) => o.id === t.defaultId)).toBe(true);
      }
      if (t.kind === "basket") {
        for (const d of t.defaults) expect(t.items.some((i) => i.id === d)).toBe(true);
      }
    }
  });

  it("every outbound call to action is an https store URL with a placement tag", () => {
    const ctas = STORE_TOOLS.flatMap((t) => {
      const list = [];
      if ("cta" in t && t.cta) list.push(t.cta);
      if (t.kind === "chooser") for (const o of t.options) if (o.cta) list.push(o.cta);
      return list;
    });
    expect(ctas.length).toBeGreaterThan(20);
    for (const c of ctas) {
      expect(c.url).toMatch(/^https:\/\//);
      expect(c.sub).toMatch(/^[a-z0-9_]+$/);
      expect(c.label.length).toBeGreaterThan(3);
    }
  });

  it("looks tools up by id and filters by category and query", () => {
    expect(TOOLS_BY_ID.get("fitspire-stack")?.storeName).toBe("Fitspire");
    expect(toolsByCategory("all").length).toBe(STORE_TOOLS.length);
    expect(toolsByCategory("fashion").every((t) => t.category === "fashion")).toBe(true);
    expect(toolsByCategory("all", "diaper").map((t) => t.id)).toEqual(["firstcry-diapers"]);
    expect(toolsByCategory("beauty", "diaper")).toEqual([]);
  });
});

describe("calculators match the store pages", () => {
  it("BLDC savings (defaults 75W vs 28W, 16h, ₹7)", () => {
    const r = bldcSavings({ regularWatts: 75, bldcWatts: 28, hoursPerDay: 16, tariff: 7 });
    expect(Math.round(r.monthlySavings)).toBe(158);
    expect(Math.round(r.yearlySavings)).toBe(1895);
    expect(Math.round(r.annualKwhSaved)).toBe(274);
    expect(r.paybackMonths).toBeCloseTo(2500 / r.monthlySavings, 5);
  });
  it("BLDC has no payback when there is no saving", () => {
    expect(bldcSavings({ regularWatts: 28, bldcWatts: 28, hoursPerDay: 10, tariff: 7 }).paybackMonths).toBeNull();
  });

  it("Fitspire stack", () => {
    expect(fitspireStack(2000)).toEqual({ fit20: 400, prepaid: 80, shipping: 70, final: 1450, saved: 550 });
    expect(fitspireStack(400).shipping).toBe(0);
  });

  it("NordPass family plan", () => {
    expect(nordpassPlan(6)).toEqual({ perPerson: 42, savingsPct: 67 });
    expect(nordpassPlan(2).perPerson).toBe(125);
  });

  it("FirstCry Club break-even", () => {
    expect(firstcryClub(2500, 12)).toEqual({ membership: 999, savings: 3300, net: 2301 });
    expect(firstcryClub(1000, 3)).toEqual({ membership: 499, savings: 510, net: 11 }); // barely breaks even
  });

  it("baskets: ZOFF percent + UPI + free shipping", () => {
    const t = TOOLS_BY_ID.get("zoff-restock");
    if (t?.kind !== "basket") throw new Error("expected basket");
    expect(basketTotals(t.items, ["masala", "almonds"], t.rules)).toMatchObject({ subtotal: 1098, discount: 220, upi: 44, net: 834, freeShip: true });
    expect(basketTotals(t.items, ["masala"], t.rules).freeShip).toBe(true);
    expect(basketTotals(t.items, [], t.rules)).toMatchObject({ subtotal: 0, freeShip: false, shortfall: 499 });
  });

  it("baskets: Bear House flat code needs the minimum", () => {
    const t = TOOLS_BY_ID.get("bear-multiplier");
    if (t?.kind !== "basket") throw new Error("expected basket");
    expect(basketTotals(t.items, ["shirt", "chino"], t.rules)).toMatchObject({ subtotal: 3098, discount: 500, upi: 130, net: 2468, codeMet: true });
    expect(basketTotals(t.items, ["shirt"], t.rules)).toMatchObject({ discount: 0, codeMet: false });
  });

  it("baskets: Natural Wash shows the free-shipping shortfall", () => {
    const t = TOOLS_BY_ID.get("natural-wash-cart");
    if (t?.kind !== "basket") throw new Error("expected basket");
    expect(basketTotals(t.items, ["potato"], t.rules)).toMatchObject({ subtotal: 380, discount: 57, freeShip: false, shortfall: 70 });
    expect(basketTotals(t.items, ["potato", "rose"], t.rules).freeShip).toBe(true);
  });

  it("diapers rank cheapest cost-per-pant first; gear filters by type", () => {
    const r = diaperRanking();
    expect(r.map((d) => d.perPant)).toEqual([...r.map((d) => d.perPant)].sort((a, b) => a - b));
    expect(r[0]).toMatchObject({ brand: "MamyPoko", pack: 76 });
    expect(gearFor("Car Seat").every((g) => g.type === "Car Seat")).toBe(true);
    expect(gearFor("All").length).toBe(4);
  });
});
