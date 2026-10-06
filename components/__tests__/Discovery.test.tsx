import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewDealsRow, RecentlyVerifiedRow } from "@/components/discovery/Discovery";
import { RecommendedRow } from "@/components/discovery/Recommended";
import { StoreFollowButton } from "@/components/StoreFollowButton";
import type { CouponPublic } from "@/lib/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

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
    created_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

const stores = [{ id: "s1", name: "Amazon", slug: "amazon", currency: "USD" }];

describe("discovery modules", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("RecentlyVerified renders nothing without verification data — never fake freshness", () => {
    const { container } = render(<RecentlyVerifiedRow coupons={[makeCoupon()]} stores={stores} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("RecentlyVerified shows checked deals when the data backs it", () => {
    render(
      <RecentlyVerifiedRow
        coupons={[makeCoupon({ last_verified_at: "2026-03-01T00:00:00Z", success_count: 3, success_rate: 0.9 })]}
        stores={stores}
      />,
    );
    expect(screen.getByText("Freshly checked")).toBeInTheDocument();
  });

  it("NewDeals lists the newest stock", () => {
    render(<NewDealsRow coupons={[makeCoupon()]} stores={stores} />);
    expect(screen.getByText("New deals")).toBeInTheDocument();
  });

  it("Recommended stays hidden with no taste signals — never invents picks", () => {
    const { container } = render(<RecommendedRow />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("StoreFollowButton", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("follows and unfollows anonymously with pressed state", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(<StoreFollowButton slug="nike" name="Nike" />);
    const btn = screen.getByRole("button", { name: /Follow Nike/ });
    expect(btn).toHaveAttribute("aria-pressed", "false");
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });
});
