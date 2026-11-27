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

const title = "Brillare Official Store Guide — Hair Oil Shots & Concentrates";
const description =
  "Explore Brillare's 100% zero-dilution Hair Fall Control Oil Shots, Dandruff Control range, and botanical face serums. Check scalp routines on Durza.";
const canonical = "/stores/brillare";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("brillare", baseMetadata);
}

const FAQS = [
  {
    question: "How do you use Brillare Oil Shots?",
    answer:
      "Part your hair into sections, apply the single-dose vial directly onto the scalp, massage gently for 3–5 minutes, and leave on overnight or for at least 2 hours before washing.",
  },
  {
    question: "Are Brillare products suitable for color-treated hair?",
    answer:
      "Yes—Brillare cleansers use mild sulfate-free surfactants that clean the scalp without stripping hair color.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("brillare", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.brillare.co.in/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Brillare", path: canonical },
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
      <RelatedGuides slug="brillare" />
    </>
  );
}
