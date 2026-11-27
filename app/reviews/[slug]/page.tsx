import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReviewArticle from "@/components/reviews/ReviewArticle";
import ContentPage from "@/components/content/ContentPage";
import { REVIEWS, getReviewBySlug } from "@/data/reviews";
import { getPage } from "@/lib/content";
import { contentPageMetadata } from "@/lib/content/render";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return REVIEWS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage("review", slug);
  if (page) return contentPageMetadata(page, "/reviews");
  const entry = getReviewBySlug(slug);
  if (!entry) return { title: "Review not found", robots: { index: false, follow: false } };
  const canonical = absoluteUrl(`/reviews/${entry.slug}`);
  return {
    title: entry.seoTitle,
    description: entry.metaDescription,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { title: entry.seoTitle, description: entry.metaDescription, url: canonical, type: "article", images: [entry.heroImage] },
    twitter: { card: "summary_large_image", title: entry.seoTitle, description: entry.metaDescription, images: [entry.heroImage] },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  // Render from PostgreSQL; fall back to existing per-page rendering.
  const page = await getPage("review", slug);
  if (page) return <ContentPage kind="review" page={page} />;
  const entry = getReviewBySlug(slug);
  if (!entry) notFound();
  return <ReviewArticle entry={entry} />;
}
