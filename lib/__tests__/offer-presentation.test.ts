import { describe, expect, it } from "vitest";
import {
  affiliateLinkLabel,
  lastCheckedLine,
  offerType,
  offerTypeLabel,
} from "@/lib/offer-presentation";
import type { CouponPublic } from "@/lib/types";

function coupon(overrides: Partial<CouponPublic> = {}): CouponPublic {
  return {
    id: "c1",
    title: "Some offer",
    slug: "some-offer",
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
    tested_cart_value: null,
    verified_discount_amount: null,
    auto_suppressed: false,
    verification_failures: 0,
    last_checked_at: null,
    restrictions: null,
    created_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("offerType", () => {
  it("classifies a coded offer as coupon_code", () => {
    expect(offerType(coupon({ code: "SAVE20" }))).toBe("coupon_code");
  });

  it("classifies a product restrictions row as product_offer", () => {
    expect(offerType(coupon({ restrictions: { kind: "product" } }))).toBe("product_offer");
  });

  it("classifies store-sourced rows as store_promotion", () => {
    expect(offerType(coupon({ restrictions: { source_kind: "store offers page" } }))).toBe(
      "store_promotion",
    );
  });

  it("classifies a bank-named offer using existing bank data", () => {
    expect(offerType(coupon({ title: "10% off with HDFC Bank cards" }))).toBe("bank_offer");
  });

  it("defaults uncertain no-code offers to no_code_deal", () => {
    expect(offerType(coupon())).toBe("no_code_deal");
    expect(offerType(coupon({ discount_type: "fixed", discount_value: 500 }))).toBe("no_code_deal");
  });

  it("labels affiliate store CTAs without implying a coupon", () => {
    expect(offerTypeLabel("affiliate_link")).toBe("Affiliate shopping link");
    expect(affiliateLinkLabel()).toMatch(/commission/);
  });
});

describe("offer display claims", () => {
  it("shows Last checked only when a date exists", () => {
    expect(lastCheckedLine(coupon())).toBe("");
    expect(lastCheckedLine(coupon({ last_checked_at: "2026-11-21T00:00:00Z" }))).toMatch(/^Last checked /);
  });

  it("never says verified for unverified offers", () => {
    for (const c of [coupon(), coupon({ last_checked_at: "2026-11-01" })]) {
      expect(lastCheckedLine(c)).not.toMatch(/verified/i);
    }
  });
});
