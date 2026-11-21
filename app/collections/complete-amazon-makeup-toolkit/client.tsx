"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Fraunces } from "next/font/google";
import { BEAUTY_SHOP_CATEGORIES } from "@/data/amazon-beauty-toolkit";

/*
  Palette (named so you can tweak in one place)
  kajal    #1E0B1A  deepest plum-black (hero base, text on light)
  jamun    #4A1D3F  rich plum (headings, overlays)
  gulab    #D6336C  rose accent (links, focus, hover)
  kesar    #F5B83D  saffron highlight (primary CTA)
  blush    #FFF3F0  light section background
  mauve    #6B4A5C  body text on light
*/

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const BASE = "/collections/complete-amazon-makeup-toolkit";
const serif = "font-[family-name:var(--font-display)]";

export default function BeautyToolkitClient() {
  return (
    <div className={`${display.variable} overflow-x-hidden bg-[#1E0B1A] text-[#FFF3F0]`}>
      {/* HERO */}
      <section className="relative isolate min-h-[88svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/collections/amazon-beauty-toolkit/hero-vanity.webp"
            alt="Makeup laid out on a vanity"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* plum wash: dark on the text side, lets the photo breathe on the right */}
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#1E0B1A_0%,rgba(30,11,26,0.9)_38%,rgba(74,29,63,0.5)_72%,rgba(30,11,26,0.7)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(214,51,108,0.30),transparent_38%),radial-gradient(circle_at_12%_92%,rgba(245,184,61,0.14),transparent_40%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-24 pt-28 sm:px-8 lg:px-10 lg:pb-28">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-[#FFE3EA] backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#F5B83D]" aria-hidden="true" />
              Amazon.in beauty storefront
            </p>

            <h1
              className={`${serif} mt-6 text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.015em] text-white sm:text-6xl lg:text-[4.8rem]`}
            >
              Beauty picks for the moment you’re dressing for.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#F1DCE3] sm:text-lg">
              Choose an occasion or a need, browse handpicked makeup with prices and offers, then buy directly on Amazon.in.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#categories"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F5B83D] px-7 text-sm font-semibold text-[#1E0B1A] transition hover:bg-[#FFCB5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E0B1A]"
              >
                Browse categories
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="text-sm text-[#E8CFD8]">Live prices on Amazon.in. Affiliate links.</p>
            </div>
          </div>

          {/* quick jump chips */}
          <nav aria-label="Jump to a category" className="mt-10 flex flex-wrap gap-2.5">
            {BEAUTY_SHOP_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`${BASE}/${category.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-4 text-sm font-medium text-white backdrop-blur-sm transition hover:border-[#F5B83D]/70 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B83D]"
              >
                <span className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/30">
                  <Image src={category.coverImage} alt="" fill sizes="32px" className="object-cover" />
                </span>
                {category.title}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="categories"
        className="relative z-10 -mt-10 scroll-mt-4 rounded-t-[2.5rem] bg-[#FFF3F0] py-16 text-[#1E0B1A] sm:py-20 lg:py-24"
      >
        {/* bindi-dot texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-t-[2.5rem] opacity-60 [background-image:radial-gradient(#E8B7C4_1.2px,transparent_1.2px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <h2 className={`${serif} text-4xl font-semibold leading-[1.05] tracking-tight text-[#4A1D3F] sm:text-5xl lg:text-6xl`}>
              Pick your vibe. We’ll show the kit.
            </h2>
            <p className="mt-4 text-base leading-8 text-[#6B4A5C] sm:text-lg">
              Open a category to see curated products with an image, price, offer details and a direct Amazon button. Compare on Amazon.in before you buy.
            </p>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:pb-10">
            {BEAUTY_SHOP_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`${BASE}/${category.slug}`}
                className="group relative isolate block overflow-hidden rounded-b-[1.5rem] rounded-t-[11rem] bg-[#FFF3F0] shadow-[0_18px_40px_-20px_rgba(74,29,63,0.55)] outline-none ring-[#D6336C] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-18px_rgba(214,51,108,0.45)] focus-visible:ring-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:[&:nth-child(3n+2)]:mt-10"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={category.coverImage}
                    alt={category.coverAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  {/* legibility gradient: transparent at top, plum at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E0B1A] via-[#1E0B1A]/55 to-transparent to-60%" />

                  <span className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full border border-white/30 bg-[#1E0B1A]/40 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {category.products.length} picks
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="flex items-center gap-2 text-sm font-medium text-white/85">
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: category.theme.accent }}
                      />
                      {category.eyebrow}
                    </p>
                    <h3 className={`${serif} mt-2 text-3xl font-semibold leading-tight text-white sm:text-[2rem]`}>{category.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/85 sm:text-[15px]">{category.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#4A1D3F] transition group-hover:bg-[#F5B83D] group-hover:text-[#1E0B1A]">
                      Explore category
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-6 text-[#7A5A68]">
            Prices, MRP, discounts and availability are indicative. Please check the latest details on Amazon.in before buying.
          </p>
        </div>
      </section>
    </div>
  );
}