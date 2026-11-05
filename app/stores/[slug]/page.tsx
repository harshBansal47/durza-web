import { cache } from "react";
import type { Metadata } from "next";
import type { Store } from "@/lib/types";
import { notFound } from "next/navigation";
import { lookup, resilient } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import { faqPageJsonLd, metaDescription } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { storeLogoUrl } from "@/lib/storeLogos";
import StorePageClient from "@/components/store/StorePageClient";
import { EditorialCard } from "@/components/editorial/EditorialComponents";
import JsonLd from "@/components/JsonLd";

export const revalidate = 300;

// Opts this dynamic route into on-demand static caching. Without a generateStaticParams export
// Next renders it on every request and ignores `revalidate` for the page itself (the response
// goes out `private, no-store`). Returning nothing keeps builds from needing the API: each store
// is rendered on its first request, then served from cache and refreshed every 5 minutes.
export function generateStaticParams() {
  return [];
}

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * One request for everything this page needs about the store, shared by `generateMetadata`
 * and the page. `cache()` is what makes the sharing real: `apiFetch` attaches an
 * AbortSignal for its timeout, and Next deliberately skips fetch memoization for any request
 * carrying one, so without this the two callers each hit the API. The payload already holds
 * the store and every live offer (with-code and code-less buckets, which together are
 * exhaustive) plus an exact total, so no separate store or coupon listing is needed.
 */
const loadStore = cache((slug: string) => lookup.getStoreDestination(slug));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = await loadStore(slug).catch(() => null);
  // Same test the page uses to 404, so a store the page refuses to show is never indexable.
  // Explicit because a cached page does not get the automatic noindex a streamed 404 does.
  if (!destination || !destination.store.is_active) {
    return { title: "Store not found", robots: { index: false, follow: false } };
  }
  const store = destination.store;

  // The numbers below come from the same live list the page renders, so the
  // snippet never claims an offer the page cannot show. The code/deal split is
  // only stated when one request covered the whole list; otherwise the exact
  // total stands alone rather than a guessed breakdown.
  const listed = destination.deals.length + destination.coupons.length;
  const total = destination.offer_total ?? listed;
  const codeOffers = destination.coupons.length;
  const countedAll = listed >= total;

  const title = `${store.name} Coupons & Promo Codes${total > 0 ? `: ${total} Live Offers` : ""}`;

  let description: string;
  if (total === 0) {
    // No live list to count. A short store-written blurb is still the best copy
    // available; the long ones would only be cut off by the search result, so
    // they get a page-specific summary instead. The summary states the sourcing
    // policy rather than counting offers, because there are none to count.
    description =
      metaDescription(store.description) ??
      `${store.name} coupon codes and deals are read from ${store.name}'s own pages — every offer shows its source page and last-checked date, with commissions disclosed.`;
  } else if (countedAll && codeOffers > 0 && codeOffers < total) {
    description = `${total} live ${store.name} offers — ${codeOffers} promo codes and ${total - codeOffers} auto-applied deals — each read from ${store.name}'s own pages with its last-checked date.`;
  } else if (countedAll && codeOffers === total) {
    description = `${total} live ${store.name} promo codes, each read from ${store.name}'s own pages with its last-checked date.`;
  } else if (countedAll && codeOffers === 0) {
    description = `${total} live ${store.name} deals, each read from ${store.name}'s own pages with its last-checked date.`;
  } else {
    description = `${total} live ${store.name} coupons and deals, each read from ${store.name}'s own pages with its last-checked date.`;
  }

  const canonical = `/stores/${store.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;

  const destination = await loadStore(slug);
  if (!destination || !destination.store.is_active) notFound();
  const store = destination.store;

  // Every live offer, once. The two buckets split on `code IS NULL`, so they are disjoint and
  // exhaustive (a test on the API pins that); the id filter is a guard, not a repair.
  const seen = new Set<string>();
  const items = [...destination.deals, ...destination.coupons].filter((offer) => {
    if (seen.has(offer.id)) return false;
    seen.add(offer.id);
    return true;
  });

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
    { name: store.name, path: `/stores/${store.slug}` },
  ];
  const faqs = [
    ...destination.faqs,
    {
      question: `Are the ${store.name} codes on Durza verified?`,
      answer:
        totalReports > 0
          ? `${verifiedCount} of the current ${items.length} listed offers have shopper reports from the last 30 days, with an average reported success rate of ${Math.round(avgRate * 100)}%.`
          : `Not yet — no shopper has reported trying these codes yet. All ${items.length} offers were read from ${store.name}'s own pages${latestCheck ? ` and last checked on ${formatDate(latestCheck)}` : ""}. Shopper reports will update this answer as they arrive.`,
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
    name: store.name,
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
          store={store}
          tabs={{
            best: { label: totalReports > 0 ? "Best confirmed" : "Top offers", items: byBest },
            latest: { label: "Recently added", items: byLatest },
            expiring: { label: "Ending soon", items: byExpiring },
          }}
          stats={{ total: destination.offer_total ?? items.length, verified: verifiedCount, avgRate, totalReports, latestCheck }}
          relatedStores={related}
          currency={store.currency}
        />
        {store.pricing_summary && Object.keys(store.pricing_summary).length > 0 && (
          <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-6" aria-labelledby="pricing-heading">
            <h2 id="pricing-heading" className="font-serif text-2xl font-extrabold text-ink">{store.name} pricing</h2>
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
        {destination.related_content.length ? (
          <section className="mt-12" aria-label={`Buying content related to ${store.name}`}>
            <div className="mb-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Make a confident choice</p>
              <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Guides, reviews and comparisons for {store.name}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destination.related_content.slice(0, 6).map((content) => <EditorialCard key={content.id} content={content} />)}
            </div>
          </section>
        ) : null}
        <section className="mt-12 border-t border-ledger-line pt-8">
          <h2 className="mb-4 font-serif text-xl text-ink">
            {store.name} code FAQ
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