import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { AMAZON_BEAUTY_STAGES, BEAUTY_FAQS } from "@/data/amazon-beauty-toolkit";
import BeautyToolkitClient from "./client";

const slug = "complete-amazon-makeup-toolkit";
const canonical = `/collections/${slug}`;
const title = "Complete Makeup Toolkit on Amazon India — Step-by-Step Guide";
const description =
  "Build your complete makeup kit on Amazon India from primer to setting spray. Compare Everyday, Cult & Luxe picks with one-line occasion guides on Durza.";

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
    name: "Complete Amazon Beauty & Makeup Toolkit",
    description,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: AMAZON_BEAUTY_STAGES.reduce((acc, stage) => acc + stage.categories.length, 0),
    itemListElement: AMAZON_BEAUTY_STAGES.flatMap((stage) => stage.categories)
      .map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.title,
        description: category.oneLineFact,
      })),
  };

  return (
    <main className="bg-[#FAF7F5] text-[#1F1918]">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: "Complete Makeup Toolkit", path: canonical },
        ]}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: "Complete Makeup Toolkit", path: canonical },
        ])}
      />
      <JsonLd data={itemList} />
      <JsonLd data={faqPageJsonLd(BEAUTY_FAQS)} />
      <BeautyToolkitClient />
    </main>
  );
}
