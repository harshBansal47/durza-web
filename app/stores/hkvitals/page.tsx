import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { admitadLogoForSlug, storeLogoUrl } from "@/lib/storeLogos";

const title = "HK Vitals Official Store \u2014 Skin, Hair & Daily Supplements | Durza";
const description = "Explore HK Vitals supplements by concern \u2014 collagen, biotin, multivitamins and more. Check ingredients and live availability on the official HK Vitals store.";
const canonical = "/stores/hkvitals";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("hkvitals", baseMetadata);
}

const FAQS = [
  { question: "What is HK Vitals?", answer: "HK Vitals is a nutraceutical brand in the HealthKart ecosystem offering supplements across skin, hair and daily wellness concerns. Check product details, ingredients and usage guidance on hkvitals.com." },
  { question: "How do I choose the right HK Vitals supplement?", answer: "Choose based on your specific concern, dietary preferences (veg/non-veg markers) and ingredient suitability. Follow label directions and consult a qualified professional if you have medical conditions or take other supplements." },
  { question: "How long should I take supplements to see results?", answer: "Nutrition supplements often require consistent use over time as part of a routine; timelines vary by individual and product. Refer to label guidance and avoid expecting guaranteed outcomes." },
  { question: "Are HK Vitals products vegetarian?", answer: "It depends on the product (for example, some collagen/fish-oil products may be non-vegetarian). Always check the dietary marker and ingredient list on the specific product page." },
  { question: "Where can I check current prices and packs?", answer: "Live prices, combo packs and availability are shown on hkvitals.com. Use this page to find the right category and confirm current details." }
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("hkvitals", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("hkvitals") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.hkvitals.com";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "HK Vitals", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        faqs={FAQS}
        stats={stats}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
      />
      <RelatedGuides slug="hkvitals" />
    </>
  );
}
