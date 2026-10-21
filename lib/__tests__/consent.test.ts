import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  ensureConsentCookie,
  getConsent,
  setConsent,
  isAnalyticsAllowed,
  onConsentChange,
} from "@/lib/consent";
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
    window.sessionStorage.clear();
    vi.clearAllMocks();
    resetImpressionDedupe();
  });

  afterEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
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

  it("a returning visitor who accepted gets the cookie re-issued, without clicking", async () => {
    // The choice is in localStorage from an earlier visit; the cookie is not
    // there (it expired, or was cleared, or never existed for this visitor).
    window.localStorage.setItem("durza_consent_v1", "accepted");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    ensureConsentCookie();
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/analytics/consent"),
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ choice: "accepted" }),
      }),
    );
  });

  it("it asks once per session, not once per page", async () => {
    window.localStorage.setItem("durza_consent_v1", "accepted");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    ensureConsentCookie();
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    ensureConsentCookie();
    ensureConsentCookie();
    await Promise.resolve();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("a visitor who declined, or never chose, is not asked", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    ensureConsentCookie();
    window.localStorage.setItem("durza_consent_v1", "declined");
    ensureConsentCookie();
    await Promise.resolve();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("a failed call is not remembered, so the next load tries again", async () => {
    window.localStorage.setItem("durza_consent_v1", "accepted");
    const fetchMock = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", fetchMock);

    ensureConsentCookie();
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    // let the rejection settle, so the pending marker is cleared
    await new Promise((resolve) => setTimeout(resolve, 0));

    fetchMock.mockResolvedValue({ ok: true });
    ensureConsentCookie();
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
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
