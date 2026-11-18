import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { storeLogoUrl } from "@/lib/storeLogos";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Tata CLiQ Coupons & Offers – Bank & Neu App Deals";
const description = "Live Tata CLiQ codes and bank/UPI partner offers on electronics, fashion and luxury — refreshed regularly.";
const canonical = "/stores/tatacliq-com-ecommerce-cps-india";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What's the difference between Tata CLiQ, Tata Neu and Tata CLiQ Luxury?", answer: "Tata CLiQ is the multi-category marketplace; it's the store inside the Tata Neu app experience; Tata CLiQ Luxury is the designers-and-premium arm. All three share the same catalogue account." },
  { question: "Which banks do the Tata CLiQ codes belong to?", answer: "Most Tata CLiQ codes are tied to card partnerships — American Express, BOBCARD, DBS, RBL, Kotak and PayZapp customers get the headline offers. Check the code's card requirement before you add to cart." },
  { question: "Can I combine a bank-code with another offer?", answer: "Almost never — bank-partner codes are usually mutually exclusive with other coupons. The cart will tell you which single best code applies; use one bank code per order." },
  { question: "Do I get NeuCoins on Tata CLiQ?", answer: "Yes — Tata-owned brands on Tata CLiQ can earn NeuCoins, redeemable in the Tata Neu app. The PDP shows the coin badge when an item qualifies." },
  { question: "Are these codes usable on sale items?", answer: "Some bank codes work on sale collections, some don't. The code page at checkout says what applies; when in doubt, look at the final ‘after-code’ price before you pay." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("tatacliq-com-ecommerce-cps-india", { skip: 0, limit: 50 });
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
  const storeUrl = destination?.store.website_url ?? undefined;
  const heroImageUrl = storeLogoUrl({ slug: "tatacliq-com-ecommerce-cps-india", logo_url: destination?.store.hero_image_url ?? null, website_url: storeUrl }) ?? null;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Tata CLiQ", path: canonical },
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
      <RelatedGuides slug="tatacliq-com-ecommerce-cps-india" />
    </>
  );
}
