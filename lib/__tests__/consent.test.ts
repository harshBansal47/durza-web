import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { getConsent, setConsent, isAnalyticsAllowed, onConsentChange } from "@/lib/consent";
import { track, resetImpressionDedupe } from "@/lib/analytics";
import { api } from "@/lib/api";

/**
 * D3 tests: consent gating. Analytics must only fire when the visitor has
 * explicitly accepted. Declined and no-choice must both block all tracking.
 */

vi.mock("@/lib/api", () => ({
  api: {
    recordImpression: vi.fn().mockResolvedValue(undefined),
  },
}));

const mockRecordImpression = api.recordImpression as ReturnType<typeof vi.fn>;

describe("consent gating (D3)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
    resetImpressionDedupe();
  });

  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("no choice => analytics does not fire", () => {
    expect(getConsent()).toBeNull();
    expect(isAnalyticsAllowed()).toBe(false);

    track("page_view", { path: "/test" });
    expect(mockRecordImpression).not.toHaveBeenCalled();
  });

  it("the choice is sent to the API, so it can issue a consent cookie", () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    setConsent("accepted");
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/analytics/consent"),
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ choice: "accepted" }),
      }),
    );

    setConsent("declined");
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/analytics/consent"),
      expect.objectContaining({ body: JSON.stringify({ choice: "declined" }) }),
    );
    vi.unstubAllGlobals();
  });

  it("declined => analytics does not fire", () => {
    setConsent("declined");
    expect(getConsent()).toBe("declined");
    expect(isAnalyticsAllowed()).toBe(false);

    track("page_view", { path: "/test" });
    track("coupon_impression", {
      coupon_id: "c1",
      merchant_id: "m1",
      page_type: "homepage",
      position: 1,
    });
    expect(mockRecordImpression).not.toHaveBeenCalled();
  });

  it("accepted => analytics fires", () => {
    setConsent("accepted");
    expect(getConsent()).toBe("accepted");
    expect(isAnalyticsAllowed()).toBe(true);

    track("page_view", { path: "/test" });
    expect(isAnalyticsAllowed()).toBe(true);
  });

  it("accepted => impression tracking fires", () => {
    setConsent("accepted");
    track("coupon_impression", {
      coupon_id: "c1",
      merchant_id: "m1",
      page_type: "homepage",
      position: 1,
    });
    expect(mockRecordImpression).toHaveBeenCalledTimes(1);
  });

  it("consent state persists across reads", () => {
    setConsent("accepted");
    expect(getConsent()).toBe("accepted");
    expect(isAnalyticsAllowed()).toBe(true);
  });

  it("consent change immediately affects tracking", () => {
    expect(isAnalyticsAllowed()).toBe(false);

    setConsent("accepted");
    expect(isAnalyticsAllowed()).toBe(true);

    setConsent("declined");
    expect(isAnalyticsAllowed()).toBe(false);

    track("coupon_impression", {
      coupon_id: "c2",
      merchant_id: "m1",
      page_type: "homepage",
      position: 1,
    });
    expect(mockRecordImpression).not.toHaveBeenCalled();
  });

  it("onConsentChange listener fires on consent change", () => {
    const listener = vi.fn();
    const unsubscribe = onConsentChange(listener);

    setConsent("accepted");
    expect(listener).toHaveBeenCalledWith("accepted");

    setConsent("declined");
    expect(listener).toHaveBeenCalledWith("declined");

    unsubscribe();
  });
});
