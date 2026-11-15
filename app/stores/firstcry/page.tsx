import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "FirstCry Coupons, Baby Products & Diaper Deals";
const description = "FirstCry coupons and live deals on baby gear, diapers, clothing and feeding — plus Club break-even and diaper cost tools.";
const canonical = "/stores/firstcry";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How are FirstCry coupons on Durza kept current?", answer: "Deals listed here are refreshed from firstcry.com campaign pages; codes apply at checkout on the official site. Codes are re-checked regularly — see the verification strip when it has data for a check." },
  { question: "How does the FirstCry Club calculator estimate savings?", answer: "It models member pricing plus coupon stacking against the ₹499 or ₹999 fee using your monthly spend — actual savings vary by category." },
  { question: "What is the return policy on baby gear?", answer: "Most baby gear is returnable within 7 days of delivery in original condition; check the individual product page for eligibility." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("firstcry", { skip: 0, limit: 50 });
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
          { name: "FirstCry", path: "/stores/firstcry" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        offers={offers}
        faqs={FAQS}
        stats={stats}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
      />
      <RelatedGuides slug="firstcry" />
    </>
  );
}
