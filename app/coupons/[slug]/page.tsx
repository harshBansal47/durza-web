  import type { Metadata } from "next";
  import Link from "next/link";
  import { notFound } from "next/navigation";
  import { ApiError, resilient } from "@/lib/api";
  import CouponCodePanel from "@/components/CouponCodePanel";
  import SponsoredCard from "@/components/SponsoredCard";
  import { getSponsored } from "@/lib/ads";
  import { storeInitials } from "@/lib/catalog";
  import { storeLogoUrl } from "@/lib/storeLogos";
  import VerifyWidget from "@/components/VerifyWidget";
  import DisclosureNote from "@/components/DisclosureNote";
  import { daysUntil, formatDiscount, formatRelativeTime } from "@/lib/format";
  import { getRequirements, requirementLabels, sourceLine } from "@/lib/requirements";
  import { absoluteUrl, aggregateRatingJsonLd, breadcrumbJsonLd, metaDescription } from "@/lib/seo";
  import type { CouponPublic, Store } from "@/lib/types";
  import Image from "next/image";
  import { ArrowRight, Check, X } from "lucide-react";
  import VerifiedGauge from "@/components/VerifiedGauge";
import PageTitle from "@/components/ui/PageTitle";
  import StickyDealBar from "@/components/StickyDealBar";
  import { ImpressionTracker } from "@/components/ImpressionTracker";
  import { RecordView } from "@/components/Analytics";

  export const revalidate = 300;

  async function loadCoupon(slug: string): Promise<CouponPublic | null> {
    try {
      return await resilient.getCouponBySlug(slug);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  }

  async function loadStore(storeId: string): Promise<Store | null> {
    try {
      return await resilient.getStoreById(storeId);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  }

  async function loadRelatedCoupons(couponId: string, storeId: string): Promise<CouponPublic[]> {
    try {
      const res = await resilient.listCoupons({ store_id: storeId, limit: 10 });
      return res.items.filter((c) => c.id !== couponId).slice(0, 4);
    } catch {
      return [];
    }
  }

  async function loadVerificationHistory(couponId: string) {
    try {
      return await resilient.getCouponVerificationHistory(couponId);
    } catch {
      return [];
    }
  }

  async function loadCategory(categoryId: string | null) {
    if (!categoryId) return null;
    try {
      const page = await resilient.listCategories({ limit: 200 });
      return page.items.find((c) => c.id === categoryId) ?? null;
    } catch {
      return null;
    }
  }

  type Params = Promise<{ slug: string }>;

  export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const coupon = await loadCoupon(slug);
    if (!coupon) return {};

    const store = await loadStore(coupon.store_id);

    // The offer's own researched description is the best copy when present;
    // copy from the API can run past the length a result shows, so it is
    // normalised to one line and cut on a word boundary. Without one, the
    // discount, store and code/deal nature are the only facts available.
    const discount = formatDiscount(coupon, store?.currency ?? "INR");
    const headline =
      discount === "Deal"
        ? `${store ? `${store.name} deal` : "Deal"}`
        : `${discount}${store ? ` at ${store.name}` : ""}`;
    const description =
      metaDescription(coupon.description) ??
      `${headline} — ${coupon.code ? "a promo code" : "an auto-applied offer"} read from the store's own page, with the last-checked date shown on Durza.`;
    const title = coupon.title;
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

    const [store, relatedCoupons, verificationHistory, sidebarAd, category] = await Promise.all([
      loadStore(coupon.store_id),
      loadRelatedCoupons(coupon.id, coupon.store_id),
      loadVerificationHistory(coupon.id),
      getSponsored("sidebar"),
      loadCategory(coupon.category_id),
    ]);

    const storeLogo = storeLogoUrl(store);

    // schema.org structured data
    const rating = aggregateRatingJsonLd(coupon.success_count, coupon.fail_count);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Offer",
      name: coupon.title,
      description: coupon.description ?? undefined,
      url: absoluteUrl(`/coupons/${coupon.slug}`),
      availability: coupon.is_active ? "https://schema.org/InStock" : "https://schema.org/Discontinued",
      ...(coupon.expires_at ? { validThrough: coupon.expires_at } : {}),
      ...(store
        ? { seller: { "@type": "Organization", name: store.name, url: store.website_url ?? undefined } }
        : {}),
      ...(coupon.code ? { discountCode: coupon.code } : {}),
      ...(rating ? { aggregateRating: rating } : {}),
    };

    const breadcrumb = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      ...(store ? [{ name: store.name, path: `/stores/${store.slug}` }] : []),
      { name: coupon.title, path: `/coupons/${coupon.slug}` },
    ]);

    const totalReports = coupon.success_count + coupon.fail_count;
    const successRate = coupon.success_rate !== null ? Math.round(coupon.success_rate * 100) : null;
    const daysLeft = daysUntil(coupon.expires_at);
    const expired = (daysLeft !== null && daysLeft < 0) || !coupon.is_active;
    const requirements = requirementLabels(coupon);
    const source = sourceLine(coupon);
    const fullTerms = getRequirements(coupon).terms;

    return (
      <div className="mx-auto max-w-4xl px-4 py-6 pb-28 sm:px-6 sm:py-10 md:pb-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <RecordView storeSlug={store?.slug} couponId={coupon.id} />
        <ImpressionTracker
          couponId={coupon.id}
          merchantId={coupon.store_id}
          pageType="coupon_detail"
          position={1}
          pageId={coupon.slug}
        />

        <header className="dark-surface bg-brand relative mb-8 overflow-hidden rounded-[26px]  shadow-[var(--shadow-overlay)]">
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
  <PageTitle className="leading-tight">{coupon.title}</PageTitle>
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
                  ? `${store.name} still has ${relatedCoupons.length > 0 ? "live deals" : "a deals page"} — start there instead of a dead code.`
                  : "This offer is no longer live — here is what still works."}
              </p>
              {store && (
                <Link href={`/stores/${store.slug}`} className="btn btn-cta mt-4 inline-flex items-center gap-1.5">
                  See current {store.name} deals
                  <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              )}
            </div>
          ) : (
            <CouponCodePanel coupon={coupon} storeName={store?.name} storeSlug={store?.slug} />
          )}
        </section>

        {sidebarAd && (
          <section className="mb-8" aria-label="Sponsored">
            <SponsoredCard ad={sidebarAd} src="ad-sidebar" aspect="aspect-[4/1] sm:aspect-[5/1]" />
          </section>
        )}

        {/* Verification status. An expired offer cannot be tried, so there is
            nothing honest to vote on; the success-rate chip in the header still
            carries whatever real signal exists. */}
        {!expired && (
          <section className="mb-8">
            <VerifyWidget coupon={coupon} />
          </section>
        )}

        {/* Verification History Timeline */}
        {verificationHistory.length > 0 && (
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-extrabold text-ink mb-4">Verification History</h2>
            <dl className="divide-y divide-ledger-line">
              {verificationHistory.map((v, i) => (
                <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                      v.worked ? "bg-verified/10 text-verified" : "bg-rust/10 text-rust"
                    }`}>
                      {v.worked ? <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2} /> : <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />}
                    </span>
                    <div>
                      <p className="text-sm text-ink">{v.worked ? "Worked" : "Didn't work"}</p>
                      <p className="text-xs text-ink-soft font-mono">{formatRelativeTime(v.created_at)}</p>
                    </div>
                  </div>
                  {v.note && <p className="text-sm text-ink-soft sm:w-1/2">{v.note}</p>}
                </div>
              ))}
            </dl>
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
              : `No code needed — ${store?.name ?? "the store"} applies the offer when the store's conditions below are met.`}
          </p>
          {source && (
            <p className="mt-3 text-xs text-ink-soft">
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
        {coupon.description && (
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-extrabold text-ink mb-3">Details & Restrictions</h2>
            <div className="prose prose-ink max-w-none text-sm text-ink-soft leading-relaxed">
              {coupon.description.split("\n").map((para, i) => (
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
                  {store.website_url && (
                    <a href={store.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-inkblue hover:underline mt-1 inline-block">
                      {store.website_url.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {store.description && <p className="mt-2 text-sm text-ink-soft line-clamp-3">{store.description}</p>}
                </div>
              </div>
              {store.commission_disclosure ? (
                <div className="mt-4 pt-4 border-t border-ledger-line">
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-1">Commission Disclosure</p>
                  <p className="text-sm text-ink">{store.commission_disclosure}</p>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-ledger-line">
                  <DisclosureNote commissionDisclosure={null} />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Commission Disclosure (when the store is unknown) */}
        {!store && (
          <section className="mb-8">
            <DisclosureNote commissionDisclosure={null} />
          </section>
        )}

        {/* Related Coupons */}
        {relatedCoupons.length > 0 && (
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-extrabold text-ink mb-4">
              More {store ? `${store.name} savings` : "ways to save"}
            </h2>
            <div className="space-y-3">
              {relatedCoupons.map((c) => (
                <Link key={c.id} href={`/coupons/${c.slug}`} className="block">
                  <div className="lift flex items-center gap-4 rounded-2xl border border-ledger-line bg-white p-3">
                    {store && (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ledger-line bg-paper-raised font-serif text-sm text-ink-soft">
                        {storeInitials(store.name)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink truncate">{c.title}</p>
                      <p className="text-sm text-ink-soft font-mono">{formatDiscount(c, store?.currency ?? "INR")}</p>
                    </div>
                    {c.code && (
                      <span className="shrink-0 rounded-lg border border-dashed border-inkblue/40 bg-inkblue/5 px-2 py-1 font-mono text-xs font-semibold text-inkblue">
                        {c.code}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

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
              All {store.name} deals
            </Link>
          )}
          {category && (
            <Link href={`/categories/${category.slug}`} className="btn btn-outline">
              More {category.name} deals
            </Link>
          )}
          <Link href="/coupons" className="btn btn-ghost">
            Browse everything →
          </Link>
        </nav>

        {/* No sticky CTA on an expired offer — the notice is the action. */}
        {!expired && <StickyDealBar coupon={coupon} storeName={store?.name} />}
      </div>
    );
  }