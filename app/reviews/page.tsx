import type { Metadata } from "next";
import Link from "next/link";
import { EditorialListing } from "@/components/editorial/EditorialComponents";
import { resilient } from "@/lib/api";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Reviews",
  description: "Independent product and service reviews, with pricing context and clear pros and cons.",
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const reviews = await resilient.listEditorial({ content_type: "review", limit: 60 });
  return (
    <main className="page-shell">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft"><Link href="/" className="hover:text-inkblue">Home</Link><span className="px-2" aria-hidden="true">/</span>Reviews</nav>
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">Honest assessments</p>
      <h1 className="mt-2 font-serif text-4xl font-extrabold text-ink sm:text-5xl">Reviews</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">What a product does well, where it falls short, and who it makes sense for.</p>
      <div className="mt-8"><EditorialListing items={reviews.items} /></div>
    </main>
  );
}
