import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "HealthKart Coupons & Offers – Extra Savings on Supplements";
const description =
  "Latest verified HealthKart promo codes, HK Cash and UPI offers. Save on protein, creatine, vitamins and supplements — free shipping above ₹499.";
const canonical = "/stores/healthkart";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

/**
 * Visible FAQ and FAQPage JSON-LD share this array — edit once here.
 */
const FAQS = [
  {
    question: "How do I apply a HealthKart coupon code?",
    answer:
      "Copy the code from this page, visit HealthKart (website or app), add your items to the cart, paste the code into the coupon box at checkout and tap Apply. The discount is shown before you pay.",
  },
  {
    question: "Are these HealthKart codes verified on Durza?",
    answer:
      "Codes marked as verified worked at checkout in our recent checks. Codes are re-checked regularly. If a verified code fails for you, the minimum order value or product eligibility on the card may not be met — or the code has just expired and we are re-verifying it.",
  },
  {
    question: "Can I combine a coupon with a UPI discount or HK Cash?",
    answer:
      "UPI instant discounts often apply alongside coupon codes at checkout, and HK Cash (HealthKart's rewards) can usually be redeemed on eligible orders once earned. Exact eligibility is always shown at HealthKart checkout — Durza never sets it.",
  },
  {
    question: "Does HealthKart offer Cash on Delivery?",
    answer:
      "Payment options (UPI, cards, net banking, Cash on Delivery) vary by product and cart value. The options available for your order appear on the payment page — Durza cannot change or confirm them for every cart.",
  },
  {
    question: "What does verified mean on a Durza coupon card?",
    answer:
      "It means the code was tested and worked at checkout during our most recent check. Unverified or newly-added codes are labelled differently until they pass.",
  },

];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("healthkart", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? undefined;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "HealthKart", path: "/stores/healthkart" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        offers={offers}
        products={products}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        stats={stats}
        faqs={FAQS}
      />
      <RelatedGuides slug="healthkart" />
    </>
  );
}
