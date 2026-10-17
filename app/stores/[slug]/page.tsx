import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resilient } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, metaDescription } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { storeLogoUrl } from "@/lib/storeLogos";
import StorePageClient from "@/components/store/StorePageClient";
import { EditorialCard } from "@/components/editorial/EditorialComponents";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const store = await resilient.getStoreBySlug(slug).catch(() => null);
  if (!store) return { title: "Store not found" };

  // The numbers below come from the same live list the page renders, so the
  // snippet never claims an offer the page cannot show. The code/deal split is
  // only stated when one request covered the whole list; otherwise the exact
  // total stands alone rather than a guessed breakdown.
  const offers = await resilient.listCoupons({ store_id: store.id, active_only: true, limit: 100 });
  const total = offers.total;
  const codeOffers = offers.items.filter((coupon) => coupon.code !== null).length;
  const countedAll = offers.items.length >= total;

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

  const store = await resilient.getStoreBySlug(slug).catch(() => null);
  if (!store || !store.is_active) notFound();

  const [coupons, allStores, destination] = await Promise.all([
    resilient.listCoupons({ store_id: store.id, active_only: true, limit: 60 }).catch(() => null),
    resilient.listStores({ limit: 100 }).catch(() => null),
    resilient.getStoreDestination(slug),
  ]);

  const destinationItems = destination ? [...destination.deals, ...destination.coupons] : null;
  const items = destinationItems ?? coupons?.items ?? [];

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

  // Alternatives: stores that share this store's main category first, then the
  // rest of the tracked catalogue. Never the store itself, capped at six.
  const categoryCounts = new Map<string, number>();
  for (const c of items) {
    categoryCounts.set(c.category_id, (categoryCounts.get(c.category_id) ?? 0) + 1);
  }
  const mainCategoryId = categoryCounts.size
    ? [...categoryCounts.entries()].sort((a, b) => b[1] - a[1])[0][0]
    : null;
  const sameCategory = mainCategoryId
    ? await resilient
        .listCoupons({ category_id: mainCategoryId, active_only: true, limit: 100 })
        .catch(() => null)
    : null;
  const sameCategoryStoreIds = new Set(sameCategory?.items.map((c) => c.store_id) ?? []);
  const relatedPool = destination?.alternatives.length
    ? destination.alternatives
    : (allStores?.items ?? []);
  const related = relatedPool
    .filter((s) => s.id !== store.id && s.is_active !== false)
    .sort((a, b) => {
      const aShare = sameCategoryStoreIds.has(a.id) ? 0 : 1;
      const bShare = sameCategoryStoreIds.has(b.id) ? 0 : 1;
      return aShare - bShare || a.name.localeCompare(b.name);
    })
    .slice(0, 6);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: store.name, path: `/stores/${store.slug}` },
  ]);
  const faqs = [
    ...(destination?.faqs ?? []),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <StorePageClient
          store={store}
          tabs={{
            best: { label: totalReports > 0 ? "Best confirmed" : "Top offers", items: byBest },
            latest: { label: "Recently added", items: byLatest },
            expiring: { label: "Ending soon", items: byExpiring },
          }}
          stats={{ total: coupons?.total ?? items.length, verified: verifiedCount, avgRate, totalReports, latestCheck }}
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
        {destination?.related_content.length ? (
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