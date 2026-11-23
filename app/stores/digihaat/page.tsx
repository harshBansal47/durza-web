import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Digihaat — ONDC-backed Swadeshi, Grocery & Electronics Deals (Zero Platform Fees)";
const description =
  "Digihaat: India's ONDC open-network marketplace — Swadeshi, grocery and electronics deals; zero platform fees. Shop direct from local sellers across India.";
const canonical = "/stores/digihaat";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("digihaat", baseMetadata);
}

const FAQS = [
  { question: "What is ONDC and how does Digihaat fit in?", answer: "ONDC (Open Network for Digital Commerce) is India's government-backed open commerce framework that lets buyers compare and shop across many sellers on one interface — similar to an airline fare aggregator. Digihaat is one of the marketplace applications on ONDC." },
  { question: "How is Digihaat different from Amazon and Flipkart?", answer: "Digihaat connects you to ONDC sellers — often local stores, kiranas and small businesses — with zero platform fees. Digihaat profits from ONDC's standardised commission structure; prices can undercut large marketplaces by avoiding captive-seller commissions." },
  { question: "Are Digihaat's Swadeshi products authentic?", answer: "Yes — every ONDC seller listing carries a GST registration and HSN code traceable on the ONDC portal. Durza's buyer protection framework applies identically to Amazon, Flipkart and Digihaat purchases routed via our affiliate links." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("digihaat", { skip: 0, limit: 10 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.digihaat.in/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Digihaat", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} faqs={FAQS} stats={stats} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="digihaat" />
    </>
  );
}
