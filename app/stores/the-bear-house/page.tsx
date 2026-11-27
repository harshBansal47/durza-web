import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { storeLogoUrl } from "@/lib/storeLogos";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "The Bear House Store Guide — Men's Linen & Oxford Shirts";
const description =
  "Explore The Bear House's European-inspired men's linen shirts, brushed cotton flannels, oxfords, and polos. Check fit and fabric guides on Durza.";
const canonical = "/stores/the-bear-house";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("the-bear-house", baseMetadata);
}

const FAQS = [
  {
    question: "How does The Bear House shirt fit run compared to standard Indian formal brands?",
    answer:
      "The Bear House cuts a tailored smart-casual silhouette with slightly shorter hems meant to be worn untucked—size up if you prefer a relaxed fit across the chest and shoulders.",
  },
  {
    question: "How should I wash brushed flannel and linen-blend shirts to prevent shrinkage?",
    answer:
      "Machine wash cold on a gentle cycle and line-dry in the shade; avoid high-heat tumble drying, which tightens natural cotton and flax fibers.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("the-bear-house", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://thebearhouse.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "The Bear House", path: canonical },
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
      <RelatedGuides slug="the-bear-house" />
    </>
  );
}
