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

const title = "Sirona Official Store Guide — Menstrual Cups & Period Care";
const description =
  "Compare Sirona FDA-approved silicone menstrual cups, period stain removers, and intimate hygiene essentials. Check sizing and care tips on Durza.";
const canonical = "/stores/sirona";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("sirona", baseMetadata);
}

const FAQS = [
  {
    question: "How do I choose between Sirona Small, Medium, and Large menstrual cups?",
    answer:
      "Small is generally recommended for teenagers and first-time users, Medium for adults who have not given birth vaginally, and Large for those who have experienced vaginal childbirth or have a higher cervix.",
  },
  {
    question: "How should a silicone menstrual cup be sanitized between cycles?",
    answer:
      "Boil the cup in clean water (or use a microwave sterilizer cup) for 3–5 minutes before your cycle starts and after it ends, then store it in its breathable cotton pouch.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("sirona", { skip: 0, limit: 10 });
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.thesirona.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Sirona", path: canonical },
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
      <RelatedGuides slug="sirona" />
    </>
  );
}
