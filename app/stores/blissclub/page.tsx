import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "BlissClub India — Women's Ultimate Leggings, Flares & Activewear";
const description =
  "BlissClub India: women's Ultimate Leggings, flares, joggers and activewear. Fit matcher, honest sizing; shop direct from BlissClub's official storefront.";
const canonical = "/stores/blissclub";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does BlissClub sizing compare to Nike women's?", answer: "BlissClub runs narrow — size up if you sit between XS and S. Their Ultimate Legging has a high-rise waist and sculpting fit; Nike's comparable leggings are looser through the thigh and faster-drying for high-sweat workouts." },
  { question: "Are BlissClub's fabrics sweat-wicking for Indian summer?", answer: "Yes — BlissClub's patented Ultrasoft fabric is engineered for India's 35–45 °C summer workouts. Mesh ventilation zones and fade-resistant dyeing keep the fabric dry through hot yoga and HIIT." },
  { question: "Can I return BlissClub activewear if it doesn't fit?", answer: "Yes — BlissClub offers 15-day returns on full-price products from blissclub.com. The exchange process, reverse-pickup windows and refund turnaround vary by city; check the specific product page." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("bliss-club", { skip: 0, limit: 10 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://blissclub.com/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "BlissClub", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient offers={offers} faqs={FAQS} stats={stats} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl} />
      <RelatedGuides slug="bliss-club" />
    </>
  );
}
