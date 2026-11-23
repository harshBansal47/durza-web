import { afterEach, describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";

afterEach(() => vi.unstubAllGlobals());

describe("tracked outbound URLs", () => {
  it("goUrl points at the coupon /go redirect and carries the source tag", () => {
    const url = api.goUrl("abc", "coupon-page");
    expect(url).toContain("/coupons/abc/go?");
    expect(url).toContain("src=coupon-page");
    expect(url).toMatch(/content_ref=/);
  });

  it("goUrl without a source still emits a sub-id so every click is traceable", () => {
    const url = api.goUrl("abc");
    expect(url).toContain("src=");
    expect(url).toContain("content_ref=");
    expect(url).toMatch(/content_ref=[^&]*[0-9a-f]/i);
  });

  it("vcommissionCampaignGoUrl points at the backend campaign redirect", () => {
    const url = api.vcommissionCampaignGoUrl("campaign-1", "campaign-catalog");
    expect(url).toContain("/vcommission/campaigns/campaign-1/go?");
    expect(url).toContain("src=campaign-catalog");
  });

  it("encodes the source tag so it can never break out of the query string", () => {
    const url = api.goUrl("abc", "a&b=c d");
    expect(url).toContain("src=a%26b%3Dc%20d");
    expect(url.split("?")).toHaveLength(2);
  });

  it("serializes every selected store and category facet as repeated query params", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ items: [], total: 0, skip: 0, limit: 20 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await api.listCoupons({ store_ids: ["s1", "s2"], category_ids: ["c1"] });

    const request = fetchMock.mock.calls[0][0] as Request;
    const url = new URL(request.url);
    expect(url.searchParams.getAll("store_ids")).toEqual(["s1", "s2"]);
    expect(url.searchParams.getAll("category_ids")).toEqual(["c1"]);
  });
});
