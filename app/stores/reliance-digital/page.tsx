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

const title = "Reliance Digital Store Guide — Appliances, Phones & resQ";
const description =
  "Explore Reliance Digital online for smartphones, laptops, inverter ACs, and 4K TVs backed by nationwide resQ installation and service support on Durza.";
const canonical = "/stores/reliance-digital";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("reliance-digital", baseMetadata);
}

const FAQS = [
  {
    question: "How does resQ installation work when ordering large appliances on Reliance Digital?",
    answer:
      "Once your AC, TV, or washing machine is delivered, Reliance Digital's resQ service team schedules brand-authorized installation for your PIN code—check standard installation inclusions on the product page.",
  },
  {
    question: "How do bank instant discounts apply on reliancedigital.in?",
    answer:
      "Select an eligible credit/debit card or EMI option on the payment step to verify live minimum-cart thresholds and instant discount caps.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("reliance-digital", { skip: 0, limit: 10 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.reliancedigital.in/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Reliance Digital", path: canonical },
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
      <RelatedGuides slug="reliance-digital" />
    </>
  );
}
