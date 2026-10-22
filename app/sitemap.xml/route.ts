import { SITE_URL } from "@/lib/site";
import { sitemapIds } from "@/lib/sitemap-groups";

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

export async function GET() {
  try {
    const ids = await sitemapIds();
    const lastmod = new Date().toISOString();
    cachedBody = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ids
  .map(
    ({ id }) =>
      `  <sitemap><loc>${SITE_URL}/sitemap/${id}.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;
    return new Response(cachedBody, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  } catch (error) {
    console.warn("sitemap: backend unreachable", error);
    if (cachedBody) {
      return new Response(cachedBody, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
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
