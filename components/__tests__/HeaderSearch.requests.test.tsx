import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
}));

import { resetSearchCaches, HeaderSearch } from "@/components/HeaderSearch";
import { api } from "@/lib/api";

/**
 * What the search box costs the API. A keystroke used to mean three requests after 150ms, and
 * merely focusing the box fetched the 100-store directory just to look up logos.
 */
describe("HeaderSearch request cost", () => {
  let autocomplete: ReturnType<typeof vi.spyOn>;
  let listStores: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.useFakeTimers();
    resetSearchCaches();
    window.localStorage.clear();
    autocomplete = vi
      .spyOn(api, "autocomplete")
      .mockResolvedValue({ stores: ["Nike"], categories: [], products: [] });
    listStores = vi
      .spyOn(api, "listStores")
      .mockResolvedValue({ items: [], total: 0, skip: 0, limit: 100 } as never);
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const type = async (value: string) => {
    const input = screen.getByRole("combobox");
    await act(async () => {
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value } });
      await vi.advanceTimersByTimeAsync(300);
    });
  };

  it("fetches nothing just because the box was focused", async () => {
    render(<HeaderSearch />);
    await act(async () => {
      fireEvent.focus(screen.getByRole("combobox"));
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(autocomplete).not.toHaveBeenCalled();
    expect(listStores).not.toHaveBeenCalled();
  });

  it("does one lookup for a query typed in quick succession, not one per keystroke", async () => {
    render(<HeaderSearch />);
    const input = screen.getByRole("combobox");
    await act(async () => {
      fireEvent.focus(input);
      for (const value of ["ni", "nik", "nike"]) {
        fireEvent.change(input, { target: { value } });
        await vi.advanceTimersByTimeAsync(100); // faster than the debounce
      }
      await vi.advanceTimersByTimeAsync(400);
    });
    expect(autocomplete).toHaveBeenCalledTimes(1);
    expect(autocomplete.mock.calls[0][0]).toBe("nike");
  });

  it("loads the store directory only once there are store suggestions to decorate", async () => {
    render(<HeaderSearch />);
    await type("nike");
    expect(listStores).toHaveBeenCalledTimes(1);
  });

  it("does not load the directory when the query matches no store", async () => {
    autocomplete.mockResolvedValue({ stores: [], categories: ["Shoes"], products: [] });
    render(<HeaderSearch />);
    await type("shoes");
    expect(autocomplete).toHaveBeenCalledTimes(1);
    expect(listStores).not.toHaveBeenCalled();
  });

  it("answers a repeated query from memory instead of asking the API again", async () => {
    render(<HeaderSearch />);
    await type("nike");
    await type("nik");
    expect(autocomplete).toHaveBeenCalledTimes(2);
    await type("nike"); // already looked up
    expect(autocomplete).toHaveBeenCalledTimes(2);
  });

  it("does not remember an empty (possibly failed) result", async () => {
    autocomplete.mockResolvedValue({ stores: [], categories: [], products: [] });
    render(<HeaderSearch />);
    await type("zzz");
    await type("zz");
    await type("zzz");
    expect(autocomplete).toHaveBeenCalledTimes(3);
  });
});
