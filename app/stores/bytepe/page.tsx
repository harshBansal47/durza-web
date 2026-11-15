import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "BytePe Coupons, Bill Payment Cashback Deals";
const description = "BytePe cashback codes, FIRSTBILL offers and best deals on BBPS bill payments, recharges and instant digital gift vouchers.";
const canonical = "/stores/bytepe";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Does BytePe charge convenience fees on mobile and electricity bill payments?", answer: "Unlike many major wallet and UPI apps that levy a ₹2 to ₹5 platform or convenience fee, BytePe processes standard BBPS utility bill payments and mobile recharges with zero platform fee." },
  { question: "How does the FIRSTBILL cashback code work?", answer: "Create your BytePe account, choose your state electricity or piped gas provider under the BBPS section, enter a bill amount of ₹500 or more, and apply code FIRSTBILL. Your cashback is credited to your BytePe wallet immediately upon bank settlement." },
  { question: "How fast do brand digital gift vouchers get delivered?", answer: "Gift vouchers purchased on BytePe are delivered instantly via SMS and email within seconds of transaction confirmation, ready to redeem on Amazon, Flipkart, or food delivery apps." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("bytepe", { skip: 0, limit: 50 });
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
    { name: "BytePe", path: "/stores/bytepe" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="bytepe" />
    </>
  );
}
