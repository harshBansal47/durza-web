"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import OutboundLink from "@/components/OutboundLink";
import type { DiscoverableContent, TopicId } from "@/lib/topics";
import type { CouponPublic } from "@/lib/types";

interface CollectionCardData {
  slug: string;
  title: string;
  summary: string;
  heroImage: string;
}

interface RedesignedSectionsProps {
  offers: CouponPublic[];
  couponTotal: number;
  storesById: Record<string, { name: string }>;
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

const START_PATHS = [
  { href: "#offers", label: "SAVE NOW", title: "Grab a coupon or deal", meta: "Codes checked by us", tone: "orange" },
  { href: "#guides", label: "LEARN FIRST", title: "Read a buying guide", meta: "Know what matters before you pay", tone: "blue" },
  { href: "#compare", label: "CAN'T DECIDE", title: "Compare two or three", meta: "Side-by-side, with a verdict", tone: "teal" },
  { href: "#reviews", label: "NEED PROOF", title: "See a hands-on review", meta: "Honest, tested, dated", tone: "violet" },
  { href: "#collections", label: "JUST SHOW ME", title: "Shop a ready-made set", meta: "Curated product picks", tone: "green" },
] as const;

function formatChecked(iso: string | null | undefined): string {
  if (!iso) return "Check date not listed";
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return "Check date not listed";
  return `Checked ${date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`;
}

function SmartImage({
  src,
  alt,
  tint,
  fallbackLabel,
  className,
  width = 640,
  height = 360,
}: {
  src?: string | null;
  alt: string;
  tint: string;
  fallbackLabel: string;
  className: string;
  width?: number;
  height?: number;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        unoptimized
        className={className}
      />
    );
  }
  return (
    <div className={`${className} hs-fallback`} style={{ backgroundColor: tint }} role="img" aria-label={fallbackLabel}>
      <span>{fallbackLabel}</span>
    </div>
  );
}

function SectionHead({
  id,
  pill,
  title,
  description,
  href,
  linkLabel,
}: {
  id: string;
  pill: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="hs-head" aria-labelledby={`${id}-heading`}>
      <div>
        <span className="hs-pill">{pill}</span>
        <h2 id={`${id}-heading`} className="hs-h2">{title}</h2>
        <p className="hs-sub">{description}</p>
      </div>
      <Link href={href} className="hs-more">{linkLabel} <ArrowRight aria-hidden="true" size={15} /></Link>
    </div>
  );
}

function StartHere() {
  return (
    <section className="hs-section hs-white hs-start" aria-labelledby="start-here-heading">
      <div className="hs-wrap">
        <span className="hs-pill hs-pill-ink">Start here</span>
        <h2 id="start-here-heading" className="hs-h2">What do you want to do today?</h2>
        <p className="hs-sub">Pick a path. Each one below is a different kind of help, so you always know where you are.</p>
        <div className="hs-path-grid">
          {START_PATHS.map((path) => (
            <a key={path.href} href={path.href} className={`hs-path hs-tone-${path.tone}`}>
              <b>{path.label}</b>
              <span className="hs-path-title">{path.title}</span>
              <span className="hs-meta">{path.meta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function OffersSection({ offers, couponTotal, storesById }: {
  offers: CouponPublic[];
  couponTotal: number;
  storesById: Record<string, { name: string }>;
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyCode(coupon: CouponPublic) {
    if (!coupon.code) return;
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopiedId(coupon.id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard blocked — leave the button unchanged.
    }
  }

  return (
    <section id="offers" className="hs-section hs-white" aria-labelledby="offers-heading">
      <div className="hs-wrap">
        <SectionHead
          id="offers"
          pill="Coupons and deals"
          title="Worth a look right now"
          description="Offers we re-checked recently. Tap to reveal the code."
          href="/coupons"
          linkLabel={`All ${couponTotal.toLocaleString("en-IN")} coupons`}
        />
        {offers.length === 0 ? (
          <p className="hs-empty">No offers are listed right now. We would rather show nothing than guess.</p>
        ) : (
          <div className="hs-grid hs-offer-grid">
            {offers.map((coupon) => {
              const storeName = storesById[coupon.store_id]?.name ?? "Store";
              return (
                <article key={coupon.id} className="hs-card hs-offer-card">
                  <div className="hs-offer-top">
                    <b>{storeName}</b>
                    <span className="hs-meta">{formatChecked(coupon.last_checked_at)}</span>
                  </div>
                  <h3 className="hs-t">{coupon.title}</h3>
                  <div className="hs-offer-foot">
                    {coupon.code ? (
                      <>
                        <code className="hs-code">{coupon.code}</code>
                        <button
                          type="button"
                          className="hs-cta"
                          onClick={() => void copyCode(coupon)}
                          aria-label={copiedId === coupon.id ? "Code copied" : `Copy code ${coupon.code}`}
                        >
                          {copiedId === coupon.id ? "Copied" : "Copy code"}
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="hs-meta hs-strong">No code needed</span>
                        <OutboundLink
                          coupon={coupon}
                          storeName={storeName}
                          src="homepage"
                          contentRef="home_offers"
                          className="hs-cta"
                        >
                          View deal
                        </OutboundLink>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function GuidesSection({ guides }: { guides: DiscoverableContent[] }) {
  const [active, setActive] = useState<TopicId>("home");
  const items = guides
    .filter((item) => item.topicId === active)
    .sort((a, b) => b.priority - a.priority || (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))
    .slice(0, 3);
  const [featured, ...thumbnails] = items;

  return (
    <section id="guides" className="hs-section hs-blue" aria-labelledby="guides-heading">
      <div className="hs-wrap">
        <SectionHead
          id="guides"
          pill="Buying guides"
          title="Know what matters before you buy"
          description="Plain-language explainers: running costs, capacity, what to skip. Read these first, then shop."
          href="/guides"
          linkLabel="Explore all guides"
        />
        <div className="hs-chips" role="group" aria-label="Guide categories">
          {GUIDE_CHIPS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="hs-chip"
              aria-pressed={active === chip.id}
              onClick={() => setActive(chip.id)}
            >
              {chip.label}
            </button>
          ))}
        </div>
        {featured ? (
          <div className="hs-guides-layout">
            <Link href={featured.href} className="hs-card hs-guide-feature">
              <SmartImage
                src={featured.heroImage}
                alt={`Cover art for ${featured.title}`}
                tint="#BFDBFE"
                fallbackLabel="Guide cover"
                className="hs-guide-feature-img"
                width={900}
                height={500}
              />
              <div className="hs-card-body">
                <span className="hs-meta hs-strong hs-link-blue">FEATURED GUIDE · {formatChecked(featured.updatedAt).toUpperCase()}</span>
                <h3 className="hs-t hs-guide-feature-title">{featured.title}</h3>
                <p className="hs-ex">{featured.summary}</p>
                <b className="hs-link-blue">Read this guide →</b>
              </div>
            </Link>
            <div className="hs-guide-side">
              {thumbnails.map((item) => (
                <Link key={item.id} href={item.href} className="hs-card hs-guide-thumb">
                  <SmartImage
                    src={item.heroImage}
                    alt={`Cover art for ${item.title}`}
                    tint="#BFDBFE"
                    fallbackLabel="Guide image"
                    className="hs-guide-thumb-img"
                    width={260}
                    height={260}
                  />
                  <div className="hs-card-body">
                    <span className="hs-meta">{formatChecked(item.updatedAt)}</span>
                    <h3 className="hs-t">{item.title}</h3>
                    <span className="hs-meta hs-strong hs-link-blue">Read article →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="hs-empty">No guides are published in this category yet. Try another chip.</p>
        )}
      </div>
    </section>
  );
}

function ComparisonsSection({ items }: { items: DiscoverableContent[] }) {
  if (items.length === 0) return null;
  return (
    <section id="compare" className="hs-section hs-white" aria-labelledby="compare-heading">
      <div className="hs-wrap">
        <SectionHead
          id="compare"
          pill="Comparisons"
          title="Stuck between two? We pick a side."
          description="Head-to-head breakdowns with a clear verdict, so you can stop tab-hopping."
          href="/compare"
          linkLabel="All comparisons"
        />
        <div className="hs-grid">
          {items.map((item) => (
            <article key={item.id} className="hs-card">
              <div className="hs-versus">
                <SmartImage
                  src={item.heroImage}
                  alt={`Cover art for ${item.title}`}
                  tint="#99F6E4"
                  fallbackLabel="Product A"
                  className="hs-versus-img"
                  width={320}
                  height={300}
                />
                <div className="hs-vs">VS</div>
                <div className="hs-versus-fallback" role="img" aria-label="Second product image not available">
                  Product B
                </div>
              </div>
              <div className="hs-card-body">
                <span className="hs-meta hs-strong hs-link-teal">{formatChecked(item.updatedAt).toUpperCase()}</span>
                <h3 className="hs-t">{item.title}</h3>
                <p className="hs-ex">{item.summary}</p>
                <Link href={item.href} className="hs-inline-link hs-link-teal">See the verdict →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ items }: { items: DiscoverableContent[] }) {
  if (items.length === 0) return null;
  return (
    <section id="reviews" className="hs-section hs-violet" aria-labelledby="reviews-heading">
      <div className="hs-wrap">
        <SectionHead
          id="reviews"
          pill="Tested and reviewed"
          title="Hands-on reviews, no fluff"
          description="What it is like to actually own it, and whether it was worth the money."
          href="/reviews"
          linkLabel="All reviews"
        />
        <div className="hs-grid">
          {items.map((item) => (
            <article key={item.id} className="hs-card">
              <SmartImage
                src={item.heroImage}
                alt={`Review photo for ${item.title}`}
                tint="#DDD6FE"
                fallbackLabel="Review photo"
                className="hs-review-img"
                width={640}
                height={380}
              />
              <div className="hs-card-body">
                <span className="hs-meta hs-strong hs-link-violet">{formatChecked(item.updatedAt).toUpperCase()}</span>
                <h3 className="hs-t">{item.title}</h3>
                <p className="hs-ex">{item.summary}</p>
                <Link href={item.href} className="hs-inline-link hs-link-violet">Read review →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionsSection({ items }: { items: CollectionCardData[] }) {
  if (items.length === 0) return null;
  return (
    <section id="collections" className="hs-section hs-white" aria-labelledby="collections-heading">
      <div className="hs-wrap">
        <SectionHead
          id="collections"
          pill="Curated collections"
          title="Done-for-you shopping lists"
          description="Hand-picked product sets for one goal. Open one and buy straight from the catalog."
          href="/collections"
          linkLabel="All collections"
        />
        <div className="hs-grid">
          {items.map((item) => (
            <Link key={item.slug} href={`/collections/${item.slug}`} className="hs-card hs-collection-card">
              <div className="hs-collage">
                <SmartImage
                  src={item.heroImage}
                  alt={`Products in ${item.title}`}
                  tint="#BBF7D0"
                  fallbackLabel="Product image"
                  className="hs-collage-main"
                  width={420}
                  height={440}
                />
                <div className="hs-collage-side" role="img" aria-label="More products in this collection">
                  <div className="hs-collage-tile">Product image</div>
                  <div className="hs-collage-tile">Product image</div>
                </div>
              </div>
              <div className="hs-card-body">
                <h3 className="hs-t">{item.title}</h3>
                <p className="hs-ex hs-collection-ex">{item.summary}</p>
                <b className="hs-collection-link">Browse the kit →</b>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RedesignedSections({
  offers,
  couponTotal,
  storesById,
  guides,
  comparisons,
  reviews,
  collections,
}: RedesignedSectionsProps) {
  return (
    <div className="hs-root">
      <StartHere />
      <OffersSection offers={offers} couponTotal={couponTotal} storesById={storesById} />
      <GuidesSection guides={guides} />
      <ComparisonsSection items={comparisons} />
      <ReviewsSection items={reviews} />
      <CollectionsSection items={collections} />
    </div>
  );
}
