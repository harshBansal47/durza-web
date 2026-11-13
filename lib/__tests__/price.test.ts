import { describe, expect, it } from "vitest";
import { parseRupeePrice } from "@/lib/price";

describe("parseRupeePrice", () => {
  it.each([
    ["₹399", 399],
    ["₹399.00", 399],
    ["₹2109.00", 2109],
    ["₹2,109.00", 2109],
    ["Rs. 1,299/-", 1299],
    ["₹1,00,000", 100000],
    ["From ₹499 onwards", 499],
    ["₹0.50", 0.5],
    ["₹0", 0],
  ])("reads %j as %d", (text, expected) => {
    expect(parseRupeePrice(text)).toBe(expected);
  });

  it("does not turn a decimal price into one a hundred times larger", () => {
    // The old digits-only parse read "₹399.00" as 39900.
    expect(parseRupeePrice("₹399.00")).toBeLessThan(500);
  });

  it("uses the first amount when the text holds several", () => {
    expect(parseRupeePrice("MRP ₹999 now ₹399")).toBe(999);
  });

  it.each([[null], [undefined], [""], ["Free"], ["₹"], [499], [{}]])("returns null for %j", (value) => {
    expect(parseRupeePrice(value)).toBeNull();
  });
});
