import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "The Natural Wash (TNW) Store Guide — Herbal Skin & Lip Care";
const description =
  "Compare The Natural Wash (TNW) Steam-Distilled Rose Water, Beetroot Lip Balm, and herbal cleansers. Check botanical skincare routines on Durza.";
const canonical = "/stores/the-natural-wash";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "How can you tell steam-distilled rose water from synthetic rose toner?",
    answer:
      "Steam-distilled hydrosols list Rosa Damascena Flower Water as the primary ingredient with zero added alcohol, artificial pink dye, or synthetic fragrance.",
  },
  {
    question: "Can TNW Steam-Distilled Rose Water be mixed into ubtan or clay masks?",
    answer:
      "Yes—using pure rose hydrosol instead of tap water helps dry clay masks stay supple on the skin without tight over-drying.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("the-natural-wash", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.thenaturalwash.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "The Natural Wash", path: canonical },
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
      <RelatedGuides slug="the-natural-wash" />
    </>
  );
}
