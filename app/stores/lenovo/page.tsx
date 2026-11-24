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

const title = "Lenovo India Official Store — Legion, ThinkPad & Yoga Lineup | Durza";
const description =
  "Configure custom-to-order ThinkPads, RTX Legion gaming rigs, and OLED Yoga ultrabooks on Lenovo.com India — stack student/corporate privileges, card cashback, and warranty bundles.";
const canonical = "/stores/lenovo";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("lenovo", baseMetadata);
}

const FAQS = [
  {
    question: "Which Lenovo laptop is the best for students and professionals in India?",
    answer:
      "For most Indian students, IdeaPad Slim and ThinkPad E-series hit the price / performance sweet spot. For developers, ThinkPad X1 Carbon or X1 Yoga with 16GB+ RAM. For gaming, Legion 5 Pro and Legion Slim are the most consistently well-reviewed Lenovo gaming lines in India.",
  },
  {
    question: "Does Lenovo India ship directly to tier-II cities?",
    answer:
      "Yes — Lenovo India ships pan-India including tier-II and tier-III towns, as well as B2B deliveries to 500+ corporate campuses. Shipping, warranty pickup and service-centre locations are addressed per PIN code at checkout.",
  },
  {
    question: "Can I buy Lenovo laptops on Amazon too?",
    answer:
      "Yes, Lenovo laptops appear on Amazon India and Flipkart — but ordering on lenovo.com/in often delivers more value: custom-to-order configurations, official warranty/protection options, and eligible student/corporate, rewards, or bank offers shown at checkout. Compare final value and terms before purchasing.",
  },
  {
    question: "What is Lenovo's warranty and service network in India?",
    answer:
      "Lenovo India offers 1-year standard warranty with upgrade to 3-year PremiumCare at purchase or post-registration. Lenovo offers on-site service for select PremiumCare plans and carry-in/service-centre repair nationwide via authorised partners.",
  },
];

export const revalidate = 21600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("lenovo-india", { skip: 0, limit: 10 });
  const offers: CouponPublic[] = destination?.deals ?? [];
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = destination?.store.hero_image_url ?? null;
  const storeUrl = destination?.store.website_url ?? "https://www.lenovo.com/in/en/";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Lenovo", path: canonical },
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
      <RelatedGuides slug="lenovo-india" />
    </>
  );
}
