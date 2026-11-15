import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import NordPassClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "NordPass Coupons, Password Manager Deals & Free Trial";
const description = "NordPass promo codes, up to 50% off on 2-year plans, and best deals on encrypted zero-knowledge password management and family suites.";
const canonical = "/stores/nordpass";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What happens if I forget my Master Password?", answer: "Nord cannot recover it — that is what zero-knowledge means. Save your Recovery Code offline at setup, or configure Emergency Access with a trusted contact. Without either, the vault cannot be decrypted." },
  { question: "How does XChaCha20 encryption work?", answer: "NordPass encrypts every vault item with XChaCha20, a fast, constant-time authenticated cipher with a 256-bit key. Combined with zero-knowledge architecture, even Nord Security cannot read your stored data." },
  { question: "How does the 30-day money-back guarantee operate?", answer: "Buy any premium plan, try it risk-free, and request a full refund within 30 days via live chat or email with no questions asked — the charge is reversed to your original payment method." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("nordpass", { skip: 0, limit: 50 });
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
          { name: "NordPass", path: "/stores/nordpass" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <NordPassClient offers={offers} products={products} heroImageUrl={heroImageUrl} offerCount={offerCount} storeUrl={storeUrl}  stats={stats} faqs={FAQS} />
      <RelatedGuides slug="nordpass" />
    </>
  );
}
