import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "HealthKart Coupons, Protein & Supplement Deals";
const description = "Verified HealthKart promo codes, HK Cash and best deals on protein, vitamins and mass gainers with free shipping above ₹499.";
const canonical = "/stores/healthkart";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How to verify scratch codes to prove authenticity?", answer: "Every supplement comes with a scratch-off code; scratch it and verify on the brand site or app to confirm authenticity." },
  { question: "Can I stack HK Cash with coupon codes?", answer: "Yes, HK Cash rewards can be redeemed alongside coupon code discounts." },
  { question: "What are the shipping criteria?", answer: "Free shipping on orders above ₹499 across India." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("healthkart", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? undefined;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "HealthKart", path: "/stores/healthkart" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="healthkart" />
    </>
  );
}
