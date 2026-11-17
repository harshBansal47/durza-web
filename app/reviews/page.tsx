import type { Metadata } from "next";
import { EditorialListing } from "@/components/editorial/EditorialComponents";
import ListingHero from "@/components/listing/ListingHero";
import { resilient } from "@/lib/api";

export const revalidate = 3600;

// Thin-page safety: sections with no published reviews are kept out of the
// index (follow stays open so crawlers still reach the linked articles).
export async function generateMetadata(): Promise<Metadata> {
  const result = await resilient.listEditorial({ content_type: "review", limit: 1 }).catch(() => null);
  const isEmpty = !result || result.total === 0;
  return {
    title: "Reviews",
    description: "Independent product and service reviews, with pricing context and clear pros and cons.",
    alternates: { canonical: "/reviews" },
    ...(isEmpty ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ReviewsPage() {
  const reviews = await resilient.listEditorial({ content_type: "review", limit: 60 });
  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <ListingHero
        eyebrow="Honest assessments"
        title="Reviews"
        lead="What a product does well, where it falls short, and who it makes sense for."
        stats={reviews.items.length > 0 ? [{ value: reviews.items.length.toLocaleString("en-IN"), label: "Reviews" }] : undefined}
      />
      <div className="mt-2"><EditorialListing items={reviews.items} /></div>
    </div>
  );
}
