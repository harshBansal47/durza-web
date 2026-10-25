import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import StickyDealBar from "@/components/StickyDealBar";
import type { CouponPublic } from "@/lib/types";

const coupon: CouponPublic = {
  id: "c1",
  title: "Buy 1 Get 1 on sheet masks",
  slug: "bogo-sheet-masks",
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
  last_checked_at: null,
  restrictions: null,
  created_at: "2026-01-01T00:00:00Z",
};

let reportFooter: (isIntersecting: boolean) => void;
let observed: Element | null;
const disconnect = vi.fn();

class FakeIntersectionObserver {
  constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
    reportFooter = (isIntersecting) =>
      callback([{ isIntersecting } as IntersectionObserverEntry]);
  }
  observe = (el: Element) => {
    observed = el;
  };
  disconnect = disconnect;
}

describe("StickyDealBar", () => {
  let footer: HTMLElement;

  beforeEach(() => {
    observed = null;
    disconnect.mockClear();
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    footer = document.createElement("footer");
    document.body.appendChild(footer);
  });

  afterEach(() => {
    footer.remove();
    vi.unstubAllGlobals();
  });

  it("is shown while the footer is out of view", () => {
    const { container } = render(<StickyDealBar coupon={coupon} storeName="Nykaa" />);
    const bar = container.firstElementChild as HTMLElement;

    expect(observed).toBe(footer);
    expect(bar).toHaveAttribute("aria-hidden", "false");
    expect(bar).not.toHaveAttribute("inert");
    expect(bar.className).not.toContain("translate-y-full");
  });

  it("steps aside once the footer is on screen, so it never covers the copyright line", () => {
    const { container } = render(<StickyDealBar coupon={coupon} storeName="Nykaa" />);
    const bar = container.firstElementChild as HTMLElement;

    act(() => reportFooter(true));

    expect(bar).toHaveAttribute("aria-hidden", "true");
    expect(bar).toHaveAttribute("inert");
    expect(bar.className).toContain("translate-y-full");

    act(() => reportFooter(false));
    expect(bar.className).not.toContain("translate-y-full");
  });

  it("stops observing when it unmounts", () => {
    const { unmount } = render(<StickyDealBar coupon={coupon} storeName="Nykaa" />);
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it("still renders where IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(<StickyDealBar coupon={coupon} storeName="Nykaa" />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "false");
  });

  it("goes to the store for a code-less deal, and to the code panel when there is a code", () => {
    const { getByRole, rerender } = render(<StickyDealBar coupon={coupon} storeName="Nykaa" />);
    expect(getByRole("link", { name: "Go to Nykaa" })).toBeInTheDocument();

    rerender(<StickyDealBar coupon={{ ...coupon, code: "SAVE10" }} storeName="Nykaa" />);
    expect(getByRole("link", { name: "View code" })).toHaveAttribute("href", "#code-panel");
  });
});
