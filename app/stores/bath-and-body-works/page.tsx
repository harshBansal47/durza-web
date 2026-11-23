import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import BathAndBodyWorksLuxuryPage from "./BathAndBodyWorksLuxuryPage";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { BATH_AND_BODY_WORKS_SLOTS } from "@/lib/luxury-images";

const title = "Bath & Body Works India — The Home Spa & Fragrance Edit | Durza";
const description =
  "Iconic 3-wick soy-blend candles, fine fragrance mists, shea body creams, and ready-to-gift spa sets — curated for Indian homes and festive gifting.";
const canonical = "/stores/bath-and-body-works";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("bath-and-body-works", baseMetadata);
}

const FAQS = [
  {
    question: "Are Bath & Body Works India products identical to the US equivalents?",
    answer:
      "Ingredients for the India-licensed range are localised for legislative and consumer-preference reasons; some scent combinations may be limited runs. Full ingredient lists are on each product page.",
  },
  {
    question: "Can I send the candles as wedding favours?",
    answer:
      "Yes — the home fragrance sets and gift sets scale well for gifting. Durza does not run a gifting desk; share the fragrance name with your event planner or gift supplier directly.",
  },
  {
    question: "Are the fragrance mists safe on clothes?",
    answer:
      "Fragrance mists are intended for skin, not fabric. We recommend spraying onto skin from a 15–20 cm distance; for garment scenting, use dedicated fabric sprays instead.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("bath-body-works", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const storeUrl = destination?.store.website_url ?? "https://www.bathandbodyworks.in/";

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
      <BathAndBodyWorksLuxuryPage storeUrl={storeUrl} faqs={FAQS} stats={stats} slots={BATH_AND_BODY_WORKS_SLOTS} />
    </>
  );
}
