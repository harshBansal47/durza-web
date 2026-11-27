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

const title = "Wonderchef Official Store Guide — Nutri-Blend & Cookware";
const description =
  "Compare Wonderchef Nutri-Blend mixer grinders, PFOA-free granite cookware, cold-press juicers, and espresso makers. Check kitchen guides on Durza.";
const canonical = "/stores/wonderchef";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("wonderchef", baseMetadata);
}

const FAQS = [
  {
    question: "Do Wonderchef granite cookware pans work on induction stoves?",
    answer:
      "Most Wonderchef forged granite pans feature a magnetic stainless-steel induction base—check the base compatibility icon on each product page before ordering.",
  },
  {
    question: "How do I extend the life of non-stick granite cookware?",
    answer:
      "Cook on low-to-medium flame, use wooden or silicone spatulas instead of metal spoons, and let the pan cool completely before washing with a soft sponge.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("wonderchef", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store) ?? destination?.store?.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.wonderchef.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Wonderchef", path: canonical },
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
      <RelatedGuides slug="wonderchef" />
    </>
  );
}
