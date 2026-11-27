import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { getPage } from "@/lib/content";
import type { ContentKind, ContentPage as ContentPageData } from "@/lib/content/schema";
import { absoluteUrl } from "@/lib/seo";

/**
 * Render a content kind from PostgreSQL (my JSON-driven `<ContentPage>`), with a
 * `fallback` for pages not in the DB (nothing on live; local + recoverable).
 */

export function contentPageMetadata(page: ContentPageData, segment: string): Metadata {
  const title = page.seo_title ?? page.title;
  const description = page.meta_description ?? page.description;
  const canonical = absoluteUrl(page.canonical_url ?? `${segment}/${page.slug}`);
  const image = absoluteUrl(page.hero_image_url ?? "/opengraph-image.png");
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: page.is_indexable !== false, follow: true },
    openGraph: { title, description, url: canonical, type: "article", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export async function renderContentFromPostgres(
  kind: ContentKind,
  slug: string,
  segment: string,
  fallback: () => Promise<Metadata | null> | Metadata | null,
) {
  const page = await getPage(kind, slug);
  if (page) {
    return { page, metadata: contentPageMetadata(page, segment) };
  }
  return { page: null, metadata: await fallback() };
}

export { ContentPage };
