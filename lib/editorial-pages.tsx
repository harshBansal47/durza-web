import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resilient } from "@/lib/api";
import type { EditorialContent, EditorialType } from "@/lib/types";
import type { GuideDocument } from "@/lib/guide-document";
import type { StaticGuide } from "@/data/store-guides";
import type { CompareEntry } from "@/data/comparisons";
import { editorialPath } from "@/lib/editorial-path";
import { metaDescription, absoluteUrl } from "@/lib/seo";
import { staticGuideBySlug } from "@/data/store-guides";
import { getComparisonBySlug } from "@/data/comparisons";
import StaticGuidePage, { staticGuideMetadata } from "@/components/guides/StaticGuidePage";
import { getGuideCoverImage } from "@/lib/guide-cover";
import GuideDocumentPage from "@/components/guides/redesign/GuideDocumentPage";
import { getGuideDocument } from "@/guide-documents";

type ResolvedEditorial =
  | { kind: "doc"; doc: GuideDocument }
  | { kind: "comparison"; entry: CompareEntry }
  | { kind: "editorial"; content: EditorialContent; heroImage: string | null }
  | { kind: "staticGuide"; guide: StaticGuide }
  | null;

function guideHeroImage(type: EditorialType, slug: string, fallback?: string | null, title?: string, summary?: string) {
  const guide = type === "guide" ? staticGuideBySlug(slug) : undefined;
  if (guide) {
    return getGuideCoverImage({
      slug,
      title: guide.seo.title,
      summary: guide.summary,
      category: guide.category,
      image: guide.heroImage ?? fallback ?? null,
    });
  }
  if (type === "guide") {
    return getGuideCoverImage({ slug, title, summary, category: "Buying guide", image: fallback ?? null });
  }
  return fallback;
}

/** One resolution path for metadata and page rendering, memoized per request. */
const resolveEditorial = cache(async (type: EditorialType, slug: string): Promise<ResolvedEditorial> => {
  if (type === "guide") {
    const doc = getGuideDocument(slug);
    if (doc) return { kind: "doc", doc };
  }
  if (type === "comparison") {
    const entry = getComparisonBySlug(slug);
    if (entry) return { kind: "comparison", entry };
  }
  const content = await resilient.getEditorial(type, slug);
  if (content) {
    const heroImage = guideHeroImage(
      type,
      slug,
      content.hero_image_url,
      content.title,
      content.summary ?? content.meta_description ?? undefined,
    ) ?? null;
    return { kind: "editorial", content, heroImage };
  }
  if (type === "guide") {
    const guide = staticGuideBySlug(slug);
    if (guide) return { kind: "staticGuide", guide };
  }
  return null;
});

function comparisonMetadata(entry: CompareEntry): Metadata {
  const canonical = absoluteUrl(`/compare/${entry.slug}`);
  return {
    title: entry.seoTitle,
    description: entry.metaDescription,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: entry.seoTitle,
      description: entry.metaDescription,
      url: canonical,
      type: "article",
      images: [entry.heroImage],
    },
    twitter: { card: "summary_large_image", title: entry.seoTitle, description: entry.metaDescription, images: [entry.heroImage] },
  };
}

export async function editorialMetadata(type: EditorialType, slug: string): Promise<Metadata> {
  const resolved = await resolveEditorial(type, slug);
  if (!resolved) return { title: "Content not found", robots: { index: false, follow: false } };

  switch (resolved.kind) {
    case "doc":
      return {
        title: resolved.doc.title,
        description: resolved.doc.description,
        alternates: { canonical: resolved.doc.url },
        robots: { index: true, follow: true },
        openGraph: {
          title: resolved.doc.title,
          description: resolved.doc.description,
          url: resolved.doc.url,
          type: "article",
        },
      };
    case "comparison":
      return comparisonMetadata(resolved.entry);
    case "staticGuide":
      return staticGuideMetadata(resolved.guide);
    case "editorial": {
      const { content, heroImage } = resolved;
      const canonical = content.canonical_url ?? editorialPath(content);
      const title = content.seo_title ?? content.title;
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
          ...(heroImage ? { images: [heroImage] } : {}),
        },
      };
    }
  }
}

export async function renderEditorialPage(type: EditorialType, slug: string) {
  const resolved = await resolveEditorial(type, slug);
  if (!resolved) notFound();

  switch (resolved.kind) {
    case "doc":
      return <GuideDocumentPage doc={resolved.doc} />;
    case "comparison": {
      const { default: ComparisonArticle } = await import("@/components/compare/ComparisonArticle");
      return <ComparisonArticle entry={resolved.entry} />;
    }
    case "staticGuide":
      return <StaticGuidePage guide={resolved.guide} />;
    case "editorial": {
      const { default: EditorialArticle } = await import("@/components/editorial/EditorialComponents");
      const { content, heroImage } = resolved;
      return (
        <EditorialArticle
          content={
            heroImage === content.hero_image_url
              ? content
              : { ...content, hero_image_url: heroImage ?? null }
          }
        />
      );
    }
  }
}
