import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CouponCodePanel from "@/components/CouponCodePanel";
import { api } from "@/lib/api";
import { clearLastGo, readLastGo } from "@/lib/lastGo";
import type { CouponPublic } from "@/lib/types";

const codedCoupon: CouponPublic = {
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
};

describe("CouponCodePanel", () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    vi.spyOn(window, "open").mockReturnValue(null);
    clearLastGo();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("hides the code behind a blurred placeholder until revealed", () => {
    render(<CouponCodePanel coupon={codedCoupon} />);
    expect(screen.queryByText("SAVE20")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reveal code" })).toBeInTheDocument();
  });

  it("reveals the real code on click, auto-copies it, and the button reverts to Copy", async () => {
    render(<CouponCodePanel coupon={codedCoupon} />);
    await userEvent.click(screen.getByRole("button", { name: "Reveal code" }));

    expect(screen.getByText("SAVE20")).toBeInTheDocument();
    // The reveal IS the copy: the code is on the clipboard without a second click.
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("SAVE20");
    await waitFor(() => expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument());
    await waitFor(
      () => expect(screen.getByRole("button", { name: "Copy code" })).toBeInTheDocument(),
      { timeout: 4000 },
    );
  });

  it("copies the code again with 'Copied' confirmation on manual copy", async () => {
    render(<CouponCodePanel coupon={codedCoupon} />);
    await userEvent.click(screen.getByRole("button", { name: "Reveal code" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument());
    await waitFor(
      () => expect(screen.getByRole("button", { name: "Copy code" })).toBeInTheDocument(),
      { timeout: 4000 },
    );
    await userEvent.click(screen.getByRole("button", { name: "Copy code" }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
    await waitFor(() => expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument());
  });

  it("doesn't crash if the clipboard API rejects (e.g. no permission)", async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValue(new Error("denied"));
    render(<CouponCodePanel coupon={codedCoupon} />);
    await userEvent.click(screen.getByRole("button", { name: "Reveal code" }));
    // Reveal's auto-copy failed silently; the manual copy must also survive.
    await userEvent.click(screen.getByRole("button", { name: "Copy code" }));

    // Code stays visible and legible even though the copy silently failed.
    expect(screen.getByText("SAVE20")).toBeInTheDocument();
  });

  it("shows no reveal/copy button for a code-less deal, just the auto-apply message", () => {
    render(<CouponCodePanel coupon={{ ...codedCoupon, code: null }} />);
    expect(screen.getByText(/no code needed/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /reveal|copy/i })).not.toBeInTheDocument();
  });

  it("links the CTA to the /go redirect endpoint for this coupon's id", () => {
    render(<CouponCodePanel coupon={codedCoupon} />);
    const link = screen.getByRole("link", { name: /get this deal/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("/coupons/c1/go"));
  });

  describe("click-to-reveal attribution", () => {
    it("opens the store in a new tab through the tracked /go link when the code is revealed", async () => {
      render(<CouponCodePanel coupon={codedCoupon} storeName="Amazon" />);
      await userEvent.click(screen.getByRole("button", { name: "Reveal code" }));
      expect(window.open).toHaveBeenCalledTimes(1);
      expect(window.open).toHaveBeenCalledWith(api.goUrl(codedCoupon.id, "reveal"), "_blank", "noopener");
    });

    it("starts copying the code before opening the store tab", async () => {
      render(<CouponCodePanel coupon={codedCoupon} />);
      await userEvent.click(screen.getByRole("button", { name: "Reveal code" }));

      const clipboardCall = vi.mocked(navigator.clipboard.writeText).mock.invocationCallOrder[0];
      const openCall = vi.mocked(window.open).mock.invocationCallOrder[0];
      expect(clipboardCall).toBeLessThan(openCall);
    });

    it("does not open the store again when the code is copied", async () => {
      render(<CouponCodePanel coupon={codedCoupon} storeName="Amazon" />);
      await userEvent.click(screen.getByRole("button", { name: "Reveal code" }));
      // Auto-copy leaves the button in "Copied" state; clicking it re-copies
      // and must never re-open the store.
      const button = await screen.findByRole("button", { name: "Copied" });
      await userEvent.click(button);
      expect(window.open).toHaveBeenCalledTimes(1);
    });

    it("remembers the click so the 'did it work?' prompt can ask later", async () => {
      render(<CouponCodePanel coupon={codedCoupon} storeName="Amazon" />);
      await userEvent.click(screen.getByRole("button", { name: "Reveal code" }));
      expect(readLastGo(60_000)).toMatchObject({ couponId: codedCoupon.id, storeName: "Amazon", hadCode: true });
    });

    it("tells the shopper, before they press it, that the store will open and a commission may be earned", () => {
      render(<CouponCodePanel coupon={codedCoupon} storeName="Amazon" />);
      expect(screen.getByText(/opens Amazon in a new tab/)).toBeInTheDocument();
      expect(screen.getByText(/may earn a commission/)).toBeInTheDocument();
    });

    it("after the reveal, says the store is open and what to do next", async () => {
      render(<CouponCodePanel coupon={codedCoupon} storeName="Amazon" />);
      await userEvent.click(screen.getByRole("button", { name: "Reveal code" }));
      expect(screen.getByText(/Amazon opened in a new tab/)).toBeInTheDocument();
    });

    it("never opens anything for a code-less deal (there is nothing to reveal)", () => {
      render(<CouponCodePanel coupon={{ ...codedCoupon, code: null }} storeName="Amazon" />);
      expect(screen.queryByRole("button", { name: "Reveal code" })).not.toBeInTheDocument();
      expect(window.open).not.toHaveBeenCalled();
    });

    it("makes no auto-fill promise it cannot keep", () => {
      render(<CouponCodePanel coupon={codedCoupon} storeName="Amazon" />);
      expect(screen.queryByText(/auto-?fill/i)).not.toBeInTheDocument();
    });

    it("offers more deals from the same store after a copy", async () => {
      render(<CouponCodePanel coupon={codedCoupon} storeName="Amazon" storeSlug="amazon" />);
      await userEvent.click(screen.getByRole("button", { name: "Reveal code" }));
      await userEvent.click(await screen.findByRole("button", { name: "Copied" }));
      const link = await screen.findByRole("link", { name: /More Amazon deals/ });
      expect(link).toHaveAttribute("href", "/stores/amazon");
    });
  });
});
