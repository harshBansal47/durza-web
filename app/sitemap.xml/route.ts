import { SITE_URL } from "@/lib/site";
import { sitemapIds } from "@/lib/sitemap-groups";

export const revalidate = 3600;

export async function GET() {
  let ids;
  try {
    ids = await sitemapIds();
  } catch (error) {
    console.warn("sitemap: backend unreachable, using static fallback", error);
    ids = [{ id: "static", kind: "static", chunk: 0 } as Awaited<ReturnType<typeof sitemapIds>>[number]];
  }

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
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
