import type { Metadata } from "next";
import Link from "next/link";
import { EditorialListing } from "@/components/editorial/EditorialComponents";
import PageTitle from "@/components/ui/PageTitle";
import { resilient } from "@/lib/api";

export const revalidate = 3600;

// Thin-page safety: sections with no published collections are kept out of the
// index (follow stays open so crawlers still reach the linked articles).
export async function generateMetadata(): Promise<Metadata> {
  const result = await resilient.listEditorial({ content_type: "collection", limit: 1 }).catch(() => null);
  const isEmpty = !result || result.total === 0;
  return {
    title: "Savings Collections — Curated by Goal",
    description: "Hand-picked groups of discounts, buying guides and offers organised around what you're trying to do — fitness, home, travel and more.",
    alternates: { canonical: "/collections" },
    ...(isEmpty ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function CollectionsPage() {
  const collections = await resilient.listEditorial({ content_type: "collection", limit: 60 });
  return (
    <div className="page-shell">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft"><Link href="/" className="hover:text-inkblue">Home</Link><span className="px-2" aria-hidden="true">/</span>Collections</nav>
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">Curated for you</p>
      <PageTitle className="mt-2">Savings collections</PageTitle>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">Useful discounts and tools brought together around the things you’re working toward.</p>
      <div className="mt-8"><EditorialListing items={collections.items} /></div>
    </div>
  );
}
