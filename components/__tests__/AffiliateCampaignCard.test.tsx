import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AffiliateCampaignCard from "@/components/AffiliateCampaignCard";
import type { AffiliateCampaign } from "@/lib/types";

const campaign: AffiliateCampaign = {
  id: "campaign-1",
  title: "Example Merchant Ecommerce CPS - India",
  description: "A publisher partnership campaign.",
  kpi: null,
  merchant_name: "Example Merchant",
  store_id: null,
  preview_url: "https://example.com/",
  thumbnail_url: null,
  categories: ["ecommerce"],
  countries: ["IN"],
  conversion_model: "cps",
  currency: "INR",
  affiliate_payouts: [],
  default_goal: null,
  goals: [],
  device: ["all"],
  operating_system: ["all"],
  app_name: null,
  app_id: null,
  is_active: true,
  last_synced_at: "2026-01-01T00:00:00Z",
  click_url: "/api/v1/vcommission/campaigns/campaign-1/go",
};

describe("AffiliateCampaignCard", () => {
  it("labels publisher compensation separately and uses the tracked campaign redirect", () => {
    render(<AffiliateCampaignCard campaign={campaign} />);

    expect(screen.getByText("Advertiser campaign")).toBeInTheDocument();
    expect(screen.getByText("Publisher compensation")).toBeInTheDocument();
    expect(screen.getByText("See advertiser terms")).toBeInTheDocument();
    expect(screen.getByText("CPS · INR")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view campaign/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/\/vcommission\/campaigns\/campaign-1\/go\?src=campaign-catalog$/),
    );
    expect(screen.queryByText(/discount code|coupon/i)).not.toBeInTheDocument();
  });

  it("does not interpret the payout amount or currency as a shopper discount", () => {
    render(
      <AffiliateCampaignCard
        campaign={{
          ...campaign,
          affiliate_payouts: [{ amount: 12, currency: "INR" }],
        }}
      />,
    );

    expect(screen.getByText("Payout terms supplied by the advertiser")).toBeInTheDocument();
    expect(screen.queryByText("12 INR")).not.toBeInTheDocument();
  });
});
