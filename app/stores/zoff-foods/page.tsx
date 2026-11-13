import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import ZoffFoodsClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "ZOFF Foods Coupons, Cool-Ground Spices & Masala Combo Deals";
const description = "Verified ZOFF Foods promo codes, PANTRY20 20% off and best deals on Cool-Ground Haldi, Kashmiri Mirchi, Garam Masala combos and pure whole spices.";
const canonical = "/stores/zoff-foods";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What does Cool-Grinding technology do to spice aroma?", answer: "Traditional mills generate up to 95°C heat that burns off volatile essential oils. ZOFF grinds at sub-zero temperatures, preserving up to 95% of natural essential oils — so Haldi smells like Haldi, and Kashmiri Mirchi keeps its natural crimson." },
  { question: "How do the 5-layer zip-lock pouches prevent clumping in monsoon humidity?", answer: "Each pouch is a multi-layer vapour barrier with a resealable zip lock, keeping moisture out so spices stay free-flowing, bright and potent even through Indian monsoons." },
  { question: "What is the free shipping threshold?", answer: "Free doorstep delivery across India on all orders of ₹499 or more — the Essential Kitchen Masala Combo alone qualifies." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("zoff-foods", { skip: 0, limit: 50 });
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
          { name: "ZOFF Foods", path: "/stores/zoff-foods" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <ZoffFoodsClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="zoff-foods" />
    </>
  );
}
