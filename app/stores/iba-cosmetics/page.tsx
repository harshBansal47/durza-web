import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Iba Cosmetics Coupons, Vegan & Halal Beauty Deals";
const description = "Iba Cosmetics coupons and offers on PETA-certified vegan, cruelty-free and Halal-certified beauty, including liquid lipsticks, alcohol-free attars/perfumes, and everyday skin tints."
const canonical = "/stores/iba-cosmetics";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What does Halal Certified mean in Iba Cosmetics?", answer: "Halal certification ensures all ingredients are free from animal fat, alcohol, and prohibited byproducts like carmine, with strict hygiene standards." },
  { question: "How do I activate the Buy 2 Get 1 Free deal on Breathable Nail Colors?", answer: "Add any 3 shades of Iba Breathable Nail Enamel to your basket and apply code B2G1 at checkout; the third bottle is deducted automatically." },
  { question: "What is the minimum order threshold for free delivery?", answer: "Free doorstep delivery across all PIN codes in India for orders totaling ₹499 or more." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("iba-cosmetics", { skip: 0, limit: 50 });
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
    { name: "Iba Cosmetics", path: "/stores/iba-cosmetics" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="iba-cosmetics" />
    </>
  );
}
