import { render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PersonalizedModules from "@/components/PersonalizedModules";
import { isPersonalizationAllowed } from "@/lib/consent";
import { personalizationApi } from "@/lib/client-api/personalization";

vi.mock("@/lib/consent", () => ({ isPersonalizationAllowed: vi.fn() }));
vi.mock("@/lib/client-api/personalization", () => ({
  personalizationApi: { getPickedForYou: vi.fn() },
}));

// Personalization is off by default: the module must not even ask.
const { flag } = vi.hoisted(() => ({ flag: { personalizationEnabled: true } }));
vi.mock("@/lib/flags", () => ({
  // A getter, so the test can turn the flag on and off between renders.
  get PERSONALIZATION_ENABLED() {
    return flag.personalizationEnabled;
  },
}));

const mockAllowed = isPersonalizationAllowed as ReturnType<typeof vi.fn>;

describe("PersonalizedModules", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    flag.personalizationEnabled = true;
    mockAllowed.mockReturnValue(false);
    vi.mocked(personalizationApi.getPickedForYou).mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does not call the personalization API while the flag is off", async () => {
    flag.personalizationEnabled = false;
    mockAllowed.mockReturnValue(true);
    const { container } = render(<PersonalizedModules />);
    await Promise.resolve();
    expect(personalizationApi.getPickedForYou).not.toHaveBeenCalled();
    expect(container.innerHTML).toBe("");
  });

  it("does not call the personalization API before consent", async () => {
    render(<PersonalizedModules />);
    await Promise.resolve();
    expect(personalizationApi.getPickedForYou).not.toHaveBeenCalled();
  });

  it("renders nothing during server rendering, so crawlable HTML is unchanged", () => {
    expect(renderToString(<PersonalizedModules />)).toBe("");
  });

  it.each([
    { personalization: "accepted", analytics: "accepted", signals: '{"version":2,"stores":[{"id":"nike","at":1}]}' },
    { personalization: "declined", analytics: "declined", signals: null },
    { personalization: null, analytics: null, signals: null },
  ])("server output is identical for %o", ({ personalization, analytics, signals }) => {
    if (personalization) localStorage.setItem("durza_personalization_v1", personalization);
    if (analytics) localStorage.setItem("durza_consent_v1", analytics);
    if (signals) localStorage.setItem("durza.taste_v2", signals);
    expect(renderToString(<PersonalizedModules />)).toBe("");
  });

  it("renders no placeholder, so an empty module cannot shift layout", async () => {
    mockAllowed.mockReturnValue(true);
    vi.mocked(personalizationApi.getPickedForYou).mockResolvedValue({ items: [], reason: "No signal." });
    const { container } = render(<PersonalizedModules />);
    await waitFor(() => expect(personalizationApi.getPickedForYou).toHaveBeenCalled());
    expect(container.innerHTML).toBe("");
  });

  it("explains why an item is shown", async () => {
    mockAllowed.mockReturnValue(true);
    vi.mocked(personalizationApi.getPickedForYou).mockResolvedValue({
      items: [{ title: "A deal" }],
      reason: "Because you viewed this store.",
    });
    render(<PersonalizedModules />);
    await waitFor(() => expect(screen.getByText("A deal")).toBeInTheDocument());
    expect(screen.getByText("Why am I seeing this?")).toBeInTheDocument();
    expect(screen.getByText("Because you viewed this store.")).toBeInTheDocument();
  });
});
