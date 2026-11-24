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

const title = "Fuel One Official Store Guide — Whey Max & Creatine | Durza";
const description =
  "Compare Fuel One Whey Max, Iso-Max, and Creatine Monohydrate from the makers of MuscleBlaze. Check lab-test authenticity and pack sizes on Durza.";
const canonical = "/stores/fuelone";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("fuelone", baseMetadata);
}

const FAQS = [
  {
    question: "How is Fuel One different from MuscleBlaze Biozyme?",
    answer:
      "Both come from the same parent company (Bright Lifecare) with the same lab-testing standards; Fuel One strips away fancy packaging and specialty enzyme blends to focus on clean, high-protein-per-scoop value.",
  },
  {
    question: "How do I verify my Fuel One tub is genuine?",
    answer:
      "Scratch the unique code on the neck seal and verify it on the official Fuel One / MuscleBlaze authentication portal before breaking the inner seal.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("fuelone", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://fuelone.in/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Fuel One", path: canonical },
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
      <RelatedGuides slug="fuelone" />
    </>
  );
}
