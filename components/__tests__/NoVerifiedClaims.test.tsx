import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/CardSaveButton", () => ({ CardSaveButton: () => null }));

import CouponCard from "@/components/CouponCard";
import DealCard from "@/components/DealCard";
import OfferEvidence from "@/components/OfferEvidence";
import type { CouponPublic } from "@/lib/types";

const coupon: CouponPublic = {
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
  last_verified_at: "2026-11-20T00:00:00Z",
  success_rate: 100,
  verification_status: "verified",
  last_checked_at: "2026-11-21T00:00:00Z",
  restrictions: null,
  verification_failures: 0,
  tested_cart_value: 1000,
  verified_discount_amount: 200,
  auto_suppressed: false,
  created_at: "2026-01-01T00:00:00Z",
};

const store = { id: "s1", name: "Amazon", slug: "amazon", logo_url: null, currency: "INR" };

describe("no checkout-verification claims in offer components", () => {
  it("renders no 'verified' or 'checkout tested' text even with verified data", () => {
    const views = [
      render(<OfferEvidence typeLabel="Coupon code" lastChecked="Last checked 21 Nov 2026" />),
      render(<CouponCard coupon={coupon} store={store} />),
      render(<DealCard coupon={coupon} store={store} position={1} />),
    ];
    for (const view of views) {
      expect(view.container.textContent).not.toMatch(/verified|checkout[\s-]?tested/i);
    }
  });
});
