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

const title = "ALDO India Official Store Guide — Pillow Walk & Bags | Durza";
const description =
  "Shop ALDO India direct for Pillow Walk cushioned heels, men's dress loafers, sneakers, and handbags. Check sizing and official store terms on Durza.";
const canonical = "/stores/aldo-shoes";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("aldo-shoes", baseMetadata);
}

const FAQS = [
  {
    question: "What is ALDO Pillow Walk technology?",
    answer:
      "It is a built-in dual-density foam insole integrated into select ALDO heels, flats, and men's dress shoes to absorb heel and forefoot impact.",
  },
  {
    question: "Can I exchange sizes ordered on aldoshoes.in?",
    answer:
      "Yes—check the size-exchange and return window listed on each product page before removing tags or wearing shoes outdoors.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("aldo-new", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store) ?? destination?.store?.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.aldoshoes.in/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "ALDO", path: canonical },
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
      <RelatedGuides slug="aldo-new" />
    </>
  );
}
