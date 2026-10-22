import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DealStack from "@/components/home/DealStack";
import type { CouponPublic } from "@/lib/types";

function makeCoupon(overrides: Partial<CouponPublic> = {}): CouponPublic {
  return {
    id: "c1",
    title: "20% off headphones",
    slug: "20-off-headphones",
    code: "SAVE20",
    description: null,
    discount_type: "percentage",
    discount_value: 20,
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
    last_checked_at: "2026-03-10T00:00:00Z",
    restrictions: null,
    created_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("DealStack", () => {
  it("renders nothing when there are no deals", () => {
    const { container } = render(<DealStack deals={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders one card per deal and links to coupon pages", () => {
    const deals = [
      makeCoupon({ id: "c1", slug: "a", title: "Deal A" }),
      makeCoupon({ id: "c2", slug: "b", title: "Deal B" }),
      makeCoupon({ id: "c3", slug: "c", title: "Deal C" }),
    ];
    render(<DealStack deals={deals} />);
    expect(screen.getByRole("link", { name: /Deal A/ })).toHaveAttribute("href", "/coupons/a");
    expect(screen.getByRole("link", { name: /Deal B/ })).toHaveAttribute("href", "/coupons/b");
    expect(screen.getByRole("link", { name: /Deal C/ })).toHaveAttribute("href", "/coupons/c");
  });

  it("shows Source verified only when a source URL exists", () => {
    const deals = [
      makeCoupon({ id: "c1", restrictions: { source_url: "https://example.com" } }),
      makeCoupon({ id: "c2", restrictions: null }),
    ];
    render(<DealStack deals={deals} />);
    expect(screen.getAllByText("Source verified")).toHaveLength(1);
  });
});
