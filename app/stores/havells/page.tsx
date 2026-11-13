import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Havells Coupons, Home Appliances & Electricals Deals";
const description = "Verified Havells promo codes, HAVELLS500 flat ₹500 off above ₹4,999 and best deals on fans, appliances and electricals.";
const canonical = "/stores/havells";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does warranty registration work on the Havells official store?", answer: "Every Havells product includes a 100% genuine manufacturer warranty; you can register it on their website using your invoice and serial number." },
  { question: "Is doorstep installation available?", answer: "Yes, eligible products include doorstep installation as per Havells service terms." },
  { question: "How to apply HAVELLS500?", answer: "Add products worth ₹4,999 or more and enter HAVELLS500 at checkout to get flat ₹500 off." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("havells", { skip: 0, limit: 50 });
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
    { name: "Havells", path: "/stores/havells" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="havells" />
    </>
  );
}
