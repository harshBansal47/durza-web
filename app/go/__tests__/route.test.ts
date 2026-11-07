import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET, HEAD } from "../[slug]/route";

const fetchMock = vi.fn();

function request(path: string, headers: Record<string, string> = {}) {
  return new NextRequest(`https://durza.example${path}`, { headers });
}

const ctx = (slug: string) => ({ params: Promise.resolve({ slug }) });

function backend(status: number, location?: string) {
  return new Response(null, { status, headers: location ? { location } : {} });
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

describe("GET /go/{slug}", () => {
  it("relays the API's redirect and never lets it be cached or indexed", async () => {
    fetchMock.mockResolvedValue(backend(302, "https://track.example/offer?x=1"));

    const response = await GET(request("/go/acer?src=store-page"), ctx("acer"));

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe("https://track.example/offer?x=1");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toMatch(/noindex/);
  });

  it("forwards the visitor and the click source to the API, and nothing else", async () => {
    fetchMock.mockResolvedValue(backend(302, "https://shop.example"));

    await GET(
      request("/go/acer?src=telegram&content_ref=post-9&evil=1&token=secret", {
        "user-agent": "Mozilla/5.0 test",
        "x-forwarded-for": "203.0.113.7, 10.0.0.1",
        cookie: "durza_refresh=SECRET",
        authorization: "Bearer SECRET",
      }),
      ctx("acer"),
    );

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit & { headers: Record<string, string> }];
    const target = new URL(url);
    expect(target.pathname.endsWith("/stores/by-slug/acer/go")).toBe(true);
    expect(Object.fromEntries(target.searchParams)).toEqual({ src: "telegram", content_ref: "post-9" });
    expect(init.redirect).toBe("manual");
    expect(init.headers["user-agent"]).toBe("Mozilla/5.0 test");
    expect(init.headers["x-forwarded-for"]).toBe("203.0.113.7"); // the visitor, not the proxy chain
    // credentials must never be forwarded to the API from a public redirect
    expect(Object.keys(init.headers).sort()).toEqual(["user-agent", "x-forwarded-for"]);
  });

  it("sends the shopper to our own store page when the API has nowhere to send them", async () => {
    fetchMock.mockResolvedValue(backend(404));
    const response = await GET(request("/go/acer"), ctx("acer"));
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe("https://durza.example/stores/acer");
  });

  it("does the same when the API is unreachable or slow", async () => {
    fetchMock.mockRejectedValue(new Error("network down"));
    const response = await GET(request("/go/acer"), ctx("acer"));
    expect(response.headers.get("location")).toBe("https://durza.example/stores/acer");
  });

  it.each(["javascript:alert(1)", "data:text/html,hi", "ftp://x.example", "not a url", ""])(
    "refuses to relay a non-web destination (%j)",
    async (bad) => {
      fetchMock.mockResolvedValue(backend(302, bad));
      const response = await GET(request("/go/acer"), ctx("acer"));
      expect(response.headers.get("location")).toBe("https://durza.example/stores/acer");
    },
  );

  it("does not treat a non-redirect response as a destination", async () => {
    fetchMock.mockResolvedValue(new Response("hi", { status: 200, headers: { location: "https://evil.example" } }));
    const response = await GET(request("/go/acer"), ctx("acer"));
    expect(response.headers.get("location")).toBe("https://durza.example/stores/acer");
  });

  it("never calls the API for a slug that cannot be a store", async () => {
    const response = await GET(request("/go/..%2Fadmin"), ctx("../admin"));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(response.headers.get("location")).toBe("https://durza.example/stores");
  });
});

describe("HEAD /go/{slug}", () => {
  it("is not a click: link previews and crawlers never reach the API", () => {
    const response = HEAD();
    expect(response.status).toBe(204);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(response.headers.get("x-robots-tag")).toMatch(/noindex/);
  });
});
