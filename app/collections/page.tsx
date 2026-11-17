import type { Metadata } from "next";
import { EditorialListing } from "@/components/editorial/EditorialComponents";
import ListingHero from "@/components/listing/ListingHero";
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
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <ListingHero
        eyebrow="Curated for you"
        title="Savings collections"
        lead="Useful discounts and tools brought together around the things you’re working toward."
        stats={collections.items.length > 0 ? [{ value: collections.items.length.toLocaleString("en-IN"), label: "Collections" }] : undefined}
      />
      <div className="mt-2"><EditorialListing items={collections.items} /></div>
    </div>
  );
}
