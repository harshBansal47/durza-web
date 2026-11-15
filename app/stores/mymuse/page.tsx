import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import MyMuseClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "MyMuse Coupons, Couple Kits & Intimate Wellness Deals";
const description = "MyMuse.in promo codes, MUSE10 extra 10% off and discreet deals on couple kits, waterproof massagers and natural lubricants.";
const canonical = "/stores/mymuse";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How discreet is the packaging upon delivery?", answer: "Every order ships in a plain brown or grey box with no brand name, logo, or product description anywhere on the parcel. The courier invoice shows a neutral descriptor, and billing appears under a generic company name." },
  { question: "Is water-based Glide safe with latex condoms and silicone products?", answer: "Yes. MyMuse Glide is water-based, pH-balanced, glycerin-free and paraben-free, making it safe with latex condoms and most silicone products. It washes off easily and does not stain." },
  { question: "How does the 1-year warranty replacement work?", answer: "MyMuse offers a 1-year replacement warranty on massagers and electronic products. Reach out to support with your order ID and a short video/photo of the defect, and a replacement ships after verification." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("mymuse", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
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
          { name: "MyMuse India", path: "/stores/mymuse" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <MyMuseClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="mymuse" />
    </>
  );
}
