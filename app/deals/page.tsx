import { Suspense } from "react";
import type { Metadata } from "next";

import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

import ListingHero from "@/components/listing/ListingHero";
import KeywordForm from "@/components/filters/KeywordForm";
import DealsFeedSection from "@/components/deals/DealsFeedSection";
import DealsFeedSkeleton from "@/components/deals/DealsFeedSkeleton";

export const revalidate = 1800;

export const metadata: Metadata = {
  // Static copy on purpose: an exact-count title/description forced one Neon round
  // trip before <head> could flush — costing ~0.5s on every cold render for very
  // little SEO gain. The live count is already shown inside the page itself.
  title: "Today's Deals — Amazon, Flipkart, Myntra, Nykaa India Offers",
  description:
    "Live deals in India — Oppo, laptop, fashion, grocery and fashion deals shown with store page, terms and last-checked date.",
  alternates: { canonical: absoluteUrl("/deals") },
  openGraph: {
    title: "Today's Deals — Amazon, Flipkart, Myntra, Nykaa India Offers",
    description:
      "Live deals in India — Oppo, laptop, fashion, grocery and fashion deals shown with store page, terms and last-checked date.",
    url: absoluteUrl("/deals"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Today's Deals — Amazon, Flipkart, Myntra, Nykaa India Offers",
    description:
      "Live deals in India — Oppo, laptop, fashion, grocery and fashion deals shown with store page, terms and last-checked date.",
  },
};


interface DealsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DealsPage({ searchParams }: DealsPageProps) {
  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 pb-20 md:px-6 md:py-12">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Deals", path: "/deals" }])} />
      {/* On phones the sticky toolbar below gives the context, so only the h1 stays
          (visually hidden); from md up this is the full header. */}
      <ListingHero
        mobile="title-only"
        eyebrow="Live deals · check date on every card"
        title="Today's deals in India"
        lead="Live offers on the stores shoppers use daily — Oppo, Flipkart, Nykaa, Amazon — with store page, terms and last-checked date."
        controls={<KeywordForm size="bar" placeholder="Search today's deals…" label="Search today's deals" />}
      />

      <Suspense fallback={<DealsFeedSkeleton />}>
        <DealsFeedSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
