import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import MiltonClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Milton Official Store Guide — Thermosteel Flasks, Electric Tiffins & Copper Bottles";
const description =
  "Explore Milton Thermosteel flasks, electric lunch boxes, copper bottles, and casseroles. Get practical buying tips and shop via tracked links on the official Milton store.";
const canonical = "/stores/milton";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
    images: [{ url: "/stores/milton/hero-kitchenware.webp" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/stores/milton/hero-kitchenware.webp"] },
};

const FAQS = [
  {
    question: "How do I get better heat retention from a Milton Thermosteel flask?",
    answer:
      "Pre-condition the flask before use: fill it with hot water for a few minutes before pouring in hot beverages (or cold water for cold drinks). This reduces initial thermal loss and helps maintain temperature longer.",
  },
  {
    question: "Can I store hot liquids in a pure copper bottle?",
    answer:
      "No. Use pure copper bottles for plain, room-temperature or cool water as per product guidance. Avoid hot liquids, lemon water, or acidic drinks unless the product instructions explicitly allow them.",
  },
  {
    question: "What does Milton's manufacturer warranty typically cover?",
    answer:
      "Milton products commonly include warranty coverage for specific issues such as vacuum insulation performance or heating elements (for applicable products like electric tiffins), subject to product terms. Check the product page/invoice and Milton's warranty terms for exact coverage and registration steps.",
  },
  {
    question: "Are promo codes and offers always available on Milton?",
    answer:
      "Offers, promo eligibility, shipping thresholds, and payment discounts can vary by product and time. Always verify the final payable amount and applicable offers on milton.in at checkout.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("milton", { skip: 0, limit: 50 }).catch(() => null);
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = "/stores/milton/hero-kitchenware.webp";
  const storeUrl = destination?.store.website_url ?? "https://www.milton.in/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Milton", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <MiltonClient
        offers={offers}
        products={products}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
        stats={stats}
        faqs={FAQS}
      />
      <RelatedGuides slug="milton" />
    </>
  );
}
