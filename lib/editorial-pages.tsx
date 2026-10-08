import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resilient } from "@/lib/api";
import type { EditorialType } from "@/lib/types";
import { editorialPath } from "@/lib/editorial-path";

export async function editorialMetadata(type: EditorialType, slug: string): Promise<Metadata> {
  const content = await resilient.getEditorial(type, slug);
  if (!content) return { title: "Content not found", robots: { index: false, follow: false } };
  const canonical = content.canonical_url ?? editorialPath(content);
  return {
    title: content.seo_title ?? content.title,
    description: content.meta_description ?? content.summary,
    alternates: { canonical },
    robots: { index: content.is_indexable, follow: true },
    openGraph: {
      title: content.seo_title ?? content.title,
      description: content.meta_description ?? content.summary,
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
