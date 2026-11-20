import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ShoppingBag, Sparkles } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { GO_REL } from "@/lib/go";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import {
  BEAUTY_SHOP_CATEGORIES,
  getBeautyCategoryBySlug,
  type BeautyProduct,
} from "@/data/amazon-beauty-toolkit";

type Props = { params: Promise<{ category: string }> };

const BASE = "/collections/complete-amazon-makeup-toolkit";

export function generateStaticParams() {
  return BEAUTY_SHOP_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const entry = getBeautyCategoryBySlug(category);
  if (!entry) return { title: "Category not found", robots: { index: false, follow: false } };

  const title = `${entry.title} Makeup Picks on Amazon India | Durza Beauty Store`;
  const description = `${entry.description} Browse curated products with tags, pricing, offers, and direct Amazon.in links.`;
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [entry.coverImage],
    },
  };
}

function ProductCard({ product, accent }: { product: BeautyProduct; accent: string }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E6DCD2] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-[#F4EEE7]">
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span
          className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm"
          style={{ backgroundColor: accent }}
        >
          {product.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A5A44]">{product.brand}</p>
        <h3 className="mt-1 font-serif text-[1.05rem] font-semibold leading-snug text-[#1A1714] sm:text-lg">{product.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#5A524B] sm:text-[13px]">{product.description}</p>

        <div className="mt-3 rounded-xl border border-[#EFE6DC] bg-[#FFFCF8] p-2.5">
          <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
            <span className="text-base font-bold text-[#1A1714] sm:text-lg">{product.priceLabel}</span>
            {product.mrpLabel ? <span className="text-xs text-[#8A7D72] line-through">{product.mrpLabel}</span> : null}
          </div>
          <p className="mt-1 inline-flex rounded-md bg-[#F3E8DE] px-2 py-0.5 text-[11px] font-semibold text-[#6B3F2A]">
            {product.discountLabel}
          </p>
        </div>

        <a
          href={product.amazonUrl}
          target="_blank"
          rel={GO_REL}
          className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#1A1714] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#332B25] sm:text-sm"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" /> View on Amazon
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const entry = getBeautyCategoryBySlug(category);
  if (!entry) notFound();

  const canonical = `${BASE}/${entry.slug}`;
  const accent = entry.theme.accent === "#F3D9C6" ? "#8A5A44" : entry.theme.accent === "#DCE7F5" ? "#3E5C76" : entry.theme.accent === "#FFD7E3" ? "#A23E63" : entry.theme.accent === "#F6E6BF" ? "#8A6A2E" : entry.theme.accent === "#DFF7EA" ? "#2E6B52" : "#6A5846";

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${entry.title} Products`,
    description: entry.description,
    numberOfItems: entry.products.length,
    itemListElement: entry.products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${product.brand} ${product.name}`,
      url: product.amazonUrl,
    })),
  };

  return (
    <main className="bg-[#FBF7F2] text-[#1A1714]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: "Beauty Makeup Store", path: BASE },
          { name: entry.title, path: canonical },
        ])}
      />
      <JsonLd data={itemList} />

      {/* CATEGORY HERO / MAGAZINE COVER */}
      <section className="relative isolate overflow-hidden bg-[#120F0D] text-[#FFF8F0]">
        <div className="absolute inset-0">
          <Image src={entry.coverImage} alt={entry.coverAlt} fill priority sizes="100vw" className="object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${entry.theme.gradient}`} />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,8,7,0.55),rgba(10,8,7,0.15),rgba(10,8,7,0.35))]" />
        </div>

        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1440 560" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={entry.theme.accent} stopOpacity="0" />
              <stop offset="50%" stopColor={entry.theme.accent} stopOpacity="0.5" />
              <stop offset="100%" stopColor={entry.theme.accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-40 420 C 260 300, 520 520, 820 360 C 1060 230, 1260 320, 1500 180" stroke="url(#line)" strokeWidth="1.4" fill="none" />
          <path d="M980 -40 C 1020 80, 1120 120, 1180 220" stroke={entry.theme.accent} strokeOpacity="0.28" strokeWidth="1" fill="none" />
          <circle cx="1180" cy="140" r="120" stroke={entry.theme.accent} strokeOpacity="0.18" fill="none" />
          <circle cx="1180" cy="140" r="170" stroke={entry.theme.accent} strokeOpacity="0.1" fill="none" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20 lg:pt-28">
          <Link href={BASE} className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all categories
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm" style={{ color: entry.theme.accent }}>
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> {entry.eyebrow}
              </p>
              <h1 className="mt-5 font-serif text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">{entry.title}</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#F1E6D9] sm:text-lg">{entry.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:max-w-md lg:ml-auto">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">Products</p>
                <p className="mt-1 font-serif text-3xl text-white">{entry.products.length}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">Marketplace</p>
                <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">Amazon.in</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/15 bg-black/20 p-4 text-sm leading-6 text-[#F1E6D9] backdrop-blur-sm">
                Each card shows an image, tag, price &amp; offer label, and a direct Amazon button. Check live price, MRP, and offers on Amazon.in.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-[-10%] top-0 h-72 w-72 rounded-full bg-[#EEDFCC] opacity-40 blur-3xl" />
          <div className="absolute right-[-8%] top-40 h-80 w-80 rounded-full bg-[#E6D5C5] opacity-35 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A5A44]">Curated picks</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1A1714] sm:text-4xl">Shop {entry.title}</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#5A524B]">Small, easy-to-scan product cards. Tap any product to view full details and live pricing on Amazon.in.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {entry.products.map((product) => (
              <ProductCard key={product.id} product={product} accent={accent} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#E1D6CA] bg-white/70 p-5 text-sm leading-7 text-[#4A433C] backdrop-blur-sm sm:p-6">
            <p><strong className="text-[#1A1714]">Note:</strong> Product images are placeholders for now and can be replaced with actual product photos. Prices, MRP, and discounts shown are labels/placeholders where live values are not set—always confirm the latest price and offer on Amazon.in.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={BASE} className="inline-flex items-center gap-2 rounded-full bg-[#1A1714] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#332B25]">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Browse other categories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
