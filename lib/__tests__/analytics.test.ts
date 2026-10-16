import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import { IMPRESSION_PAGE_TYPES, isImpressionPageType, resetImpressionDedupe, track } from "@/lib/analytics";
import { setConsent } from "@/lib/consent";

/**
 * The backend (`ImpressionRequest` / `ImpressionType`) rejects unknown page types and
 * positions below 1 with a 422. The client swallows errors by design, so a wrong value
 * means silently missing data. These tests pin the contract from this side.
 */
const base = { coupon_id: "c1", merchant_id: "m1", page_type: "homepage", position: 1 };

describe("coupon impression contract with the backend", () => {
  let spy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    // Consent must be granted for track() to fire
    setConsent("accepted");
    resetImpressionDedupe();
    spy = vi.spyOn(api, "recordImpression").mockResolvedValue(undefined as never);
  });
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("accepts exactly the page types the backend defines", () => {
    expect([...IMPRESSION_PAGE_TYPES].sort()).toEqual(
      [
        "category_page",
        "coupon_card",
        "coupon_detail",
        "deals",
        "featured_section",
        "homepage",
        "merchant_page",
        "search_results",
        "sponsored_section",
      ].sort(),
    );
  });

  it("sends a valid impression", () => {
    track("coupon_impression", base);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toMatchObject({
      coupon_id: "c1",
      merchant_id: "m1",
      page_type: "homepage",
      position: 1,
      sponsored: false,
    });
  });

  it("accepts deals-page impressions with a 1-based position", () => {
    track("coupon_impression", { ...base, page_type: "deals", position: 1 });
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      page_type: "deals",
      position: 1,
    }));
    expect(isImpressionPageType("deals")).toBe(true);
  });

  it.each(["listing", "saved", "unknown", "", "Homepage"])(
    "never sends the page type %j, which the backend would reject",
    (page_type) => {
      track("coupon_impression", { ...base, page_type });
      expect(spy).not.toHaveBeenCalled();
      expect(isImpressionPageType(page_type)).toBe(false);
    },
  );

  it.each([0, -1, 101, NaN])("never sends position %s (the backend requires 1 to 100)", (position) => {
    track("coupon_impression", { ...base, position });
    expect(spy).not.toHaveBeenCalled();
  });

  it("counts a coupon once per page view even when it appears in several rows", () => {
    track("coupon_impression", base);
    track("coupon_impression", { ...base, position: 3 });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("counts the same coupon separately in different page contexts", () => {
    track("coupon_impression", base);
    track("coupon_impression", { ...base, page_type: "featured_section" });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("survives a failing request without throwing", () => {
    spy.mockRejectedValue(new Error("422"));
    expect(() => track("coupon_impression", base)).not.toThrow();
  });
});
