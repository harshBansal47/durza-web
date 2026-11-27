import { unstable_cache } from "next/cache";
import type { MetadataRoute } from "next";
import { api } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import {
  EDITORIAL_SITEMAP_TYPES,
  isEditorialEndpointUnavailable,
  listEditorialForSitemap,
  SITEMAP_CHUNK_SIZE,
  BACKEND_MAX_LIMIT,
  type SitemapId,
} from "@/lib/sitemap-groups";
import { isIndexableStore } from "@/lib/store-indexing";
import { allowedStoreIds, isHomepageIndiaRelevant } from "@/lib/homepage-curation";
import { cleanStoreDescription } from "@/lib/seo";
import type { CouponPublic, EditorialContent, EditorialType } from "@/lib/types";
import { editorialPath } from "@/lib/editorial-path";
import { TOPICS } from "@/lib/topics";
import { CUSTOM_STORE_SLUGS } from "@/lib/custom-store-pages";

/**
 * Store slugs that permanently redirect to a canonical store URL.
 * Keep them out of the sitemap so crawlers don't see redirecting/duplicate doorway URLs.
 */
const REDIRECTED_STORE_ALIAS_SLUGS = new Set([
  "aldo-new",
  "bath-body-works",
  "bliss-club",
  "charles-keith",
  "lenovo-india",
  "milton-in",
  "pepperfry-com-cps-india",
  "perforacare-com-ecommerce-cps-india",
  "purevpn-com-utility-cpa-worldwide",
  "rforrabbit-com-ecommerce-cps-india",
  "salty-co-in-ecommerce-cps-india",
  "sanskrutihomes-in-ecommerce-cps-india",
  "shoptupperware-in-ecommerce-cps-india",
  "tata-cliq",
  "veromoda",
]);

/**
 * A coupon with many recent, mostly-positive reports is more likely to still
 * be valid than one with none — so it's worth a crawler's attention sooner.
 * Unverified coupons still get a reasonable baseline priority; this nudges,
 * it doesn't bury them.
 */
function couponPriority(coupon: CouponPublic): number {
  const total = coupon.success_count + coupon.fail_count;
  if (total === 0) return 0.6;
  const confidence = Math.min(total / 10, 1); // more reports = more confidence, caps at 10
  const quality = coupon.success_rate ?? 0;
  return Math.round((0.6 + confidence * quality * 0.3) * 100) / 100; // 0.6 - 0.9
}

/**
 * Curated landing pages. These are the canonical owners of their URLs: every
 * dynamic shard must skip a URL the static shard already publishes. Without
 * that, the same store/guide appears twice (once here, once from the API) and
 * Search Console reports duplicate submissions and inflated URL counts.
 */
export const STATIC_PAGES: MetadataRoute.Sitemap = [
  // The homepage revalidates every 6 hours, so "daily" is the closest honest
  // crawl hint; "hourly" would promise fresher HTML than we actually serve.
  { url: SITE_URL, changeFrequency: "daily", priority: 1 },
  { url: `${SITE_URL}/coupons`, changeFrequency: "hourly", priority: 0.9 },
  { url: `${SITE_URL}/deals`, changeFrequency: "hourly", priority: 0.9 },
  { url: `${SITE_URL}/bank-offers`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/black-friday`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/stores`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/stores/firstcry`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/stores/adidas`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_URL}/stores/asus`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_URL}/stores/charles-and-keith`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/stores/victorias-secret`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/stores/aldo-shoes`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/stores/vero-moda`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/stores/bath-and-body-works`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/stores/palmonas`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_URL}/stores/lenovo`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_URL}/stores/ajio-com-ecommerce-cps-india`, changeFrequency: "daily", priority: 0.9 },
  { url: `${SITE_URL}/stores/purevpn`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/stores/sanskruti-homes`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/stores/shop-tupperware`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/stores/r-for-rabbit`, changeFrequency: "weekly", priority: 0.75 },
  { url: `${SITE_URL}/stores/perfora-care`, changeFrequency: "weekly", priority: 0.75 },
  { url: `${SITE_URL}/stores/blissclub`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/stores/digihaat`, changeFrequency: "weekly", priority: 0.75 },
  { url: `${SITE_URL}/stores/hokmakeup`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_URL}/stores/wearyourwords`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_URL}/stores/firstcry/club-calculator`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/stores/firstcry/diaper-cost-tracker`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/stores/firstcry/baby-gear-finder`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/stores/havells/bldc-calculator`, changeFrequency: "weekly", priority: 0.75 },
  { url: `${SITE_URL}/categories`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/guides`, changeFrequency: "weekly", priority: 0.8 },
  // Utility/legal pages are intentionally NOT in the sitemap — they are crawled
  // via the footer and carry no standalone search demand.
  { url: `${SITE_URL}/reviews`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/compare`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/collections`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/collections/complete-amazon-makeup-toolkit`, changeFrequency: "weekly", priority: 0.8 },
  // Topic hubs are stable editorial entry points, not utility pages.
  // Comparison URLs come from the DB editorial feed below.
  { url: `${SITE_URL}/topics`, changeFrequency: "weekly", priority: 0.8 },
  ...TOPICS.map((topic) => ({
    url: `${SITE_URL}${topic.hubHref}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })),
  { url: `${SITE_URL}/methodology`, changeFrequency: "monthly", priority: 0.5 },
];

/**
 * Compare URLs by origin + path (query strings/fragments and a trailing slash
 * are not a different page). Used both for the static-ownership exclusion and
 * for within-shard dedupe.
 */
export function sitemapUrlKey(value: string): string {
  try {
    const url = new URL(value);
    return `${url.hostname.toLowerCase()}${url.pathname.replace(/\/+$/, "") || "/"}`;
  } catch {
    return value.replace(/\/+$/, "") || "/";
  }
}

const STATIC_URL_KEYS = new Set(
  STATIC_PAGES.filter((entry) => entry.url.startsWith(SITE_URL)).map((entry) =>
    sitemapUrlKey(entry.url),
  ),
);

/** A sitemap may only advertise URLs on this site, once. */
function dedupeEntries(
  entries: MetadataRoute.Sitemap,
  { excludeStatic = true }: { excludeStatic?: boolean } = {},
): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (!entry.url.startsWith(SITE_URL)) return false;
    const key = sitemapUrlKey(entry.url);
    if (seen.has(key)) return false;
    if (excludeStatic && STATIC_URL_KEYS.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Page through the backend in batches of BACKEND_MAX_LIMIT, accumulating up to
 * SITEMAP_CHUNK_SIZE entries. The backend rejects requests above its maximum
 * page size (limit le=100), so a single large request would 422. Batching
 * keeps each individual request within the backend's contract while still
 * allowing shards to cover the full catalogue.
 *
 * This uses the raw `api` client, not `resilient`: a sitemap that silently
 * swallows an API failure would publish an empty shard, and a crawler would
 * read "no coupons exist". Surfacing the error (HTTP 500) makes crawlers
 * retry later and makes the failure visible in monitoring.
 */
async function fetchBatch<T>(
  fetcher: (skip: number, limit: number) => Promise<{ items: T[]; total: number }>,
  skip: number,
  maxItems: number,
): Promise<T[]> {
  const items: T[] = [];
  let cursor = skip;
  while (items.length < maxItems) {
    const remaining = maxItems - items.length;
    const limit = Math.min(BACKEND_MAX_LIMIT, remaining);
    const page = await fetcher(cursor, limit);
    items.push(...page.items);
    // Stop when the backend returns fewer items than requested (end of data)
    // or when we have accumulated enough for this shard.
    if (page.items.length < limit || items.length >= maxItems) break;
    cursor += page.items.length;
  }
  return items;
}

/** All India-relevant stores, used by the coupon/category shards' allow-list. */
async function indiaRelevantStoreIds(): Promise<Set<string>> {
  const allStores = await fetchBatch(
    (skip, limit) => api.listStores({ skip, limit }),
    0,
    Number.MAX_SAFE_INTEGER,
  );
  return new Set(allowedStoreIds(allStores));
}

async function shardEntriesUnfiltered({ kind, chunk }: SitemapId): Promise<MetadataRoute.Sitemap> {
  const skip = chunk * SITEMAP_CHUNK_SIZE;
  if (kind === "static") return STATIC_PAGES;
  if (kind === "coupons") {
    // Fetch the allowed store IDs once so we can filter coupons from non-India stores.
    // HOMEPAGE_EXCLUDED_STORE_SLUGS excludes global/non-India programs from listing pages;
    // the sitemap must respect the same boundary so we don't submit URLs that the
    // audience and the page's own store filter already exclude.
    const allowedStoreIdsSet = await indiaRelevantStoreIds();

    const coupons = await fetchBatch(
      (s, l) => api.listCoupons({ skip: s, limit: l, active_only: true }),
      skip,
      SITEMAP_CHUNK_SIZE,
    );
    const now = Date.now();
    // Match the page's own robots verdict: page says is_indexable === false → not sitemapped.
    // Also exclude coupons from non-India stores so we don't waste crawl budget on
    // global/off-topic programs that are already excluded from listing pages.
    // Also exclude offers Google would read as garbage: no active status, auto-suppressed,
    // or already expired — those pages carry the "deal unavailable" state and would sit
    // in the index as soft-404s.
    const indexable = coupons.filter(
      (coupon) =>
        coupon.is_indexable !== false &&
        !coupon.auto_suppressed &&
        coupon.is_active !== false &&
        (!coupon.expires_at || new Date(coupon.expires_at).getTime() > now) &&
        allowedStoreIdsSet.has(coupon.store_id),
    );
    return indexable.map((coupon) => ({
      url: `${SITE_URL}/coupons/${coupon.slug}`,
      // "last content touched" — feed re-checks or shopper action. Never a fake fresh date.
      lastModified: coupon.last_checked_at ?? coupon.last_verified_at ?? coupon.created_at,
      changeFrequency: "daily" as const,
      priority: couponPriority(coupon),
    }));
  }
  if (kind === "stores") {
    const stores = await fetchBatch(
      (s, l) => api.listStores({ skip: s, limit: l }),
      skip,
      SITEMAP_CHUNK_SIZE,
    );
    // Use the SAME predicate as the store page's generateMetadata: a description
    // that is only Admitad program boilerplate is not shopper-facing copy, so a
    // store with no live offers and boilerplate copy is `noindex` on the page and
    // must not be submitted here. Custom-designed pages always carry unique
    // content and are indexable by design.
    return stores
      .filter(
        (store) =>
          !REDIRECTED_STORE_ALIAS_SLUGS.has(store.slug) &&
          isHomepageIndiaRelevant(store.slug) &&
          (store.slug !== "hok-makeup" && CUSTOM_STORE_SLUGS.has(store.slug) ||
            isIndexableStore(store.offer_count, cleanStoreDescription(store.description))),
      )
      .map((store) => {
        const custom = store.slug !== "hok-makeup" && CUSTOM_STORE_SLUGS.has(store.slug);
        return {
          url: `${SITE_URL}/stores/${store.slug}`,
          // No honest per-page "last changed" signal exists for stores — so no lastmod.
          changeFrequency: "weekly" as const,
          // Custom-built brand pages carry unique tools and FAQs; give them the
          // same weight as the editorial pages in /sitemap/guides.xml.
          priority: custom ? 0.8 : 0.6,
        };
      });
  }
  if (kind === "sales") {
    const series = await api.listSales();
    return series.map((item) => ({
      url: `${SITE_URL}/sales/${item.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  }
  const contentType: EditorialType | undefined = EDITORIAL_SITEMAP_TYPES[kind];
  if (contentType) {
    let items: EditorialContent[];
    try {
      items = await fetchBatch(
        (s, l) => listEditorialForSitemap({ content_type: contentType, skip: s, limit: l }),
        skip,
        SITEMAP_CHUNK_SIZE,
      );
    } catch (error) {
      if (isEditorialEndpointUnavailable(error)) items = [];
      else throw error;
    }
    const entries: MetadataRoute.Sitemap = items
      .filter((content) => content.is_indexable)
      .map((content) => ({
        // A canonical saved under a different origin (e.g. production while
        // verifying locally) must not be dropped from this deployment's shard.
        url:
          content.canonical_url && content.canonical_url.startsWith(SITE_URL)
            ? content.canonical_url
            : `${SITE_URL}${editorialPath(content)}`,
        lastModified: content.updated_at,
        changeFrequency: "monthly" as const,
        priority: content.is_featured ? 0.75 : 0.65,
      }));
    // Guides now come from editorial_contents like every other editorial kind.
    return entries;
  }
  // Categories: the page marks itself `noindex` when it has no live offers from
  // an India-relevant store (see app/categories/[slug]/page.tsx). `live_only`
  // alone counts coupons from excluded stores, so mirror the page's rule here.
  const [categories, allowedIds] = await Promise.all([
    fetchBatch(
      (s, l) => api.listCategories({ skip: s, limit: l }),
      skip,
      SITEMAP_CHUNK_SIZE,
    ),
    indiaRelevantStoreIds(),
  ]);
  const live = await Promise.all(
    categories.map(async (category) => {
      const offers = await api.listCoupons({
        category_id: category.id,
        active_only: true,
        store_ids: [...allowedIds],
        limit: 1,
      });
      return offers.total > 0 ? category : null;
    }),
  );
  return live
    .filter((category): category is NonNullable<typeof category> => category !== null)
    .map((category) => ({
      url: `${SITE_URL}/categories/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
}

/**
 * The single source of truth for a shard's URLs. Applies the static-owner
 * exclusion and within-shard dedupe so no URL is published twice, and so the
 * index's reported counts match what each shard actually serves.
 */
export async function shardEntries(shard: SitemapId): Promise<MetadataRoute.Sitemap> {
  // The static shard owns those URLs; only dynamic shards skip them.
  return dedupeEntries(await shardEntriesUnfiltered(shard), {
    excludeStatic: shard.kind !== "static",
  });
}

export interface SitemapCounts {
  byShard: Record<string, number>;
  total: number;
  duplicatesRemoved: number;
}

/**
 * Accurate URL counts for the sitemap index. Builds every shard through the
 * same dedupe path the shards use, so the index can never advertise a URL
 * count that disagrees with the child documents.
 */
export async function sitemapCounts(shards: SitemapId[]): Promise<SitemapCounts> {
  const all: MetadataRoute.Sitemap = [];
  const byShard: Record<string, number> = {};
  let raw = 0;
  for (const shard of shards) {
    const entries = await shardEntries(shard);
    byShard[shard.id] = entries.length;
    raw += entries.length;
    all.push(...entries);
  }
  const uniqueKeys = new Set(all.map((entry) => sitemapUrlKey(entry.url)));
  return { byShard, total: uniqueKeys.size, duplicatesRemoved: raw - uniqueKeys.size };
}

/** Counts are derived from all shards; cache them with the sitemap tag. */
export const sitemapCountsCached = unstable_cache(
  async (shards: Parameters<typeof sitemapCounts>[0]) => sitemapCounts(shards),
  ["sitemap-counts"],
  { revalidate: 86400, tags: ["sitemap"] },
);
