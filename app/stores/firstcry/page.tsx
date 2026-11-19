import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "FirstCry Official Store Guide — Diapers, Baby Gear, Fashion & Nursery Essentials";
const description =
  "Shop FirstCry for diapers, wipes, strollers, car seats, feeding essentials, and kids' fashion. Use Durza's tools and tracked links to check live offers on the official store.";
const canonical = "/stores/firstcry";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
    images: [{ url: "/stores/firstcry/hero-nursery.webp" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/stores/firstcry/hero-nursery.webp"] },
};

const FAQS = [
  {
    question: "Is FirstCry Club membership worth it for parents?",
    answer:
      "If you order diapers, wipes, bath essentials, and growing kids' clothes every month, FirstCry Club can unlock member pricing and perks. Use Durza's FirstCry Club Calculator with your actual monthly spend to see if it pays back for your household.",
  },
  {
    question: "How do I avoid buying the wrong diaper size in bulk?",
    answer:
      "Babies often outgrow newborn and small sizes quickly in the first weeks. Start with smaller packs early on, then switch to larger monthly boxes once your baby settles into a size. Durza's Diaper Cost Tracker can help compare per-piece costs.",
  },
  {
    question: "What should I check before placing a FirstCry order?",
    answer:
      "Confirm the product variant/size, delivery timeline for your PIN code, return/exchange terms, and any promo or payment offers at checkout on firstcry.com. Prices and eligibility can change by cart and time.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("firstcry", { skip: 0, limit: 12 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = "/stores/firstcry/hero-nursery.webp";
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
