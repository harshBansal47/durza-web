import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { GO_REL } from "@/lib/go";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import {
  BEAUTY_PICK_CHECKED_LABEL,
  BEAUTY_SHOP_CATEGORIES,
  getBeautyCategoryBySlug,
  type BeautyProduct,
} from "@/data/amazon-beauty-toolkit";
import SafeProductImage from "./SafeProductImage";

type Props = { params: Promise<{ category: string }> };

const BASE = "/collections/complete-amazon-makeup-toolkit";

export function generateStaticParams() {
  return BEAUTY_SHOP_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const entry = getBeautyCategoryBySlug(category);
  if (!entry) return { title: "Category not found", robots: { index: false, follow: false } };

  const title = `${entry.title} | Amazon Makeup Picks | Durza`;
  const description = `${entry.description} Curated picks with direct Amazon.in links.`;
  const canonical = `${BASE}/${entry.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonical),
      type: "website",
      images: [{ url: entry.coverImage }],
    },
    twitter: { card: "summary_large_image", title, description, images: [entry.coverImage] },
  };
}

function ProductCard({ product }: { product: BeautyProduct }) {
  const hasLivePrice = product.priceLabel !== "Check price";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E7DDD1] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-[#F6F0E8]">
        <SafeProductImage src={product.image} alt={`${product.brand} ${product.name}`} />
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3A312A] shadow-sm">
          {product.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A6A55]">{product.brand}</p>
        <h3 className="mt-2 text-base font-semibold leading-6 text-[#2A211A] sm:text-lg">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[#5F5247]">{product.description}</p>

        <div className="mt-4 border-t border-[#EFE6DC] pt-4">
          {hasLivePrice ? (
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-xl font-bold text-[#2A211A]">{product.priceLabel}</span>
              {product.mrpLabel ? <span className="text-sm text-[#8A7A6D] line-through">{product.mrpLabel}</span> : null}
              {product.discountLabel ? <span className="text-sm font-semibold text-[#1F7A4D]">{product.discountLabel}</span> : null}
            </div>
          ) : (
            <p className="text-sm font-semibold text-[#5F5247]">Check price</p>
          )}
        </div>

        <a
          href={product.amazonUrl}
          target="_blank"
          rel={GO_REL}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2A211A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3B3128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A14A2A] focus-visible:ring-offset-2"
          aria-label={`View ${product.name} on Amazon`}
        >
          View on Amazon <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default async function BeautyCategoryPage({ params }: Props) {
  const { category } = await params;
  const entry = getBeautyCategoryBySlug(category);
  if (!entry) notFound();

  const base = absoluteUrl(BASE);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Beauty & Makeup Store", path: BASE },
    { name: entry.title, path: `${BASE}/${entry.slug}` },
  ]);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${entry.title} makeup picks`,
    itemListElement: entry.products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.brand} ${p.name}`,
      url: p.amazonUrl,
    })),
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2A211A]">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={itemList} />

      <section className="border-b border-[#E7DDD1] bg-[#FFF7F1]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Link href={BASE} className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A5A46] hover:text-[#2A211A]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all sections
          </Link>

          <div className="mt-6 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A14A2A]">{entry.eyebrow}{entry.updatedLabel ? ` · ${entry.updatedLabel}` : ""}</p>
            <h1 className="mt-3 font-['Playfair_Display',Georgia,serif] text-4xl font-semibold leading-tight text-[#2A211A] sm:text-5xl">{entry.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5F5247] sm:text-lg">{entry.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#5F5247]">
              <span className="rounded-full border border-[#E0D2C3] bg-white px-4 py-2 font-medium">{entry.products.length} picks</span>
              <span className="rounded-full border border-[#E0D2C3] bg-white px-4 py-2 font-medium">Amazon.in</span>
              <span className="rounded-full border border-[#E0D2C3] bg-white px-4 py-2 font-medium">{BEAUTY_PICK_CHECKED_LABEL}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6A55]">Curated picks</p>
            <h2 className="mt-2 font-['Playfair_Display',Georgia,serif] text-3xl font-semibold text-[#2A211A]">Shop {entry.title}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#5F5247]">Every product has a reason, a price label, and a direct Amazon button. Check the latest price and availability on Amazon.in.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {entry.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E7DDD1] bg-white p-5 sm:p-6">
          <p className="max-w-2xl text-sm leading-6 text-[#5F5247]">Prices, MRP, and discounts are indicative and may change. Check the latest details on Amazon.in before buying.</p>
          <Link href={BASE} className="inline-flex items-center gap-2 rounded-full bg-[#2A211A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B3128]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Browse other sections
          </Link>
        </div>
      </section>
    </main>
  );
}
