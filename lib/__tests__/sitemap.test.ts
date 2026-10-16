import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { GET } from "@/app/sitemap/[...path]/route";
import { SITEMAP_CHUNK_SIZE, BACKEND_MAX_LIMIT, sitemapIds } from "@/lib/sitemap-groups";
import { ApiError, api } from "@/lib/api";
import type { CouponPublic } from "@/lib/types";

/**
 * D1 regression tests: sitemap shards must contain URLs, must never
 * request above the backend's maximum page size (100), must surface
 * API failures instead of silently publishing empty shards, and the
 * shard count must be non-zero.
 */

// The sitemap path uses the raw `api` client (not `resilient`) so a
// backend failure surfaces as an HTTP 500 instead of an empty shard.
vi.mock("@/lib/api", () => ({
  ApiError: class ApiError extends Error {
    constructor(message: string, public status: number) {
      super(message);
    }
  },
  api: {
    listCoupons: vi.fn(),
    listStores: vi.fn(),
    listCategories: vi.fn(),
    listEditorial: vi.fn(() => Promise.resolve({ items: [], total: 0, skip: 0, limit: 0 })),
  },
}));

const listCoupons = vi.mocked(api.listCoupons);
const listStores = vi.mocked(api.listStores);
const listCategories = vi.mocked(api.listCategories);
const listEditorial = vi.mocked(api.listEditorial);

function makeCoupons(count: number, start = 0): CouponPublic[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `c${start + i}`,
    slug: `coupon-${start + i}`,
    title: `Coupon ${start + i}`,
    code: `CODE${start + i}`,
    description: null,
    discount_type: "percentage" as const,
    discount_value: 10,
    store_id: "s1",
    category_id: "cat1",
    expires_at: null,
    is_active: true,
    views_count: 0,
    clicks_count: 0,
    success_count: 0,
    fail_count: 0,
    last_verified_at: null,
    success_rate: null,
    verification_status: "unverified" as const,
    created_at: "2026-01-01T00:00:00Z",
  }));
}

const emptyPage = { items: [], total: 0, skip: 0, limit: 0 };

/** A backend that serves `total` coupons, `BACKEND_MAX_LIMIT` at a time. */
function paginatedBackend(total: number) {
  return listCoupons.mockImplementation(async (params = {}) => {
    const skip = params.skip ?? 0;
    const limit = Math.min(params.limit ?? 20, BACKEND_MAX_LIMIT);
    const remaining = Math.max(total - skip, 0);
    const count = Math.min(limit, remaining);
    return { items: makeCoupons(count, skip), total, skip, limit };
  });
}

function shardRequest(id: string) {
  return GET(new Request(`http://localhost:3000/sitemap/${id}.xml`), {
    params: Promise.resolve({ path: [`${id}.xml`] }),
  });
}

describe("sitemap shards (D1)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    listCoupons.mockResolvedValue(emptyPage);
    listStores.mockResolvedValue(emptyPage);
    listCategories.mockResolvedValue(emptyPage);
    listEditorial.mockResolvedValue(emptyPage);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("chunk size requires batching against the backend maximum", () => {
    // The core invariant: shards cover SITEMAP_CHUNK_SIZE URLs, but no
    // single request may exceed the backend's hard limit of 100.
    expect(BACKEND_MAX_LIMIT).toBe(100);
    expect(SITEMAP_CHUNK_SIZE).toBeGreaterThan(BACKEND_MAX_LIMIT);
  });

  it("coupon shard contains URLs and never requests above the backend limit", async () => {
    paginatedBackend(250);
    listStores.mockResolvedValue(emptyPage);
    listCategories.mockResolvedValue(emptyPage);

    const response = await shardRequest("coupons-0");

    expect(response.status).toBe(200);
    const xml = await response.text();
    expect(xml).toContain("<loc>http://localhost:3000/coupons/coupon-0</loc>");
    expect(xml).toContain("<loc>http://localhost:3000/coupons/coupon-249</loc>");
    // The whole shard is published: 250 URLs.
    expect((xml.match(/<loc>/g) ?? []).length).toBe(250);

    // Every individual request stays within the backend limit. The
    // first call is sitemapIds()'s probe (limit: 1); the three
    // after it are fetchBatch's pages of BACKEND_MAX_LIMIT.
    const limits = listCoupons.mock.calls.map((call) => call[0]?.limit ?? 0);
    for (const limit of limits) {
      expect(limit).toBeLessThanOrEqual(BACKEND_MAX_LIMIT);
    }
    expect(limits.filter((limit) => limit === BACKEND_MAX_LIMIT).length).toBe(3);
  });

  it("store and category shards contain URLs", async () => {
    listCoupons.mockResolvedValue(emptyPage);
    listStores.mockResolvedValue({
      items: [
        {
          id: "s1",
          name: "Example Store",
          slug: "example-store",
          logo_url: null,
          website_url: null,
          description: null,
          pricing_summary: null,
          pricing_checked_at: null,
          is_active: true,
          commission_disclosure: null,
          country_code: null,
          currency: null,
          created_at: "2026-01-01T00:00:00Z",
        },
      ],
      total: 1,
      skip: 0,
      limit: 100,
    });
    listCategories.mockResolvedValue({
      items: [
        {
          id: "cat1",
          name: "Fashion",
          slug: "fashion",
          icon: null,
          parent_id: null,
          created_at: "2026-01-01T00:00:00Z",
        },
      ],
      total: 1,
      skip: 0,
      limit: 100,
    });

    const storeResponse = await shardRequest("stores-0");
    expect(storeResponse.status).toBe(200);
    expect(await storeResponse.text()).toContain("http://localhost:3000/stores/example-store");

    const categoryResponse = await shardRequest("categories-0");
    expect(categoryResponse.status).toBe(200);
    expect(await categoryResponse.text()).toContain("http://localhost:3000/categories/fashion");
  });

  it("publishes indexable editorial URLs in their content-type sitemap", async () => {
    listEditorial.mockResolvedValue({
      items: [{
        id: "guide-1",
        content_type: "guide",
        status: "published",
        title: "Best Hosting Under ₹200",
        slug: "best-hosting-under-200",
        summary: "Compare affordable hosting options.",
        content_blocks: [],
        structured_data: {},
        hero_image_url: null,
        author_name: null,
        market: "IN",
        seo_title: null,
        meta_description: null,
        canonical_url: null,
        is_indexable: true,
        is_featured: false,
        published_at: "2026-01-01T00:00:00Z",
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-02T00:00:00Z",
        relations: [],
        entity_links: [],
        faqs: [],
        adsense_eligible: true,
      }],
      total: 1,
      skip: 0,
      limit: 1,
    });

    const response = await shardRequest("guides-0");

    expect(response.status).toBe(200);
    expect(await response.text()).toContain(
      "http://localhost:3000/guides/best-hosting-under-200",
    );
    expect(listEditorial).toHaveBeenCalledWith({
      content_type: "guide",
      skip: 0,
      limit: BACKEND_MAX_LIMIT,
    });
  });

  it("keeps legacy sitemap shards available before the editorial API is deployed", async () => {
    listEditorial.mockRejectedValue(new ApiError("Not found", 404));

    const response = await shardRequest("guides-0");

    expect(response.status).toBe(200);
    expect(await response.text()).not.toContain("<loc>");
  });

  it("surfaces API failures instead of publishing an empty shard", async () => {
    // With `resilient`, a backend failure was swallowed into an empty
    // shard that crawlers read as "nothing exists". The raw client
    // propagates the error so the route fails loudly.
    listCoupons.mockRejectedValue(new Error("500 Internal Server Error"));

    await expect(shardRequest("coupons-0")).rejects.toThrow("500 Internal Server Error");
  });

  it("shard count is non-zero and scales with the catalogue", async () => {
    listCoupons.mockResolvedValue({ items: [], total: 2500, skip: 0, limit: 1 });
    listStores.mockResolvedValue({ items: [], total: 0, skip: 0, limit: 1 });
    listCategories.mockResolvedValue({ items: [], total: 0, skip: 0, limit: 1 });

    const ids = await sitemapIds();

    // static + coupons + stores + categories, each at least one shard
    expect(ids.length).toBeGreaterThanOrEqual(4);
    const couponShards = ids.filter((id) => id.kind === "coupons");
    expect(couponShards.length).toBe(3); // 2500 / 1000
    expect(couponShards.map((id) => id.id)).toEqual(["coupons-0", "coupons-1", "coupons-2"]);
  });

  it("unknown shard id returns 404", async () => {
    const response = await shardRequest("nope-9");
    expect(response.status).toBe(404);
  });
});
