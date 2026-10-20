import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AdSenseSlot from "../AdSenseSlot";

vi.mock("@/lib/consent", () => ({
  getConsent: () => "accepted",
  onConsentChange: () => () => {},
}));

describe("AdSenseSlot", () => {
  afterEach(() => {
    document.querySelectorAll("#google-adsense-script").forEach((node) => node.remove());
    delete (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle;
  });

  it("renders the configured unit and publisher after consent", async () => {
    const { container } = render(<AdSenseSlot eligible slot="1170962423" />);

    await waitFor(() => {
      expect(container.querySelector("ins.adsbygoogle")).toBeInTheDocument();
    });

    const unit = container.querySelector("ins.adsbygoogle");
    expect(unit).toHaveAttribute("data-ad-client", "ca-pub-2024460550564731");
    expect(unit).toHaveAttribute("data-ad-slot", "1170962423");
    expect(unit).toHaveAttribute("data-ad-format", "auto");
    expect(unit).toHaveAttribute("data-full-width-responsive", "true");
  });

  it("renders nothing when the article is not ads-eligible", () => {
    const { container } = render(<AdSenseSlot eligible={false} slot="1170962423" />);
    expect(container.querySelector("ins.adsbygoogle")).not.toBeInTheDocument();
  });

  it("renders nothing without a slot id", () => {
    const { container } = render(<AdSenseSlot eligible slot="" />);
    expect(container.querySelector("ins.adsbygoogle")).not.toBeInTheDocument();
  });
});
