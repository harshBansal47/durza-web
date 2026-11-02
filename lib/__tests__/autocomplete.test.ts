import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { api, resetSuggestProbe } from "@/lib/api";

const json = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }));

describe("api.autocomplete", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  const asUrl = (input: unknown) =>
    typeof Request !== "undefined" && input instanceof Request ? input.url : String(input);
  const urls = () => fetchMock.mock.calls.map((c) => asUrl(c[0]));

  beforeEach(() => {
    resetSuggestProbe();
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("asks for all three groups in ONE request", async () => {
    fetchMock.mockImplementation(() => json({ stores: ["Nike"], categories: ["Shoes"], products: [] }));
    const result = await api.autocomplete("ni", { limit: 5 });
    expect(result).toEqual({ stores: ["Nike"], categories: ["Shoes"], products: [] });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(urls()[0]).toContain("/search/suggest?");
    expect(urls()[0]).toContain("q=ni");
    expect(urls()[0]).toContain("limit=5");
  });

  it("falls back to the three separate endpoints when the API predates /search/suggest", async () => {
    fetchMock.mockImplementation((input: unknown) => {
      const url = asUrl(input);
      if (url.includes("/search/suggest")) return json({ detail: "Not Found" }, 404);
      if (url.includes("/stores/")) return json(["Nike"]);
      if (url.includes("/categories/")) return json(["Shoes"]);
      return json(["Air Max"]);
    });
    const result = await api.autocomplete("ni");
    expect(result).toEqual({ stores: ["Nike"], categories: ["Shoes"], products: ["Air Max"] });
    expect(fetchMock).toHaveBeenCalledTimes(4); // 1 probe + 3 fallback

    // ...and it remembers, so the next keystroke does not probe again.
    fetchMock.mockClear();
    await api.autocomplete("nik");
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(urls().some((u) => u.includes("/search/suggest"))).toBe(false);
  });

  it("does NOT fall back on a server error: an empty result, not three more requests", async () => {
    fetchMock.mockImplementation(() => json({ detail: "boom" }, 500));
    const result = await api.autocomplete("ni");
    expect(result).toEqual({ stores: [], categories: [], products: [] });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns empty groups instead of throwing when the network is down", async () => {
    fetchMock.mockRejectedValue(new TypeError("offline"));
    await expect(api.autocomplete("ni")).resolves.toEqual({ stores: [], categories: [], products: [] });
  });
});
