import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Indus Valley Coupons, Hair Colour & Herbal Dye Deals";
const description = "Verified Indus Valley promo codes, FIRST10 offers and best deals on ammonia-free herbal hair colour with free delivery above ₹299.";
const canonical = "/stores/indus-valley";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How is Indus Valley Gel Hair Colour different from regular dyes?", answer: "It contains zero ammonia, hydrogen peroxide, and synthetic PPD, coloring hair through certified organic herbs and aloe vera base, eliminating chemical damage and burning." },
  { question: "How do I get free shipping on Indus Valley orders?", answer: "Orders with a cart total of ₹299 or higher qualify for free standard doorstep delivery across India automatically at checkout." },
  { question: "Can the FIRST10 coupon code be used on bundles and kits?", answer: "Yes, FIRST10 stacks on already-discounted combos and individual items for first-time shoppers." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("indus-valley", { skip: 0, limit: 50 });
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
    { name: "Indus Valley", path: "/stores/indus-valley" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="indus-valley" />
    </>
  );
}
