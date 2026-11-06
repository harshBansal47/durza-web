import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchCampaigns = vi.fn();
vi.mock("@/lib/api/admin", () => ({ fetchAffiliateCampaigns: (...a: unknown[]) => fetchCampaigns(...a) }));

import AdminCampaignsPage from "../campaigns/page";

const campaign = {
  id: "c1",
  title: "Summer offer",
  description: "Advertiser text",
  kpi: null,
  merchant_name: "Example Shop",
  store_id: null,
  preview_url: null,
  thumbnail_url: null,
  categories: ["fashion"],
  countries: ["IN"],
  conversion_model: "CPS",
  currency: "INR",
  affiliate_payouts: [{ amount: 12 }],
  default_goal: null,
  goals: null,
  device: null,
  operating_system: null,
  app_name: null,
  app_id: null,
  is_active: true,
  last_synced_at: "2026-11-05T00:00:00Z",
  click_url: "/api/v1/vcommission/campaigns/c1/go",
};

describe("admin campaigns page", () => {
  // Braces matter: a function returned from beforeEach is run as a teardown hook.
  beforeEach(() => {
    fetchCampaigns.mockReset();
  });

  it("lists campaigns and tags preview clicks so they are not counted as shopper traffic", async () => {
    fetchCampaigns.mockResolvedValue({ items: [campaign], total: 1, skip: 0, limit: 20 });
    render(<AdminCampaignsPage />);

    expect(await screen.findByText("Example Shop")).toBeTruthy();
    const link = screen.getByRole("link", { name: /view campaign/i }) as HTMLAnchorElement;
    expect(link.href).toContain("src=admin-preview");
    expect(link.href).not.toContain("campaign-catalog");
  });

  it.each([
    [401, /sign in as an admin/i],
    [403, /not an admin/i],
  ])("explains a %s instead of showing an empty list", async (status, message) => {
    fetchCampaigns.mockRejectedValue({ response: { status } });
    render(<AdminCampaignsPage />);

    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(screen.getByRole("alert").textContent).toMatch(message);
    expect(screen.queryByText("Example Shop")).toBeNull();
  });

  it("filters to the review queue", async () => {
    fetchCampaigns.mockResolvedValue({ items: [], total: 0, skip: 0, limit: 20 });
    render(<AdminCampaignsPage />);
    await screen.findByText(/no campaigns match/i);
    expect(fetchCampaigns.mock.calls.at(-1)![0].needs_review).toBeUndefined();

    await userEvent.click(screen.getByRole("checkbox", { name: /needs review only/i }));

    await waitFor(() => expect(fetchCampaigns.mock.calls.at(-1)![0].needs_review).toBe(true));
  });
});
