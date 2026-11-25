import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionArticle from "@/components/collections/CollectionArticle";
import CollectionKitPage from "@/components/collections/CollectionKitPage";
import { getCollectionKit } from "@/data/collection-kits";
import { COLLECTIONS, getCollectionBySlug } from "@/data/collections";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCollectionBySlug(slug);
  if (!entry) return { title: "Collection not found", robots: { index: false, follow: false } };
  const canonical = absoluteUrl(`/collections/${entry.slug}`);
  return {
    title: entry.seoTitle,
    description: entry.metaDescription,
    alternates: { canonical },
    robots: { index: true, follow: true },
    keywords: entry.keywords,
    openGraph: {
      title: entry.seoTitle,
      description: entry.metaDescription,
      url: canonical,
      type: "article",
      images: [entry.heroImage],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.seoTitle,
      description: entry.metaDescription,
      images: [entry.heroImage],
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const entry = getCollectionBySlug(slug);
  if (!entry) notFound();
  if (getCollectionKit(entry)) return <CollectionKitPage entry={entry} />;
  return <CollectionArticle entry={entry} />;
}
