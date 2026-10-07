import type { MetadataRoute } from "next";
import { api } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import { sitemapIds, SITEMAP_CHUNK_SIZE, BACKEND_MAX_LIMIT, type SitemapId } from "@/lib/sitemap-groups";
import type { CouponPublic } from "@/lib/types";

export const revalidate = 3600;

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

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: SITE_URL, changeFrequency: "hourly", priority: 1 },
  { url: `${SITE_URL}/coupons`, changeFrequency: "hourly", priority: 0.9 },
  { url: `${SITE_URL}/deals`, changeFrequency: "hourly", priority: 0.9 },
  { url: `${SITE_URL}/stores`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/categories`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/search`, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_URL}/trust`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/how-it-works`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${SITE_URL}/affiliate-disclosure`, changeFrequency: "yearly", priority: 0.2 },
];

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

async function shardEntries({ kind, chunk }: SitemapId): Promise<MetadataRoute.Sitemap> {
  const skip = chunk * SITEMAP_CHUNK_SIZE;
  if (kind === "static") return STATIC_PAGES;
  if (kind === "coupons") {
    const coupons = await fetchBatch(
      (s, l) => api.listCoupons({ skip: s, limit: l }),
      skip,
      SITEMAP_CHUNK_SIZE,
    );
    return coupons.map((coupon) => ({
      url: `${SITE_URL}/coupons/${coupon.slug}`,
      lastModified: coupon.last_verified_at ?? coupon.created_at,
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
    return stores.map((store) => ({
      url: `${SITE_URL}/stores/${store.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  }
  const categories = await fetchBatch(
    (s, l) => api.listCategories({ skip: s, limit: l }),
    skip,
    SITEMAP_CHUNK_SIZE,
  );
  return categories.map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderUrlSet(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry) => {
      const lines = [`    <loc>${escapeXml(entry.url)}</loc>`];
      if (entry.lastModified) {
        const value =
          entry.lastModified instanceof Date
            ? entry.lastModified.toISOString()
            : new Date(entry.lastModified).toISOString();
        lines.push(`    <lastmod>${value}</lastmod>`);
      }
      if (entry.changeFrequency) lines.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
      if (entry.priority !== undefined) lines.push(`    <priority>${entry.priority}</priority>`);
      return `  <url>\n${lines.join("\n")}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/**
 * Serves each sitemap shard at /sitemap/{id}.xml (id from sitemapIds:
 * "static", "coupons-0", "stores-1", ...). The /sitemap.xml index lists
 * exactly these ids, and both sides derive from the same sitemapIds() call.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const id = path[0]?.replace(/\.xml$/, "");
  if (!id) return new Response("Not Found", { status: 404 });

  const shard = (await sitemapIds()).find((candidate) => candidate.id === id);
  if (!shard) return new Response("Not Found", { status: 404 });

  return new Response(renderUrlSet(await shardEntries(shard)), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
