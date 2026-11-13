import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import SironaClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Sirona Hygiene Coupons, Menstrual Cup & PeeBuddy Deals";
const description = "Verified Sirona Hygiene promo codes, 15% off code SIRONA15, and best deals on FDA-approved menstrual cups, heat patches and PeeBuddy devices.";
const canonical = "/stores/sirona";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I determine the correct menstrual cup size?", answer: "Pick Size S if you are under 25 and have never given birth; Size M for most women with normal flow; Size L if you have given birth vaginally or have a heavy flow. Still unsure? Start with M — it fits the majority." },
  { question: "How do PeeBuddy funnels prevent UTIs in public restrooms?", answer: "PeeBuddy lets you stand and urinate without contacting soiled toilet seats, avoiding the cross-contamination that causes urinary tract infections during travel and in dirty public washrooms." },
  { question: "What are the free delivery terms?", answer: "Free express delivery across India on all orders of ₹399 or more — a single PeeBuddy pack or heat patches cross the threshold." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("sirona", { skip: 0, limit: 50 });
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
          { name: "Sirona Hygiene", path: "/stores/sirona" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <SironaClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="sirona" />
    </>
  );
}
