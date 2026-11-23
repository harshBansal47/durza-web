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

const title = "Boult Official Store \u2014 Earbuds, Smartwatches & Audio | Durza";
const description = "Explore Boult TWS earbuds, smartwatches and audio by use case. Compare features and check live models, pricing and availability on the official Boult store.";
const canonical = "/stores/boult";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("boult", baseMetadata);
}

const FAQS = [
  { question: "Why buy Boult products from the official store?", answer: "The official store lists current models and variants and supports manufacturer warranty processes as per Boult\u2019s terms. Check warranty registration/support details on boultaudio.com and the product page." },
  { question: "How do I choose between ANC, ENC and gaming modes?", answer: "ANC helps reduce ambient noise for listening, ENC/mic features focus on call clarity, and low-latency modes are useful for gaming. Compare the specific features listed for each model on the official store." },
  { question: "Are Boult smartwatches water resistant?", answer: "Water/sweat resistance ratings vary by model (e.g. IP ratings listed on the product page). Check the exact rating and usage limitations for the specific watch before purchase." },
  { question: "What about warranty and replacements?", answer: "Boult products typically include manufacturer warranty covering manufacturing defects as per brand terms and exclusions. Review the warranty policy and claim process on the official site." },
  { question: "Where can I check current prices and availability?", answer: "Live prices, variants and availability are shown on the official Boult store. Use this page to find the right category and confirm current details." }
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("boult", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("boult") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.boultaudio.com";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Boult", path: canonical },
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
      <RelatedGuides slug="boult" />
    </>
  );
}
