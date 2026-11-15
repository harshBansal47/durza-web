import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Kama Ayurveda Coupons, Kumkumadi & Bringadi Deals";
const description = "Kama Ayurveda promo codes, KAMA10 10% off and best luxury deals on Kumkumadi night serum, Bringadi oil and rose water.";
const canonical = "/stores/kama-ayurveda";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I choose my 3 complimentary samples?", answer: "An interactive sample selector appears at checkout, letting you handpick 3 luxury trial sizes across cleansers, oils, and moisturizers." },
  { question: "Is Kama Kumkumadi Oil suitable for oily or acne-prone skin?", answer: "Yes, but apply only 2–3 drops onto damp skin and leave on for 30 minutes before wiping with a warm cotton cloth." },
  { question: "What is the minimum threshold for free shipping?", answer: "Free express delivery on all domestic orders totaling ₹1,499 or more." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("kama-ayurveda", { skip: 0, limit: 50 });
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
    { name: "Kama Ayurveda", path: "/stores/kama-ayurveda" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="kama-ayurveda" />
    </>
  );
}
