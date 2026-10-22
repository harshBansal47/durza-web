import { describe, expect, it } from "vitest";
import { groupCouponsForRow, offerTypeKey } from "@/lib/couponGroups";
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

describe("groupCouponsForRow", () => {
  it("returns nothing for an empty row", () => {
    expect(groupCouponsForRow([])).toEqual([]);
  });

  it("groups offers from the same store with the same offer type", () => {
    const groups = groupCouponsForRow([
      makeCoupon({ id: "a", store_id: "s1", discount_type: "percentage", code: "ONE" }),
      makeCoupon({ id: "b", store_id: "s1", discount_type: "percentage", code: "TWO" }),
      makeCoupon({ id: "c", store_id: "s1", discount_type: "percentage", code: "THREE" }),
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0].primary.id).toBe("a");
    expect(groups[0].extra.map((c) => c.id)).toEqual(["b", "c"]);
  });

  it("keeps different offer types from the same store apart", () => {
    const groups = groupCouponsForRow([
      makeCoupon({ id: "a", store_id: "s1", discount_type: "percentage" }),
      makeCoupon({ id: "b", store_id: "s1", discount_type: "fixed" }),
    ]);

    expect(groups).toHaveLength(2);
    expect(groups[0].extra).toHaveLength(0);
    expect(groups[1].extra).toHaveLength(0);
  });

  it("never lets one store fill more than two cards in a row", () => {
    const groups = groupCouponsForRow([
      makeCoupon({ id: "a", store_id: "s1", discount_type: "percentage" }),
      makeCoupon({ id: "b", store_id: "s1", discount_type: "fixed" }),
      makeCoupon({ id: "c", store_id: "s1", discount_type: "deal" }),
      makeCoupon({ id: "d", store_id: "s2", discount_type: "percentage" }),
    ]);

    const s1 = groups.filter((g) => g.storeId === "s1");
    expect(s1).toHaveLength(2);
    expect(groups.some((g) => g.primary.id === "c")).toBe(false);
    expect(groups.some((g) => g.primary.id === "d")).toBe(true);
  });

  it("preserves the incoming order of the first card per group", () => {
    const groups = groupCouponsForRow([
      makeCoupon({ id: "a", store_id: "s1" }),
      makeCoupon({ id: "b", store_id: "s2" }),
      makeCoupon({ id: "c", store_id: "s3" }),
    ]);

    expect(groups.map((g) => g.primary.id)).toEqual(["a", "b", "c"]);
  });

  it("honours a custom per-store cap", () => {
    const groups = groupCouponsForRow(
      [
        makeCoupon({ id: "a", store_id: "s1", discount_type: "percentage" }),
        makeCoupon({ id: "b", store_id: "s1", discount_type: "fixed" }),
      ],
      { maxGroupsPerStore: 1 },
    );

    expect(groups).toHaveLength(1);
    expect(groups[0].primary.id).toBe("a");
  });
});

describe("offerTypeKey", () => {
  it("keys on the offer type", () => {
    expect(offerTypeKey(makeCoupon({ discount_type: "deal" }))).toBe("deal");
  });
});
