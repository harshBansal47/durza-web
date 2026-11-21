import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { ALL_BEAUTY_PRODUCTS, BEAUTY_FAQS, BEAUTY_SHOP_CATEGORIES } from "@/data/amazon-beauty-toolkit";
import BeautyToolkitClient from "./client";

const slug = "complete-amazon-makeup-toolkit";
const canonical = `/collections/${slug}`;
const title = "Complete Makeup Toolkit on Amazon India | Durza";
const description =
  "Build your complete makeup kit step by step—from cleanser to mascara. Browse curated picks across budget to premium, with price, MRP, discount, and Amazon.in links.";

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
    name: "Makeup Toolkit Routine Steps",
    description,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: BEAUTY_SHOP_CATEGORIES.length,
    itemListElement: BEAUTY_SHOP_CATEGORIES.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${category.stepLabel}: ${category.title}`,
      description: category.shortIntro,
      url: absoluteUrl(`${canonical}#${category.slug}`),
    })),
  };

  const productList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Makeup Toolkit Products",
    numberOfItems: ALL_BEAUTY_PRODUCTS.length,
    itemListElement: ALL_BEAUTY_PRODUCTS.slice(0, 24).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${product.brand} ${product.name}`,
      url: product.amazonUrl,
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: "Complete Makeup Toolkit", path: canonical },
        ])}
      />
      <JsonLd data={itemList} />
      <JsonLd data={productList} />
      <JsonLd data={faqPageJsonLd(BEAUTY_FAQS.map((f) => ({ question: f.question, answer: f.answer })))} />
      <BeautyToolkitClient />
    </>
  );
}
