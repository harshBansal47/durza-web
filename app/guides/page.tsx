import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { EditorialListing } from "@/components/editorial/EditorialComponents";
import ListingHero from "@/components/listing/ListingHero";
import StoreGuideDirectory from "@/components/guides/StoreGuideDirectory";
import { resilient } from "@/lib/api";
import { STORE_GUIDES } from "@/data/store-guides";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Buying Guides — Research & Compare for India",
  description: "Practical buying guides for Indian shoppers: laptop deals, nutrition brands, skincare, kitchenware and more. Research before you spend.",
  alternates: { canonical: "/guides" },
};

export default async function GuidesPage() {
  const guides = await resilient.listEditorial({ content_type: "guide", limit: 60 });
  const staticGuides = STORE_GUIDES.map((guide) => ({
    slug: guide.slug,
    category: guide.category,
    title: guide.seo.title,
    summary: guide.summary,
  }));
  const categories = Array.from(new Set(staticGuides.map((g) => g.category))).slice(0, 8);
  const totalGuides = guides.items.length + staticGuides.length;
  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Buying guides", path: "/guides" }])} />
      <ListingHero
        eyebrow="Spend with confidence"
        title="Buying guides"
        lead="Straightforward research and practical advice to help you find what fits before you spend."
        chips={categories.map((c) => ({ href: "/guides", label: c }))}
        stats={[
          ...(totalGuides > 0 ? [{ value: totalGuides.toLocaleString("en-IN"), label: "Guides" }] : []),
          ...(categories.length > 0 ? [{ value: Array.from(new Set(staticGuides.map((g) => g.category))).length.toLocaleString("en-IN"), label: "Categories" }] : []),
        ]}
      />
      <div className="mt-2"><EditorialListing items={guides.items} /></div>
      <StoreGuideDirectory guides={staticGuides} />
    </div>
  );
}
