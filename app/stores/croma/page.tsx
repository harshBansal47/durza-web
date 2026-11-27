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

const title = "Croma Official Store Guide — Electronics, ACs & ZipCare";
const description =
  "Shop Croma online for split ACs, OLED TVs, laptops, smartphones, and Tata ZipCare extended warranty plans with store-pickup options on Durza.";
const canonical = "/stores/croma";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("croma", baseMetadata);
}

const FAQS = [
  {
    question: "What is Croma ZipCare?",
    answer:
      "ZipCare is Croma's official extended warranty and accidental/liquid damage protection plan that extends coverage beyond the manufacturer's standard 1-year warranty.",
  },
  {
    question: "Can I pick up an online Croma.com order from a nearby store?",
    answer:
      "On eligible SKUs and PIN codes, Croma offers Express Store Pickup so you can inspect and collect your device at a local Croma showroom.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("croma", { skip: 0, limit: 10 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store) ?? destination?.store?.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.croma.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Croma", path: canonical },
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
      <RelatedGuides slug="croma" />
    </>
  );
}
