import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Boult Coupons, Gaming Earbuds & Smartwatch Deals";
const description = "Boult promo codes, BOULT100 flat ₹100 off and best deals on gaming earbuds, neckbands and smartwatches at goboult.co.in.";
const canonical = "/stores/boult";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I apply coupon code BOULT100 at checkout?", answer: "Add any earbuds, smartwatch, or audio accessory worth ₹999 or more to your cart on goboult.co.in. At the payment step, enter BOULT100 in the discount coupon box to receive an instant ₹100 deduction." },
  { question: "What does Combat Mode™ mean in Boult gaming earbuds?", answer: "Combat Mode™ optimizes the Bluetooth audio transmission to deliver ultra-low latency down to 40 milliseconds, ensuring in-game footsteps and gunshots sync in real time without audio delay." },
  { question: "Do Boult products purchased via these deals come with brand warranty?", answer: "Yes. All purchases made through official store links on goboult.co.in include Boult's official 1-year replacement warranty, which you can register on their website using your invoice." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("boult", { skip: 0, limit: 50 });
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
    { name: "Boult", path: "/stores/boult" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="boult" />
    </>
  );
}
