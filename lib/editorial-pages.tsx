import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resilient } from "@/lib/api";
import type { EditorialType } from "@/lib/types";
import { editorialPath } from "@/lib/editorial-path";
import { metaDescription, absoluteUrl } from "@/lib/seo";
import { staticGuideBySlug } from "@/data/store-guides";
import { getComparisonBySlug } from "@/data/comparisons";
import StaticGuidePage, { staticGuideMetadata } from "@/components/guides/StaticGuidePage";
import { getGuideCoverImage, isStoreLogoPath } from "@/lib/guide-cover";

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

function staticComparisonMetadata(slug: string): Metadata | null {
  const entry = getComparisonBySlug(slug);
  if (!entry) return null;
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
  if (type === "comparison") {
    const meta = staticComparisonMetadata(slug);
    if (meta) return meta;
  }
  const content = await resilient.getEditorial(type, slug);
  // Store buying guides authored in data/store-guides.ts fall through here.
  if (!content && type === "guide") {
    const staticGuide = staticGuideBySlug(slug);
    if (staticGuide) return staticGuideMetadata(staticGuide);
  }
  if (!content) return { title: "Content not found", robots: { index: false, follow: false } };
  const canonical = content.canonical_url ?? editorialPath(content);
  const title = content.seo_title ?? content.title;
  const heroImage = guideHeroImage(type, slug, content.hero_image_url, content.title, content.summary ?? content.meta_description ?? undefined);
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
      ...(heroImage ? { images: [heroImage] } : {}),
    },
  };
}

export async function renderEditorialPage(type: EditorialType, slug: string) {
  if (type === "comparison") {
    const entry = getComparisonBySlug(slug);
    if (entry) {
      const { default: ComparisonArticle } = await import("@/components/compare/ComparisonArticle");
      return <ComparisonArticle entry={entry} />;
    }
  }
  const content = await resilient.getEditorial(type, slug);
  if (!content && type === "guide") {
    const staticGuide = staticGuideBySlug(slug);
    if (staticGuide) return <StaticGuidePage guide={staticGuide} />;
  }
  if (!content) notFound();
  const { default: EditorialArticle } = await import("@/components/editorial/EditorialComponents");
  const heroImage = guideHeroImage(type, slug, content.hero_image_url, content.title, content.summary ?? content.meta_description ?? undefined);
  return (
    <EditorialArticle
      content={heroImage === content.hero_image_url ? content : { ...content, hero_image_url: heroImage ?? null }}
    />
  );
}
