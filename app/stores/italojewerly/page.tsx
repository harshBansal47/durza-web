import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "Italo Jewelry Coupons & Lab-Created Jewellery Offers";
const description =
  "Italo Jewelry offers on lab-created sapphire, moissanite, and 925 sterling silver engagement and wedding sets. International USD checkout notes for Indian buyers included.";
const canonical = "/stores/italojewerly";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "What does Italo Jewelry specialize in?",
    answer:
      "Italo Jewelry highlights lab-created sapphire, moissanite, and 925 sterling silver engagement and wedding sets. Check each product page for stone details, metal specs, and sizing information.",
  },
  {
    question: "Does Italo Jewelry ship internationally to India?",
    answer:
      "Orders are typically shipped internationally in USD. Indian buyers should review shipping timelines, total checkout cost, and potential import duties or taxes before placing an order.",
  },
  {
    question: "How can Indian buyers reduce checkout costs on USD orders?",
    answer:
      "Consider using a credit card with zero foreign exchange markup where available and review your bank's international transaction charges. Final landed cost depends on duties, taxes, and courier fees applicable to your order.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("italojewerly", { skip: 0, limit: 50 }).catch(() => null);
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
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
          { name: "Italo Jewelry", path: "/stores/italojewerly" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} stats={stats} faqs={FAQS} />
      <RelatedGuides slug="italojewerly" />
    </>
  );
}
