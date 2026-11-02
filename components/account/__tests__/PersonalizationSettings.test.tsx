import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PersonalizationSettings from "@/components/account/PersonalizationSettings";
import { personalizationApi } from "@/lib/client-api/personalization";

vi.mock("@/lib/client-api/personalization", () => ({
  personalizationApi: {
    deleteInterests: vi.fn().mockResolvedValue(undefined),
    exportInterests: vi.fn().mockResolvedValue({ interests: [] }),
  },
}));

const { flag } = vi.hoisted(() => ({ flag: { personalizationEnabled: true } }));
vi.mock("@/lib/flags", () => ({
  // A getter, so the test can turn the flag on and off between renders.
  get PERSONALIZATION_ENABLED() {
    return flag.personalizationEnabled;
  },
}));

describe("PersonalizationSettings", () => {
  beforeEach(() => {
    localStorage.clear();
    flag.personalizationEnabled = true;
    localStorage.setItem("durza_personalization_v1", "accepted");
    localStorage.setItem("durza.taste_v2", '{"version":2,"stores":[{"id":"nike","at":1}]}');
    vi.mocked(personalizationApi.deleteInterests).mockResolvedValue(undefined);
    vi.mocked(personalizationApi.exportInterests).mockResolvedValue({ interests: [] });
  });

  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("does not exist while personalization is off", () => {
    flag.personalizationEnabled = false;
    const { container } = render(<PersonalizationSettings />);

    expect(container.innerHTML).toBe("");
    expect(screen.queryByRole("button", { name: "Export my personalization data" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Turn off personalization" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Reset my interests" })).toBeNull();
  });

  it("turns personalization off and deletes local and synced interests", async () => {
    const user = userEvent.setup();
    render(<PersonalizationSettings />);

    await user.click(screen.getByRole("button", { name: "Turn off personalization" }));

    await waitFor(() => expect(personalizationApi.deleteInterests).toHaveBeenCalled());
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
    expect(personalizationApi.deleteInterests).toHaveBeenCalled();
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
    expect(personalizationApi.exportInterests).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent(/export downloaded/i);
  });
});
