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

const title = "BlissClub Official Store Guide — Activewear & Leggings | Durza";
const description =
  "Explore BlissClub's Ultimate Leggings with 4 pockets, Cloud9 sports bras, and flared yoga pants tailored for Indian body types on the official store.";
const canonical = "/stores/blissclub";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("blissclub", baseMetadata);
}

const FAQS = [
  {
    question: "Are BlissClub Ultimate Leggings squat-proof?",
    answer:
      "Yes—the high-density nylon-spandex weave is opaque under deep squats and stretches four ways without sheering out.",
  },
  {
    question: "How do I pick the right size on blissclub.com?",
    answer:
      "Measure your natural waist and fullest hip against BlissClub's Indian size chart on each PDP; size down only if you prefer high compression.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("bliss-club", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://blissclub.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "BlissClub", path: canonical },
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
      <RelatedGuides slug="bliss-club" />
    </>
  );
}
