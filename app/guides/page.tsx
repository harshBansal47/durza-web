import type { Metadata } from "next";
import Link from "next/link";
import { EditorialListing } from "@/components/editorial/EditorialComponents";
import PageTitle from "@/components/ui/PageTitle";
import { resilient } from "@/lib/api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Buying guides",
  description: "Practical buying guides to help you compare options and save before you buy.",
  alternates: { canonical: "/guides" },
};

export default async function GuidesPage() {
  const guides = await resilient.listEditorial({ content_type: "guide", limit: 60 });
  return (
    <main className="page-shell">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft"><Link href="/" className="hover:text-inkblue">Home</Link><span className="px-2" aria-hidden="true">/</span>Guides</nav>
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">Spend with confidence</p>
      <PageTitle className="mt-2">Buying guides</PageTitle>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">Straightforward research and practical advice to help you find what fits before you spend.</p>
      <div className="mt-8"><EditorialListing items={guides.items} /></div>
    </main>
  );
}
