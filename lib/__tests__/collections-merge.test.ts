import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ listEditorial: vi.fn() }));
vi.mock("@/lib/api", () => ({ resilient: mocks }));

import { mergedCollections } from "@/lib/collections";
import { COLLECTIONS } from "@/data/collections";

describe("collection merge", () => {
  beforeEach(() => {
    mocks.listEditorial.mockReset();
    mocks.listEditorial.mockResolvedValue({ items: [], total: 0 });
  });

  it("falls back to static collections when the API is unavailable", async () => {
    mocks.listEditorial.mockRejectedValue(new Error("down"));
    expect(await mergedCollections()).toEqual(COLLECTIONS);
  });

  it("puts published editor collections before static ones", async () => {
    mocks.listEditorial.mockResolvedValue({
      items: [{
        id: "1", content_type: "collection", status: "published", title: "Editor set",
        slug: "editor-set", summary: "Editor written", content_blocks: [
          { type: "collection_item", title: "A", why: "Because", skip_if: "", target_url: "https://example.com/a" },
          { type: "collection_item", title: "B", why: "Because", skip_if: "", target_url: "https://example.com/b" },
          { type: "collection_item", title: "C", why: "Because", skip_if: "", target_url: "https://example.com/c" },
        ],
        structured_data: {}, hero_image_url: null, author_name: null, market: "IN",
        seo_title: null, meta_description: null, canonical_url: null, is_indexable: true,
        is_featured: false, published_at: "2026-11-23T00:00:00Z", created_at: "", updated_at: "",
        relations: [], entity_links: [], faqs: [], adsense_eligible: false,
      }],
      total: 1,
    });
    const merged = await mergedCollections();
    expect(merged[0].slug).toBe("editor-set");
    expect(merged).toHaveLength(COLLECTIONS.length + 1);
  });
});
