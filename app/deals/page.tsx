import { Suspense } from "react";
import type { Metadata } from "next";

import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

import PageTitle from "@/components/ui/PageTitle";
import KeywordForm from "@/components/filters/KeywordForm";
import DealsFeedSection from "@/components/deals/DealsFeedSection";
import DealsFeedSkeleton from "@/components/deals/DealsFeedSkeleton";

export const revalidate = 300;

export const metadata: Metadata = {
  // Static copy on purpose: an exact-count title/description forced one Neon round
  // trip before <head> could flush — costing ~0.5s on every cold render for very
  // little SEO gain. The live count is already shown inside the page itself.
  title: "Today's Checked Deals & Offers",
  description:
    "Live deals and offers — every deal shows the store page it came from and when it was last checked.",
  alternates: { canonical: absoluteUrl("/deals") },
  openGraph: {
    title: "Today's Checked Deals & Offers",
    description:
      "Live deals and offers — every deal shows the store page it came from and when it was last checked.",
    url: absoluteUrl("/deals"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Today's Checked Deals & Offers",
    description:
      "Live deals and offers — every deal shows the store page it came from and when it was last checked.",
  },
};


interface DealsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DealsPage({ searchParams }: DealsPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 md:px-6 md:py-12">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Deals", path: "/deals" }])} />
      {/* H1 is always rendered for structure; it's visually hidden on mobile where
          the sticky filter row gives sufficient context. */}
      <PageTitle className="sr-only md:not-sr-only">Today&apos;s verified deals</PageTitle>
      <p className="mb-8 mt-2 hidden text-sm text-ink-soft md:block">
        What shoppers most recently confirmed working, and where prices moved.
      </p>
      <div className="mb-8 hidden md:block">
        <KeywordForm
          placeholder="Search today's deals…"
          label="Search today's deals"
        />
      </div>

      <Suspense fallback={<DealsFeedSkeleton />}>
        <DealsFeedSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
