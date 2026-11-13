import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import LevisClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Levi's India Coupons, 511 & 501 Jeans Deals & Sale Offers";
const description = "Verified Levi.in promo codes, ₹1,000 off code LEVIS1000, and best deals on 511 Slim, 512 Taper and 501 Original jeans.";
const canonical = "/stores/levis";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What is the difference between the Levi's 511™ and 512™ fits?", answer: "511™ is a slim fit through the thigh and leg. 512™ keeps the slim thigh but tapers the ankle opening — a slim-taper silhouette best paired with sneakers or Chelsea boots." },
  { question: "How does the 15-day size exchange and return work?", answer: "Unworn Levi's purchases can be exchanged or returned within 15 days of delivery. Start a request on levi.in with your invoice; reverse pickup and refund are handled by their courier partners." },
  { question: "Can LEVIS1000 be applied on sale items?", answer: "Yes, LEVIS1000 applies on cart value above ₹5,999 including sale items, and LEVIS500 kicks in above ₹3,499. Enter the code at the payment step before paying." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("levis", { skip: 0, limit: 50 });
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
          { name: "Levi's India", path: "/stores/levis" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <LevisClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="levis" />
    </>
  );
}
