import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "Indus Valley — Ammonia-Free Hair Colour & Organic Care | Durza";
const description =
  "Explore Indus Valley ammonia-free gel hair colours, botanical henna & indigo, and organic skin care. Check live prices and current offers on the official store.";
const canonical = "/stores/indus-valley";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "How is Indus Valley Gel Hair Colour different from regular dyes?",
    answer:
      "Indus Valley Damage-Free Gel Hair Colour is 100% free from ammonia, hydrogen peroxide, and harsh bleach, using a soothing aloe vera and organic herb base. If you have a strict PPD allergy, choose Indus Valley's 100% Botanical Aqua Colour or Bio-Organic Henna & Indigo powders, which are completely PPD-free (always perform a 48-hour skin patch test before applying any hair color).",
  },
  {
    question: "How do I get free shipping on Indus Valley orders?",
    answer:
      "Free standard shipping across India on orders meeting the live cart threshold on buyindusvalley.in (typically ₹399–₹499; verify in cart drawer before checkout).",
  },
  {
    question: "Can the FIRST10 coupon code be used on bundles and kits?",
    answer:
      "FIRST10 is designed for first-time shoppers on buyindusvalley.in, while AC10 targets combos and regimens. Only one promo code applies per Shopify checkout—test which code yields the lowest final total alongside any automatic prepaid UPI discount.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("indus-valley", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.buyindusvalley.in";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Indus Valley", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        offers={offers}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        stats={stats}
        faqs={FAQS}
      />
      <RelatedGuides slug="indus-valley" />
    </>
  );
}
