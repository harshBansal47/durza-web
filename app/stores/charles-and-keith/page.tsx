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

const title = "Charles & Keith India Store Guide — Bags & Footwear | Durza";
const description =
  "Explore Charles & Keith India's Gabine saddle bags, structured laptop totes, loafers, and wedding block heels. Check official store perks on Durza.";
const canonical = "/stores/charles-and-keith";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("charles-and-keith", baseMetadata);
}

const FAQS = [
  {
    question: "Are orders on charleskeith.in shipped within India?",
    answer:
      "Yes—orders on the official India storefront ship domestically in INR with no international customs duties.",
  },
  {
    question: "How do I care for Charles & Keith faux leather in Indian humidity?",
    answer:
      "Store bags stuffed with tissue inside their dust bag away from direct sunlight, and wipe with a dry microfiber cloth after humid commutes.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("charles-keith", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store) ?? destination?.store?.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.charleskeith.in/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Charles & Keith", path: canonical },
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
      <RelatedGuides slug="charles-keith" />
    </>
  );
}
