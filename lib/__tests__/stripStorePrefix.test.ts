import { describe, expect, it } from "vitest";
import { stripStorePrefix } from "@/lib/format";

describe("stripStorePrefix", () => {
  it("removes the store name and its separator from the start of a title", () => {
    expect(stripStorePrefix("Nykaa: minimum 20% off on Kay Beauty", "Nykaa")).toBe(
      "minimum 20% off on Kay Beauty",
    );
    expect(stripStorePrefix("Nykaa - extra 20% off your first app order", "Nykaa")).toBe(
      "extra 20% off your first app order",
    );
  });

  it("ignores case and treats regex characters in the store name literally", () => {
    expect(stripStorePrefix("AMAZON.IN: Deal of the day", "Amazon.in")).toBe("Deal of the day");
    expect(stripStorePrefix("Aamazonxin: Deal", "Amazon.in")).toBe("Aamazonxin: Deal");
  });

  it("leaves titles that do not start with the store alone", () => {
    expect(stripStorePrefix("20% off with HSBC Nykaa card", "Nykaa")).toBe(
      "20% off with HSBC Nykaa card",
    );
    expect(stripStorePrefix("Flat 20% off", undefined)).toBe("Flat 20% off");
    expect(stripStorePrefix("Flat 20% off", null)).toBe("Flat 20% off");
  });

  it("never returns an empty title", () => {
    expect(stripStorePrefix("Nykaa:", "Nykaa")).toBe("Nykaa:");
  });
});
