import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "InVideo Coupons, Plans & AI Video Offers";
const description =
  "InVideo offers for creators: compare InVideo AI (prompt-to-script, voiceover, stock footage) and InVideo Studio (timeline editing), and check USD plan checkout tips for Indian buyers.";
const canonical = "/stores/invideo";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "What is the difference between InVideo AI and InVideo Studio?",
    answer:
      "InVideo AI helps generate videos from prompts with script, voiceover, and stock-footage assembly for formats like YouTube and Reels. InVideo Studio is a manual timeline/template editor for hands-on control over scenes, text, and media.",
  },
  {
    question: "Can Indian creators pay for InVideo in USD?",
    answer:
      "InVideo plans are typically billed in USD. Indian creators should check the live checkout total, applicable taxes, and prefer a credit card with zero forex markup when available to reduce conversion costs.",
  },
  {
    question: "Where should I check current InVideo offers?",
    answer:
      "Use the tracked store links on this page to view current plan pricing, trials, and promotions directly on InVideo. Offer availability and billing terms are confirmed at checkout.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("invideo", { skip: 0, limit: 50 }).catch(() => null);
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
          { name: "InVideo", path: "/stores/invideo" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} stats={stats} faqs={FAQS} />
      <RelatedGuides slug="invideo" />
    </>
  );
}
