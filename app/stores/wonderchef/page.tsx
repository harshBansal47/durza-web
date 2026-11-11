import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import WonderchefClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Wonderchef Coupons, Nutri-Blend & Granite Cookware Deals";
const description = "Verified Wonderchef codes, CHEF10 extra 10% off, best deals on Nutri-Blend grinders, PFOA-free granite cookware and Regalia coffee makers.";
const canonical = "/stores/wonderchef";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "How is the Wonderchef Nutri-Blend different from a standard mixer grinder?", answer: "The Nutri-Blend runs a 22,000 RPM copper motor with unbreakable jars built for smoothies and masala grinding in seconds, with juicer and chopper attachments — standard mixers lack the RPM and jar ecosystem." },
  { question: "Does granite cookware work on induction stoves?", answer: "Yes. Wonderchef granite pans feature a stainless magnetic base, making them fully induction and gas compatible with even, fast heating across both cooktop types." },
  { question: "How do I claim the warranty?", answer: "Register your appliance or cookware on wonderchef.com with the invoice to activate the 2-year on-site / replacement warranty, then raise a service request through support." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("wonderchef", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Wonderchef", path: "/stores/wonderchef" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <WonderchefClient offers={offers} products={products} />
      <RelatedGuides slug="wonderchef" />
    </>
  );
}
