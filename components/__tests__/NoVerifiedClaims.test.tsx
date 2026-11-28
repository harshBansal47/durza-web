import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/CardSaveButton", () => ({ CardSaveButton: () => null }));

import OfferEvidence from "@/components/OfferEvidence";

describe("no checkout-verification claims in offer components", () => {
  it("renders no 'verified' or 'checkout tested' text even with verified data", () => {
    const views = [
      render(<OfferEvidence typeLabel="Coupon code" lastChecked="Last checked 21 Nov 2026" />),
    ];
    for (const view of views) {
      expect(view.container.textContent).not.toMatch(/verified|checkout[\s-]?tested/i);
    }
  });
});
