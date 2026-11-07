import { beforeEach, describe, expect, it, vi } from "vitest";

const getStoreDestination = vi.fn();
vi.mock("@/lib/api", () => ({
  lookup: { getStoreDestination: (...args: unknown[]) => getStoreDestination(...args) },
  resilient: {},
  api: {},
}));

import { generateMetadata } from "../[slug]/page";

const destination = (store: Record<string, unknown>, offers: number) => ({
  store: { id: "s1", name: "Acer", slug: "acer", is_active: true, description: null, ...store },
  deals: [],
  coupons: Array.from({ length: offers }, (_, i) => ({ id: `c${i}`, code: "X" })),
  alternatives: [],
  faqs: [],
  related_content: [],
  offer_total: offers,
});

const meta = (dest: unknown) => {
  getStoreDestination.mockResolvedValue(dest);
  return generateMetadata({ params: Promise.resolve({ slug: "acer" }) });
};

beforeEach(() => getStoreDestination.mockReset());

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
    expect((await meta(null)).robots).toEqual({ index: false, follow: false });
    expect((await meta(destination({ is_active: false }, 3))).robots).toEqual({ index: false, follow: false });
  });
});
