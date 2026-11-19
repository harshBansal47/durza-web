import { cache } from "react";
import type { Metadata } from "next";
import type { Store } from "@/lib/types";
import { notFound } from "next/navigation";
import { ApiError, api, lookup, resilient } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import { isIndexableStore } from "@/lib/store-indexing";
import { isHomepageIndiaRelevant } from "@/lib/homepage-curation";
import { cleanStoreDescription, faqPageJsonLd, metaDescription } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { storeLogoUrl } from "@/lib/storeLogos";
import { formatStoreDisplayName } from "@/lib/store-display";
import { dedupeCoupons, sanitizeCouponForDisplay } from "@/lib/feed-sanitize";
import StorePageClient from "@/components/store/StorePageClient";
import { EditorialCard } from "@/components/editorial/EditorialComponents";
import JsonLd from "@/components/JsonLd";
import StoreGuideLink from "@/components/stores/StoreGuideLink";
import StoreBannerAds from "@/components/store/StoreBannerAds";
import type { StoreProductCollection } from "@/components/store/Storefront";
import { hasCustomStorePage } from "@/lib/custom-store-pages";

// Pagination reads request-time searchParams, so the page itself cannot be ISR-cached.
// The API reads remain cached independently by apiFetch.
const PAGE_SIZE = 20;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * One request for everything this page needs about the store, shared by `generateMetadata`
 * and the page. `cache()` is what makes the sharing real: `apiFetch` attaches an
 * AbortSignal for its timeout, and Next deliberately skips fetch memoization for any request
 * carrying one, so without this the two callers each hit the API. The payload already holds
 * the store and every live offer (with-code and code-less buckets, which together are
 * exhaustive) plus an exact total, so no separate store or coupon listing is needed.
 */
const loadStore = cache((slug: string, skip: number = 0) => lookup.getStoreDestination(slug, { skip, limit: PAGE_SIZE }));

async function loadProductCollections(storeId: string): Promise<{
  collections: StoreProductCollection[];
  categoriesLoadFailed: boolean;
}> {
  let categories;
  try {
    categories = await api.listProductCategories(storeId);
  } catch (error) {
    console.error(`Unable to load product categories for store ${storeId}`, error);
    return { collections: [], categoriesLoadFailed: true };
  }

  const collections = await Promise.all(
    categories.map(async (category): Promise<StoreProductCollection> => {
      try {
        const result = await api.listProducts({
          store_id: storeId,
          category_id: category.id,
          limit: 8,
        });
        return {
          category: { ...category, product_count: result.total },
          products: result.items,
        };
      } catch (error) {
        console.error(`Unable to load products for category ${category.id}`, error);
        return { category, products: [], initialLoadFailed: true };
      }
    }),
  );
  return { collections, categoriesLoadFailed: false };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Never serve the generic template for a brand that has a designed custom store page.
  if (hasCustomStorePage(slug)) {
    notFound();
  }
  // Use the same lookup the page uses: a real 404 from the API throws ApiError(404)
  // which orNotFound converts to null. Any other failure also throws and surfaces as
  // an error page. We must call notFound() here too — if only the page component
  // calls it, Next.js has already committed the 200 status from generateMetadata.
  const destination = await loadStore(slug, 0).catch((error: unknown) => {
    // Non-404 API failures: let the error boundary handle it
    if (error instanceof ApiError && error.status !== 404) throw error;
    return null;
  });
  // Same test the page uses to 404, so a store the page refuses to show is never indexable.
  if (!destination || !destination.store.is_active) {
    notFound();
  }
  const store = destination.store;
  const storeName = formatStoreDisplayName(store);

  // The numbers below come from the same live list the page renders, so the
  // snippet never claims an offer the page cannot show. The code/deal split is
  // only stated when one request covered the whole list; otherwise the exact
  // total stands alone rather than a guessed breakdown.
  const listed = destination.deals.length + destination.coupons.length;
  const total = destination.offer_total ?? listed;
  const codeOffers = destination.coupons.length;
  const countedAll = listed >= total;

  const title =
    total > 0
      ? `${storeName} Coupons & Offers: ${total} Live ${total === 1 ? "Offer" : "Offers"}`
      : `${storeName} Official Store Guide & Lineup`;

  let description: string;
  if (total === 0) {
    description =
      metaDescription(store.description) ??
      `Explore ${storeName}'s official store lineup, buying guidance, and direct store links on Durza. Live pricing, availability, and checkout terms are shown on the merchant site.`;
  } else if (countedAll && codeOffers > 0 && codeOffers < total) {
    description = `${total} live ${storeName} offers — ${codeOffers} promo codes and ${total - codeOffers} auto-applied deals — each read from ${storeName}'s own pages with its last-checked date.`;
  } else if (countedAll && codeOffers === total) {
    description = `${total} live ${storeName} promo codes, each read from ${storeName}'s own pages with its last-checked date.`;
  } else if (countedAll && codeOffers === 0) {
    description = `${total} live ${storeName} deals, each read from ${storeName}'s own pages with its last-checked date.`;
  } else {
    description = `${total} live ${storeName} coupons and deals, each read from ${storeName}'s own pages with its last-checked date.`;
  }

  const canonical = `/stores/${store.slug}`;
  // A store with no offers and nothing written about it is a page with nothing to say.
  // A non-India store (global VPN, US retailer, etc.) is off-topic for this site's audience.
  // Both cases: keep out of search results until they have something relevant to say.
  // `follow` stays on so their links still count.
  const usableDescription = cleanStoreDescription(store.description);
  const thin = !isIndexableStore(total, usableDescription);
  const offTarget = !isHomepageIndiaRelevant(store.slug);
  return {
    title,
    description,
    ...((thin || offTarget) ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function StorePage({ params, searchParams }: Props) {
  const { slug } = await params;
  // Never serve the generic template for a brand that has a designed custom store page.
  if (hasCustomStorePage(slug)) {
    notFound();
  }
  const sp = await searchParams;
  const pageParam = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const requestedPage = Number(pageParam);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const skip = (page - 1) * PAGE_SIZE;

  const destination = await loadStore(slug, skip);
  if (!destination || !destination.store.is_active) notFound();
  const store = destination.store;
  const storeName = formatStoreDisplayName(store);
  const displayStore = { ...store, name: storeName };
  const storefront = await loadProductCollections(store.id);

  // Every live offer, once. Sanitize feed text and conservatively dedupe render-time duplicates.
  const seen = new Set<string>();
  const items = dedupeCoupons(
    [...destination.deals, ...destination.coupons]
      .filter((offer) => {
        if (seen.has(offer.id)) return false;
        seen.add(offer.id);
        return true;
      })
      .map((offer) => sanitizeCouponForDisplay(offer)),
  );
  const offerTotal = Math.max(destination.offer_total ?? items.length, items.length);
  const totalPages = Math.ceil(offerTotal / PAGE_SIZE);

  // Sort orders are chosen to put evidence first, not popularity.
  const byBest = [...items].sort(
    (a, b) => (b.success_rate ?? -1) - (a.success_rate ?? -1) || b.clicks_count - a.clicks_count,
  );
  const byLatest = [...items].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  const byExpiring = items
    .filter((c) => c.expires_at)
    .sort((a, b) => new Date(a.expires_at!).getTime() - new Date(b.expires_at!).getTime());

  const verifiedCount = items.filter((c) => {
    if (!c.last_verified_at) return false;
    // Server Component: the clock is read once per request, not per client
    // re-render — the purity rule targets the latter.
    // eslint-disable-next-line react-hooks/purity
    const age = Date.now() - new Date(c.last_verified_at).getTime();
    return age >= 0 && age <= 30 * 24 * 60 * 60 * 1000;
  }).length;
  const totalReports = items.reduce((sum, c) => sum + c.success_count + c.fail_count, 0);
  const avgRate = items.reduce((sum, c) => sum + (c.success_rate ?? 0), 0) / (items.length || 1);
  const latestCheck = items.reduce<string | null>(
    (latest, c) => (!c.last_checked_at ? latest : !latest || c.last_checked_at > latest ? c.last_checked_at : latest),
    null,
  );

  // Alternatives: the ones curated for this store when there are any, in that order;
  // otherwise the stores with the most live offers. (This used to fetch up to 100 more
  // coupons, after everything else had finished, only to sort this list by category;
  // the listing now carries each store's offer count, so it costs nothing.)
  const notThisStore = (s: Store) => s.id !== store.id && s.is_active !== false;
  const curated = destination.alternatives.filter(notThisStore);
  // The full store list is only the fallback for a store with no curated alternatives, so
  // it is only fetched then.
  const allStores = curated.length > 0 ? null : await resilient.listStores({ limit: 100 });
  const related = (
    curated.length > 0
      ? curated
      : (allStores?.items ?? [])
          .filter(notThisStore)
          .sort((a, b) => (b.offer_count ?? 0) - (a.offer_count ?? 0) || a.name.localeCompare(b.name))
  ).slice(0, 6);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: storeName, path: `/stores/${store.slug}` },
  ];
  const faqs = [
    ...destination.faqs,
    {
      question: `How are the ${storeName} codes on Durza kept current?`,
      answer:
        totalReports > 0
          ? `${verifiedCount} of the current ${items.length} listed offers have shopper reports from the last 30 days, with an average reported success rate of ${Math.round(avgRate * 100)}%.`
          : `Not yet — no shopper has reported trying these codes yet. All ${items.length} offers were read from ${storeName}'s own pages${latestCheck ? ` and last checked on ${formatDate(latestCheck)}` : ""}. Shopper reports will update this answer as they arrive.`,
    },
    {
      question: "How does Durza make money?",
      answer:
        "When you use a link on this page, we may earn a commission from the store. Expected commission earnings are one weighted input in how offers are ordered, alongside verification status and shopper success rates. Paid placements are always labelled as sponsored.",
    },
    {
      question: "What if a code does not work?",
      answer:
        "Codes are retired after repeated failed checks, and you can vote “didn’t work” on any offer — that lowers its success rate for everyone who visits after you. If you spot something wrong, the offer page has a report link.",
    },
  ];
  const faqJsonLd = faqPageJsonLd(faqs);

  // The page shows the store's own icon; absolute-ise it for structured data.
  const storeLogo = storeLogoUrl(store);
  const storeLogoUrlAbsolute = storeLogo
    ? storeLogo.startsWith("/")
      ? `${SITE_URL}${storeLogo}`
      : storeLogo
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: storeName,
    url: `${SITE_URL}/stores/${store.slug}`,
    ...(store.website_url ? { sameAs: store.website_url } : {}),
    ...(storeLogoUrlAbsolute ? { logo: storeLogoUrlAbsolute } : {}),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs items={crumbs} />
        <StorePageClient
          key={store.id}
          store={displayStore}
          productCollections={storefront.collections}
          productCategoriesLoadFailed={storefront.categoriesLoadFailed}
          tabs={{
            best: { label: totalReports > 0 ? "Best confirmed" : "Top offers", items: byBest },
            latest: { label: "Recently added", items: byLatest },
            expiring: { label: "Ending soon", items: byExpiring },
          }}
          stats={{ total: offerTotal, verified: verifiedCount, avgRate, totalReports, latestCheck }}
          relatedStores={related}
          currency={store.currency}
          pagination={{
            page,
            totalPages,
            rangeStart: items.length > 0 ? skip + 1 : 0,
            rangeEnd: skip + items.length,
          }}
        />
        {store.pricing_summary && Object.keys(store.pricing_summary).length > 0 && (
          <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-6" aria-labelledby="pricing-heading">
            <h2 id="pricing-heading" className="font-serif text-2xl font-extrabold text-ink">{storeName} pricing</h2>
            {store.pricing_checked_at && (
              <p className="mt-1 text-xs text-ink-soft">Pricing checked {new Date(store.pricing_checked_at).toLocaleDateString("en-IN")}</p>
            )}
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(store.pricing_summary).map(([label, value]) => (
                <div key={label} className="rounded-xl bg-paper p-4">
                  <dt className="text-xs font-semibold capitalize text-ink-soft">{label.replaceAll("_", " ")}</dt>
                  <dd className="mt-1 break-words text-sm font-bold text-ink">
                    {typeof value === "string" || typeof value === "number" ? String(value) : JSON.stringify(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <StoreGuideLink slug={store.slug} />
        <StoreBannerAds slug={store.slug} />
        {destination.related_content.length ? (
          <section className="mt-12" aria-label={`Buying content related to ${storeName}`}>
            <div className="mb-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Make a confident choice</p>
              <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Guides, reviews and comparisons for {storeName}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destination.related_content.slice(0, 6).map((content) => <EditorialCard key={content.id} content={content} />)}
            </div>
          </section>
        ) : null}
        <section className="mt-12 border-t border-ledger-line pt-8">
          <h2 className="mb-4 font-serif text-xl text-ink">
            {storeName} code FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="border-b border-ledger-line pb-3">
                <summary className="cursor-pointer font-semibold text-ink">{faq.question}</summary>
                <p className="mt-2 text-sm text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}