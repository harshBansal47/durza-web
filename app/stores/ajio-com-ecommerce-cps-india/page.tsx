import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Ajio Coupons & Offers – Up to 70% OFF Sale Deals";
const description = "Live Ajio coupon codes and sale offers on ethnic and western wear. Save on your first order and big-ticket festive hauls.";
const canonical = "/stores/ajio-com-ecommerce-cps-india";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Does Ajio offer Cash on Delivery?", answer: "Yes — COD is available on many pin-codes and for most categories, including first-time orders. Check ‘Pay on Delivery’ at checkout; some COD pin-codes may attract a small handling fee." },
  { question: "How do Ajio's bank and UPI offers work?", answer: "Ajio runs instant-discount offers through banks, cards and UPI partners — usually a percentage off a minimum cart value. Apply these at checkout, or they apply automatically when you pay with an eligible card or UPI app." },
  { question: "Can I return or exchange something I bought at a heavy discount?", answer: "Most Ajio purchases come with reverse-pickup return/exchange, including discounted items, subject to the eligibility shown on each product page. Sale merchandise can be returned where the PDP says so — check before you order." },
  { question: "Ajio Luxe vs Ajio Lounge — what's the difference?", answer: "Ajio Luxe is the premium/designer route; Ajio Lounge carries everyday basics. Both books live on the same Ajio account and checkout." },
  { question: "Why don't I see any coupon codes?", answer: "Ajio's deals are mostly automatic bank/card and sale-event promos — they apply at checkout without a code. The offers we can source are listed above with the date they were last checked." },
  { question: "Are Ajio prices competitive?", answer: "Ajio often undercuts MRP during its big-ticket sales, but compare with marketplace (or brand-direct) pricing for expensive pieces before you pull the trigger." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("ajio-com-ecommerce-cps-india", { skip: 0, limit: 50 });
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
          { name: "Ajio.com", path: canonical },
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
      <RelatedGuides slug="ajio-com-ecommerce-cps-india" />
    </>
  );
}
