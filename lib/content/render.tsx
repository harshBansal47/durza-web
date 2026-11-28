import type { Metadata } from "next";
import type { ContentPage as ContentPageData } from "@/lib/content/schema";
import { absoluteUrl } from "@/lib/seo";

/** Build metadata for a DB-backed editorial detail page from its own fields. */
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
