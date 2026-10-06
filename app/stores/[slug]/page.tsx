import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resilient } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import StorePageClient from "@/components/store/StorePageClient";

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
    title: `${store.name} coupons, codes and price drops`,
    description,
    alternates: { canonical: `/stores/${store.slug}` },
    openGraph: { title: `${store.name} deals on BachatBase`, description, type: "website" },
  };
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;

  const store = await resilient.getStoreBySlug(slug).catch(() => null);
  if (!store || !store.is_active) notFound();

  const [coupons, allStores] = await Promise.all([
    resilient.listCoupons({ store_id: store.id, active_only: true, limit: 60 }).catch(() => null),
    resilient.listStores({ limit: 100 }).catch(() => null),
  ]);

  const items = coupons?.items ?? [];

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

  const verifiedCount = items.filter((c) => c.last_verified_at !== null).length;
  const avgRate = items.reduce((sum, c) => sum + (c.success_rate ?? 0), 0) / (items.length || 1);

  const related = (allStores?.items ?? [])
    .filter((s) => s.id !== store.id && s.is_active)
    .slice(0, 8);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: store.name, path: `/stores/${store.slug}` },
  ]);
  const faqs = [
    {
      question: `Are the ${store.name} codes on BachatBase verified?`,
      answer: `Yes. ${verifiedCount} of the current ${items.length} listed offers have been verified within the last 30 days by the community, with an average success rate of ${Math.round(avgRate * 100)}%.`,
    },
    {
      question: "How does BachatBase make money?",
      answer:
        "When you use a link on this page, we may earn a commission from the store. That commission never changes the order of the listings or the codes we show.",
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