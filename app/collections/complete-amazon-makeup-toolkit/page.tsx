import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { AMAZON_BEAUTY_STAGES, BEAUTY_FAQS } from "@/data/amazon-beauty-toolkit";
import BeautyToolkitClient from "./client";

const slug = "complete-amazon-makeup-toolkit";
const canonical = `/collections/${slug}`;
const title = "Your Beauty Makeup Toolkit — Curated Amazon India Edit | Durza";
const description =
  "Discover a premium, step-by-step makeup toolkit: prep, base, sculpt, eyes, lips, and finishing essentials on Amazon India. Explore by budget, occasion, and look.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: absoluteUrl(canonical),
    type: "article",
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
    name: "Beauty & Makeup Discovery Toolkit",
    description,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: AMAZON_BEAUTY_STAGES.reduce((acc, stage) => acc + stage.categories.length, 0),
    itemListElement: AMAZON_BEAUTY_STAGES.flatMap((stage) => stage.categories).map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.title,
      description: `${category.whatItIs} ${category.oneLineFact}`,
    })),
  };

  return (
    <main className="bg-[#F7F3EE] text-[#1C1714]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: "Beauty Makeup Toolkit", path: canonical },
        ])}
      />
      <JsonLd data={itemList} />
      <JsonLd data={faqPageJsonLd(BEAUTY_FAQS)} />
      <BeautyToolkitClient />
    </main>
  );
}
