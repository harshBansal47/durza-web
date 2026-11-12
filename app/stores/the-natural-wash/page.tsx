import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import TheNaturalWashClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "The Natural Wash Coupons, Beetroot Lip Balm & Potato Wax Deals";
const description = "Verified The Natural Wash promo codes, 15% off code TNW15, and best deals on Beetroot lip balm, Potato wax blemish corrector and herbal hair care.";
const canonical = "/stores/the-natural-wash";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Why are raw potato and beetroot effective in skincare?", answer: "Potato starch contains natural catecholase enzymes that fade dark spots and blemishes; beetroot is rich in betalain antioxidants that tint and nourish chapped lips without synthetic dyes." },
  { question: "Does TNW lip balm contain artificial dyes?", answer: "No. The Beetroot Lip Balm gets its tint entirely from pure beetroot extract with shea and cocoa butter — zero artificial colorants or parabens." },
  { question: "What is the shipping policy?", answer: "Free doorstep delivery across India on all orders of ₹450 or more; a small flat shipping fee applies below ₹450." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("the-natural-wash", { skip: 0, limit: 50 });
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
          { name: "The Natural Wash", path: "/stores/the-natural-wash" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <TheNaturalWashClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="the-natural-wash" />
    </>
  );
}
