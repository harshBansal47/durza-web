import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "Acer India Official Store Guide — Nitro, Swift & Predator";
const description =
  "Compare Acer Nitro V, Predator Helios, Swift Go OLED, and Aspire Lite laptops in India. Check official eStore warranty bundles and specs on Durza.";
const canonical = "/stores/acer";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Why check store.acer.com alongside Amazon or Flipkart?",
    answer:
      "Acer's official India store lists freshly launched CPU/GPU configurations, student/corporate program eligibility, and extended warranty or accidental-damage add-on packs at checkout.",
  },
  {
    question: "Can I upgrade RAM and SSD later on Acer Nitro or Aspire laptops?",
    answer:
      "Most Nitro and full-size Aspire models include accessible SO-DIMM and M.2 NVMe slots, whereas ultra-thin Swift OLED models use soldered LPDDR5X memory—so pick 16GB+ upfront on ultrabooks.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("acer", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://store.acer.com/en-in/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Acer", path: canonical },
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
      <RelatedGuides slug="acer" />
    </>
  );
}
