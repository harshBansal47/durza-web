import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Fitspire Coupons, Collagen & Weight Care Deals";
const description = "Fitspire promo codes, FIT10 and FIT20 offers and best deals on plant-based collagen and apple cider vinegar.";
const canonical = "/stores/fitspire";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Can I stack coupon code FIT10 or FIT20 with UPI checkout discounts?", answer: "Yes. First apply coupon code FIT10 or FIT20 in your Fitspire shopping cart. When you proceed to the payment gateway and choose UPI or prepaid cards, Fitspire applies an additional 5% instant deduction on the discounted subtotal." },
  { question: "Is Fitspire Collagen sourced from animals or fish?", answer: "No. Fitspire collagen is 100% plant-based, using natural plant extracts like Sesbania Agati, Acerola Cherry, and Bamboo Shoot that stimulate the body's natural collagen synthesis without marine or bovine derivatives." },
  { question: "What is the easiest cart-filler to hit the ₹499 free shipping mark?", answer: "If your cart is around ₹350–₹450, adding an all-natural high protein peanut butter tub or an effervescent drink tube is more cost-effective than paying the standard ₹70 doorstep shipping fee." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("fitspire", { skip: 0, limit: 50 });
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
    { name: "Fitspire", path: "/stores/fitspire" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="fitspire" />
    </>
  );
}
