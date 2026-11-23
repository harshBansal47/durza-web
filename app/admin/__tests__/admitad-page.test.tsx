import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/lib/api-error";

const mocks = vi.hoisted(() => ({
  fetchAdmitadPrograms: vi.fn(),
  fetchAdmitadProgramDetail: vi.fn(),
  fetchAdmitadSyncHistory: vi.fn(),
  fetchAdmitadIngestionHealth: vi.fn(),
  fetchMerchantAliases: vi.fn(),
  approveAdmitadProgram: vi.fn(),
  checkAdmitadProgram: vi.fn(),
  bulkCheckAdmitadPrograms: vi.fn(),
  deactivateAdmitadStore: vi.fn(),
  reactivateAdmitadProgram: vi.fn(),
  resolveMerchantAlias: vi.fn(),
  runAdmitadIngestion: vi.fn(),
  syncAdmitadPrograms: vi.fn(),
}));

vi.mock("@/lib/api/admin", () => mocks);

import AdminAdmitadPage from "../admitad/page";

const awaiting = {
  id: "11111111-1111-4111-8111-111111111111",
  external_campaign_id: "141228",
  title: "Milton — Admitad",
  merchant_name: "Milton",
  preview_url: "https://milton.in",
  thumbnail_url: null,
  network: "admitad",
  lifecycle_state: "awaiting_approval",
  status: "awaiting_approval",
  is_active: true,
  missed_syncs: 0,
  last_synced_at: "2026-11-22T00:00:00Z",
  last_seen_at: "2026-11-22T00:00:00Z",
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
  cross_network: {
    vcommission_campaign_id: null,
    vcommission_status: null,
    vcommission_external_id: null,
    vcommission_active: false,
    preferred_network: "admitad",
  },
  countries: ["IN"],
  categories: ["Home"],
};

const attention = {
  ...awaiting,
  id: "22222222-2222-4222-8222-222222222222",
  external_campaign_id: "42616",
  merchant_name: "Bewakoof",
  status: "needs_attention",
  lifecycle_state: "integrated",
  store_id: "33333333-3333-4333-8333-333333333333",
  store_slug: "bewakoof",
  store_name: "Bewakoof",
  health_passed_all: false,
  failure_reasons: ["store_logo: store has no logo URL"],
  health_checks: [{ name: "store_logo", passed: false, reason: "store has no logo URL" }],
  cross_network: {
    vcommission_campaign_id: "44444444-4444-4444-8444-444444444444",
    vcommission_status: "integrated",
    vcommission_external_id: "10248",
    vcommission_active: true,
    preferred_network: "admitad",
  },
};

const summary = { all: 2, working: 0, awaiting_approval: 1, needs_attention: 1, abandoned: 0 };

describe("Admitad program manager", () => {
  beforeEach(() => {
    for (const fn of Object.values(mocks)) fn.mockReset();
    mocks.fetchAdmitadPrograms.mockResolvedValue({ items: [awaiting, attention], total: 2, skip: 0, limit: 25, summary });
    mocks.fetchAdmitadProgramDetail.mockResolvedValue({ ...attention, audit: [] });
    mocks.fetchAdmitadSyncHistory.mockResolvedValue({ runs: [], last_successful_at: null });
    mocks.fetchAdmitadIngestionHealth.mockResolvedValue({
      enabled: true, configured: true, api_status: "healthy", consecutive_failures: 0,
      last_sync_at: null, last_success_at: null, last_error: null, latest_run: null,
    });
    mocks.fetchMerchantAliases.mockResolvedValue([]);
    mocks.approveAdmitadProgram.mockResolvedValue(awaiting);
    mocks.checkAdmitadProgram.mockResolvedValue({ passed_all: false, checks: [], failure_reasons: [], checked_by: null });
    mocks.bulkCheckAdmitadPrograms.mockResolvedValue({ checked: 2, working: 0, needs_attention: 2, failed: [] });
    mocks.reactivateAdmitadProgram.mockResolvedValue(awaiting);
    mocks.deactivateAdmitadStore.mockResolvedValue({ detail: "ok", status: "needs_attention" });
    mocks.resolveMerchantAlias.mockResolvedValue({ detail: "ok" });
    mocks.runAdmitadIngestion.mockResolvedValue({ detail: "started", status: "started" });
    mocks.syncAdmitadPrograms.mockResolvedValue({ detail: "ok", status: "success" });
  });

  it("shows program sections, cross-network info and the exact health failure", async () => {
    render(<AdminAdmitadPage />);
    expect(await screen.findByText("Milton")).toBeTruthy();
    expect(screen.getByRole("tab", { name: /needs attention/i }).textContent).toContain("1");
    expect(screen.getByText(/store has no logo URL/)).toBeTruthy();
    expect(screen.getByText(/VC 10248/)).toBeTruthy();
    expect(screen.getAllByText("Custom")).toBeTruthy();
  });

  it("approves an awaiting program", async () => {
    render(<AdminAdmitadPage />);
    expect(await screen.findByText("Milton")).toBeTruthy();
    await userEvent.click(screen.getAllByRole("button", { name: "Approve" })[0]);
    await waitFor(() => expect(mocks.approveAdmitadProgram).toHaveBeenCalledWith(awaiting.id));
  });

  it("exposes program sync and coupon ingestion as separate controls", async () => {
    render(<AdminAdmitadPage />);
    expect(await screen.findByText("Milton")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: /run admitad ingestion now/i }));
    await waitFor(() => expect(mocks.runAdmitadIngestion).toHaveBeenCalled());
    await userEvent.click(screen.getByRole("button", { name: /sync programs now/i }));
    await waitFor(() => expect(mocks.syncAdmitadPrograms).toHaveBeenCalled());
  });

  it("explains a 401", async () => {
    mocks.fetchAdmitadPrograms.mockRejectedValue(new ApiError("denied", 401));
    render(<AdminAdmitadPage />);
    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(screen.getByRole("alert").textContent).toMatch(/sign in as an admin/i);
  });
});
