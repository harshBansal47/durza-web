import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd, itemListJsonLd } from "@/lib/seo";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";
import RelatedGuides from "@/components/stores/RelatedGuides";
import StoreClient from "./client";

const title = "HOK Makeup Official Store Guide — Milani, Revolution & Kits";
const description =
  "Shop HOK Makeup direct for authentic Milani, Makeup Revolution, L.A. Girl, Focallure & lip combos in India. Check batch authenticity and shade tips on Durza.";
const canonicalPath = "/stores/hokmakeup";
const canonical = `https://durza.in${canonicalPath}`;

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPath },
  openGraph: { title, description, url: canonicalPath, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("hokmakeup", baseMetadata);
}

const FAQS = [
  {
    question: "Is HOK Makeup an authorized seller for Milani and Makeup Revolution in India?",
    answer:
      "Yes—HOK Makeup operates as an official Indian retail partner for 35+ international beauty brands, sourcing directly from brand principals with valid Indian import labels and batch dates.",
  },
  {
    question: "Where can I find multi-piece combos and shade bundles on HOK Makeup?",
    answer:
      "Check the official Kits & Combos section on hokmakeup.com for curated 2-piece and 3-piece lip, eye, and brush sets, and check your cart at checkout for active sitewide promo eligibility.",
  },
];

const LINEUP_ITEMS = [
  { name: "Cult Lip Stains & Gloss", path: `${canonicalPath}#lineup-lips` },
  { name: "Complexion, Concealers & Setting Sprays", path: `${canonicalPath}#lineup-base` },
  { name: "Eyeshadow Palettes & Liners", path: `${canonicalPath}#lineup-eyes` },
  { name: "Value Makeup Kits & Brush Sets", path: `${canonicalPath}#lineup-combos` },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("hokmakeup", { skip: 0, limit: 10 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? "/stores/hokmakeup/hero-cosmetics.webp";
  const storeUrl = destination?.store.website_url ?? "https://hokmakeup.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);
  const forcedStoreHref = destination?.admitad_store_cps_url ?? null;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "HOK Makeup", path: canonicalPath },
  ];

  const storeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "HOK Makeup",
    url: canonical,
    image: absoluteUrl("/stores/hokmakeup/hero-cosmetics.webp"),
    sameAs: [storeUrl],
    description,
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonical,
    description,
    about: { "@type": "Store", name: "HOK Makeup", url: storeUrl },
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
      <RelatedGuides slug="hokmakeup" />
    </>
  );
}
