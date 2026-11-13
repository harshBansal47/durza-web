import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import TheManCompanyClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "The Man Company Coupons, Beard Growth & Blanc Perfume Deals";
const description = "Verified The Man Company promo codes, 15% off code TMC15, and best deals on Derma Roller beard kits, Blanc EDP, and charcoal face care.";
const canonical = "/stores/the-man-company";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How long does The Man Company Beard Growth Oil take to show results?", answer: "Most users report softer, thicker-looking growth in 4–8 weeks of nightly use with the Derma Roller twice a week. Results vary by genetics and consistency — combine oil with the roller for best outcomes." },
  { question: "What is the difference between gas deodorants and Blanc EDP?", answer: "Deodorants only mask sweat odour for hours. Blanc Eau de Parfum is an 8H+ fragrance with lemon, birch, lavender and patchouli notes layered for office and gym wear — it projects without overpowering." },
  { question: "What is the minimum order for free shipping?", answer: "Free doorstep delivery across India on all orders of ₹499 or more — the Beard Growth Oil alone is enough to qualify." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("the-man-company", { skip: 0, limit: 50 });
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
          { name: "The Man Company", path: "/stores/the-man-company" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <TheManCompanyClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="the-man-company" />
    </>
  );
}
