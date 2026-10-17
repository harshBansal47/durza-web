import { describe, expect, it } from "vitest";
import {
  cardRequirementLine,
  getRequirements,
  requirementLabels,
  sourceLine,
} from "@/lib/requirements";
import type { CouponPublic } from "@/lib/types";

function makeCoupon(overrides: Partial<CouponPublic> = {}): CouponPublic {
  return {
    id: "c1",
    title: "Test coupon",
    slug: "test-coupon",
    code: "SAVE10",
    description: null,
    discount_type: "percentage",
    discount_value: 10,
    store_id: "s1",
    category_id: "cat1",
    expires_at: null,
    is_active: true,
    views_count: 0,
    clicks_count: 0,
    success_count: 0,
    fail_count: 0,
    last_verified_at: null,
    success_rate: null,
    verification_status: "unverified",
    last_checked_at: null,
    restrictions: null,
    created_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

// The exact shape the researcher records for a seeded store T&C page.
const cromaCardOffer = makeCoupon({
  title: "Croma: 7.5% instant discount on HDFC Bank & YES Bank credit-card EMI",
  code: null,
  restrictions: {
    minimum_order: "₹15,000",
    terms:
      "Credit-card EMI transactions only, via HDFC Bank or YES Bank; minimum transaction value 15,000 rupees; maximum discount 3,000 rupees; Apple and Google Pixel excluded; one transaction per card during the offer period.",
    source_url: "https://www.croma.com/tc-hdfc-yes-bank-offer-2026",
    source_kind: "store T&C page",
    checked_on: "2026-10-17",
  },
});

describe("getRequirements", () => {
  it("reads both banks, the minimum order and the exclusions off a card offer", () => {
    const req = getRequirements(cromaCardOffer);
    expect(req.banks).toEqual(["HDFC Bank", "YES Bank"]);
    expect(req.minimumOrder).toBe("₹15,000");
    expect(req.excludedProducts).toBe(true);
    expect(req.sourceUrl).toBe("https://www.croma.com/tc-hdfc-yes-bank-offer-2026");
    expect(req.checkedOn).toBe("2026-10-17");
  });

  it("does not invent conditions when the store stated none", () => {
    const req = getRequirements(
      makeCoupon({ title: "Flat 10% off yours first order", restrictions: null }),
    );
    // "first order" is stated, so that one label IS honest:
    expect(req.newUsersOnly).toBe(true);
    expect(req.banks).toEqual([]);
    expect(req.minimumOrder).toBeNull();
  });

  it("returns nothing for a plain coupon with no stated conditions", () => {
    const req = getRequirements(makeCoupon());
    expect(req.banks).toEqual([]);
    expect(req.memberships).toEqual([]);
    expect(req.minimumOrder).toBeNull();
    expect(req.newUsersOnly).toBe(false);
    expect(req.excludedProducts).toBe(false);
    expect(req.terms).toBeNull();
  });
});

describe("requirementLabels", () => {
  it("names the banks on a multi-bank offer", () => {
    expect(requirementLabels(cromaCardOffer)).toContain("Bank offer: HDFC Bank, YES Bank");
  });

  it("labels memberships, new-user offers and minimum orders", () => {
    expect(
      requirementLabels(makeCoupon({ title: "Swiggy One members save 15% on groceries" })),
    ).toContain("Requires Swiggy One");
    expect(requirementLabels(makeCoupon({ title: "10% off for new users" }))).toContain(
      "New users only",
    );
    expect(requirementLabels(cromaCardOffer)).toContain("Min order ₹15,000");
  });

  it("says nothing when the offer states nothing", () => {
    expect(requirementLabels(makeCoupon())).toEqual([]);
  });
});

describe("cardRequirementLine", () => {
  it("caps the banks named on a compact card, with a count for the rest", () => {
    const threeBanks = makeCoupon({
      title: "Discount with HDFC, ICICI and Axis Bank cards",
    });
    expect(cardRequirementLine(threeBanks)).toBe("Bank offer: HDFC Bank · ICICI Bank +1 more");
  });

  it("falls back through membership, new users, minimum order and exclusions", () => {
    expect(cardRequirementLine(makeCoupon({ title: "Insider-only deal" }))).toBeNull();
    expect(
      cardRequirementLine(makeCoupon({ title: "Members save more", description: "Myntra Insider members" })),
    ).toBe("Requires Myntra Insider");
  });
});

describe("sourceLine", () => {
  it("names the source kind and the checked-on date", () => {
    const line = sourceLine(cromaCardOffer);
    expect(line?.text).toBe("Store T&C page · checked 17 Oct 2026");
    expect(line?.url).toBe("https://www.croma.com/tc-hdfc-yes-bank-offer-2026");
  });

  it("falls back to the API's last_checked_at when the researcher left no date", () => {
    const line = sourceLine(
      makeCoupon({ last_checked_at: "2026-10-10T00:00:00Z", restrictions: null }),
    );
    expect(line?.text).toBe("checked 10 Oct 2026");
  });

  it("returns null rather than an empty claim", () => {
    expect(sourceLine(makeCoupon())).toBeNull();
  });
});
