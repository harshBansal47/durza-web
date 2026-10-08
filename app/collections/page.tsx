import type { Metadata } from "next";
import Link from "next/link";
import { EditorialListing } from "@/components/editorial/EditorialComponents";
import { resilient } from "@/lib/api";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Savings collections",
  description: "Curated collections of useful discounts, tools, and ways to save.",
  alternates: { canonical: "/collections" },
};

export default async function CollectionsPage() {
  const collections = await resilient.listEditorial({ content_type: "collection", limit: 60 });
  return (
    <main className="page-shell">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft"><Link href="/" className="hover:text-inkblue">Home</Link><span className="px-2" aria-hidden="true">/</span>Collections</nav>
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">Curated for you</p>
      <h1 className="mt-2 font-serif text-4xl font-extrabold text-ink sm:text-5xl">Savings collections</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">Useful discounts and tools brought together around the things you’re working toward.</p>
      <div className="mt-8"><EditorialListing items={collections.items} /></div>
    </main>
  );
}
