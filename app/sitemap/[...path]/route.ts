import { sitemapIds } from "@/lib/sitemap-groups";
import { shardEntries } from "@/lib/sitemap-entries";
import type { MetadataRoute } from "next";

export const revalidate = 3600;

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
 * URL construction/dedupe lives in lib/sitemap-entries.ts so the index can
 * report the exact same counts this route publishes.
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

  const entries = await shardEntries(shard);
  return new Response(renderUrlSet(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Machine-readable count so monitoring can reconcile the index against
      // the child documents without parsing every URL.
      "X-Sitemap-URL-Count": String(entries.length),
    },
  });
}
