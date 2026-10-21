import { render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PersonalizedModules from "@/components/PersonalizedModules";
import { isPersonalizationAllowed } from "@/lib/consent";

vi.mock("@/lib/consent", () => ({ isPersonalizationAllowed: vi.fn() }));

const mockAllowed = isPersonalizationAllowed as ReturnType<typeof vi.fn>;

describe("PersonalizedModules", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAllowed.mockReturnValue(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does not call the personalization API before consent", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<PersonalizedModules />);
    await Promise.resolve();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("renders nothing during server rendering, so crawlable HTML is unchanged", () => {
    expect(renderToString(<PersonalizedModules />)).toBe("");
  });

  it("shows a plain-language reason when items are returned", async () => {
    mockAllowed.mockReturnValue(true);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ items: [{ title: "A deal" }], reason: "Because you viewed this store." }),
      }),
    );
    render(<PersonalizedModules />);
    await waitFor(() => expect(screen.getByText("A deal")).toBeInTheDocument());
    expect(screen.getByText("Because you viewed this store.")).toBeInTheDocument();
  });
});
