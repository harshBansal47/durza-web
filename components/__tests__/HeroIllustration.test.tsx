import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroIllustration from "@/components/home/HeroIllustration";
import HeroSpotlight from "@/components/home/HeroSpotlight";
import type { CouponPublic } from "@/lib/types";

function makeCoupon(overrides: Partial<CouponPublic> = {}): CouponPublic {
  return {
    id: "c1",
    title: "Nykaa: minimum 20% off",
    slug: "nykaa-20-off",
    code: null,
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
    last_checked_at: "2026-10-20T00:00:00Z",
    restrictions: null,
    created_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("HeroIllustration", () => {
  it("is decorative: hidden from assistive tech and not focusable", () => {
    const { container } = render(<HeroIllustration />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
  });
});

describe("HeroSpotlight", () => {
  it("links to the coupon and shows only real values", () => {
    render(<HeroSpotlight coupon={makeCoupon()} store={{ name: "Nykaa" }} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/coupons/nykaa-20-off");
    expect(screen.getByText("Nykaa: minimum 20% off")).toBeInTheDocument();
    expect(screen.getByText(/checked 20 Oct 2026/)).toBeInTheDocument();
  });

  it("omits the checked date when the coupon has none", () => {
    render(<HeroSpotlight coupon={makeCoupon({ last_checked_at: null })} />);
    expect(screen.queryByText(/checked/)).not.toBeInTheDocument();
  });
});
