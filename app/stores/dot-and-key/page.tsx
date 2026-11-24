import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "Dot & Key Official Store Guide — Sunscreens & Serums | Durza";
const description =
  "Shop Dot & Key direct for Watermelon Cooling Sunscreen, Ceramide Barrier Repair, and Vitamin C serums. Check official combos and skincare tips on Durza.";
const canonical = "/stores/dot-and-key";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("dot-and-key", baseMetadata);
}

const FAQS = [
  {
    question: "Why order from dotandkey.com instead of marketplaces?",
    answer:
      "Official site carries the newest batch dates, full travel-size trial kits, and sitewide multi-product combo tiers.",
  },
  {
    question: "How do I layer Dot & Key actives safely?",
    answer:
      "Apply watery serums (Vitamin C or Niacinamide) on clean skin first, lock in with Ceramide moisturizer, and finish with two fingers' worth of SPF 50 every morning.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("dot-and-key", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.dotandkey.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Dot & Key", path: canonical },
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
      <RelatedGuides slug="dot-and-key" />
    </>
  );
}
