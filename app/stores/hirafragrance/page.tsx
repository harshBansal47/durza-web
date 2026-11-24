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

const title = "Hira Fragrance Store Guide — Alcohol-Free Attars & Oils";
const description =
  "Explore Hira Fragrance's alcohol-free roll-on attars, woody oud blends, and fresh office scents. Compare longevity and pulse-point tips on Durza.";
const canonical = "/stores/hirafragrance";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("hirafragrance", baseMetadata);
}

const FAQS = [
  {
    question: "Where should you apply alcohol-free roll-on attars for maximum longevity?",
    answer:
      "Dab lightly on warm pulse points (inner wrists, behind the ears, and base of the throat) without rubbing your wrists together, as friction breaks down top fragrance notes.",
  },
  {
    question: "Do concentrated perfume oils stain light-colored shirts?",
    answer:
      "Apply attars directly to skin rather than white cotton collars, or let pulse points absorb for 60 seconds before dressing.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("hirafragrance", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://hirafragrance.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Hira Fragrance", path: canonical },
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
      <RelatedGuides slug="hirafragrance" />
    </>
  );
}
