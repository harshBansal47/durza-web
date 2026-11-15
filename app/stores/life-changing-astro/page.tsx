import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import LifeChangingAstroClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Life Changing Astro Coupons, Kundli Consultation & Gemstone Deals";
const description = "Life Changing Astro codes, ASTRO15 15% off and best deals on 1-on-1 Vedic consultations and lab-certified gemstones.";
const canonical = "/stores/life-changing-astro";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I verify a gemstone's lab certificate?", answer: "Every gemstone ships with an independent ISO / Govt. lab certificate. Cross-check the certificate number and stone description on the lab's official website before wearing or gifting the stone." },
  { question: "How do I book a preferred astrologer and time slot?", answer: "Choose the consultation product on the site, pick your preferred date and time including weekends, and confirm the slot online. A calendar invite with the meeting link follows your booking." },
  { question: "What is the difference between Nepali and Indonesian Rudraksha?", answer: "Nepali Rudraksha beads grow in the Himalayas with intact internal chambers verified by X-ray; Indonesian beads are larger but hold a single central seed. Nepali beads are preferred for remedial use." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("life-changing-astro", { skip: 0, limit: 50 });
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
          { name: "Life Changing Astro", path: "/stores/life-changing-astro" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <LifeChangingAstroClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="life-changing-astro" />
    </>
  );
}
