import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resilient } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
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

  const description =
    store.description ??
    `Every community-confirmed code and price drop for ${store.name}, with the commission we earn disclosed on the page.`;

  return {
    title: `${store.name} deals, coupons and savings`,
    description,
    alternates: { canonical: `/stores/${store.slug}` },
    openGraph: { title: `${store.name} deals and savings on BachatBase`, description, type: "website" },
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
    const age = Date.now() - new Date(c.last_verified_at).getTime();
    return age >= 0 && age <= 30 * 24 * 60 * 60 * 1000;
  }).length;
  const avgRate = items.reduce((sum, c) => sum + (c.success_rate ?? 0), 0) / (items.length || 1);

  const related = destination?.alternatives.length
    ? destination.alternatives
    : (allStores?.items ?? []).filter((s) => s.id !== store.id && s.is_active).slice(0, 8);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: store.name, path: `/stores/${store.slug}` },
  ]);
  const faqs = [
    ...(destination?.faqs ?? []),
    {
      question: `Are the ${store.name} codes on BachatBase verified?`,
      answer: `Yes. ${verifiedCount} of the current ${items.length} listed offers have been verified within the last 30 days by the community, with an average success rate of ${Math.round(avgRate * 100)}%.`,
    },
    {
      question: "How does BachatBase make money?",
      answer:
        "When you use a link on this page, we may earn a commission from the store. Commissions may be one factor among several signals used when ordering offers. Verification, reliability, user success rates and relevance remain important ranking factors.",
    },
    {
      question: "What if a code does not work?",
      answer:
        "Codes are retired after repeated reports of failure. You can also vote “didn’t work” on any offer, and the community rating updates immediately.",
    },
  ];
  const faqJsonLd = faqPageJsonLd(faqs);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: store.name,
    url: `${SITE_URL}/stores/${store.slug}`,
    ...(store.website_url ? { sameAs: store.website_url } : {}),
    ...(store.logo_url ? { logo: store.logo_url } : {}),
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
            best: { label: "Best confirmed", items: byBest },
            latest: { label: "Recently added", items: byLatest },
            expiring: { label: "Ending soon", items: byExpiring },
          }}
          stats={{ total: coupons?.total ?? items.length, verified: verifiedCount, avgRate }}
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