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

const title = "Kama Ayurveda Official Store \u2014 Ayurvedic Skin & Hair Care | Durza";
const description = "Explore Kama Ayurveda skincare, haircare and gifting by concern. Check authentic ranges and live availability on the official Kama Ayurveda store.";
const canonical = "/stores/kama-ayurveda";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("kama-ayurveda", baseMetadata);
}

const FAQS = [
  { question: "Why buy Kama Ayurveda from the official store?", answer: "Shopping direct helps you access authentic Kama Ayurveda ranges, current collections and official product information. Any samples, consultations or checkout benefits are subject to the terms shown on kamaayurveda.in." },
  { question: "How do I choose the right Kama Ayurveda product for my concern?", answer: "Start with your skin or hair concern and pick gentle, suitable formulations. Patch-test new products (especially oils/actives) and follow the usage directions on the official product page or seek professional advice if needed." },
  { question: "Are consultations or samples available?", answer: "Kama Ayurveda may offer consultation options and complimentary samples on qualifying orders. Availability and terms can vary \u2014 check the latest details on the official site." },
  { question: "What about shipping and returns?", answer: "Shipping thresholds and return/replacement eligibility depend on the order and item condition and are governed by Kama Ayurveda\u2019s policies. Review current shipping/returns information on the official store before ordering." },
  { question: "Where can I check live availability and pricing?", answer: "Live product availability, pricing and checkout offers are shown on kamaayurveda.in. Browse the relevant collection via this page to confirm current details." }
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("kama-ayurveda", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("kama-ayurveda") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.kamaayurveda.in";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Kama Ayurveda", path: canonical },
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
      <RelatedGuides slug="kama-ayurveda" />
    </>
  );
}
