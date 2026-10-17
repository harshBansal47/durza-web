import { describe, expect, it } from "vitest";
import { categoryLabel } from "@/lib/catalog";
import { maskCode } from "@/lib/codes";
import { groupKey, groupSimilar } from "@/lib/grouping";
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

describe("groupKey", () => {
  it("strips a trailing 'with code X' clause", () => {
    expect(groupKey("Myntra: extra discount on selected styles with code BFF300")).toBe(
      "myntra: extra discount on selected styles",
    );
  });

  it("treats titles that differ only by code as the same key", () => {
    expect(groupKey("X offer with code AAA1")).toBe(groupKey("X offer with code BBB2"));
  });

  it("leaves titles without a code clause intact", () => {
    expect(groupKey("Flat 10% off")).toBe("flat 10% off");
  });
});

describe("groupSimilar", () => {
  it("groups three or more near-identical offers, preserving position", () => {
    const items = [
      makeCoupon({ id: "a", title: "X offer with code AAA1" }),
      makeCoupon({ id: "b", title: "Other deal" }),
      makeCoupon({ id: "c", title: "X offer with code CCC3" }),
      makeCoupon({ id: "d", title: "X offer with code DDD4" }),
    ];
    const out = groupSimilar(items);
    expect(out).toHaveLength(2);
    expect(out[0].kind).toBe("group");
    if (out[0].kind === "group") {
      expect(out[0].label).toBe("X offer");
      expect(out[0].coupons.map((c) => c.id)).toEqual(["a", "c", "d"]);
    }
    expect(out[1].kind).toBe("coupon");
  });

  it("leaves a pair of similar offers ungrouped — two is not a wall", () => {
    const items = [
      makeCoupon({ id: "a", title: "X offer with code AAA1" }),
      makeCoupon({ id: "b", title: "X offer with code BBB2" }),
    ];
    const out = groupSimilar(items);
    expect(out.map((e) => e.kind)).toEqual(["coupon", "coupon"]);
  });
});

describe("maskCode", () => {
  it("shows only the first three characters", () => {
    expect(maskCode("BFF300")).toBe("BFF•••");
  });

  it("returns null for missing codes", () => {
    expect(maskCode(null)).toBeNull();
    expect(maskCode("")).toBeNull();
  });
});

describe("categoryLabel", () => {
  it("prefers the API name", () => {
    expect(categoryLabel({ name: "Grocery", slug: "grocery" })).toBe("Grocery");
  });

  it("never leaks a raw slug when the name is empty", () => {
    expect(categoryLabel({ name: "", slug: "grocery" })).toBe("Grocery");
    expect(categoryLabel({ name: null, slug: "/categories/beauty-care" })).toBe("Beauty Care");
  });
});
