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

const title = "ZeroHarm Official Store Guide — Nano Plant Nutraceuticals";
const description =
  "Explore ZeroHarm's nano-formulated Curcumin, plant-based Iron, Vitamin D3+K2, and Milk Thistle supplements. Check bioavailability insights on Durza.";
const canonical = "/stores/zeroharm";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("zeroharm", baseMetadata);
}

const FAQS = [
  {
    question: "Why are ZeroHarm supplements paired with Vitamin D3 + K2 together?",
    answer:
      "Vitamin D3 helps your body absorb calcium from food, while Vitamin K2 (MK-7) activates proteins that bind that calcium into bone matrix.",
  },
  {
    question: "Are ZeroHarm capsules free from animal gelatin?",
    answer:
      "Yes—ZeroHarm uses plant-derived cellulose capsules and vegan botanical extracts across its product lineup.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("zeroharm", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.zeroharm.in/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "ZeroHarm", path: canonical },
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
      <RelatedGuides slug="zeroharm" />
    </>
  );
}
