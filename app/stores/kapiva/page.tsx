import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Kapiva Coupons, Himalayan Shilajit & Herbal Juice Deals";
const description = "Kapiva promo codes, KAPIVA10 extra 10% off and best deals on Himalayan Shilajit resin, Dia Free Juice and Get Slim.";
const canonical = "/stores/kapiva";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I verify the purity of Kapiva Shilajit Resin?", answer: "Every jar comes with a batch-specific NABL lab test certificate verifying >60% Fulvic Acid and heavy metal levels below FSSAI limits." },
  { question: "How should Kapiva juices be consumed for best results?", answer: "Mix 30ml of juice in room-temperature water and consume twice daily on an empty stomach, 30 minutes before breakfast and dinner." },
  { question: "What is the minimum order for free shipping on Kapiva?", answer: "Free doorstep delivery across India on all orders of ₹499 or more." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("kapiva", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? undefined;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Kapiva Ayurveda", path: "/stores/kapiva" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="kapiva" />
    </>
  );
}
