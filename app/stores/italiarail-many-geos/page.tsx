import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "ItaliaRail Official Guide — Trenitalia & Italy Rail Tickets";
const description =
  "Book Trenitalia Frecciarossa high-speed trains and regional routes across Rome, Florence, Venice, and Milan in English with multi-currency checkout.";
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
    question: "Do I need to print ItaliaRail e-tickets before boarding?",
    answer:
      "For high-speed Frecciarossa and Intercity trains with reserved seats, showing the PNR/QR code on your phone to the conductor is valid—regional tickets may require online check-in before departure.",
  },
  {
    question: "Which currency should Indian travelers pay in on ItaliaRail?",
    answer:
      "ItaliaRail supports EUR, USD, and GBP checkout; paying in EUR with a zero-forex-markup credit card typically avoids dynamic currency conversion markups.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("italiarail-many-geos", { skip: 0, limit: 10 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.italiarail.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "ItaliaRail", path: canonical },
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
      <RelatedGuides slug="italiarail-many-geos" />
    </>
  );
}
