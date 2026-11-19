import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd, itemListJsonLd } from "@/lib/seo";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";
import RelatedGuides from "@/components/stores/RelatedGuides";
import StoreClient from "./client";

const title = "Wear Your Words Store Guide — Embellished & Wide-Leg Jeans";
const description =
  "Explore Wear Your Words' rhinestone-embellished wide-leg jeans, pearl denim, and Flèur Bloom floral collections. Check sizing and wash care on Durza.";
const canonicalPath = "/stores/wearyourwords";
const canonical = `https://durza.in${canonicalPath}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPath },
  openGraph: { title, description, url: canonicalPath, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "How do I pick the right waist and length size on Wear Your Words?",
    answer:
      "Measure your natural high waist and hip circumference in inches and match them against the garment measurement chart on each product page—wide-leg styles are cut relaxed through the thigh and hem.",
  },
  {
    question: "How should I wash rhinestone and pearl-embellished jeans?",
    answer:
      "Turn the jeans inside out, fasten the zip/button, hand-wash or machine-wash on a cold delicate cycle, and air-dry flat or on a hanger in the shade.",
  },
];

const LINEUP_ITEMS = [
  { name: "Rhinestone & Diamante Wide-Leg Jeans", path: `${canonicalPath}#lineup-rhinestone` },
  { name: "Flèur Bloom & Sequinned Lace Jeans", path: `${canonicalPath}#lineup-fleur` },
  { name: "Pearl-Trimmed Wide-Leg & Bootcut Fits", path: `${canonicalPath}#lineup-pearl` },
  { name: "The Fresh Edit & Limited-Edition Capsule Denim", path: `${canonicalPath}#lineup-fresh` },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("wearyourwords", { skip: 0, limit: 10 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? "/stores/wearyourwords/hero-denim.webp";
  const storeUrl = destination?.store.website_url ?? "https://wearyourwords.in/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);
  const forcedStoreHref = destination?.admitad_store_cps_url ?? null;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Wear Your Words", path: canonicalPath },
  ];

  const storeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Wear Your Words",
    url: canonical,
    image: absoluteUrl("/stores/wearyourwords/hero-denim.webp"),
    sameAs: [storeUrl],
    description,
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonical,
    description,
    about: { "@type": "Store", name: "Wear Your Words", url: storeUrl },
  };

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={storeJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={itemListJsonLd(LINEUP_ITEMS)} />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        offers={offers}
        faqs={FAQS}
        stats={stats}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        forcedStoreHref={forcedStoreHref}
      />
      <RelatedGuides slug="wearyourwords" />
    </>
  );
}
