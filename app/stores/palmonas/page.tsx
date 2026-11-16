import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import LuxuryStoreClient from "@/components/store/LuxuryStoreClient";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { PALMONAS_SLOTS } from "@/lib/luxury-images";

const title = "Palmonas Demi-Fine Jewelry — 18k Gold Plated & Lab-Grown Diamonds";
const description =
  "Palmonas demi-fine jewelry — 18k gold-plated everyday chains, lab-grown diamond studs, stackable bracelets and couple gift sets. Editorial showcase, no discount language.";
const canonical = "/stores/palmonas";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How does demi-fine jewellery compare with fine gold pieces?", answer: "Palmonas collections use 18k gold plating on brass or sterling silver with lab-grown diamonds — engineered for everyday wear at a fraction of fine gold prices. Not an heirloom (lifetime warranty), but far beyond costume level." },
  { question: "Will Palmonas jewellery tarnish in India's climate?", answer: "18k gold plating resists tarnish better than 9k or fashion plating. Avoid contact with perfume, chlorinated water (pools) and harsh detergents; Palmonas themselves recommend wiping with a dry microfibre after wear." },
  { question: "Is the lab-grown diamond documentation included?", answer: "Lab-grown diamonds ship with their grading report; check product pages for the specific certificate format on each listing. Skilfully set, the stones are visually indistinguishable from mined stones." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("palmonas", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.palmonas.com/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Palmonas", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <LuxuryStoreClient
        storeName="Palmonas"
        tagline="18k gold-plated demi-fine and lab-grown diamonds — the everyday jewelry Indian women actually wear on the metro."
        storeSlug="palmonas"
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        faqs={FAQS}
        stats={stats}
        slots={PALMONAS_SLOTS}
        showcaseEyebrow="Palmonas · The Demi-Fine Edit"
        showcaseLead="Waterproof chains, lab-grown diamond studs and the kind of founders' jewelry India didn't know it needed — 18k gold plating you can wear in a monsoon."
      />
    </>
  );
}
