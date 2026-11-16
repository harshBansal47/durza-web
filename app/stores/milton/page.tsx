import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import MiltonClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Milton Coupons, Thermosteel Flask & Electric Tiffin Deals";
const description = "Milton.in promo codes, MILTON10 extra 10% off and best deals on 24-hour Thermosteel flasks, electric lunch boxes and copper bottles.";
const canonical = "/stores/milton";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How do I test the vacuum insulation on a Thermosteel flask?", answer: "Fill the flask with boiling water, close the lid, and touch the outer body after 5 minutes. If the exterior stays cool, the vacuum seal is intact. If it feels warm, contact support — do not try to repair a vacuum flask yourself." },
  { question: "Why shouldn't hot liquids go in a pure copper bottle?", answer: "Heat accelerates copper leaching beyond safe daily limits and can strip the interior lacquer. Store only room-temperature or cool water, and use steel flasks for hot beverages." },
  { question: "What does the 1-year manufacturer warranty cover?", answer: "One year on vacuum insulation performance and electrical heating elements (Futuron). Register your product on milton.in with the invoice to claim repairs or replacement." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("milton", { skip: 0, limit: 50 });
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
          { name: "Milton India", path: "/stores/milton" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <MiltonClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="milton" />
    </>
  );
}
