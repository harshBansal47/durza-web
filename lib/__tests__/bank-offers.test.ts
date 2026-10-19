import { describe, expect, it } from "vitest";
import { buildBankGroups } from "@/lib/bank-offers";
import type { CouponPublic, Store } from "@/lib/types";

function makeCoupon(overrides: Partial<CouponPublic> = {}): CouponPublic {
  return {
    id: "c1",
    title: "Test coupon",
    slug: "test-coupon",
    code: null,
    description: null,
    discount_type: "deal",
    discount_value: null,
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

function makeStore(overrides: Partial<Store> = {}): Store {
  return {
    id: "s1",
    name: "Croma",
    slug: "croma",
    logo_url: null,
    website_url: null,
    description: null,
    pricing_summary: null,
    pricing_checked_at: null,
    is_active: true,
    commission_disclosure: null,
    country_code: "IN",
    currency: "INR",
    created_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("buildBankGroups", () => {
  it("groups a coupon under the bank its own copy names", () => {
    const coupon = makeCoupon({ title: "Croma: 7.5% instant discount on HDFC Bank EMI" });
    const groups = buildBankGroups([coupon], [makeStore()]);

    expect(groups).toHaveLength(1);
    expect(groups[0].bank.id).toBe("hdfc");
    expect(groups[0].coupons.map((item) => item.id)).toEqual([coupon.id]);
    expect(groups[0].stores.map((store) => store.slug)).toEqual(["croma"]);
  });

  it("puts a multi-bank offer under every bank it names", () => {
    const coupon = makeCoupon({ title: "Instant discount with HDFC Bank & YES Bank cards" });
    const groups = buildBankGroups([coupon], [makeStore()]);

    expect(groups.map((group) => group.bank.id).sort()).toEqual(["hdfc", "yes"]);
    expect(groups[0].coupons).toHaveLength(1);
    expect(groups[1].coupons).toHaveLength(1);
  });

  it("ignores offers that name no bank", () => {
    const coupon = makeCoupon({ title: "Flat 20% off all headphones" });
    expect(buildBankGroups([coupon], [makeStore()])).toEqual([]);
  });

  it("reads the bank name from the recorded terms, not just the title", () => {
    const coupon = makeCoupon({
      title: "Instant discount on electronics",
      restrictions: { terms: "Valid on ICICI Bank credit cards; minimum spend Rs 25,000." },
    });
    const groups = buildBankGroups([coupon], [makeStore()]);
    expect(groups.map((group) => group.bank.id)).toEqual(["icici"]);
  });

  it("orders banks by how many live offers they have", () => {
    const stores = [makeStore()];
    const coupons = [
      makeCoupon({ id: "h1", title: "HDFC Bank offer one" }),
      makeCoupon({ id: "h2", title: "HDFC Bank offer two" }),
      makeCoupon({ id: "i1", title: "ICICI Bank offer" }),
    ];
    const groups = buildBankGroups(coupons, stores);
    expect(groups.map((group) => group.bank.id)).toEqual(["hdfc", "icici"]);
  });

  it("de-duplicates stores within a bank", () => {
    const store = makeStore();
    const coupons = [
      makeCoupon({ id: "a", title: "HDFC Bank offer A", store_id: store.id }),
      makeCoupon({ id: "b", title: "HDFC Bank offer B", store_id: store.id }),
    ];
    const groups = buildBankGroups(coupons, [store]);
    expect(groups[0].stores).toHaveLength(1);
  });
});
