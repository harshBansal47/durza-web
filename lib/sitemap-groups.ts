import { ApiError, api } from "./api";
import { SALE_HUBS_ENABLED } from "./flags";
import type { EditorialType } from "./types";

/**
 * Google's per-sitemap ceiling is 50,000 URLs; we chunk much smaller so one
 * sitemap revalidating never rebuilds thousands of entries, and so pagination
 * through the catalogue is incremental rather than one giant fetch.
 */
export const SITEMAP_CHUNK_SIZE = 1000;

/**
 * The backend enforces a maximum page size of 100 for coupon, store, and
 * category list endpoints. Sitemap shards page internally in batches of this
 * size so a single shard can cover SITEMAP_CHUNK_SIZE URLs without ever
 * requesting more than the backend allows.
 */
export const BACKEND_MAX_LIMIT = 100;

export type SitemapKind =
  | "static"
  | "coupons"
  | "stores"
  | "categories"
  | "guides"
  | "reviews"
  | "comparisons"
  | "collections"
  | "sales";

export const EDITORIAL_SITEMAP_TYPES: Partial<Record<SitemapKind, EditorialType>> = {
  guides: "guide",
  reviews: "review",
  comparisons: "comparison",
  collections: "collection",
};

export interface SitemapId {
  id: string;
  kind: SitemapKind;
  /** Zero-based chunk index within the kind. */
  chunk: number;
}

export function isEditorialEndpointUnavailable(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}

async function editorialTotal(content_type: EditorialType): Promise<number> {
  try {
    return (await api.listEditorial({ content_type, limit: 1 })).total;
  } catch (error) {
    if (isEditorialEndpointUnavailable(error)) return 0;
    throw error;
  }
}

/**
 * Every sitemap shard we publish, derived from the true catalogue size. Both
 * the /sitemap.xml index and the [id] child route build from this one list,
 * so they can never disagree about what exists.
 */
export async function sitemapIds(): Promise<SitemapId[]> {
  const [coupons, stores, categories, guides, reviews, comparisons, collections] = await Promise.all([
    api.listCoupons({ limit: 1 }),
    api.listStores({ limit: 1 }),
    api.listCategories({ limit: 1 }),
    editorialTotal("guide"),
    editorialTotal("review"),
    editorialTotal("comparison"),
    editorialTotal("collection"),
  ]);

  const ids: SitemapId[] = [{ id: "static", kind: "static", chunk: 0 }];
  if (SALE_HUBS_ENABLED) ids.push({ id: "sales-0", kind: "sales", chunk: 0 });
  const groups: Array<[SitemapKind, number]> = [
    ["coupons", coupons.total],
    ["stores", stores.total],
    ["categories", categories.total],
    ["guides", guides],
    ["reviews", reviews],
    ["comparisons", comparisons],
    ["collections", collections],
  ];
  for (const [kind, total] of groups) {
    // Always at least one shard, even when the API is down (total 0) or a
    // catalogue is genuinely empty — an empty shard is valid, a missing one
    // breaks the index/child contract.
    const chunks = Math.max(Math.ceil(total / SITEMAP_CHUNK_SIZE), 1);
    for (let chunk = 0; chunk < chunks; chunk++) {
      ids.push({ id: `${kind}-${chunk}`, kind, chunk });
    }
  }
  return ids;
}
