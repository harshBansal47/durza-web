import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import AdSenseSlot from "../AdSenseSlot";

describe("AdSenseSlot", () => {
  afterEach(() => {
    document.querySelectorAll("#google-adsense-script").forEach((node) => node.remove());
    delete (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle;
  });

  it("renders a unit for every eligible article and requests non-personalized ads", async () => {
    const { container } = render(<AdSenseSlot eligible slot="1170962423" />);

    const unit = container.querySelector("ins.adsbygoogle");
    expect(unit).toBeInTheDocument();
    expect(unit).toHaveAttribute("data-ad-client", "ca-pub-2024460550564731");
    expect(unit).toHaveAttribute("data-ad-slot", "1170962423");
    expect(unit).toHaveAttribute("data-ad-format", "auto");
    expect(unit).toHaveAttribute("data-full-width-responsive", "true");

    await waitFor(() => {
      expect(document.getElementById("google-adsense-script")).toBeInTheDocument();
    });
    const script = document.getElementById("google-adsense-script") as HTMLScriptElement;
    script.dispatchEvent(new Event("load"));

    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBe(1);
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
