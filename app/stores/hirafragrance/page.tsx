import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Hira Fragrance Coupons, Extrait de Parfum & Attar Deals";
const description = "Verified Hira Fragrance promo codes and best deals on Extrait de Parfum, Oud and alcohol-free attars. Free shipping ₹599+.";
const canonical = "/stores/hirafragrance";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What is the difference between Eau de Parfum and Extrait de Parfum?", answer: "Extrait de Parfum has a much higher fragrance oil concentration, giving stronger projection and longer longevity (8–12 hours) than standard Eau de Parfum." },
  { question: "How long do non-alcoholic Attars last?", answer: "Pure Attars are highly concentrated and can last 8–12 hours on skin and even longer on fabric." },
  { question: "What are the shipping details?", answer: "Free insured shipping across India on prepaid orders above ₹599." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("hirafragrance", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? undefined;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);
  return (
    <>
      <Breadcrumbs
        items={[
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Hira Fragrance", path: "/stores/hirafragrance" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="hirafragrance" />
    </>
  );
}
