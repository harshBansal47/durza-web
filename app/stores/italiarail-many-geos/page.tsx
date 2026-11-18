import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "ItaliaRail Coupons & Italy Train Booking Offers";
const description =
  "ItaliaRail is an authorized English-language booking partner for Trenitalia and Italo high-speed trains across Italy, with multi-currency checkout (EUR/USD/GBP) and instant e-tickets.";
const canonical = "/stores/italiarail-many-geos";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Is ItaliaRail an authorized booking partner for Italian trains?",
    answer:
      "ItaliaRail is an authorized English-language booking partner for Trenitalia and Italo high-speed trains across Italy, including routes connecting Rome, Florence, Venice, and Milan.",
  },
  {
    question: "What currency options does ItaliaRail support?",
    answer:
      "ItaliaRail supports multi-currency checkout options such as EUR, USD, and GBP (availability may vary at checkout) and provides instant e-tickets for eligible bookings.",
  },
  {
    question: "How can Indian travelers save on international rail bookings?",
    answer:
      "Compare live fares and booking terms on ItaliaRail, then consider using a bank card with low or zero foreign exchange markup and checking applicable card offers on Durza's bank offers page before paying.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("italiarail-many-geos", { skip: 0, limit: 50 }).catch(() => null);
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? undefined;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "ItaliaRail", path: "/stores/italiarail-many-geos" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} stats={stats} faqs={FAQS} />
      <RelatedGuides slug="italiarail-many-geos" />
    </>
  );
}
