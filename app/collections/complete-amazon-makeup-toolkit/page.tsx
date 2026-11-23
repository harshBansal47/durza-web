import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { ALL_BEAUTY_PRODUCTS, BEAUTY_FAQS, BEAUTY_SHOP_CATEGORIES } from "@/data/amazon-beauty-toolkit";
import BeautyToolkitClient from "./client";

const slug = "complete-amazon-makeup-toolkit";
const canonical = `/collections/${slug}`;
const title = "Complete Makeup Toolkit on Amazon India (2026): 18-Step Routine";
const description =
  "108 curated Amazon India makeup picks across 18 routine steps, with budget, bestseller, editor's pick and premium tiers, a five-step starter kit, and a stated selection method. Reviewed 24 Nov 2026.";

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

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    author: { "@type": "Person", name: "Harsh Bansal", url: absoluteUrl("/about") },
    datePublished: "2026-11-24",
    dateModified: "2026-11-24",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
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

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6" aria-labelledby="makeup-faq">
        <h2 id="makeup-faq" className="font-serif text-2xl font-extrabold text-[#2C2420]">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-3">
          {BEAUTY_FAQS.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-[#E8DDD2] bg-white p-4">
              <summary className="cursor-pointer list-none font-semibold text-[#2C2420] marker:content-none">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#7A6A5F]">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 border-t border-[#E8DDD2] pt-6">
          <h2 className="font-serif text-xl font-bold text-[#2C2420]">Keep exploring</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              { href: "/topics/beauty", label: "Beauty & Grooming topic hub" },
              { href: "/categories/beauty", label: "Beauty & Grooming category" },
              { href: "/collections", label: "All Durza collections" },
              { href: "/collections/indian-monsoon-humidity-skincare-haircare-kit", label: "Humidity & hard-water skincare kit" },
              { href: "/compare/kama-ayurveda-vs-forest-essentials-vs-indus-valley", label: "Ayurvedic skincare comparison" },
              { href: "/guides/nykaa-coupons-and-sale-guide", label: "Nykaa coupons & sale guide" },
              { href: "/guides/dot-and-key-skin-active-guide", label: "Dot & Key skin actives guide" },
              { href: "/stores/amazon-in", label: "Amazon India store hub" },
              { href: "/stores/nykaa", label: "Nykaa store hub" },
              { href: "/tools", label: "Durza shopping tools" },
              { href: "/methodology", label: "How Durza researches" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-start gap-1.5 text-sm text-[#8F4E38] hover:underline">
                  <span aria-hidden="true">→</span>{link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
