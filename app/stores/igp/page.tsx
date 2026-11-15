import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "IGP Coupons, Cake & Personalized Gift Delivery Deals";
const description = "IGP.com coupon codes, IGP10 10% off and best deals on same-day cakes, personalized photo gifts and floral bouquets.";
const canonical = "/stores/igp";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does Midnight Delivery work on IGP.com?", answer: "Select the Midnight Delivery slot during checkout; the surprise arrives between 11:00 PM and 11:59 PM across 400+ cities." },
  { question: "Can coupon code IGP10 be applied to personalized gifts?", answer: "Yes, IGP10 provides an additional 10% discount on custom photo frames, LED lamps, and hampers with no minimum." },
  { question: "Are there any IGP codes for midnight or same-day delivery?", answer: "Midnight and same-day deliveries occasionally run occasion-specific codes — wedding season, anniversaries, Rakhi — which appear in the offers panel above this answer when they are source-checked. IGP10 remains the standing site code; checkout will show whether an occasion code applies to your slot." },
  { question: "What happens if the recipient is not available?", answer: "For perishables, delivery agents coordinate via phone; standard products ship with courier partners and SMS tracking." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("igp", { skip: 0, limit: 50 });
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
    { name: "IGP.com", path: "/stores/igp" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="igp" />
    </>
  );
}
