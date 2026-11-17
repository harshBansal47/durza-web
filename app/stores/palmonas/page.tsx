import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import PalmonasLuxuryPage from "./PalmonasLuxuryPage";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { PALMONAS_SLOTS } from "@/lib/luxury-images";

const title = "Palmonas — The 18K Demi-Fine & Waterproof Gold Edit | Durza";
const description =
  "Anti-tarnish 18k gold-vermeil chains, lab-grown diamond solitaires, and stackable cuffs crafted for Indian humidity—luxury that stays on from gym to dinner.";
const canonical = "/stores/palmonas";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "How does demi-fine jewellery compare with fine gold pieces?",
    answer:
      "Palmonas collections use 18k gold plating on brass or sterling silver with lab-grown diamonds — engineered for everyday wear at a fraction of fine gold prices. Not an heirloom (lifetime warranty), but far beyond costume level.",
  },
  {
    question: "Will Palmonas jewellery tarnish in India's climate?",
    answer:
      "18k gold plating resists tarnish better than 9k or fashion plating. Avoid contact with perfume, chlorinated water (pools) and harsh detergents; Palmonas themselves recommend wiping with a dry microfibre after wear.",
  },
  {
    question: "Is the lab-grown diamond documentation included?",
    answer:
      "Lab-grown diamonds ship with their grading report; check product pages for the specific certificate format on each listing. Skilfully set, the stones are visually indistinguishable from mined stones.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("palmonas", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const storeUrl = destination?.store.website_url ?? "https://www.palmonas.com/";

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
      <PalmonasLuxuryPage storeUrl={storeUrl} faqs={FAQS} stats={stats} slots={PALMONAS_SLOTS} />
    </>
  );
}
