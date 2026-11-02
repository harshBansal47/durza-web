import { beforeEach, describe, expect, it, vi } from "vitest";

const getAccessToken = vi.hoisted(() => vi.fn());
const apiMock = vi.hoisted(() => ({
  me: vi.fn(),
  listSavedStores: vi.fn(),
  listSavedCoupons: vi.fn(),
  saveStore: vi.fn(),
  saveCoupon: vi.fn(),
  unsaveStore: vi.fn(),
  unsaveCoupon: vi.fn(),
}));

vi.mock("next/headers", () => ({ cookies: vi.fn(), headers: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
// lib/session imports `server-only`, which only resolves inside Next's build, so it is mocked whole.
vi.mock("@/lib/session", () => ({
  getAccessToken,
  setSessionCookies: vi.fn(),
  clearSessionCookies: vi.fn(),
}));
vi.mock("@/lib/api", async (orig) => ({
  ...(await orig<typeof import("@/lib/api")>()),
  api: new Proxy({}, { get: (_t, key: string) => (apiMock as Record<string, unknown>)[key] }),
}));

import { setSavedCouponAction, setSavedStoreAction, trackingStatusAction } from "@/app/account/actions";

describe("trackingStatusAction", () => {
  beforeEach(() => {
    Object.values(apiMock).forEach((fn) => fn.mockReset());
    getAccessToken.mockReset().mockResolvedValue("tok");
  });

  it("makes ONE backend call, and never asks /auth/me again", async () => {
    apiMock.listSavedCoupons.mockResolvedValue([{ kind: "coupon", item_id: "c1", saved_id: "s" }]);
    const status = await trackingStatusAction("coupon", "c1");
    expect(status).toEqual({ signedIn: true, tracking: true });
    expect(apiMock.listSavedCoupons).toHaveBeenCalledTimes(1);
    expect(apiMock.me).not.toHaveBeenCalled();
  });

  it("reports not tracking when the item is not in the saved list", async () => {
    apiMock.listSavedStores.mockResolvedValue([{ kind: "store", item_id: "other", saved_id: "s" }]);
    expect(await trackingStatusAction("store", "s1")).toEqual({ signedIn: true, tracking: false });
  });

  it("makes no backend call at all for a signed-out visitor", async () => {
    getAccessToken.mockResolvedValue(null);
    expect(await trackingStatusAction("coupon", "c1")).toEqual({ signedIn: false, tracking: false });
    expect(apiMock.listSavedCoupons).not.toHaveBeenCalled();
  });

  it("reads a backend failure (e.g. a rejected token) as signed out, as before", async () => {
    apiMock.listSavedCoupons.mockRejectedValue(new Error("401"));
    expect(await trackingStatusAction("coupon", "c1")).toEqual({ signedIn: false, tracking: false });
  });
});

describe("saving and unsaving state the outcome directly", () => {
  beforeEach(() => {
    Object.values(apiMock).forEach((fn) => fn.mockReset().mockResolvedValue(undefined));
    getAccessToken.mockReset().mockResolvedValue("tok");
  });

  it("save = one POST, with no saved-list fetch first", async () => {
    const result = await setSavedCouponAction("c1", true);
    expect(result.error).toBeUndefined();
    expect(apiMock.saveCoupon).toHaveBeenCalledWith("tok", "c1");
    expect(apiMock.listSavedCoupons).not.toHaveBeenCalled();
  });

  it("unsave = one DELETE, with no saved-list fetch first", async () => {
    await setSavedStoreAction("s1", false);
    expect(apiMock.unsaveStore).toHaveBeenCalledWith("tok", "s1");
    expect(apiMock.listSavedStores).not.toHaveBeenCalled();
    expect(apiMock.saveStore).not.toHaveBeenCalled();
  });

  it("surfaces a backend failure as an error result, not a throw", async () => {
    apiMock.saveCoupon.mockRejectedValue(new Error("boom"));
    const result = await setSavedCouponAction("c1", true);
    expect(result.error).toBeTruthy();
  });
});
