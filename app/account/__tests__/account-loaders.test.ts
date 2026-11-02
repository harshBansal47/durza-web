import { beforeEach, describe, expect, it, vi } from "vitest";

const apiMocks = vi.hoisted(() => ({
  me: vi.fn(),
  listSavedStores: vi.fn(),
  listSavedCoupons: vi.fn(),
  listTrackedProducts: vi.fn(),
  getNotificationPreferences: vi.fn(),
  listAlerts: vi.fn(),
}));

vi.mock("@/lib/api", () => ({
  api: apiMocks,
  ApiError: class ApiError extends Error {},
}));

vi.mock("@/lib/session", () => ({
  clearSessionCookies: vi.fn(),
  getAccessToken: vi.fn(async () => "test-token"),
  setSessionCookies: vi.fn(),
}));

import {
  requireAccount,
  requireAccountUser,
  requireAlertsAccount,
  requireNotificationAccount,
  requireSavedAccount,
  requireTrackedAccount,
} from "@/app/account/actions";

const accountApiMethods = [
  "me",
  "listSavedStores",
  "listSavedCoupons",
  "listTrackedProducts",
  "getNotificationPreferences",
  "listAlerts",
] as const;

beforeEach(() => {
  vi.clearAllMocks();
  apiMocks.me.mockResolvedValue({ id: "user-1" });
  apiMocks.listSavedStores.mockResolvedValue([]);
  apiMocks.listSavedCoupons.mockResolvedValue([]);
  apiMocks.listTrackedProducts.mockResolvedValue([]);
  apiMocks.getNotificationPreferences.mockResolvedValue({ email_enabled: true });
  apiMocks.listAlerts.mockResolvedValue([]);
});

describe("account page data loaders", () => {
  it("loads only the user for settings", async () => {
    await requireAccountUser();

    expect(apiMocks.me).toHaveBeenCalledWith("test-token");
    for (const method of accountApiMethods.slice(1)) {
      expect(apiMocks[method]).not.toHaveBeenCalled();
    }
  });

  it("loads only saved items for the saved page", async () => {
    await requireSavedAccount();

    expect(apiMocks.me).toHaveBeenCalledOnce();
    expect(apiMocks.listSavedStores).toHaveBeenCalledOnce();
    expect(apiMocks.listSavedCoupons).toHaveBeenCalledOnce();
    expect(apiMocks.listTrackedProducts).not.toHaveBeenCalled();
    expect(apiMocks.getNotificationPreferences).not.toHaveBeenCalled();
    expect(apiMocks.listAlerts).not.toHaveBeenCalled();
  });

  it("loads only tracked products for the tracked page", async () => {
    await requireTrackedAccount();

    expect(apiMocks.me).toHaveBeenCalledOnce();
    expect(apiMocks.listTrackedProducts).toHaveBeenCalledOnce();
    expect(apiMocks.listSavedStores).not.toHaveBeenCalled();
    expect(apiMocks.listSavedCoupons).not.toHaveBeenCalled();
    expect(apiMocks.getNotificationPreferences).not.toHaveBeenCalled();
    expect(apiMocks.listAlerts).not.toHaveBeenCalled();
  });

  it("loads only alert history for the alerts page", async () => {
    await requireAlertsAccount();

    expect(apiMocks.me).toHaveBeenCalledOnce();
    expect(apiMocks.listAlerts).toHaveBeenCalledWith("test-token", 50);
    expect(apiMocks.listSavedStores).not.toHaveBeenCalled();
    expect(apiMocks.listSavedCoupons).not.toHaveBeenCalled();
    expect(apiMocks.listTrackedProducts).not.toHaveBeenCalled();
    expect(apiMocks.getNotificationPreferences).not.toHaveBeenCalled();
  });

  it("loads only notification preferences for notification settings", async () => {
    await requireNotificationAccount();

    expect(apiMocks.me).toHaveBeenCalledOnce();
    expect(apiMocks.getNotificationPreferences).toHaveBeenCalledOnce();
    expect(apiMocks.listSavedStores).not.toHaveBeenCalled();
    expect(apiMocks.listSavedCoupons).not.toHaveBeenCalled();
    expect(apiMocks.listTrackedProducts).not.toHaveBeenCalled();
    expect(apiMocks.listAlerts).not.toHaveBeenCalled();
  });

  it("keeps the full data set on the account overview", async () => {
    await requireAccount();

    for (const method of accountApiMethods) {
      expect(apiMocks[method]).toHaveBeenCalledOnce();
    }
    expect(apiMocks.listAlerts).toHaveBeenCalledWith("test-token", 20);
  });
});
