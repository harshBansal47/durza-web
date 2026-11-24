import { beforeEach, describe, expect, it, vi } from "vitest";

const getStoreDestination = vi.fn();
vi.mock("@/lib/api", () => ({
  ApiError: class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) { super(message); this.status = status; }
  },
  lookup: { getStoreDestination: (...args: unknown[]) => getStoreDestination(...args) },
  resilient: {},
  api: {},
}));

// notFound() throws a special Next.js error that the runtime catches to render
// the 404 page. We track calls via the module mock.
vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => { throw new Error("NEXT_NOT_FOUND"); }),
}));

import { generateMetadata } from "../[slug]/page";
import * as navigation from "next/navigation";

const destination = (store: Record<string, unknown>, offers: number) => ({
  store: { id: "s1", name: "Acer", slug: "generic-store", is_active: true, description: null, ...store },
  deals: [],
  coupons: Array.from({ length: offers }, (_, i) => ({ id: `c${i}`, code: "X" })),
  alternatives: [],
  faqs: [],
  related_content: [],
  offer_total: offers,
});

const meta = (dest: unknown) => {
  getStoreDestination.mockResolvedValue(dest);
  return generateMetadata({ params: Promise.resolve({ slug: "generic-store" }), searchParams: Promise.resolve({}) });
};

beforeEach(() => { getStoreDestination.mockReset(); vi.mocked(navigation.notFound).mockClear(); });

describe("store page indexing", () => {
  it("keeps a store with no offers and nothing written about it out of search results", async () => {
    const result = await meta(destination({}, 0));
    expect(result.robots).toEqual({ index: false, follow: true });
  });

  it("treats a blank description as nothing written", async () => {
    const result = await meta(destination({ description: "   " }, 0));
    expect(result.robots).toEqual({ index: false, follow: true });
  });

  it("indexes a store with no offers once someone has written about it", async () => {
    const result = await meta(destination({ description: "Acer makes laptops and monitors." }, 0));
    expect(result.robots).toBeUndefined();
  });

  it("indexes a store that has offers", async () => {
    const result = await meta(destination({}, 3));
    expect(result.robots).toBeUndefined();
    expect(String(result.title)).toMatch(/3 Live Offers/);
  });

  it("still refuses to index a missing or inactive store", async () => {
    // A missing store now triggers notFound() — which throws in both the test
    // and the real Next.js runtime — rather than returning a 200 with noindex.
    // This is the fix for the HTTP 200 bug: the 404 HTTP status is now set by
    // generateMetadata itself, not deferred to the page component.
    await expect(meta(null)).rejects.toThrow("NEXT_NOT_FOUND");
    expect(vi.mocked(navigation.notFound)).toHaveBeenCalled();
    vi.mocked(navigation.notFound).mockClear();
    await expect(meta(destination({ is_active: false }, 3))).rejects.toThrow("NEXT_NOT_FOUND");
    expect(vi.mocked(navigation.notFound)).toHaveBeenCalled();
  });
});
