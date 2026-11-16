import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "ASUS India — ROG & TUF Gaming, Zenbook OLED & Vivobook Deals & Guide";
const description =
  "ASUS India: ROG/TUF Gaming, Zenbook OLED and Vivobook laptops — honest buyer matcher, spec to expect, and live offers from ASUS India's official storefront.";
const canonical = "/stores/asus";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Which ASUS laptop is the best for Indian gamers in 2026?", answer: "For most Indian gamers, the ROG Strix G15/G16 is the reference pick. For pure value and portability, TUF Gaming A15 and A16 deliver the best GPU-per-rupee. Zenbook OLED S 13 is the pick for gaming that needs to look professional in meetings too." },
  { question: "Are Zenbook OLED displays worth the premium?", answer: "Yes, if you edit photos, watch 4K content or spend hours staring at a screen. OLED displays cover 100% DCI-P3 and are Pantone-validated. IPS panels remain fine for standard productivity and cost less." },
  { question: "Does ASUS India offer in-store service across tier-II and tier-III cities?", answer: "Yes — ASUS's official service network spans 500+ service centres across India including smaller cities. In-warranty repairs at authorised centres are free; out-of-warranty rates are fixed on the service portal." },
  { question: "What is the difference between ROG and TUF?", answer: "ROG is the gaming-elite line — premium materials, factory overclocked CPU/GPU, advanced thermal design, and ROG Swift displays. TUF Gaming is durability-first — military-tested (MIL-STD 810H) with solid GPU per rupee but heavier chassis and baseline design choices." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("asus", { skip: 0, limit: 10 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://asus.com/in/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "ASUS", path: canonical },
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
      <RelatedGuides slug="asus" />
    </>
  );
}
