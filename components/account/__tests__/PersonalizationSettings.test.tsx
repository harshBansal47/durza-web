import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PersonalizationSettings from "@/components/account/PersonalizationSettings";

describe("PersonalizationSettings", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("durza_personalization_v1", "accepted");
    localStorage.setItem("durza.taste_v2", '{"version":2,"stores":[{"id":"nike","at":1}]}');
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => [] }));
  });

  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("turns personalization off and deletes local and synced interests", async () => {
    const user = userEvent.setup();
    render(<PersonalizationSettings />);

    await user.click(screen.getByRole("button", { name: "Turn off personalization" }));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/personalization/interests"),
      expect.objectContaining({ method: "DELETE", credentials: "include" }),
    ));
    expect(localStorage.getItem("durza_personalization_v1")).toBe("declined");
    expect(localStorage.getItem("durza.taste_v2")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent(/off/i);
  });

  it("resets local interests without changing consent", async () => {
    const user = userEvent.setup();
    render(<PersonalizationSettings />);

    await user.click(screen.getByRole("button", { name: "Reset my interests" }));

    await waitFor(() => expect(localStorage.getItem("durza.taste_v2")).toBeNull());
    expect(localStorage.getItem("durza_personalization_v1")).toBe("accepted");
    expect(fetch).toHaveBeenCalled();
  });

  it("exports personalization data as a JSON download", async () => {
    const user = userEvent.setup();
    const createObjectURL = vi.fn().mockReturnValue("blob:test");
    const revokeObjectURL = vi.fn();
    vi.stubGlobal("URL", { ...URL, createObjectURL, revokeObjectURL });
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    render(<PersonalizationSettings />);

    await user.click(screen.getByRole("button", { name: "Export my personalization data" }));

    await waitFor(() => expect(createObjectURL).toHaveBeenCalled());
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/personalization/export"),
      expect.objectContaining({ credentials: "include", cache: "no-store" }),
    );
    expect(click).toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent(/export downloaded/i);
  });
});
