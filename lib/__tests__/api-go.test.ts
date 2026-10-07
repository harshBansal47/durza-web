import { afterEach, describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";

afterEach(() => vi.unstubAllGlobals());

describe("tracked outbound URLs", () => {
  it("goUrl points at the coupon /go redirect and carries the source tag", () => {
    const url = api.goUrl("abc", "coupon-page");
    expect(url).toMatch(/\/coupons\/abc\/go\?src=coupon-page$/);
  });

  it("goUrl without a source adds no query string", () => {
    expect(api.goUrl("abc")).toMatch(/\/coupons\/abc\/go$/);
  });

  it("productGoUrl points at the product /go redirect", () => {
    expect(api.productGoUrl("p1", "product-page")).toMatch(/\/products\/p1\/go\?src=product-page$/);
  });

  it("encodes the source tag so it can never break out of the query string", () => {
    const url = api.goUrl("abc", "a&b=c d");
    expect(url).toContain("src=a%26b%3Dc%20d");
    expect(url.split("?")).toHaveLength(2);
  });

  it("serializes every selected store and category facet as repeated query params", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ items: [], total: 0, skip: 0, limit: 20 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await api.listCoupons({ store_ids: ["s1", "s2"], category_ids: ["c1"] });

    const url = new URL(String(fetchMock.mock.calls[0][0]));
    expect(url.searchParams.getAll("store_ids")).toEqual(["s1", "s2"]);
    expect(url.searchParams.getAll("category_ids")).toEqual(["c1"]);
  });
});
