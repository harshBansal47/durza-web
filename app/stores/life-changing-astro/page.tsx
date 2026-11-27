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

const title = "Life Changing Astro Guide — Vedic Kundli & Consultations";
const description =
  "Explore Life Changing Astro's personalized Vedic Kundli reports, vastu guidance, and lab-certified rudraksha & gemstones. Check booking FAQs on Durza.";
const canonical = "/stores/life-changing-astro";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("life-changing-astro", baseMetadata);
}

const FAQS = [
  {
    question: "What details do I need before booking a Kundli consultation?",
    answer:
      "Keep your exact date of birth, accurate time of birth, and city/town of birth ready so your Lagna (ascendant) and planetary Dasha periods are calculated accurately.",
  },
  {
    question: "Do gemstones and rudraksha items include certification?",
    answer:
      "Check individual product listings on the official store for gemological lab certification details and return/exchange policies before ordering.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("life-changing-astro", { skip: 0, limit: 10 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store) ?? destination?.store?.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://lifechangingastro.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Life Changing Astro", path: canonical },
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
      <RelatedGuides slug="life-changing-astro" />
    </>
  );
}
