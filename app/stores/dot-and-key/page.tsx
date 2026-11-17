import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "Dot & Key Skincare — Official Store Guide & Deals";
const description =
  "Shop Dot & Key sunscreens, serums and moisturizers by skin concern. Check live prices, combos and current offers on the official Dot & Key store.";
const canonical = "/stores/dot-and-key";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "How does the Dot & Key Buy 2 Get 2 Free (B2G2) offer work?",
    answer:
      "Dot & Key runs B2G2 and other sitewide promotions from time to time. When active, eligible items and the applicable code/auto-discount are shown on dotandkey.com — add the required items to your cart and confirm the final discount in the cart/checkout before paying.",
  },
  {
    question: "Which Dot & Key sunscreen is best for oily and acne-prone skin?",
    answer:
      "The Watermelon Hyaluronic Cooling Sunscreen SPF 50+ is positioned as a lightweight, oil-free gel with no white cast, making it a popular pick for oily or humid-weather routines. Check the current ingredients, SPF details and suitability on the official product page.",
  },
  {
    question: "What is the free shipping threshold on Dot & Key?",
    answer:
      "Free shipping thresholds on dotandkey.com vary between ₹299 and ₹999 depending on whether a sitewide B2G2 sale is active—check the progress bar inside your cart drawer before checkout.",
  },
  {
    question: "What is Dot & Key's return and refund policy?",
    answer:
      "Dot & Key accepts return or replacement requests within 48 hours of delivery strictly for transit-damaged, defective, or incorrect sealed items (with photo proof via customercare@dotandkey.com). Prepaid refunds process within 7 working days, while COD refunds take up to 14 working days.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("dot-and-key", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.dotandkey.com";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Dot & Key", path: canonical },
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
      <RelatedGuides slug="dot-and-key" />
    </>
  );
}
