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

const title = "Kapiva Official Store \u2014 Ayurvedic Nutrition & Wellness | Durza";
const description = "Explore Kapiva juices, Shilajit and wellness nutrition by goal. Check ingredients, lab/test information and live availability on the official Kapiva store.";
const canonical = "/stores/kapiva";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("kapiva", baseMetadata);
}

const FAQS = [
  { question: "Why buy Kapiva from the official store?", answer: "The official Kapiva store provides current product ranges, ingredient and usage information, and any brand-provided quality/test details. Review specifics on each listing and confirm live availability at checkout." },
  { question: "How should I choose a Kapiva product?", answer: "Pick based on your wellness goal, preferred format and ingredient suitability. Follow serving guidance and consult a qualified healthcare professional if you are pregnant, nursing, have a condition or take medication." },
  { question: "Are lab reports or consultations available?", answer: "Kapiva shares quality/testing information for certain products and may offer consultation options as described on its site. Check the relevant product or service page on kapiva.in for current details." },
  { question: "Can supplements replace medical treatment?", answer: "No. Dietary supplements and Ayurvedic nutrition products are not intended to diagnose, treat, cure or prevent disease. Use them as part of a healthy routine and seek medical advice for health conditions." },
  { question: "Where can I check current prices and availability?", answer: "Live prices, pack options and availability are shown on kapiva.in. Browse the relevant range via this page to confirm current details." }
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("kapiva", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("kapiva") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://kapiva.in";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Kapiva", path: canonical },
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
      <RelatedGuides slug="kapiva" />
    </>
  );
}
