import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Swiggy Coupons & Offers – Food & Instamart Deals";
const description = "Live Swiggy offers on food delivery, Instamart and Swiggy One. Case-by-case picks updated regularly.";
const canonical = "/stores/swiggy";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Is Swiggy One worth it?", answer: "Swiggy One is the monthly/annual membership for free deliveries and small discounts. If you order 8+ times a month, yes; if 2–3 times, the delivery charges you would pay are close to the membership fee — try the monthly version first." },
  { question: "Do Swiggy scripts give direct money back?", answer: "Sometimes — first-order and special surface deals give your account credit directly; festival weeks bring cash-credit drops. They're counted straight in your app wallet." },
  { question: "Why does Swiggy charge a delivery fee for a nearby restaurant?", answer: "Swiggy charges based on outlet distance, shift time and demand. Filter to ‘free deliveries’ (Swiggy One) or hunt outlet time slots for near-zero delivery." },
  { question: "Does Swiggy accept Cash on Delivery?", answer: "Yes — COD runs on most menus. Note: not all restaurants allow COD, and some add a handling charge. Look for the cash icon on the restaurant card." },
  { question: "How do Instamart offers work?", answer: "Instamart (quick grocery) runs cart-miniuma free delivery below its own threshold, plus ‘store/partner’ deals visible on the Instamart home page." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("swiggy", { skip: 0, limit: 50 });
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
          { name: "Swiggy.com", path: canonical },
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
      <RelatedGuides slug="swiggy" />
    </>
  );
}
