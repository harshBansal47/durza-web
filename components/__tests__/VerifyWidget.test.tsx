import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import VerifyWidget from "@/components/VerifyWidget";
import { ApiError } from "@/lib/api";
import { markRevealed } from "@/lib/deviceState";
import type { CouponPublic, VerifyResponse } from "@/lib/types";

const baseCoupon: CouponPublic = {
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
  success_count: 2,
  fail_count: 1,
  last_verified_at: "2026-01-01T00:00:00Z",
  success_rate: 0.667,
  verification_status: "unverified",
  last_checked_at: null,
  restrictions: null,
  created_at: "2026-01-01T00:00:00Z",
};

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, api: { ...actual.api, verifyCoupon: vi.fn(), getCouponStats: vi.fn() } };
});

import { api } from "@/lib/api";

describe("VerifyWidget", () => {
  beforeEach(() => {
    vi.mocked(api.verifyCoupon).mockReset();
    vi.mocked(api.getCouponStats).mockReset();
    window.localStorage.clear();
    // Voting is reveal-gated: the reported flow starts after "reveal".
    markRevealed("c1");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the initial stats computed from the coupon prop", () => {
    render(<VerifyWidget coupon={baseCoupon} />);
    expect(screen.getByText("67%")).toBeInTheDocument();
    expect(screen.getByText("(3 reports)")).toBeInTheDocument();
  });

  it("does not invite votes before the code was revealed on this device", () => {
    window.localStorage.clear();
    render(<VerifyWidget coupon={baseCoupon} />);
    expect(screen.queryByRole("button", { name: "Worked" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /reveal the code/i })).toHaveAttribute(
      "href",
      "#code-panel",
    );
    // The stats stay visible — "no votes yet" is still honest information.
    expect(screen.getByText("67%")).toBeInTheDocument();
  });

  it("remembers this device's vote instead of offering a second one", async () => {
    vi.mocked(api.verifyCoupon).mockResolvedValue({
      success_count: 3,
      fail_count: 1,
      last_verified_at: "2026-01-02T00:00:00Z",
      success_rate: 0.75,
    });
    const { unmount } = render(<VerifyWidget coupon={baseCoupon} />);
    await userEvent.click(screen.getByRole("button", { name: "Worked" }));
    await waitFor(() => expect(screen.getByText(/that helps the next person/i)).toBeInTheDocument());
    unmount();

    render(<VerifyWidget coupon={baseCoupon} />);
    expect(screen.getByText(/you reported this worked on this device/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Worked" })).not.toBeInTheDocument();
  });

  it("replaces stale cached counts with live ones once mounted", async () => {
    // The page is cached for minutes; it was rendered before these votes landed.
    vi.mocked(api.getCouponStats).mockResolvedValue({
      ...baseCoupon,
      success_count: 9,
      fail_count: 1,
      success_rate: 0.9,
    });

    render(<VerifyWidget coupon={{ ...baseCoupon, success_count: 0, fail_count: 0, success_rate: null }} />);

    expect(await screen.findByText("90%")).toBeInTheDocument();
    expect(screen.getByText("(10 reports)")).toBeInTheDocument();
    expect(api.getCouponStats).toHaveBeenCalledWith("c1");
  });

  it("keeps the page's numbers if the live lookup fails", async () => {
    vi.mocked(api.getCouponStats).mockRejectedValue(new Error("offline"));

    render(<VerifyWidget coupon={baseCoupon} />);

    await waitFor(() => expect(api.getCouponStats).toHaveBeenCalled());
    expect(screen.getByText("67%")).toBeInTheDocument();
  });

  it("shows one inviting empty state, not two 'No …' cells, when nothing has been reported", () => {
    render(<VerifyWidget coupon={{ ...baseCoupon, success_count: 0, fail_count: 0, success_rate: null }} />);
    expect(screen.getByText(/no reports yet/i)).toBeInTheDocument();
    expect(screen.getByText(/be the first to tell us/i)).toBeInTheDocument();
    expect(screen.queryByText("Success rate")).not.toBeInTheDocument();
    expect(screen.queryByText(/no votes yet/i)).not.toBeInTheDocument();
  });

  it("tells a visitor to get the deal, not 'reveal the code', when the offer has no code", async () => {
    window.localStorage.clear(); // beforeEach marks c1 as revealed; this visitor has not clicked through yet
    render(<VerifyWidget coupon={{ ...baseCoupon, code: null }} />);

    expect(await screen.findByText(/did this deal work for you/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get the deal at the store/i })).toHaveAttribute(
      "href",
      "#code-panel",
    );
    expect(screen.queryByRole("link", { name: /reveal the code/i })).not.toBeInTheDocument();
  });

  it("submits a 'worked' report and shows the thank-you state with updated stats", async () => {
    vi.mocked(api.verifyCoupon).mockResolvedValue({
      success_count: 3,
      fail_count: 1,
      last_verified_at: "2026-01-02T00:00:00Z",
      success_rate: 0.75,
    });

    render(<VerifyWidget coupon={baseCoupon} />);
    await userEvent.click(screen.getByRole("button", { name: "Worked" }));

    await waitFor(() => expect(screen.getByText(/that helps the next person/i)).toBeInTheDocument());
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(api.verifyCoupon).toHaveBeenCalledWith("c1", true);
  });

  it("submits a 'didn't work' report with worked=false", async () => {
    vi.mocked(api.verifyCoupon).mockResolvedValue({
      success_count: 2,
      fail_count: 2,
      last_verified_at: "2026-01-02T00:00:00Z",
      success_rate: 0.5,
    });

    render(<VerifyWidget coupon={baseCoupon} />);
    await userEvent.click(screen.getByRole("button", { name: "Didn't work" }));

    await waitFor(() => expect(api.verifyCoupon).toHaveBeenCalledWith("c1", false));
  });

  it("shows a rate-limited message on a 429, not a generic error", async () => {
    vi.mocked(api.verifyCoupon).mockRejectedValue(new ApiError("rate limited", 429));

    render(<VerifyWidget coupon={baseCoupon} />);
    await userEvent.click(screen.getByRole("button", { name: "Worked" }));

    await waitFor(() =>
      expect(screen.getByText(/already reported on this one recently/i)).toBeInTheDocument(),
    );
  });

  it("returns to the reportable state (not stuck) on a non-429 error", async () => {
    vi.mocked(api.verifyCoupon).mockRejectedValue(new ApiError("server error", 500));

    render(<VerifyWidget coupon={baseCoupon} />);
    await userEvent.click(screen.getByRole("button", { name: "Worked" }));

    await waitFor(() => expect(screen.getByRole("button", { name: "Worked" })).toBeEnabled());
  });

  it("disables both buttons while a report is in flight", async () => {
    let resolveFn: (value: VerifyResponse) => void = () => {};
    vi.mocked(api.verifyCoupon).mockReturnValue(
      new Promise<VerifyResponse>((resolve) => {
        resolveFn = resolve;
      }),
    );

    render(<VerifyWidget coupon={baseCoupon} />);
    await userEvent.click(screen.getByRole("button", { name: "Worked" }));

    expect(screen.getByRole("button", { name: "Worked" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Didn't work" })).toBeDisabled();

    resolveFn({ success_count: 3, fail_count: 1, last_verified_at: null, success_rate: 0.75 });
    await waitFor(() => expect(screen.getByText(/that helps the next person/i)).toBeInTheDocument());
  });
});
