import { SITE_URL } from "@/lib/site";
import { sitemapIds } from "@/lib/sitemap-groups";
import { sitemapCounts } from "@/lib/sitemap-entries";

export const revalidate = 3600;

const RETRY_AFTER_SECONDS = 60;

/**
 * The last sitemap index that was generated successfully.
 *
 * A sitemap that lists fewer URLs than the catalogue is worse than no sitemap
 * at all: a crawler would treat the short list as the truth and stop indexing
 * the rest. So when the backend cannot be reached we serve the last good
 * copy, and if there is no copy yet we answer 503 and let the crawler retry.
 */
let cachedBody: string | null = null;
let cachedShardCount = 0;
let cachedUrlCount = 0;

export async function GET() {
  try {
    const ids = await sitemapIds();
    const lastmod = new Date().toISOString();

    // Counts are built through the same dedupe path as the child shards, so the
    // index cannot report a number that disagrees with what a shard serves.
    // A counting failure must never take the index down — publish the shard
    // list with the last known counts in that case.
    let byShard: Record<string, number> = {};
    let total = cachedUrlCount;
    let duplicatesRemoved = 0;
    try {
      const counts = await sitemapCounts(ids);
      byShard = counts.byShard;
      total = counts.total;
      duplicatesRemoved = counts.duplicatesRemoved;
      cachedShardCount = ids.length;
      cachedUrlCount = total;
    } catch (error) {
      console.warn("sitemap: could not compute per-shard counts", error);
      total = cachedUrlCount;
    }

    const countComment = ids
      .map(({ id }) => `  <!-- ${id}: ${byShard[id] ?? "?"} URLs -->`)
      .join("\n");
    cachedBody = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- ${ids.length} shards, ${total} unique URLs, ${duplicatesRemoved} duplicate submissions suppressed -->
${countComment}
${ids
  .map(
    ({ id }) =>
      `  <sitemap><loc>${SITE_URL}/sitemap/${id}.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;
    return new Response(cachedBody, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "X-Sitemap-Shard-Count": String(cachedShardCount),
        "X-Sitemap-URL-Count": String(total),
      },
    });
  } catch (error) {
    console.warn("sitemap: backend unreachable", error);
    if (cachedBody) {
      return new Response(cachedBody, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "X-Sitemap-Shard-Count": String(cachedShardCount),
          "X-Sitemap-URL-Count": String(cachedUrlCount),
        },
      });
    }
    return new Response("Sitemap is temporarily unavailable. Please retry.", {
      status: 503,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Retry-After": String(RETRY_AFTER_SECONDS),
      },
    });
  }
}
