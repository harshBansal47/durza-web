import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getStoreBySlug: vi.fn(),
  listCoupons: vi.fn(),
}));
vi.mock("@/lib/api", () => ({ api: mocks }));

import { customStoreMetadata } from "@/lib/custom-store-metadata";

const base = { title: "Store guide" };

describe("custom store metadata guard", () => {
  beforeEach(() => {
    mocks.getStoreBySlug.mockReset();
    mocks.listCoupons.mockReset();
    mocks.getStoreBySlug.mockResolvedValue({ id: "s1", slug: "plain-store", name: "Plain Store" });
  });

  it("sets noindex,follow when a custom store has no live offers", async () => {
    mocks.listCoupons.mockResolvedValue({ items: [], total: 0 });
    const meta = await customStoreMetadata("plain-store", base);
    expect(meta.robots).toEqual({ index: false, follow: true });
  });

  it("keeps the page indexable when offers exist", async () => {
    mocks.listCoupons.mockResolvedValue({ items: [{}], total: 1 });
    const meta = await customStoreMetadata("plain-store", base);
    expect(meta.robots).toBeUndefined();
  });

  it("does not deindex on an API failure", async () => {
    mocks.listCoupons.mockRejectedValue(new Error("down"));
    const meta = await customStoreMetadata("plain-store", base);
    expect(meta.robots).toBeUndefined();
  });

  it("keeps documented tool pages indexable", async () => {
    const meta = await customStoreMetadata("firstcry", base);
    expect(meta.robots).toBeUndefined();
    expect(mocks.listCoupons).not.toHaveBeenCalled();
  });
});
