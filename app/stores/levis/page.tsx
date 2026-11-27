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

const title = "Levi's India Official Store Guide — 501, 511 & Fit Decoder";
const description =
  "Compare Levi's 501 Original, 511 Slim, 512 Slim Taper, and Trucker Jackets on levi.in. Check fit differences, inseam lengths, and Red Tab perks on Durza.";
const canonical = "/stores/levis";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("levis", baseMetadata);
}

const FAQS = [
  {
    question: "What is the main difference between Levi's 511 and 512 jeans?",
    answer:
      "Both share the same waist and thigh cut, but the 512 narrows aggressively from the knee down to a smaller leg opening, whereas the 511 stays uniform from knee to hem.",
  },
  {
    question: "How should I wash raw or dark-indigo Levi's denim to prevent fading?",
    answer:
      "Turn jeans inside out, wash cold with minimal detergent only when needed, and air-dry in the shade—avoiding hot water and tumble dryers.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("levis", { skip: 0, limit: 10 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.levi.in/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Levi's India", path: canonical },
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
      <RelatedGuides slug="levis" />
    </>
  );
}
