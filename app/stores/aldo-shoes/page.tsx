import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import LuxuryStoreClient from "@/components/store/LuxuryStoreClient";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { ALDO_SHOES_SLOTS } from "@/lib/luxury-images";

const title = "ALDO Shoes India — Occasion Heels, Boardroom Loafers & Editorial Footwear";
const description =
  "ALDO Shoes India — occasion heels, boardroom loafers, suede ankle boots and structured top-handle bags. Only the official collection, no coupon language.";
const canonical = "/stores/aldo-shoes";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What sizes does ALDO India stock?", answer: "ALDO India stocks sizes 35-42 in women's footwear and 6–12 in men's footwear most seasons; narrow and wide fits vary by collection. Refer to the size guide on each product page before ordering." },
  { question: "Does Durza earn commission on ALDO returns?", answer: "No — commission applies to completed, non-returned orders. If you return a product, the affiliate attribution forfeits automatically; Durza only benefits when the purchase sticks." },
  { question: "Are ALDO India prices the same as ALDO Europe?", answer: "No. Prices on aldoshoes.in are India-specific, inclusive of GST and duties, and set by the India licensee. Collections are also localised — not every European style is stocked." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("aldo-new", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.aldoshoes.in/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "ALDO Shoes", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <LuxuryStoreClient
        storeName="ALDO Shoes"
        tagline="Occasion heels, boardroom loafers, suede ankle boots — the footwear a quiet India pairs with its strongest outfits."
        storeSlug="aldo-new"
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        faqs={FAQS}
        stats={stats}
        slots={ALDO_SHOES_SLOTS}
        showcaseEyebrow="ALDO · The Evening-to-Boardroom Edit"
        showcaseLead="Suede ankle boots for Delhi winters, boardroom loafers for Mumbai Mondays and evening heels that stay comfortable until the after-party."
      />
    </>
  );
}
