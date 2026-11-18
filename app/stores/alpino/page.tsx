import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Alpino Coupons, Peanut Butter & Protein Deals";
const description = "Explore Alpino peanut butter, oats, and healthy snacks with current offers and shipping terms shown on the official store.";
const canonical = "/stores/alpino";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Why does oil separate on top of Alpino All-Natural Peanut Butter?", answer: "Oil separation is natural proof that Alpino contains zero hydrogenated vegetable oil, stabilizers, or chemical emulsifiers. The oil on top is 100% natural peanut oil. Simply stir it with a clean spoon before use." },
  { question: "Can coupon code ALPINO10 be combined with prepaid UPI checkout discounts?", answer: "Yes. First apply coupon code ALPINO10 on alpino.store during checkout. When you select UPI or debit/credit card payment, an additional 5% instant discount is calculated on the remaining balance." },
  { question: "What is the minimum cart value for free shipping on Alpino?", answer: "Free-shipping thresholds can vary by promotion and location. Check the current cart threshold and eligibility on Alpino at checkout." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("alpino", { skip: 0, limit: 50 });
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
    { name: "Alpino", path: "/stores/alpino" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="alpino" />
    </>
  );
}
