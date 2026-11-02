import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConsentBanner from "@/components/ConsentBanner";
import { getConsent } from "@/lib/consent";
import { personalizationApi } from "@/lib/client-api/personalization";

describe("ConsentBanner", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    vi.unstubAllGlobals();
  });

  it("offers accept and decline actions", () => {
    render(<ConsentBanner />);

    expect(screen.getByRole("dialog", { name: /cookie and data consent/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept analytics" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /decline/i })).toBeInTheDocument();
  });

  it("re-issues the consent cookie for a returning visitor who accepted", async () => {
    // The visitor accepted in an earlier visit. The banner does not show —
    // there is a choice — but the server may have no cookie for them, so the
    // storefront asks for one on load.
    window.localStorage.setItem("durza_consent_v1", "accepted");
    const postConsent = vi.spyOn(personalizationApi, "postConsent").mockResolvedValue(true);

    render(<ConsentBanner />);

    await waitFor(() => expect(postConsent).toHaveBeenCalledTimes(1));
    expect(postConsent).toHaveBeenCalledWith("accepted");
    expect(screen.queryByRole("dialog", { name: /cookie and data consent/i })).not.toBeInTheDocument();
  });

  it("stores acceptance and dismisses the banner", async () => {
    const user = userEvent.setup();
    render(<ConsentBanner />);

    await user.click(screen.getByRole("button", { name: "Accept analytics" }));

    expect(getConsent()).toBe("accepted");
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /cookie and data consent/i })).not.toBeInTheDocument();
    });
  });
});
