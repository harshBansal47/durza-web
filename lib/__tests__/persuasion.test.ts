import { describe, expect, it } from "vitest";
import {
  EXPIRY_WARNING_MS,
  expiryTone,
  priceInsight,
  savedCount,
  trustCopy,
  trustLevel,
} from "@/lib/persuasion";
import type { PricePoint } from "@/lib/types";

function point(price: number, daysAgo: number): PricePoint {
  return {
    id: `${price}-${daysAgo}`,
    product_id: "p1",
    price,
    original_price: null,
    shipping: 0,
    in_stock: true,
    coupon_id: null,
    captured_at: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
  };
}

describe("persuasion primitives", () => {
  it("trustLevel only verifies real votes above the threshold", () => {
    expect(trustLevel(0.9, 5)).toBe("verified");
    expect(trustLevel(0.9, 4)).toBe("low-data");
    expect(trustLevel(null, 0)).toBe("no-data");
  });

  it("trustCopy uses honest low-data copy", () => {
    expect(trustCopy("verified", 12)).toBe("Verified working by 12 Durza users recently");
    expect(trustCopy("low-data", 2)).toBe("No votes yet from enough shoppers");
    expect(trustCopy("no-data", 0)).toBe("No votes yet");
  });

  it("expiryTone uses a warning window but never a timer", () => {
    const now = new Date("2026-10-20T00:00:00Z");
    expect(expiryTone(null, now)).toBe("none");
    expect(expiryTone("2026-10-19T00:00:00Z", now)).toBe("expired");
    expect(expiryTone(new Date(now.getTime() + EXPIRY_WARNING_MS - 1).toISOString(), now)).toBe("warning");
    expect(expiryTone(new Date(now.getTime() + EXPIRY_WARNING_MS + 1).toISOString(), now)).toBe("calm");
  });

  it("priceInsight only claims lowest price when the current price is the minimum", () => {
    const points = [point(100, 90), point(90, 30), point(80, 1)];
    expect(priceInsight(points, 80)).toBe("Lowest price in 1 month");
    expect(priceInsight(points, 90)).toBeNull();
  });

  it("savedCount counts real saved items", () => {
    expect(savedCount([1, 2, 3])).toBe(3);
    expect(savedCount([])).toBe(0);
  });
});
