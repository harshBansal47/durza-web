import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import CouponTicket from "@/components/coupons/CouponTicket";
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

const store = { id: "s1", name: "Amazon", slug: "amazon", currency: "INR" };

describe("CouponTicket", () => {
  it("links the title to the coupon page", () => {
    render(<CouponTicket coupon={makeCoupon()} store={store} />);
    expect(screen.getByRole("link", { name: "20% off headphones" })).toHaveAttribute(
      "href",
      "/coupons/20-off-headphones",
    );
  });

  it("prints the discount as the anchor", () => {
    render(<CouponTicket coupon={makeCoupon()} store={store} />);
    expect(screen.getByText("20% off")).toBeInTheDocument();
  });

  it("shows the real check date", () => {
    render(<CouponTicket coupon={makeCoupon()} store={store} />);
    expect(screen.getByText(/Checked 10 Mar 2026/)).toBeInTheDocument();
  });

  it("shows an expiry chip only when there is a real expiry date", () => {
    const { rerender } = render(<CouponTicket coupon={makeCoupon()} store={store} />);
    expect(screen.queryByText(/Expires/)).not.toBeInTheDocument();
    rerender(
      <CouponTicket coupon={makeCoupon({ expires_at: "2026-11-01T00:00:00Z" })} store={store} />,
    );
    expect(screen.getByText(/Expires 1 Nov 2026/)).toBeInTheDocument();
  });

  it("asks for a first report instead of claiming no votes", () => {
    render(<CouponTicket coupon={makeCoupon()} store={store} />);
    expect(screen.getByText("Be the first to report")).toBeInTheDocument();
    expect(screen.queryByText(/No votes yet/)).not.toBeInTheDocument();
  });

  it("shows the success rate only when shoppers have voted", () => {
    render(
      <CouponTicket
        coupon={makeCoupon({ success_count: 9, fail_count: 1, success_rate: 0.9 })}
        store={store}
      />,
    );
    expect(screen.getByText(/90% worked · 10 reports/)).toBeInTheDocument();
    expect(screen.queryByText("Be the first to report")).not.toBeInTheDocument();
  });

  it("expands extra codes from the same store and offer type", async () => {
    render(
      <CouponTicket
        coupon={makeCoupon()}
        store={store}
        extra={[makeCoupon({ id: "c2", slug: "second", title: "Second code" })]}
      />,
    );
    const user = userEvent.setup();
    const expander = screen.getByRole("button", { name: /\+1 more code/ });
    expect(expander).toHaveAttribute("aria-expanded", "false");
    await user.click(expander);
    expect(expander).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Second code/ })).toHaveAttribute(
      "href",
      "/coupons/second",
    );
  });
});
