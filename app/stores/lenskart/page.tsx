import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Lenskart Coupons & Offers – Frames from ₹600";
const description = "Live Lenskart codes: frames from ₹600 with code DEAL70, sunglasses from ₹800, plus free home eye tests.";
const canonical = "/stores/lenskart";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What does DEAL70 get me?", answer: "Lenskart's ₹600 frame deal with free powered lenses on any frame marked with the offer badge. Valid on selected frames only." },
  { question: "Does Lenskart do free home eye tests?", answer: "Yes — in many cities, Lenskart sends a technician for an in-home eye exam (often free with a frames purchase or a nominal fee otherwise). Ask when you enter your pin-code at checkout." },
  { question: "Can I return Lenskart eyewear?", answer: "Yes — 14-day returns on eyewear, with lenses re-cut or exchanged per the brand's policy. The exact window and eligibility are on the product page and in your order invoice." },
  { question: "What does coupon code SINGLE cover?", answer: "SINGLE is the Sunglasses entry-offer code — ₹800 sunglasses on marked SKUs. A distinct offer from eyewear deals; don't mix them up at checkout." },
  { question: "Are Lenskart powered lenses reliable?", answer: "Yes — lens quality is made to your prescription; ask about AR coating, blue-light filters and photochromic options which upgrade power lenses for desk work." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("lenskart", { skip: 0, limit: 50 });
  const all = [...(destination?.coupons ?? []), ...(destination?.deals ?? [])];
  const seen = new Set<string>();
  const offers: CouponPublic[] = [];
  for (const c of all) {
    if (seen.has(c.id)) continue;
    seen.add(c.id);
    offers.push(c);
  }
  offers.sort((a, b) => (a.code ? 0 : 1) - (b.code ? 0 : 1));
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
          { name: "Lenskart.com", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        offers={offers}
        faqs={FAQS}
        stats={stats}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
      />
      <RelatedGuides slug="lenskart" />
    </>
  );
}
