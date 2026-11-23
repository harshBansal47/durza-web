import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "Alpino Official Store Guide — Protein Peanut Butter & Oats";
const description =
  "Shop Alpino direct for High-Protein Peanut Butter, Super Rolled Oats, and unsweetened nut butters. Compare roast styles, macros, and combos on Durza.";
const canonical = "/stores/alpino";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("alpino", baseMetadata);
}

const FAQS = [
  {
    question: "Why is there oil floating at the top of Alpino Natural Peanut Butter?",
    answer:
      "Natural oil separation proves no hydrogenated vegetable fats or synthetic emulsifiers were added—stir thoroughly once and refrigerate if you prefer a firmer texture.",
  },
  {
    question: "Which Alpino range works best for lactose-sensitive buyers?",
    answer:
      "Choose the 100% Natural Peanut Butter line or Pea/Brown-Rice Plant High-Protein variants instead of the whey-fortified jars.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("alpino", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://alpino.store/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Alpino", path: canonical },
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
      <RelatedGuides slug="alpino" />
    </>
  );
}
