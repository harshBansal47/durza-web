import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import LuxuryStoreClient from "@/components/store/LuxuryStoreClient";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { VERO_MODA_SLOTS } from "@/lib/luxury-images";

const title = "Vero Moda India — European Tailoring & Editorial Fashion Showcase";
const description =
  "Vero Moda India — European tailoring, silk dresses, work-capsules and off-duty denim. Editorial showcase, no coupons, only the official collection.";
const canonical = "/stores/vero-moda";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does Vero Moda India sizing compare to European brands?", answer: "Vero Moda India sizes follow EU standards; Indian shoppers moving from Lifestyle or Shopper's Stop size columns should consider ordering one size up. Refer to the size chart on each product page." },
  { question: "Does Vero Moda India participate in the Durza affiliate program?", answer: "Durza carries an affiliate relationship; purchasing via the outbound link earns Durza a commission. Prices, returns and exchanges are Vero Moda's — Durza does not discount the catalogue." },
  { question: "Are Vero Moda prices inclusive of GST and delivery?", answer: "Displayed prices are MRP-inclusive of GST. Delivery fees and return charges vary by service area; check the product page for the final cart amount before payment." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("veromoda", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.veromoda.in/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Vero Moda", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <LuxuryStoreClient
        storeName="Vero Moda"
        tagline="European tailoring with Indian ease — silk, crepe and the kind of fit that lets a Monday meeting feel like a choice."
        storeSlug="veromoda"
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        faqs={FAQS}
        stats={stats}
        slots={VERO_MODA_SLOTS}
        showcaseEyebrow="Vero Moda · The Copenhagen Edit for India"
        showcaseLead="The Monday-to-Monday edit — silk for dinner, crepe for boardroom, linen-cotton for the seaside getaway. All offical collections, no discount language."
      />
    </>
  );
}
