import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import LuxuryStoreClient from "@/components/store/LuxuryStoreClient";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { BATH_AND_BODY_WORKS_SLOTS } from "@/lib/luxury-images";

const title = "Bath & Body Works India — Fragrance Mists, Candles & Body Care Editorial";
const description =
  "Bath & Body Works India — fine fragrance mists, 3-wick candles, body lotions and home fragrance. The official collection, no coupons, editorial showcase.";
const canonical = "/stores/bath-and-body-works";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Are Bath & Body Works India products identical to the US equivalents?", answer: "Ingredients for the India-licensed range are localised for legislative and consumer-preference reasons; some scent combinations may be limited runs. Full ingredient lists are on each product page." },
  { question: "Can I send the candles as wedding favours?", answer: "Yes — the home fragrance sets and gift sets scale well for gifting. Durza does not run a gifting desk; share the fragrance name with your event planner or gift supplier directly." },
  { question: "Are the fragrance mists safe on clothes?", answer: "Fragrance mists are intended for skin, not fabric. We recommend spraying onto skin from a 15–20 cm distance; for garment scenting, use dedicated fabric sprays instead." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("bath-body-works", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.bathandbodyworks.in/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Bath & Body Works", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <LuxuryStoreClient
        storeName="Bath & Body Works"
        tagline="Fine fragrance mists, 3-wick candles and body butters — the house that turns a bathroom into a spa."
        storeSlug="bath-body-works"
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        faqs={FAQS}
        stats={stats}
        slots={BATH_AND_BODY_WORKS_SLOTS}
        showcaseEyebrow="Bath & Body Works · The Fragrance Edit"
        showcaseLead="The Japanese Cherry Blossom morning, the Twilight Woods evening, the gift set for the person who has everything — curated for Indian homes."
      />
    </>
  );
}
