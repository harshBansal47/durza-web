import type { Metadata } from "next";
import { storeLogoUrl } from "@/lib/storeLogos";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import LuxuryStoreClient from "@/components/store/LuxuryStoreClient";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { VICTORIAS_SECRET_SLOTS } from "@/lib/luxury-images";

const title = "Victoria's Secret India — Fine Fragrance, Body & Lingerie Editorial";
const description =
  "Victoria's Secret India — fine fragrance mists, 3-wick candles, fragrance lotions and signature lingerie. Only the collection, no codes, only the official storefront.";
const canonical = "/stores/victorias-secret";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("victorias-secret", baseMetadata);
}

const FAQS = [
  { question: "Where is Victoria's Secret actually produced for India?", answer: "Licensing for the Indian market is operated by an exclusive retail partner; prices, collections and availability are governed by that partner. Fragrances and lotions imported for India match global formulations." },
  { question: "Are the fragrance mists suitable for sensitive skin?", answer: "Fragrance mists are body sprays, not deodorants — avoid broken skin and eyes. For sensitive skin, do an inconspicuous patch test on the inner arm first; Durza's editors are not dermatologists." },
  { question: "Can I gift Victoria's Secret products and return them if unwanted?", answer: "Gifts are non-returnable once opened (hygiene items); unopened products may be exchanged within the store's stated return window. Returns are handled by Victoria's Secret's own partner desk — Durza is not involved." },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("victorias-secret", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store) ?? destination?.store?.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.victoriassecret.in/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Victoria's Secret", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <LuxuryStoreClient
        storeName="Victoria's Secret"
        tagline="Fine fragrance, candles, lotions and intimates — an Indian edit of an iconic house, curated for those who choose with intention."
        storeSlug="victorias-secret"
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        faqs={FAQS}
        stats={stats}
        slots={VICTORIAS_SECRET_SLOTS}
        showcaseEyebrow="Victoria's Secret · The Signature Edit"
        showcaseLead="Fragrance, satin and self-care, handpicked to feel indulgent — a quiet invitation to discover what’s waiting at the official store."
      />
    </>
  );
}