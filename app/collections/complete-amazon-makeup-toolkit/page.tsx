import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { ALL_BEAUTY_PRODUCTS, BEAUTY_FAQS, BEAUTY_SHOP_CATEGORIES } from "@/data/amazon-beauty-toolkit";
import BeautyToolkitClient from "./client";

const slug = "complete-amazon-makeup-toolkit";
const canonical = `/collections/${slug}`;
const title = "Beauty & Makeup Store — Shop by Category on Amazon India | Durza";
const description =
  "Browse relatable beauty categories for Indian shoppers—college, office, party, wedding, budget, and everyday essentials. Discover curated makeup picks and shop on Amazon.in.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: absoluteUrl(canonical),
    type: "website",
    images: [{ url: "/collections/amazon-beauty-toolkit/hero-vanity.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/collections/amazon-beauty-toolkit/hero-vanity.webp"],
  },
};

export default function Page() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Beauty & Makeup Categories",
    description,
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: BEAUTY_SHOP_CATEGORIES.length,
    itemListElement: BEAUTY_SHOP_CATEGORIES.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.title,
      description: category.description,
      url: absoluteUrl(`${canonical}/${category.slug}`),
    })),
  };

  const productList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Beauty Picks",
    numberOfItems: ALL_BEAUTY_PRODUCTS.length,
    itemListElement: ALL_BEAUTY_PRODUCTS.slice(0, 24).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${product.brand} ${product.name}`,
      url: product.amazonUrl,
    })),
  };

  return (
    <main className="bg-[#120F0D] text-[#F7F1E8]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: "Beauty Makeup Store", path: canonical },
        ])}
      />
      <JsonLd data={itemList} />
      <JsonLd data={productList} />
      <JsonLd data={faqPageJsonLd(BEAUTY_FAQS)} />
      <BeautyToolkitClient />
    </main>
  );
}
