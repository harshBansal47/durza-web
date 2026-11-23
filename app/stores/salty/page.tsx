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

const title = "Salty Official Store Guide — Anti-Tarnish Jewellery, Necklaces, Hoops & Gifts";
const description =
  "Explore Salty's anti-tarnish 18k gold-plated jewellery — layered necklaces, waterproof hoops, stackable rings, bracelets, and gift-ready organizers. Shop via tracked links.";
const canonical = "/stores/salty";

const baseMetadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
    images: [{ url: "/stores/salty/hero-jewellery.webp" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/stores/salty/hero-jewellery.webp"] },
};

export async function generateMetadata(): Promise<Metadata> {
  return customStoreMetadata("salty", baseMetadata);
}

const FAQS = [
  {
    question: "Is Salty jewellery suitable for everyday wear in humid weather?",
    answer:
      "Salty highlights anti-tarnish finishes (including PVD/18k gold-plated styles on stainless-steel bases for many pieces). Like all plated jewellery, longevity improves with good care — avoid direct contact with perfume, sunscreen, and hairspray, and wipe pieces before storing.",
  },
  {
    question: "How should I care for gold-plated and waterproof jewellery pieces?",
    answer:
      "Apply skincare, perfume, and hair products first and let them dry before wearing jewellery. After use, wipe pieces with a soft dry microfiber cloth and store them separately in a pouch or organizer to reduce friction and tangling.",
  },
  {
    question: "Where can I check live prices and offers for Salty?",
    answer:
      "Browse the official Salty store to check current pricing, availability, shipping terms, and any live offers at checkout. Offer availability can change over time.",
  },
];

export const revalidate = 3600;

export default async function Page() {
  // Use the tracked/program store slug for destination + CPS routing where applicable.
  const destination = await resilient.getStoreDestination("salty-co-in-ecommerce-cps-india", { skip: 0, limit: 12 }).catch(() => null);
  const offers: StoreOfferCard[] = toOfferCards(destination?.coupons ?? []);
  const stats: StoreStats = computeStoreStats(destination?.coupons ?? [], destination?.deals ?? []);
  const storeUrl = destination?.store.website_url ?? "https://salty.co.in/";
  const forcedStoreHref = destination?.admitad_store_cps_url ?? null;
  const offerCount = destination?.offer_total ?? (destination ? destination.coupons.length + destination.deals.length : undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Salty", path: canonical },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <StoreClient
        offers={offers}
        faqs={FAQS}
        stats={stats}
        offerCount={offerCount}
        storeUrl={storeUrl}
        forcedStoreHref={forcedStoreHref}
      />
      <RelatedGuides slug="salty-co-in-ecommerce-cps-india" />
    </>
  );
}