import type { MetadataRoute } from "next";
import { resilient } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import { sitemapIds, SITEMAP_CHUNK_SIZE, type SitemapId } from "@/lib/sitemap-groups";
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

async function shardEntries({ kind, chunk }: SitemapId): Promise<MetadataRoute.Sitemap> {
  const skip = chunk * SITEMAP_CHUNK_SIZE;
  if (kind === "static") return STATIC_PAGES;
  if (kind === "coupons") {
    const page = await resilient.listCoupons({ skip, limit: SITEMAP_CHUNK_SIZE });
    return page.items.map((coupon) => ({
      url: `${SITE_URL}/coupons/${coupon.slug}`,
      lastModified: coupon.last_verified_at ?? coupon.created_at,
      changeFrequency: "daily" as const,
      priority: couponPriority(coupon),
    }));
  }
  if (kind === "stores") {
    const page = await resilient.listStores({ skip, limit: SITEMAP_CHUNK_SIZE });
    return page.items.map((store) => ({
      url: `${SITE_URL}/stores/${store.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  }
  const page = await resilient.listCategories({ skip, limit: SITEMAP_CHUNK_SIZE });
  return page.items.map((category) => ({
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
