import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConsentPreferences from "@/components/ConsentPreferences";
import { getConsent, getPersonalizationConsent } from "@/lib/consent";

describe("ConsentPreferences", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });

  afterEach(() => {
    window.localStorage.clear();
    vi.unstubAllGlobals();
  });

  it("lets visitors change their analytics choice", async () => {
    const user = userEvent.setup();
    render(<ConsentPreferences />);

    expect(screen.getByText(/not chosen/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Disable analytics" }));
    expect(getConsent()).toBe("declined");
    expect(screen.getByText(/analytics are disabled/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Allow analytics" }));
    expect(getConsent()).toBe("accepted");
    expect(screen.getByText(/analytics are enabled/i)).toBeInTheDocument();
  });

  it("turns personalization off and clears local signals", async () => {
    window.localStorage.setItem("durza_personalization_v1", "accepted");
    window.localStorage.setItem("durza.taste_v2", '{"version":2,"stores":[]}');
    const user = userEvent.setup();
    render(<ConsentPreferences />);

    await user.click(screen.getByRole("button", { name: "Turn off personalization" }));

    await waitFor(() => expect(getPersonalizationConsent()).toBe("declined"));
    expect(window.localStorage.getItem("durza.taste_v2")).toBeNull();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/personalization/interests"),
      expect.objectContaining({ method: "DELETE" }),
    );
  });
});
