  import type { Metadata } from "next";
  import { Suspense, cache } from "react";
  import Link from "next/link";
  import { notFound } from "next/navigation";
  import { lookup, resilient } from "@/lib/api";
  import { isHomepageIndiaRelevant } from "@/lib/homepage-curation";
  import CouponCodePanel from "@/components/CouponCodePanel";
  import {
    CategoryLink,
    RelatedOffers,
    SectionSkeleton,
    SidebarAd,
    VerificationHistorySection,
  } from "@/components/coupon/CouponSections";
  import { storeInitials } from "@/lib/catalog";
  import { storeAccent, storeLogoUrl } from "@/lib/storeLogos";
  import VerifyWidget from "@/components/VerifyWidget";
  import DisclosureNote from "@/components/DisclosureNote";
  import { daysUntil, formatDiscount } from "@/lib/format";
  import { getRequirements, requirementLabels, sourceLine } from "@/lib/requirements";
  import Breadcrumbs from "@/components/Breadcrumbs";
  import { absoluteUrl, metaDescription } from "@/lib/seo";
  import type { CouponPublic, Store } from "@/lib/types";
  import Image from "next/image";
  import VerifiedGauge from "@/components/VerifiedGauge";
  import PageTitle from "@/components/ui/PageTitle";
  import StickyDealBar from "@/components/StickyDealBar";
  import SaveDealBanner from "@/components/SaveDealBanner";
  import JsonLd from "@/components/JsonLd";
  import { GO_REL, storeGoHref } from "@/lib/go";
  import { parseHttpUrl } from "@/lib/url";
  import { htmlToText } from "@/lib/htmlText";
  import { getCouponDealDetails } from "@/lib/couponDealDetails";
  import { ImpressionTracker } from "@/components/ImpressionTracker";
  import { RecordView } from "@/components/Analytics";

  export const revalidate = 300;

  // Without this export a dynamic route is rendered on every request and `revalidate` is ignored
  // for the page (it goes out `private, no-store`). See stores/[slug] for the full note.
  export function generateStaticParams() {
    return [];
  }

  // One lookup shared by generateMetadata and the page (`cache()`, because apiFetch's
  // AbortSignal stops Next memoizing the fetch itself). Only a real 404 is null: an API failure
  // throws instead of becoming a cacheable 404 (see `lookup`). The try/catch this replaces
  // meant the same, but `resilient` never throws, so it could not tell the two apart.
  const loadCoupon = cache((slug: string): Promise<CouponPublic | null> => lookup.getCouponBySlug(slug));

  // A missing store only costs the page its store panel, so a failed read degrades to null.
  const loadStore = cache((storeId: string): Promise<Store | null> => resilient.getStoreById(storeId));

  type Params = Promise<{ slug: string }>;

  export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const coupon = await loadCoupon(slug);
    // Explicit: a cached page does not get the automatic noindex a streamed 404 does.
    if (!coupon) return { robots: { index: false, follow: false } };
    if (coupon.is_indexable === false) return { robots: { index: false, follow: true } };

    const store = await loadStore(coupon.store_id);

    // A coupon from a non-India / globally-excluded store is off-target for
    // this site's audience. Keep it out of the index even if is_indexable is
    // true — the sitemap already excludes it, so this ensures the page-level
    // signal is consistent. `follow` stays on so its links still count.
    if (store && !isHomepageIndiaRelevant(store.slug)) {
      return { robots: { index: false, follow: true } };
    }

    // Lead with the merchant and offer type so a result remains relevant to
    // searches like "Acer promo code" even when the provider's offer title
    // omits the merchant name. Keep the description grounded in offer data.
    const discount = formatDiscount(coupon, store?.currency ?? "INR");
    const merchantName = store?.name;
    // Build a keywordy title for the queries shoppers actually type — "[brand] [code]
    // coupon code" — in a form that still reads naturally. codeless deals fall back to "offer".
    const variantKeyword = /first|new/i.test(coupon.title)
      ? "first order coupon"
      : coupon.code
        ? "coupon code"
        : "offer";
    const amountKeyword = discount !== "Deal" && !discount.startsWith("MEGA DEALS")
      ? discount.replace(/\s+/g, " ").replace(/[^\w₹+%\- ]/g, "").trim()
      : null;
    // Keyword-packed SERP title — the query shoppers type verbatim.
    const now = new Date();
    const month = new Intl.DateTimeFormat("en-IN", { month: "short", year: "numeric" }).format(now);
    const titlePieces = [
      merchantName,
      coupon.code ? `${coupon.code}` : null,
      variantKeyword,
      amountKeyword,
      `(${month})`,
    ].filter(Boolean);
    const title = metaDescription(titlePieces.join(" ").slice(0, 68)) ?? "Durza coupon";
    const description = metaDescription(
      [
        merchantName,
        coupon.code ? `Code ${coupon.code} — top live coupon at ${merchantName}.` : `Latest offer at ${merchantName}.`,
        discount !== "Deal" && !discount.startsWith("MEGA DEALS") ? `${discount} savings available right now.` : null,
        coupon.description,
        "Code, validity, and where it works on the Durza coupon page.",
      ]
        .filter(Boolean)
        .join(" "),
    );
    const canonical = absoluteUrl(`/coupons/${coupon.slug}`);

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical, type: "website" },
      twitter: { card: "summary_large_image", title, description },
    };
  }

  export default async function CouponDetailPage({ params }: { params: Params }) {
    const { slug } = await params;
    const coupon = await loadCoupon(slug);
    if (!coupon) notFound();

    // The only data the page waits for: the offer (above) and its store. Related offers,
    // verification history, the category link and the sponsored slot each load behind their
    // own <Suspense> below, so none of them can hold up the code and the button.
    const store = await loadStore(coupon.store_id);

    const storeLogo = storeLogoUrl(store);
    const description = htmlToText(coupon.description);

    // schema.org structured data
    // Schema.org expects an Offer to carry a price; without it Google drops rich
    // snippets. Emit the flat/percent value as a PriceSpecification when we have it and
    // currency INR. JS-less tests that screenshot the page still work — it's just JSON-LD.
    const priceUnderstood =
      coupon.discount_type === "fixed" && typeof coupon.discount_value === "number"
        ? {
            priceCurrency: "INR",
            price: String(coupon.discount_value),
            valueAddedTaxIncluded: false,
          }
        : coupon.discount_type === "percentage" && typeof coupon.discount_value === "number"
          ? {
              priceCurrency: "INR",
              price: String(coupon.discount_value),
              valueAddedTaxIncluded: false,
            }
          : undefined;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Offer",
      name: coupon.title,
      description: description || undefined,
      url: absoluteUrl(`/coupons/${coupon.slug}`),
      availability: coupon.is_active ? "https://schema.org/InStock" : "https://schema.org/Discontinued",
      ...(coupon.expires_at ? { validThrough: coupon.expires_at } : {}),
      ...(priceUnderstood ? { priceSpecification: { "@type": "PriceSpecification", ...priceUnderstood } } : {}),
      ...(store
        ? {
            seller: {
              "@type": "Organization",
              name: store.name,
              url: store.website_url ?? undefined,
              logo: storeLogo ? { "@type": "ImageObject", url: storeLogo } : undefined,
            },
          }
        : {}),
      ...(coupon.code ? { discountCode: coupon.code } : {}),
    };

    const crumbs = [
      { name: "Home", path: "/" },
      ...(store
        ? [
            { name: "Stores", path: "/stores" },
            { name: store.name, path: `/stores/${store.slug}` },
          ]
        : []),
      { name: coupon.title, path: `/coupons/${coupon.slug}` },
    ];

    const totalReports = coupon.success_count + coupon.fail_count;
    const successRate = coupon.success_rate !== null ? Math.round(coupon.success_rate * 100) : null;
    const daysLeft = daysUntil(coupon.expires_at);
    const expired = (daysLeft !== null && daysLeft < 0) || !coupon.is_active;
    const requirements = requirementLabels(coupon);
    const source = sourceLine(coupon);
    const fullTerms = getRequirements(coupon).terms;
    const dealDetails = getCouponDealDetails(coupon.restrictions);

    return (
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        <JsonLd data={jsonLd} />
        <Breadcrumbs items={crumbs} />
        <RecordView storeSlug={store?.slug} couponId={coupon.id} />
        <ImpressionTracker
          couponId={coupon.id}
          merchantId={coupon.store_id}
          pageType="coupon_detail"
          position={1}
          pageId={coupon.slug}
        />

        <header
          className="dark-surface relative mb-8 overflow-hidden rounded-[26px] shadow-[var(--shadow-overlay)]"
          style={{ backgroundImage: "linear-gradient(120deg, var(--color-navy), var(--color-navy-deep))" }}
        >
          {store && storeAccent(store.slug) && (
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: storeAccent(store.slug)! }} />
          )}
          <div className="relative flex flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-10">
            <div className="min-w-0 flex-1 text-white">
              {store && (
                <Link
                  href={`/stores/${store.slug}`}
                  className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 py-1 pl-1 pr-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-inkblue"
                >
                  {storeLogo ? (
                    <Image src={storeLogo} alt="" width={24} height={24} className="h-6 w-6 rounded-full bg-white object-contain" />
                  ) : (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white font-serif text-xs font-bold text-inkblue">
                      {storeInitials(store.name)}
                    </span>
                  )}
                  {store.name}
                </Link>
              )}
  <PageTitle className="leading-tight text-white">{coupon.title}</PageTitle>
              <p className="mt-2 inline-block rounded-xl bg-white px-3 py-1 font-serif text-xl font-extrabold text-inkblue shadow-sm">
                {formatDiscount(coupon, store?.currency ?? "INR")}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                {coupon.expires_at && (
                  <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
                    Expires {(coupon.expires_at as string).split("T")[0]}
                  </span>
                )}
                {successRate !== null && (
                  <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
                    {successRate}% success rate ({totalReports} report{totalReports !== 1 ? "s" : ""})
                  </span>
                )}
                {!coupon.is_active && <span className="rounded-full bg-white/30 px-3 py-1">Inactive</span>}
              </div>
            </div>
            {/* The same figure is in the chip above; on a phone the ring only pushes the code panel down. */}
            <div className="hidden sm:block">
              <VerifiedGauge rate={coupon.success_rate} reports={totalReports} size={116} tone="light" />
            </div>
          </div>
        </header>

        {/* Main action panel */}
        <section id="code-panel" className="mb-8 scroll-mt-24">
          {expired ? (
            <div className="rounded-[22px] border border-rust/30 bg-rust-soft/60 p-5 text-center sm:p-6">
              <p className="font-serif text-xl font-extrabold text-ink">This code has expired</p>
              <p className="mx-auto mt-1 max-w-md text-sm text-ink-soft">
                {store
                  ? `${store.name} has a deals page — start there instead of a dead code.`
                  : "This offer is no longer live — here is what still works."}
              </p>
              {store && (
                <Link href={`/stores/${store.slug}`} className="btn btn-cta mt-4 inline-flex items-center gap-1.5">
                  See current {store.name} deals
                </Link>
              )}
            </div>
          ) : (
            <CouponCodePanel coupon={coupon} storeName={store?.name} storeSlug={store?.slug} />
          )}
        </section>

        <Suspense fallback={null}>
          <SidebarAd />
        </Suspense>

        {/* Verification status. An expired offer cannot be tried, so there is
            nothing honest to vote on; the success-rate chip in the header still
            carries whatever real signal exists. */}
        {!expired && (
          <section className="mb-8">
            <VerifyWidget coupon={coupon} />
          </section>
        )}

        <Suspense fallback={<SectionSkeleton rows={2} />}>
          <VerificationHistorySection couponId={coupon.id} />
        </Suspense>

        {dealDetails && (
          <section className="mb-8 overflow-hidden rounded-[22px] border border-ledger-line bg-white shadow-[var(--shadow-hairline)]">
            <div className="flex flex-col sm:flex-row">
              {dealDetails.imageUrl && (
                <div className="relative aspect-[3/4] w-full shrink-0 bg-paper-alt sm:aspect-auto sm:min-h-[280px] sm:w-2/5">
                  <Image
                    src={dealDetails.imageUrl}
                    alt={dealDetails.title ?? coupon.title}
                    fill
                    sizes="(max-width: 639px) 100vw, 40vw"
                    className="object-contain p-4"
                  />
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-7">
                <div className="flex flex-wrap gap-2">
                  {dealDetails.badge && (
                    <span className="rounded-full bg-paper-alt px-3 py-1 text-xs font-semibold text-ink">
                      {dealDetails.badge}
                    </span>
                  )}
                  {dealDetails.discount && (
                    <span className="rounded-full bg-rust-soft px-3 py-1 text-xs font-bold text-rust">
                      {dealDetails.discount}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-serif text-xl font-bold text-ink">
                  {dealDetails.title ?? coupon.title}
                </h2>
                {dealDetails.category && (
                  <p className="mt-1 text-sm text-ink-soft">{dealDetails.category}</p>
                )}
                {(dealDetails.dealPrice || dealDetails.originalPrice || dealDetails.savings) && (
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {dealDetails.dealPrice && (
                      <span className="font-mono text-2xl font-bold text-ink">
                        {dealDetails.dealPrice}
                      </span>
                    )}
                    {dealDetails.originalPrice && (
                      <span className="font-mono text-sm text-ink-soft line-through">
                        {dealDetails.originalPrice}
                      </span>
                    )}
                    {dealDetails.savings && (
                      <span className="text-sm font-semibold text-verified-ink">
                        {dealDetails.savings}
                      </span>
                    )}
                  </div>
                )}
                {(dealDetails.rating || dealDetails.reviewCount) && (
                  <p className="mt-3 text-sm text-ink-soft">
                    {dealDetails.rating && <span>★ {dealDetails.rating}</span>}
                    {dealDetails.rating && dealDetails.reviewCount && " · "}
                    {dealDetails.reviewCount && `${dealDetails.reviewCount} reviews`}
                  </p>
                )}
                {dealDetails.checkedDate && (
                  <p className="mt-3 text-xs text-ink-soft">
                    Last checked {dealDetails.checkedDate}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* How to get it / Requirements — the store's own stated conditions,
            never a blanket "applies at checkout". */}
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-2xl font-extrabold text-ink">How to get it</h2>
          {requirements.length > 0 && (
            <ul className="mb-3 flex flex-wrap gap-2" aria-label="Requirements">
              {requirements.map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-ledger-line bg-paper-raised px-3 py-1 text-xs font-medium text-ink"
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
          <p className="text-sm leading-relaxed text-ink-soft">
            {coupon.code
              ? `Reveal and copy the code above, then paste it at ${store?.name ?? "the store"}'s checkout.`
              : `${store?.name ?? "The store"} applies this offer automatically when its conditions are met.`}
          </p>
          {source && (
            <p className="mt-3 text-[13px] text-ink-soft">
              Source:{" "}
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="underline underline-offset-2 hover:text-ink"
                >
                  {source.text}
                </a>
              ) : (
                source.text
              )}
            </p>
          )}
          {fullTerms && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium text-inkblue">
                Conditions stated by {store?.name ?? "the store"}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{fullTerms}</p>
            </details>
          )}
        </section>

        {/* Description / Restrictions */}
        {description && (
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-extrabold text-ink mb-3">Details & Restrictions</h2>
            <div className="prose prose-ink max-w-none text-sm text-ink-soft leading-relaxed">
              {description.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* User Reports */}
        {totalReports > 0 && (
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-extrabold text-ink mb-4">Community Reports</h2>
            <div className="rounded-[22px] border border-ledger-line bg-white overflow-hidden shadow-[var(--shadow-hairline)]">
              <div className="grid grid-cols-2 border-b border-ledger-line bg-paper-raised">
                <div className="p-4 text-center border-r border-ledger-line">
                  <p className="font-serif text-3xl text-verified">{successRate}%</p>
                  <p className="text-xs text-ink-soft font-mono uppercase tracking-wider">Success Rate</p>
                </div>
                <div className="p-4 text-center">
                  <p className="font-serif text-3xl text-ink">{totalReports}</p>
                  <p className="text-xs text-ink-soft font-mono uppercase tracking-wider">Total Reports</p>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4 h-4 bg-ledger-line rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-verified transition-all duration-500"
                    style={{ width: `${successRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-ink-soft font-mono">
                  <span>Worked: {coupon.success_count}</span>
                  <span>Did not work: {coupon.fail_count}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Store Information */}
        {store && (
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-extrabold text-ink mb-4">Store Information</h2>
            <div className="rounded-[22px] border border-ledger-line bg-white p-5 shadow-[var(--shadow-hairline)]">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  {storeLogo ? (
                    <Image src={storeLogo} alt={store.name} width={60} height={60} className="rounded-full border border-ledger-line object-contain bg-paper-raised" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-ledger-line bg-paper-raised font-serif text-2xl text-ink-soft">
                      {storeInitials(store.name)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg text-ink">{store.name}</h3>
                  {parseHttpUrl(store.website_url) && (
                    <a href={storeGoHref(store.slug, "coupon-page")} target="_blank" rel={GO_REL} className="text-sm text-inkblue hover:underline mt-1 inline-block">
                      {store.website_url!.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {store.description && <p className="mt-2 text-sm text-ink-soft line-clamp-3">{store.description}</p>}
                  <Link href={`/stores/${store.slug}`} className="mt-2 inline-block text-sm font-medium text-inkblue hover:underline">
                    Know all {store.name} deals →
                  </Link>
                </div>
              </div>
              <div className="mt-4 border-t border-ledger-line pt-4">
                <DisclosureNote compact commissionDisclosure={store.commission_disclosure} />
              </div>
            </div>
          </section>
        )}

        {/* Commission Disclosure (when the store is unknown) */}
        {!store && (
          <section className="mb-8">
            <DisclosureNote commissionDisclosure={null} />
          </section>
        )}

        {/* Every other section carries mb-8; without it the next heading sat flush against this card. */}
        <div className="mb-8">
          <SaveDealBanner
            target={{ kind: "coupon", id: coupon.id, title: coupon.title, storeName: store?.name }}
          />
        </div>

        <Suspense fallback={<SectionSkeleton rows={3} />}>
          <RelatedOffers couponId={coupon.id} storeId={coupon.store_id} store={store} />
        </Suspense>

        {/* Description fallback */}
        {coupon.description && !store && (
          <section className="mb-8">
            <p className="leading-relaxed text-ink-soft">{coupon.description}</p>
          </section>
        )}

        {/* One more thing: keep discovery honest and adjacent */}
        <nav className="mb-8 flex flex-wrap gap-2" aria-label="Keep exploring">
          {store && (
            <Link href={`/stores/${store.slug}`} className="btn btn-outline">
              Know all {store.name} deals
            </Link>
          )}
          <Suspense fallback={null}>
            <CategoryLink categoryId={coupon.category_id} />
          </Suspense>
          <Link href="/coupons" className="btn btn-ghost">
            Browse everything →
          </Link>
        </nav>

        {/* No sticky CTA on an expired offer — the notice is the action. */}
        {!expired && <StickyDealBar coupon={coupon} storeName={store?.name} />}
      </div>
    );
  }
