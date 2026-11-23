import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import type { CouponPublic } from "@/lib/types";

const title = "PureVPN India — VPN Plans, Pricing & Buying Guide (2026)";
const description =
  "PureVPN India: long-term VPN plans and pricing advice for streaming, torrenting and public Wi-Fi. Honest comparison; LP (affiliate CPS) link to buy — no fake codes.";
const canonical = "/stores/purevpn";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("purevpn", baseMetadata);
}

const FAQS = [
  { question: "Which PureVPN plan is right for casual browsing vs streaming?", answer: "For occasional browsing on public Wi-Fi, the 1-month plan is the most flexible. For daily streaming and international content, the 2-year plan is financially sensible. For tech enthusiasts and permanent home servers, the 5-year plan is the most economical." },
  { question: "Can I use one PureVPN account on multiple devices in India?", answer: "Yes — PureVPN allows up to 10 simultaneous device connections on most consumer plans: phones, laptops, routers (for whole-home coverage) and smart TVs." },
  { question: "Does PureVPN work with Indian streaming platforms like JioHotstar and Netflix India?", answer: "Yes, PureVPN's Delhi and Mumbai servers support streaming Indian content, and its international servers can access Netflix US/UK libraries. Server availability can change as platforms update blocking — try a different server if one doesn't work." },
  { question: "What is PureVPN's privacy stance and where is it based?", answer: "PureVPN is headquartered in the British Virgin Islands, an independent privacy jurisdiction without EU/US mass-surveillance data retention mandates. The no-logs policy has been audited and published." },
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("purevpn-com-utility-cpa-worldwide", { skip: 0, limit: 10 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.purevpn.com/order-now.php";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "PureVPN", path: canonical },
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
      <RelatedGuides slug="purevpn-com-utility-cpa-worldwide" />
    </>
  );
}
