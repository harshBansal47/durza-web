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

const title = "Neesh Perfumes Official Store Guide — Extrait de Parfum | Durza";
const description =
  "Explore Neesh Perfumes' high-concentration Extrait de Parfum collection and discovery sample sets crafted for Indian weather. Compare scent notes on Durza.";
const canonical = "/stores/neesh-perfumes";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("neesh-perfumes", baseMetadata);
}

const FAQS = [
  {
    question: "Why start with a Neesh Discovery Set before buying a full bottle?",
    answer:
      "High-concentration Extraits evolve across top, heart, and base notes over 6–8 hours—testing a sample vial on your own skin shows how the dry-down performs in your local humidity.",
  },
  {
    question: "How should I store Extrait de Parfum bottles in India?",
    answer:
      "Keep bottles inside a cool, dark cupboard rather than a steamy bathroom shelf, as heat and direct sunlight oxidize delicate fragrance oils.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("neesh-perfumes", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://neeshperfumes.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Neesh Perfumes", path: canonical },
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
      <RelatedGuides slug="neesh-perfumes" />
    </>
  );
}
