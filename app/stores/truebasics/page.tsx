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

const title = "TrueBasics Official Store Guide — Clinical Omega-3 & Multis";
const description =
  "Explore TrueBasics Triple-Strength Omega-3, KSM-66 Ashwagandha, and targeted multivitamins formulated with patented clinical ingredients on Durza.";
const canonical = "/stores/truebasics";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("truebasics", baseMetadata);
}

const FAQS = [
  {
    question: "Why does TrueBasics specify KSM-66® instead of generic Ashwagandha powder?",
    answer:
      "KSM-66® is a standardized, full-spectrum root-only extract backed by published human clinical trials for consistent withanolide potency across every batch.",
  },
  {
    question: "Should Omega-3 and fat-soluble vitamins (D3, E, K2) be taken with meals?",
    answer:
      "Yes—taking softgels alongside a meal containing healthy fats significantly improves absorption compared to taking them on an empty stomach.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("truebasics", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store) ?? destination?.store?.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.truebasics.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "TrueBasics", path: canonical },
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
      <RelatedGuides slug="truebasics" />
    </>
  );
}
