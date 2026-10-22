import { SITE_URL } from "@/lib/site";
import { sitemapIds } from "@/lib/sitemap-groups";

export const revalidate = 3600;

const RETRY_AFTER_SECONDS = 60;

let cachedSitemap: Response | null = null;

function staticFallbackSitemap(): Response {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE_URL}/sitemap/static.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>
</sitemapindex>
`,
    { status: 503, headers: { "Content-Type": "application/xml; charset=utf-8", "Retry-After": String(RETRY_AFTER_SECONDS) } },
  );
}

export async function GET() {
  try {
    const ids = await sitemapIds();
    const lastmod = new Date().toISOString();
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ids
  .map(
    ({ id }) =>
      `  <sitemap><loc>${SITE_URL}/sitemap/${id}.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;
    const response = new Response(body, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
    cachedSitemap = response;
    return response;
  } catch (error) {
    if (cachedSitemap) {
      return cachedSitemap;
    }
    return staticFallbackSitemap();
  }
}
