import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "FirstCry Official Store Guide — Diapers, Baby Gear & Fashion";
const description =
  "Shop FirstCry direct for diapers, wipes, strollers, car seats, and kids' apparel. Compare FirstCry Club perks and monthly restock tools on Durza.";
const canonical = "/stores/firstcry";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Is FirstCry Club membership worth it for parents?",
    answer:
      "If you order diapers, wipes, bath essentials, and growing kids' clothes every month, FirstCry Club unlocks member-only catalog discounts and shipping perks—test your monthly spend in Durza's FirstCry Club Calculator first.",
  },
  {
    question: "How do I avoid buying the wrong diaper size in bulk?",
    answer:
      "Babies grow out of Newborn and Small sizes within weeks—buy single packs for the first two months, and switch to jumbo monthly boxes once your baby settles into Medium or Large.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("firstcry", { skip: 0, limit: 10 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.firstcry.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "FirstCry", path: canonical },
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
      <RelatedGuides slug="firstcry" />
    </>
  );
}
