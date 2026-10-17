import type { Metadata } from "next";
import Link from "next/link";
import { EditorialListing } from "@/components/editorial/EditorialComponents";
import PageTitle from "@/components/ui/PageTitle";
import { resilient } from "@/lib/api";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Comparisons",
  description: "Compare products and services side by side before choosing what to buy.",
  alternates: { canonical: "/compare" },
};

export default async function ComparisonsPage() {
  const comparisons = await resilient.listEditorial({ content_type: "comparison", limit: 60 });
  return (
    <main className="page-shell">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft"><Link href="/" className="hover:text-inkblue">Home</Link><span className="px-2" aria-hidden="true">/</span>Comparisons</nav>
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">Side by side</p>
      <PageTitle className="mt-2">Comparisons</PageTitle>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">See the meaningful differences in features, pricing, and trade-offs before you decide.</p>
      <div className="mt-8"><EditorialListing items={comparisons.items} /></div>
    </main>
  );
}
