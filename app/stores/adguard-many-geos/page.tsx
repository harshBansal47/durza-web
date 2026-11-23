import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { toOfferCards, type StoreOfferCard } from "@/lib/store-offers";

const title = "AdGuard Official Store Guide — Ad Blocker & DNS Privacy";
const description =
  "Compare AdGuard Personal, Family, and AdGuard DNS plans across Windows, Mac, Android, and iOS. Check multi-currency licensing and FAQs on Durza.";
const canonical = "/stores/adguard-many-geos";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("adguard-many-geos", baseMetadata);
}

const FAQS = [
  {
    question: "What is the difference between AdGuard Ad Blocker and AdGuard VPN?",
    answer:
      "AdGuard Ad Blocker filters ads and trackers locally on your device, while AdGuard VPN routes traffic through encrypted servers to mask your IP address on public Wi-Fi.",
  },
  {
    question: "How is AdGuard billed for buyers in India?",
    answer:
      "AdGuard's official checkout processes international currencies (USD/EUR/INR depending on payment method)—use a zero-forex-markup card if paying in foreign currency.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("adguard-many-geos", { skip: 0, limit: 10 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://adguard.com/";
  const offerCount =
    destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);
  const forcedStoreHref = destination?.admitad_store_cps_url ?? null;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "AdGuard", path: canonical },
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
        forcedStoreHref={forcedStoreHref}
      />
      <RelatedGuides slug="adguard-many-geos" />
    </>
  );
}
