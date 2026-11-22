import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/lib/api-error";

const mocks = vi.hoisted(() => ({
  fetchCampaignDashboard: vi.fn(),
  fetchCampaignDetail: vi.fn(),
  approveCampaign: vi.fn(),
  runCampaignHealthCheck: vi.fn(),
  bulkCampaignHealthCheck: vi.fn(),
  deactivateCampaignStore: vi.fn(),
  reactivateCampaign: vi.fn(),
  syncCampaignsNow: vi.fn(),
}));

vi.mock("@/lib/api/admin", () => mocks);

import AdminCampaignsPage from "../campaigns/page";

const awaiting = {
  id: "11111111-1111-4111-8111-111111111111",
  external_campaign_id: "camp-1",
  title: "Summer offer",
  merchant_name: "Example Shop",
  preview_url: null,
  thumbnail_url: null,
  lifecycle_state: "awaiting_approval",
  status: "awaiting_approval",
  is_active: true,
  missed_syncs: 0,
  last_synced_at: "2026-11-20T00:00:00Z",
  last_seen_at: "2026-11-20T00:00:00Z",
  abandoned_at: null,
  needs_review: false,
  store_id: null,
  store_slug: null,
  store_name: null,
  store_logo_url: null,
  store_status: null,
  store_is_active: null,
  custom_store: false,
  health_passed_all: null,
  health_checks: [],
  failure_reasons: [],
  last_health_check_at: null,
  countries: ["IN"],
  categories: ["Fashion"],
};

const attention = {
  ...awaiting,
  id: "22222222-2222-4222-8222-222222222222",
  external_campaign_id: "camp-2",
  title: "Broken store offer",
  lifecycle_state: "integrated",
  status: "needs_attention",
  store_id: "33333333-3333-4333-8333-333333333333",
  store_slug: "example-shop",
  store_name: "Example Shop",
  health_passed_all: false,
  failure_reasons: ["store_logo: store has no logo URL"],
  health_checks: [
    { name: "store_logo", passed: false, reason: "store has no logo URL" },
  ],
};

const summary = {
  all: 2,
  working: 0,
  awaiting_approval: 1,
  needs_attention: 1,
  abandoned: 0,
};

describe("admin campaigns dashboard", () => {
  beforeEach(() => {
    for (const fn of Object.values(mocks)) fn.mockReset();
    mocks.fetchCampaignDashboard.mockResolvedValue({
      items: [awaiting, attention],
      total: 2,
      skip: 0,
      limit: 25,
      summary,
    });
    mocks.fetchCampaignDetail.mockResolvedValue({ ...attention, audit: [] });
    mocks.approveCampaign.mockResolvedValue(awaiting);
    mocks.runCampaignHealthCheck.mockResolvedValue({ passed_all: false, checks: [], failure_reasons: [], checked_by: null });
    mocks.bulkCampaignHealthCheck.mockResolvedValue({ checked: 2, working: 0, needs_attention: 2, failed: [] });
    mocks.syncCampaignsNow.mockResolvedValue({ detail: "ok", status: "success" });
    mocks.deactivateCampaignStore.mockResolvedValue({ detail: "ok", status: "needs_attention" });
    mocks.reactivateCampaign.mockResolvedValue(awaiting);
  });

  it("shows all five sections with counts and the exact health failure", async () => {
    render(<AdminCampaignsPage />);
    expect(await screen.findByText("Summer offer")).toBeTruthy();
    expect(screen.getByRole("tab", { name: /needs attention/i }).textContent).toContain("1");
    expect(screen.getByText(/store has no logo URL/)).toBeTruthy();
    expect(screen.getByText("Custom store")).toBeTruthy();
  });

  it("lets an admin approve an awaiting campaign", async () => {
    render(<AdminCampaignsPage />);
    expect(await screen.findByText("Summer offer")).toBeTruthy();
    await userEvent.click(screen.getAllByRole("button", { name: "Approve" })[0]);
    await waitFor(() => expect(mocks.approveCampaign).toHaveBeenCalledWith(awaiting.id));
  });

  it("opens a detail view with health checks and audit history", async () => {
    render(<AdminCampaignsPage />);
    const name = await screen.findByText("Broken store offer");
    await userEvent.click(name);
    expect(await screen.findByRole("region", { name: "Campaign details" })).toBeTruthy();
    expect(screen.getByText(/store integration health/i)).toBeTruthy();
    expect(mocks.fetchCampaignDetail).toHaveBeenCalledWith(attention.id);
  });

  it("explains a 401 instead of showing an empty list", async () => {
    mocks.fetchCampaignDashboard.mockRejectedValue(new ApiError("denied", 401));
    render(<AdminCampaignsPage />);
    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(screen.getByRole("alert").textContent).toMatch(/sign in as an admin/i);
  });
});
