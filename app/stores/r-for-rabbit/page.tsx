import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "R for Rabbit — Baby Strollers, Car Seats & High Back Chairs (India)";
const description =
  "R for Rabbit India: baby strollers, ISOFIX car seats, high chairs and cribs. Safety-matcher; buy direct from the official R for Rabbit storefront.";
const canonical = "/stores/r-for-rabbit";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Is R for Rabbit safe and tested for Indian roads?", answer: "Yes — R for Rabbit products undergo Indian road-safety and load testing at certified labs. Their car seats meet European ECE R44/04 and i-Size standards; strollers pass drop and weight tests for Indian use." },
  { question: "How do I pick the right booster seat age range?", answer: "R for Rabbit categorises by weight (not age only): infant carriers 0-13 kg, toddler seats 9-18 kg, booster+ seats 15-36 kg. Once your child outgrows the booster harness, they can use the car's own seatbelt with a booster cushion." },
  { question: "Does R for Rabbit ship pan-India including tier-II and tier-III?", answer: "Yes — free shipping across 27 000+ PIN codes. Assembly help, installation videos and online customer support are available in Hindi, English and select state languages." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("rforrabbit-com-ecommerce-cps-india", { skip: 0, limit: 10 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://rforrabbit.com/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "R for Rabbit", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} faqs={FAQS} stats={stats} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="rforrabbit-com-ecommerce-cps-india" />
    </>
  );
}
