import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConsentPreferences from "@/components/ConsentPreferences";
import { getConsent, getPersonalizationConsent } from "@/lib/consent";

// The personalization controls only exist when personalization is switched
// on, and the flag defaults to false.
const { flag } = vi.hoisted(() => ({ flag: { personalizationEnabled: true } }));
vi.mock("@/lib/flags", () => ({
  // A getter, so the test can turn the flag on and off between renders.
  get PERSONALIZATION_ENABLED() {
    return flag.personalizationEnabled;
  },
}));

describe("ConsentPreferences", () => {
  beforeEach(() => {
    window.localStorage.clear();
    flag.personalizationEnabled = true;
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

  it("shows no personalization control while the flag is off", () => {
    flag.personalizationEnabled = false;
    render(<ConsentPreferences />);

    expect(screen.queryByRole("button", { name: "Personalize my experience" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Turn off personalization" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Reset my interests" })).toBeNull();
    // The analytics controls are unaffected.
    expect(screen.getByRole("button", { name: "Allow analytics" })).toBeInTheDocument();
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
