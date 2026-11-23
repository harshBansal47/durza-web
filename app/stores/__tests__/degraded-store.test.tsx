import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const mocks = vi.hoisted(() => ({ getStoreDestination: vi.fn() }));
vi.mock("@/lib/api", () => ({ lookup: mocks, api: {}, resilient: {} }));

import StorePage from "../[slug]/page";

describe("store page graceful degradation (Phase 2 T8)", () => {
  it("renders a useful degraded page when the backend is down", async () => {
    mocks.getStoreDestination.mockRejectedValue(new Error("fetch failed"));
    const element = await StorePage({
      params: Promise.resolve({ slug: "bewakoof" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByText(/could not load live offers/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /curated collections/i })).toBeTruthy();
  });
});
