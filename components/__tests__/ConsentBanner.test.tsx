import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import ConsentBanner from "@/components/ConsentBanner";
import { getConsent } from "@/lib/consent";

describe("ConsentBanner", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("offers only an accept action", () => {
    render(<ConsentBanner />);

    expect(screen.getByRole("dialog", { name: /cookie and data consent/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept analytics" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /decline/i })).not.toBeInTheDocument();
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
