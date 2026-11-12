import { Suspense } from "react";
import type { Metadata } from "next";

import { resilient } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";
import PageTitle from "@/components/ui/PageTitle";
import KeywordForm from "@/components/filters/KeywordForm";
import DealsFeedSection from "@/components/deals/DealsFeedSection";
import DealsFeedSkeleton from "@/components/deals/DealsFeedSkeleton";

export async function generateMetadata(): Promise<Metadata> {
  // One exact count, shared with the page through the Next data cache — the
  // old second products call only tweaked wording and cost a full round trip.
  const offers = await resilient.listCoupons({ active_only: true, limit: 1 });
  const total = offers.total;

  const title = total > 0 ? `Today's Verified Deals: ${total} Live Offers` : "Today's Verified Deals & Offers";
  const description =
    total > 0
      ? `Browse ${total} live deals and offers — each deal shows the store page it came from and when it was last checked.`
      : "Live deals and offers, each sourced from the store's own page with the date it was last checked.";
  const canonical = absoluteUrl("/deals");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}


interface DealsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DealsPage({ searchParams }: DealsPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 md:px-6 md:py-12">
      {/* Phones drop the title block and start at the sticky tool row below;
          the h1 stays for structure and screen readers. */}
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
