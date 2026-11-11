import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import NeeshPerfumesClient from "./client";
import RelatedGuides from "@/components/stores/RelatedGuides";
import { resilient } from "@/lib/api";
import { toOfferCards, toProductCards, type StoreOfferCard, type StoreProductCard } from "@/lib/store-offers";

const title = "Neesh Perfumes Coupons, Glaze Extrait & Luxury Attar Deals";
const description = "Verified Neesh Perfumes promo codes, NEESH10 extra 10% off, and best deals on Glaze Extrait de Parfum, Milky Way and high-sillage attars.";
const canonical = "/stores/neesh-perfumes";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  { question: "What is the difference between Eau de Parfum and Extrait de Parfum?", answer: "Standard EDP carries 15%–18% perfume oil; Neesh Extrait packs 25%–30%. That is why Extrait survives Indian heat and humidity with 12H+ sillage instead of fading in 2–3 hours." },
  { question: "How long do Neesh scents last on clothing?", answer: "On fabric, Neesh Extrait and pure attars hold 12–24 hours. Mist pulse points and a light spray on clothing (from 30cm away) for the strongest, longest-lasting projection." },
  { question: "How do I apply NEESH10?", answer: "Add your chosen bottles or discovery set to the cart on neeshperfumes.com, enter NEESH10 at checkout for an extra 10% off — no minimum order value, stackable with sale prices." },
];

export const revalidate = 300;

export default async function Page() {
  const destination = await resilient.getStoreDestination("neesh-perfumes", { skip: 0, limit: 50 });
  const offers: StoreOfferCard[] = destination ? toOfferCards(destination.coupons) : [];
  const products: StoreProductCard[] = destination ? toProductCards(destination.deals) : [];
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
          { name: "Neesh Perfumes", path: "/stores/neesh-perfumes" },
        ]}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <NeeshPerfumesClient offers={offers} products={products} />
      <RelatedGuides slug="neesh-perfumes" />
    </>
  );
}
