import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import LuxuryStoreClient from "@/components/store/LuxuryStoreClient";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { CHARLES_AND_KEITH_SLOTS } from "@/lib/luxury-images";

const title = "Charles & Keith India — Luxury Editorial Showcase & Official Collection";
const description =
  "Charles & Keith's most considered picks for Indian wardrobes — structured top-handle bags, signature sculpt heels, timeless leather totes. Shop the official collection via Durza's curated editorial showcase.";
const canonical = "/stores/charles-and-keith";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Who does Charles & Keith design for in India?", answer: "Women across price points who want architectural, not flashy, accessories — leather top-handle bags, sculpt heels and leather totes at an accessible luxury price. Design language from Singapore, retail presence in Delhi, Mumbai and Bengaluru." },
  { question: "Does Durza charge the shopper for using the affiliate link?", answer: "No. Prices and returns on Charles & Keith are set by Charles & Keith. Durza earns a small commission on qualifying purchases made via the outbound link; it never affects your basket value or returns." },
  { question: "Is Durza affiliated with Charles & Keith India?", answer: "Durza is a publisher partner — the link goes through the advertising affiliate program; nothing about the catalogue, checkout or warranty is on Durza. Prices, sizes, stock, returns and exchanges are all the store's own." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("charles-keith", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://charleskeith.in/in";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Charles & Keith", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <LuxuryStoreClient
        storeName="Charles & Keith"
        tagline="Editorial showcase — silk meets structured leather. No discount language, only the collection."
        storeSlug="charles-keith"
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        faqs={FAQS}
        stats={stats}
        slots={CHARLES_AND_KEITH_SLOTS}
        showcaseEyebrow="Charles & Keith · The 2026 Edit"
        showcaseLead="Bags that hold a lifetime commute in a 2-litre silhouette; heels that carry boardrooms and barstools."
      />
    </>
  );
}
