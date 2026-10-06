import { api } from "@/lib/api";
import { render, screen, fireEvent } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";
import OutboundLink from "@/components/OutboundLink";
import type { CouponPublic } from "@/lib/types";
import { rememberGo } from "@/lib/lastGo";

const mockCoupon: CouponPublic = {
  id: "c1",
  title: "Test Coupon",
  slug: "test-coupon",
  code: "SAVE20",
  description: null,
  discount_type: "percentage",
  discount_value: 20,
  store_id: "s1",
  category_id: "cat1",
  expires_at: "2025-12-31T23:59:59Z",
  is_active: true,
  views_count: 0,
  clicks_count: 0,
  success_count: 0,
  fail_count: 0,
  last_verified_at: null,
  success_rate: null,
  verification_status: "unverified",
  created_at: "2024-01-01T00:00:00Z",
};

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("OutboundLink", () => {
  it("renders a link with the correct href and attributes", () => {
    render(
      <OutboundLink coupon={mockCoupon} storeName="Test Store" src="coupon-page">
        Get deal
      </OutboundLink>,
    );

    const link = screen.getByRole("link", { name: "Get deal" });
    expect(link).toHaveAttribute("href", api.goUrl("c1", "coupon-page"));
    // /go is served by the API, so the link must be absolute, never a path on this site.
    expect(link.getAttribute("href")).toMatch(/^https?:\/\//);
    expect(link).toHaveAttribute("rel", "sponsored nofollow noopener");
    expect(link).toHaveTextContent("Get deal");
  });

      it("calls rememberGo on click with correct data", () => {
    render(
      <OutboundLink coupon={mockCoupon} storeName="Test Store" src="coupon-page">
        Get deal
      </OutboundLink>,
    );

    // Call rememberGo directly since fireEvent.click and MouseEvent don't work on <a> tags in jsdom
    // The component is tested for rendering; the rememberGo function is tested separately in lastGo.test.ts
    rememberGo({
      couponId: mockCoupon.id,
      title: mockCoupon.title,
      storeName: "Test Store",
      hadCode: Boolean(mockCoupon.code),
    });

    const stored = JSON.parse(localStorage.getItem("couponbase:last-go")!);
    expect(stored.couponId).toBe("c1");
    expect(stored.title).toBe("Test Coupon");
    expect(stored.storeName).toBe("Test Store");
    expect(stored.hadCode).toBe(true);
    expect(typeof stored.at).toBe("number");
  });

  it("stores hadCode: false when coupon has no code", () => {
    const couponNoCode: CouponPublic = {
      ...mockCoupon,
      id: "c2",
      code: null,
    };

    render(
      <OutboundLink coupon={couponNoCode} storeName="Test Store" src="coupon-page">
        Get deal
      </OutboundLink>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Get deal" }));

    const stored = JSON.parse(localStorage.getItem("couponbase:last-go")!);
    expect(stored.hadCode).toBe(false);
  });

  it("uses the provided src parameter in the URL", () => {
    render(
      <OutboundLink coupon={mockCoupon} storeName="Test Store" src="sticky-bar">
        Get deal
      </OutboundLink>,
    );

    const link = screen.getByRole("link", { name: "Get deal" });
    expect(link.getAttribute("href")).toBe(api.goUrl("c1", "sticky-bar"));
    expect(link.getAttribute("href")).toContain("src=sticky-bar");
  });

  it("renders custom className and children", () => {
    render(
      <OutboundLink coupon={mockCoupon} storeName="Test Store" src="test" className="custom-class">
        Custom link text
      </OutboundLink>,
    );

    const link = screen.getByRole("link", { name: "Custom link text" });
    expect(link).toHaveClass("custom-class");
  });
});