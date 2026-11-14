import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { EditorialListing } from "@/components/editorial/EditorialComponents";
import PageTitle from "@/components/ui/PageTitle";
import StoreGuideDirectory from "@/components/guides/StoreGuideDirectory";
import { resilient } from "@/lib/api";
import { STORE_GUIDES } from "@/data/store-guides";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Shopping Buying Guides — Compare & Save in India",
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
  return (
    <div className="page-shell">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Buying guides", path: "/guides" }])} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft"><Link href="/" className="hover:text-inkblue">Home</Link><span className="px-2" aria-hidden="true">/</span>Guides</nav>
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">Spend with confidence</p>
      <PageTitle className="mt-2">Buying guides</PageTitle>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">Straightforward research and practical advice to help you find what fits before you spend.</p>
      <div className="mt-8"><EditorialListing items={guides.items} /></div>
      <StoreGuideDirectory guides={staticGuides} />
    </div>
  );
}
