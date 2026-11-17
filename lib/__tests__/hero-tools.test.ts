import { describe, expect, it } from "vitest";
import { bldcSpec, gstTier, proteinDecode } from "@/lib/hero-tools";

describe("bldcSpec", () => {
  it("sizes airflow from room volume × air changes, rounded to 5", () => {
    // 120 sq ft × 9.5 ft × 0.0283 × 8 ACH = 258.1 → 260
    const r = bldcSpec({ areaSqFt: 120, heightFt: 9.5, climate: "humid" });
    expect(r.airflowCmh).toBe(260);
    expect(r.airflowCmm).toBe(4);
    expect(r.ach).toBe(8);
  });

  it.each([
    [90, 900, 36],
    [100, 900, 36],
    [150, 1200, 48],
    [220, 1320, 52],
    [221, 1400, 56],
  ])("%i sq ft → %i mm / %i inch sweep", (area, mm, inch) => {
    const r = bldcSpec({ areaSqFt: area, heightFt: 10, climate: "mild" });
    expect([r.sweepMm, r.sweepInches]).toEqual([mm, inch]);
  });

  it("gives a running-cost range, not a single optimistic number", () => {
    const r = bldcSpec({ areaSqFt: 120, heightFt: 10, climate: "mild" }, 8, 12);
    expect(r.monthlyCostMin).toBe(81); // 28 W × 12 h × 30 d × ₹8 / 1000
    expect(r.monthlyCostMax).toBe(92); // 32 W
    expect(r.monthlyCostMax).toBeGreaterThan(r.monthlyCostMin);
  });

  it("scales with climate", () => {
    const base = { areaSqFt: 150, heightFt: 10 };
    expect(bldcSpec({ ...base, climate: "dry" }).airflowCmh).toBeGreaterThan(bldcSpec({ ...base, climate: "mild" }).airflowCmh);
  });
});

describe("proteinDecode", () => {
  it("computes ₹ per 25 g of actual protein and scoop purity", () => {
    const r = proteinDecode({ price: 2199, proteinPerServingG: 24, servingSizeG: 33, servings: 30 });
    expect(r.totalProteinG).toBe(720);
    expect(r.costPer25g).toBeCloseTo(76.35, 2);
    expect(r.purityPct).toBeCloseTo(72.7, 1);
    expect(r.purityLabel).toBe("solid");
    expect(r.verdict).toBe("mid");
  });

  it("flags good value and overpriced tubs", () => {
    expect(proteinDecode({ price: 1200, proteinPerServingG: 25, servingSizeG: 30, servings: 30 }).verdict).toBe("good");
    expect(proteinDecode({ price: 4000, proteinPerServingG: 20, servingSizeG: 40, servings: 30 }).verdict).toBe("bad");
  });

  it("never divides by zero on empty or half-typed fields", () => {
    const r = proteinDecode({ price: 0, proteinPerServingG: 0, servingSizeG: 0, servings: 0 });
    expect(Number.isFinite(r.costPer25g)).toBe(true);
    expect(Number.isFinite(r.purityPct)).toBe(true);
  });

  it("caps purity at 100% when protein exceeds the stated scoop", () => {
    expect(proteinDecode({ price: 100, proteinPerServingG: 40, servingSizeG: 30, servings: 1 }).purityPct).toBe(100);
  });
});

describe("gstTier", () => {
  it("keeps tiny single-state sellers on the free portal", () => {
    expect(gstTier({ invoicesPerMonth: 20, multiState: false, filer: "me" })).toMatchObject({ cost: "₹0" });
  });
  it("moves multi-state or mid-volume sellers up a tier", () => {
    expect(gstTier({ invoicesPerMonth: 20, multiState: true, filer: "me" }).tier).toMatch(/Entry/);
    expect(gstTier({ invoicesPerMonth: 100, multiState: false, filer: "me" }).tier).toMatch(/Entry/);
  });
  it("splits high volume by who files", () => {
    expect(gstTier({ invoicesPerMonth: 400, multiState: true, filer: "ca" }).tier).toMatch(/CA access/);
    expect(gstTier({ invoicesPerMonth: 400, multiState: true, filer: "me" }).tier).toMatch(/Business/);
  });
});
