"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import { useState, type ReactNode } from "react";
import type { DiscoverableContent, TopicId } from "@/lib/topics";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

interface CollectionCardData {
  slug: string;
  title: string;
  summary: string;
  heroImage: string;
}

interface RedesignedSectionsProps {
  /** The previous offers rail is supplied by the page so it stays unchanged. */
  offersSlot?: ReactNode;
  guides: DiscoverableContent[];
  comparisons: DiscoverableContent[];
  reviews: DiscoverableContent[];
  collections: CollectionCardData[];
}

const GUIDE_CHIPS: { id: TopicId; label: string }[] = [
  { id: "home", label: "Home and Appliances" },
  { id: "health", label: "Health and Fitness" },
  { id: "beauty", label: "Beauty and Grooming" },
  { id: "tech", label: "Tech and Gadgets" },
];

function formatChecked(iso: string | null | undefined): string {
  if (!iso) return "Check date not listed";
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return "Check date not listed";
  return `Checked ${date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`;
}

/**
 * Image inside a fixed-ratio frame (the ratio comes from `className`).
 *
 * fit="cover"   – fills the frame and crops. Best for photos.
 * fit="contain" – shows the whole image on a blurred copy of itself. Best for
 *                 logos and graphics, which cover would cut off.
 */
function SmartImage({
  src,
  alt,
  fallbackLabel,
  className = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  fit = "cover",
}: {
  src?: string | null;
  alt: string;
  fallbackLabel: string;
  className?: string;
  sizes?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-slate-100 ${className}`}>
      {src ? (
        fit === "contain" ? (
          <>
            <Image
              src={src}
              alt=""
              aria-hidden="true"
              fill
              sizes={sizes}
              loading="lazy"
              unoptimized
              className="scale-125 object-cover object-center opacity-70 blur-xl"
            />
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              loading="lazy"
              unoptimized
              className="object-contain object-center p-2"
            />
          </>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            loading="lazy"
            unoptimized
            className="object-cover object-center"
          />
        )
      ) : (
        <div
          role="img"
          aria-label={fallbackLabel}
          className="flex h-full w-full items-center justify-center text-slate-400"
        >
          <ImageIcon className="h-6 w-6" aria-hidden="true" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

/** Section frame. Alternating white / slate-50 keeps sections distinct without color themes. */
function Shell({
  id,
  tone,
  children,
}: {
  id: string;
  tone: "white" | "soft";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`${tone === "soft" ? "bg-slate-50" : "bg-white"} py-12 sm:py-16`}
    >
      <div className="hs-wrap">{children}</div>
    </section>
  );
}

const CARD =
  "group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";

const CARD_TITLE =
  "text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600";

const CARD_TEXT = "mt-1.5 text-sm leading-relaxed text-slate-600 line-clamp-3";

function CardCta({ children }: { children: ReactNode }) {
  return (
    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-durza-deep transition-colors group-hover:text-accent">
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </span>
  );
}

const GRID = "grid gap-5 md:grid-cols-3";

/* -------------------------------------------------------------------------- */
/* Guides: one wide featured guide, then the other guides side by side        */
/* -------------------------------------------------------------------------- */

function GuidesSection({ guides }: { guides: DiscoverableContent[] }) {
  const [active, setActive] = useState<TopicId>("home");
  const items = guides
    .filter((item) => item.topicId === active)
    .sort((a, b) => b.priority - a.priority || (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))
    .slice(0, 3);
  const [featured, ...others] = items;

  return (
    <Shell id="guides" tone="soft">
      <SectionHead
        id="guides"
        pill="Buying guides"
        title="Know what matters before you buy"
        description="Plain-language explainers: running costs, capacity, what to skip. Read these first, then shop."
        href="/guides"
        linkLabel="Explore all guides"
      />

      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Guide categories">
        {GUIDE_CHIPS.map((chip) => {
          const selected = active === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(chip.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                selected
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {featured ? (
        <div className="grid gap-5">
          {/* Featured: image on the left, text on the right (stacked on mobile) */}
          <Link href={featured.href} className={`${CARD} lg:grid lg:grid-cols-5 lg:gap-6`}>
            <SmartImage
              src={featured.heroImage}
              alt={`Cover art for ${featured.title}`}
              fallbackLabel="Guide cover"
              className="aspect-[16/10] lg:col-span-3"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="flex flex-1 flex-col px-1 pb-1 pt-4 lg:col-span-2 lg:justify-center lg:py-3 lg:pl-0 lg:pr-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-white">
                  Featured
                </span>
                <span className="text-xs text-slate-500">{formatChecked(featured.updatedAt)}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-2xl">
                {featured.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 line-clamp-4 sm:text-base">
                {featured.summary}
              </p>
              <CardCta>Read this guide</CardCta>
            </div>
          </Link>

          {/* Other guides: equal cards with a fixed square thumbnail. Logos are
              shown whole (fit="contain") so nothing gets cut off. */}
          {others.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {others.map((item) => (
                <Link key={item.id} href={item.href} className={`${CARD} flex-row items-center gap-4`}>
                  <SmartImage
                    src={item.heroImage}
                    alt={`Cover art for ${item.title}`}
                    fallbackLabel="Guide image"
                    fit="contain"
                    className="aspect-square w-28 shrink-0 sm:w-36"
                    sizes="144px"
                  />
                  <div className="flex min-w-0 flex-1 flex-col self-stretch py-1">
                    <span className="text-xs text-slate-500">{formatChecked(item.updatedAt)}</span>
                    <h3 className={`mt-1 line-clamp-2 ${CARD_TITLE}`}>{item.title}</h3>
                    <p className="mt-1.5 hidden text-sm leading-relaxed text-slate-600 line-clamp-2 sm:block">
                      {item.summary}
                    </p>
                    <CardCta>Read article</CardCta>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          No guides are published in this category yet. Try another category above.
        </p>
      )}
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/* Comparisons                                                                */
/* -------------------------------------------------------------------------- */

function ComparisonsSection({ items }: { items: DiscoverableContent[] }) {
  if (items.length === 0) return null;
  return (
    <Shell id="compare" tone="white">
      <SectionHead
        id="compare"
        pill="Comparisons"
        title="Stuck between two? We pick a side."
        description="Head-to-head breakdowns with a clear verdict, so you can stop tab-hopping."
        href="/compare"
        linkLabel="All comparisons"
      />
      <div className={GRID}>
        {items.map((item) => (
          <Link key={item.id} href={item.href} className={CARD}>
            <div className="relative">
              <SmartImage
                src={item.heroImage}
                alt={`Cover art for ${item.title}`}
                fallbackLabel="Comparison cover"
                className="aspect-[16/10]"
              />
              <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
                Head to head
              </span>
            </div>
            <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
              <span className="text-xs text-slate-500">{formatChecked(item.updatedAt)}</span>
              <h3 className={`mt-1 ${CARD_TITLE}`}>{item.title}</h3>
              <p className={CARD_TEXT}>{item.summary}</p>
              <CardCta>See the verdict</CardCta>
            </div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/* Reviews                                                                    */
/* -------------------------------------------------------------------------- */

function ReviewsSection({ items }: { items: DiscoverableContent[] }) {
  if (items.length === 0) return null;
  return (
    <Shell id="reviews" tone="soft">
      <SectionHead
        id="reviews"
        pill="Tested and reviewed"
        title="Hands-on reviews, no fluff"
        description="What it is like to actually own it, and whether it was worth the money."
        href="/reviews"
        linkLabel="All reviews"
      />
      <div className={GRID}>
        {items.map((item) => (
          <Link key={item.id} href={item.href} className={CARD}>
            <SmartImage
              src={item.heroImage}
              alt={`Review photo for ${item.title}`}
              fallbackLabel="Review photo"
              className="aspect-[16/10]"
            />
            <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
              <span className="text-xs text-slate-500">{formatChecked(item.updatedAt)}</span>
              <h3 className={`mt-1 ${CARD_TITLE}`}>{item.title}</h3>
              <p className={CARD_TEXT}>{item.summary}</p>
              <CardCta>Read review</CardCta>
            </div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/* Collections                                                                */
/* -------------------------------------------------------------------------- */

function CollectionsSection({ items }: { items: CollectionCardData[] }) {
  if (items.length === 0) return null;
  return (
    <Shell id="collections" tone="white">
      <SectionHead
        id="collections"
        pill="Curated collections"
        title="Done-for-you shopping lists"
        description="Hand-picked product sets for one goal. Open one and buy straight from the catalog."
        href="/collections"
        linkLabel="All collections"
      />
      <div className={GRID}>
        {items.map((item) => (
          <Link key={item.slug} href={`/collections/${item.slug}`} className={CARD}>
            <SmartImage
              src={item.heroImage}
              alt={`Products in ${item.title}`}
              fallbackLabel="Collection cover"
              className="aspect-[4/3]"
            />
            <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
              <h3 className={CARD_TITLE}>{item.title}</h3>
              <p className={CARD_TEXT}>{item.summary}</p>
              <CardCta>Browse collection</CardCta>
            </div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

export default function RedesignedSections({
  offersSlot,
  guides,
  comparisons,
  reviews,
  collections,
}: RedesignedSectionsProps) {
  return (
    <div className="hs-root">
      {offersSlot}
      <GuidesSection guides={guides} />
      <ComparisonsSection items={comparisons} />
      <ReviewsSection items={reviews} />
      <CollectionsSection items={collections} />
    </div>
  );
}