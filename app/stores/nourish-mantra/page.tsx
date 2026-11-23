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

const title = "Nourish Mantra Official Store Guide — Vegan Skincare | Durza";
const description =
  "Shop Nourish Mantra direct for Urban Rani Youth Preserve Facial Oil, Mystic Indian Rose Mist, and vegan clay masks. Check ingredient guides on Durza.";
const canonical = "/stores/nourish-mantra";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("nourish-mantra", baseMetadata);
}

const FAQS = [
  {
    question: "Are all Nourish Mantra formulations 100% vegan?",
    answer:
      "Yes—the brand is PETA-certified vegan and cruelty-free, avoiding beeswax, lanolin, carmine, SLS, and parabens across its catalog.",
  },
  {
    question: "Where does a facial oil go in a skincare routine?",
    answer:
      "Always apply facial oil as the final evening step after water-based serums and moisturizer so it locks hydration in rather than blocking water-based actives.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("nourish-mantra", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://nourishmantra.in/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Nourish Mantra", path: canonical },
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
      <RelatedGuides slug="nourish-mantra" />
    </>
  );
}
