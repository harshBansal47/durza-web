import type { Metadata } from "next";
import { customStoreMetadata } from "@/lib/custom-store-metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import StoreClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { computeStoreStats, type StoreStats } from "@/lib/store-stats";
import { admitadLogoForSlug, storeLogoUrl } from "@/lib/storeLogos";

const title = "GUVI Official Courses \u2014 Tech Bootcamps & Coding Programs | Durza";
const description = "Explore GUVI\u2019s coding courses and career programs by goal \u2014 from career-switch bootcamps to vernacular learning. Check live curriculum, schedules and pricing on GUVI.";
const canonical = "/stores/guvi";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("guvi", baseMetadata);
}

const FAQS = [
  { question: "What kinds of programs does GUVI offer?", answer: "GUVI offers self-paced courses and mentor-led career programs across areas like development, data/AI, testing, design and more. Check the specific track on guvi.in for the latest curriculum, format and schedule." },
  { question: "Can I learn in my preferred Indian language on GUVI?", answer: "GUVI provides learning options in multiple Indian languages for selected courses and resources, alongside English. Verify language availability for the specific course on the official page." },
  { question: "Does GUVI provide placement assistance?", answer: "Some career programs include placement assistance, interview preparation or hiring support as per program terms. Review the exact scope, eligibility and conditions on the relevant GUVI program page \u2014 outcomes are not guaranteed." },
  { question: "Are EMI or scholarships available?", answer: "EMI options, scholarships or discounts may be offered on select programs and can change over time. Check live pricing, eligibility and payment options on the official GUVI enrollment/checkout flow." },
  { question: "Where can I see current curriculum and pricing?", answer: "Live curriculum, schedules, prerequisites and pricing are shown on guvi.in. Use this page to find the right track and confirm details directly on the official site." }
];

export const revalidate = 3600;

export default async function Page() {
  const destination = await resilient.getStoreDestination("guvi", { skip: 0, limit: 10 });
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const heroImageUrl = admitadLogoForSlug("guvi") ?? storeLogoUrl(destination?.store);
  const storeUrl = destination?.store.website_url ?? "https://www.guvi.in";
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "GUVI", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        faqs={FAQS}
        stats={stats}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        storeUrl={storeUrl}
      />
      <RelatedGuides slug="guvi" />
    </>
  );
}
