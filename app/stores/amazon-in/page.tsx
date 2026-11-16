import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Amazon India Offers & Best Deals (2026) — Curated Professional Picks";
const description =
  "Hand-picked Amazon India picks Curated by the Durza editor — work-from-home gear, PC components, audio, kitchen, home gym, personal care and cards. Refreshed with live Check dates.";
const canonical = "/stores/amazon-in";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Why is this page shorter than other Amazon pages?", answer: "Every offer on this page was chosen by hand on the strength of purpose and professional credibility, not by a feed. We would rather list a hundred honest bargains than a thousand untested products." },
  { question: "Are these Amazon affiliate links?", answer: "Yes. Clicks route through Amazon Associates (tag=durza02-21) at no extra cost to you. We never alter prices or keep a copy of what you buy; Amazon decides the shipping, returns and warranty." },
  { question: "Can I combine Amazon offers with bank discounts?", answer: "Yes. Bank instant discounts stack on top of Amazon's own prices. The checkout panel decides the final discount — we never promise a price you cannot reach." },
  { question: "Does Durza price-match Amazon?", answer: "No. Amazon prices change throughout the day. The price you pay is the one shown at checkout on Amazon.in. Durza never re-prices or re-quotes figures from the catalogue here." },
  { question: "How often is this page refreshed?", answer: "The offer list is re-read whenever Amazon India updates its catalogue. Products that fall out of stock or are discontinued are retired automatically; new additions appear after editorial review." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("amazon-in", { skip: 0, limit: 100 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? undefined;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Amazon", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        offers={offers}
        faqs={FAQS}
        stats={stats}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
      />
      <RelatedGuides slug="amazon-in" />
    </>
  );
}
