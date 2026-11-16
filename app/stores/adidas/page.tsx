import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "Adidas India — Ultraboost, Originals & Training Deals & Buying Guide";
const description =
  "Adidas India — Ultraboost & Adizero runners, Originals sneakers, training gear. Sport matcher, size guidance and honest trade-offs; see Adidas India's official store via Durza's tracked affiliate link.";
const canonical = "/stores/adidas";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "Which Adidas running shoe is best for Indian roads and summer?", answer: "For daily runs on Indian roads, Ultraboost Light or Adizero Adios Pro (for serious training) offer the best cushion-to-stability ratio. Originals' Superstar and Stan Smith remain strong casual picks but are not recommended for running." },
  { question: "How does Adidas India size compare to Nike?", answer: "Adidas India true-to-size runs half-to-full size lower than Nike across most models. If you wear UK 9 in Nike, start with UK 9-10 in Adidas Originals; athletic-fit runners should try half a size up." },
  { question: "What is Adidas India's return policy?", answer: "Adidas India offers 30-day free returns on full-price products from the official storefront (adidas.co.in) and select marketplace listings. Sale items and personalised products may have different rules — check the specific product page before ordering." },
  { question: "Does Adidas India run seasonal sales like Black Friday?", answer: "Yes — Adidas India runs major sales during ICC/FIFA tournaments, end-of-season sales, and Black Friday. The best deals usually come during these windows via adidas.co.in, not marketplaces." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("adidas", { skip: 0, limit: 10 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.adidas.co.in/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Adidas", path: canonical },
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
      <RelatedGuides slug="adidas" />
    </>
  );
}
