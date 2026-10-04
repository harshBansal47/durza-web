import { beforeEach, describe, expect, it } from "vitest";
import {
  getFollowedStores,
  getSavedCouponIds,
  getSignals,
  isStoreFollowed,
  recordCouponClick,
  recordCouponView,
  recordStoreView,
  toggleFollowedStore,
} from "@/lib/personalization";

describe("personalization signals", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty — recommendations must not invent taste", () => {
    expect(getSignals()).toEqual({ stores: [], coupons: [], clicked: [], saved: [], followed: [], searches: [] });
    expect(getSavedCouponIds()).toEqual([]);
    expect(getFollowedStores()).toEqual([]);
  });

  it("records store and coupon views most-recent-first without duplicates", () => {
    recordStoreView("nike");
    recordStoreView("adidas");
    recordStoreView("nike");
    expect(getSignals().stores).toEqual(["nike", "adidas"]);

    recordCouponView("c1");
    recordCouponClick("c1");
    expect(getSignals().coupons).toEqual(["c1"]);
    expect(getSignals().clicked).toEqual(["c1"]);
  });

  it("toggles followed stores", () => {
    expect(isStoreFollowed("nike")).toBe(false);
    expect(toggleFollowedStore("nike")).toBe(true);
    expect(isStoreFollowed("nike")).toBe(true);
    expect(toggleFollowedStore("nike")).toBe(false);
    expect(getFollowedStores()).toEqual([]);
  });

  it("survives corrupt storage rather than crashing the page", () => {
    localStorage.setItem("couponza.recent_stores", "not-json{{{");
    expect(getSignals().stores).toEqual([]);
  });
});
