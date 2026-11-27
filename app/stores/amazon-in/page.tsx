import type { Metadata } from "next";
import { storeLogoUrl } from "@/lib/storeLogos";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides, { type RelatedGuideItem } from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { listPages } from "@/lib/content";
import type { CouponPublic } from "@/lib/types";

const title = "Amazon India Offers & Best Deals (2026) — Curated Professional Picks";
const description =
  "Hand-picked Amazon India picks curated by the Durza editor — work-from-home gear, PC components, audio, kitchen, home gym, personal care devices and health. Refreshed with live check dates.";
const canonical = "/stores/amazon-in";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("amazon-in", baseMetadata);
}

const FAQS = [
  { question: "Why is this page shorter than other Amazon pages?", answer: "Every offer on this page was chosen by hand on the strength of purpose and professional credibility, not by a feed. We would rather list a hundred honest bargains than a thousand untested products." },
  { question: "Are these Amazon affiliate links?", answer: "Yes. Clicks route through Amazon Associates (tag=durza02-21) at no extra cost to you. We never alter prices or keep a copy of what you buy; Amazon decides the shipping, returns and warranty." },
  { question: "Can I combine Amazon offers with bank discounts?", answer: "Yes. Bank instant discounts stack on top of Amazon's own prices. The checkout panel decides the final discount — we never promise a price you cannot reach." },
  { question: "Does Durza price-match Amazon?", answer: "No. Amazon prices change throughout the day. The price you pay is the one shown at checkout on Amazon.in. Durza never re-prices or re-quotes figures from the catalogue here." },
  { question: "How often is this page refreshed?", answer: "The offer list is re-read whenever Amazon India updates its catalogue. Products that fall out of stock or are discontinued are retired automatically; new additions appear after editorial review." },
];

export const revalidate = 21600;

/**
 * Hand-curated Amazon/bank guides. The full related set is completed from the
 * editorial database at render time. The store's own finance guide rides on the
 * StoreGuideLink banner.
 */
const RELATED_GUIDES: RelatedGuideItem[] = [
  {
    slug: "amazon-prime-audible-kindle-subscriptions-guide",
    title: "Amazon Prime, Audible & Kindle Unlimited India 2026 — subscriptions, trials and Renewed",
    hook: "What Prime, Audible, Kindle Unlimited, Amazon Business and Amazon Renewed actually include — and when each is worth it.",
  },
  {
    slug: "amazon-flipkart-sale-dates-2026",
    title: "Amazon & Flipkart Sale Dates India 2026 — Black Friday, Christmas & New Year",
    hook: "Real sale windows and honest timing for big-ticket electronics.",
  },
  {
    slug: "best-credit-card-online-shopping-india-2026",
    title: "Best Credit Card for Online Shopping India 2026 — the honest answer",
    hook: "Which card actually pays back on online-shopping weekends.",
  },
  {
    slug: "icici-bank-offers-india-2026",
    title: "ICICI Bank Offers India 2026 — the live list",
    hook: "ICICI issues the Amazon co-brand — where its offers rotate.",
  },
  {
    slug: "rbl-bank-offers-india-2026",
    title: "RBL Bank Offers India 2026 — the live list",
    hook: "RBL offers that land at checkout on sale weekends.",
  },
];

export default async function Page() {
  const [destination, allGuides] = await Promise.all([
    resilient.getStoreDestination("amazon-in", { skip: 0, limit: 100 }),
    listPages("guide").catch(() => []),
  ]);
  const relatedSlugs = new Set(RELATED_GUIDES.map((guide) => guide.slug));
  const relatedGuides: RelatedGuideItem[] = [
    ...RELATED_GUIDES,
    ...allGuides
      .filter((guide) => /amazon/i.test(`${guide.slug} ${guide.title} ${guide.description}`) && !relatedSlugs.has(guide.slug))
      .slice(0, 6)
      .map((guide) => ({ slug: guide.slug, title: guide.title, hook: guide.description })),
  ];
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? undefined;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Amazon", path: canonical },
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
      <RelatedGuides slug="amazon-in" guides={relatedGuides} />
    </>
  );
}