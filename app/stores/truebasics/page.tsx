import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import TrueBasicsClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "TrueBasics Coupons, Triple Strength Omega-3 & KSM-66 Deals";
const description = "Verified TrueBasics promo codes, 20% off code CLINICAL20, and best deals on Triple Strength Omega-3, KSM-66 Ashwagandha and clinical multivitamins.";
const canonical = "/stores/truebasics";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Why does enteric coating in TrueBasics Omega-3 prevent fishy burps?", answer: "The enteric coat is pH-sensitive: it survives stomach acid and dissolves only in the small intestine, so the fish oil is absorbed where it acts — never releasing fishy odour in the stomach." },
  { question: "What makes KSM-66 clinically superior to raw root powders?", answer: "KSM-66 is a root-only, full-spectrum extract standardized to 5% withanolides with 22 published human trials. Raw powders vary wildly in withanolide content and may include leaf alkaloids." },
  { question: "How do I qualify for free delivery?", answer: "Free doorstep delivery across India on all orders of ₹499 or more — a single bottle of KSM-66 Ashwagandha already qualifies." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("truebasics", { skip: 0, limit: 50 });
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
          { name: "TrueBasics", path: "/stores/truebasics" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <TrueBasicsClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="truebasics" />
    </>
  );
}
