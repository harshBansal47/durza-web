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

const title = "Gritzo Official Store Guide — Personalized Kids' SuperMilk";
const description =
  "Compare Gritzo SuperMilk Height+, Genius, and Teen Protein personalized by age (4–17y) and gender. Check clean-label ingredients and FAQs on Durza.";
const canonical = "/stores/gritzo";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("gritzo", baseMetadata);
}

const FAQS = [
  {
    question: "Why does Gritzo separate formulas for boys and girls?",
    answer:
      "Starting around age 8–13, boys and girls develop different micronutrient needs—such as higher iron requirements for adolescent girls and distinct zinc/calcium ratios—so each tub adjusts its vitamin-mineral blend accordingly.",
  },
  {
    question: "How is Gritzo SuperMilk sweetened if it has zero refined sugar?",
    answer:
      "Gritzo uses unrefined jaggery powder or natural fruit/cocoa extracts instead of white table sugar or artificial sucralose—check the exact nutrition label on each tub on gritzo.com.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("gritzo", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://gritzo.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Gritzo", path: canonical },
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
      <RelatedGuides slug="gritzo" />
    </>
  );
}
