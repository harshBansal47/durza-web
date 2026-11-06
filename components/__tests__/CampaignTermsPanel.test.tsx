import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CampaignTermsPanel from "@/components/CampaignTermsPanel";
import type { AffiliateCampaign } from "@/lib/types";

const campaign = (overrides: Partial<AffiliateCampaign>): AffiliateCampaign =>
  ({ id: "c1", merchant_name: "Example", ...overrides }) as AffiliateCampaign;

const terms = {
  channels: {
    telegram: { status: "allowed" },
    coupon: { status: "allowed" },
    email: { status: "not_allowed" },
    search: { status: "conditional", note: "Only generic" },
  },
  cookie_days: 30,
  validation_days: null,
  brand_bidding_banned: true,
  other_affiliate_code_voids_sale: true,
  payout_structure: "slab",
  approved_codes: ["VCOM15"],
  rules: [{ kind: "other", text: "Rule <script>alert(1)</script> text" }],
  review_reasons: ["code_payout_rule", "validation_missing", "payout_text_differs_from_api"],
};

describe("CampaignTermsPanel", () => {
  it("renders nothing when there are no parsed terms", () => {
    const { container } = render(<CampaignTermsPanel campaign={campaign({ terms: null })} />);
    expect(container.innerHTML).toBe("");
  });

  it("states every channel in words, not colour alone", () => {
    render(<CampaignTermsPanel campaign={campaign({ terms })} />);
    const channels = within(screen.getByRole("list", { name: /promotion channels/i }));

    expect(channels.getByText(/Telegram/).textContent).toContain("Allowed");
    expect(channels.getByText(/Email/).textContent).toContain("Not allowed");
    expect(channels.getByText(/Paid search/).textContent).toMatch(/Conditional.*Only generic/);
    // not mentioned by the advertiser: shown as not stated, never as allowed
    expect(channels.getByText(/^.?\s*SMS/).textContent).toContain("Not stated");
  });

  it("shows cookie and validation, saying 'not stated' rather than inventing a value", () => {
    render(<CampaignTermsPanel campaign={campaign({ terms })} />);
    expect(screen.getByText("30 days")).toBeTruthy();
    expect(screen.getByText("not stated")).toBeTruthy();
    expect(screen.getByText("VCOM15")).toBeTruthy();
  });

  it("flags the risks and the payout caveat", () => {
    render(<CampaignTermsPanel campaign={campaign({ terms })} />);
    expect(screen.getByText(/Brand bidding banned/)).toBeTruthy();
    expect(screen.getByText(/Another affiliate's code can void the sale/)).toBeTruthy();
    expect(screen.getByText(/base rate/i)).toBeTruthy();
  });

  it("only shows the review banner for campaigns that need review, with the real reasons", () => {
    const { rerender } = render(<CampaignTermsPanel campaign={campaign({ terms, needs_review: false })} />);
    expect(screen.queryByRole("note")).toBeNull();

    rerender(<CampaignTermsPanel campaign={campaign({ terms, needs_review: true })} />);
    const note = screen.getByRole("note");
    expect(note.textContent).toMatch(/needs review before promoting/i);
    expect(note.textContent).toMatch(/discount codes affect payout/i);
    // informational reasons are not presented as blockers
    expect(note.textContent).not.toMatch(/validation period not stated/i);
  });

  it("shows advertiser rules as plain text, never as markup", () => {
    const { container } = render(<CampaignTermsPanel campaign={campaign({ terms })} />);
    expect(screen.getByText(/Advertiser rules \(1\)/)).toBeTruthy();
    expect(container.querySelector("script")).toBeNull();
    expect(container.textContent).toContain("<script>alert(1)</script>");
  });
});
