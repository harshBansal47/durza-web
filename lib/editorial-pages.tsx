import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resilient } from "@/lib/api";
import type { EditorialType } from "@/lib/types";
import { editorialPath } from "@/lib/editorial-path";
import { metaDescription } from "@/lib/seo";

export async function editorialMetadata(type: EditorialType, slug: string): Promise<Metadata> {
  const content = await resilient.getEditorial(type, slug);
  if (!content) return { title: "Content not found", robots: { index: false, follow: false } };
  const canonical = content.canonical_url ?? editorialPath(content);
  const title = content.seo_title ?? content.title;
  // Either field can be missing; the first one that says something becomes a
  // single-line description the result page can show in full.
  const description = metaDescription(content.meta_description) ?? metaDescription(content.summary);
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: content.is_indexable, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      ...(content.hero_image_url ? { images: [content.hero_image_url] } : {}),
    },
  };
}

export async function renderEditorialPage(type: EditorialType, slug: string) {
  const { default: EditorialArticle } = await import("@/components/editorial/EditorialComponents");
  const content = await resilient.getEditorial(type, slug);
  if (!content) notFound();
  return <EditorialArticle content={content} />;
}
