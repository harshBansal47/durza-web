import { cache } from "react";
import type { Metadata } from "next";
import { resilient } from "@/lib/api";
import PageTitle from "@/components/ui/PageTitle";
import EmptyState from "@/components/EmptyState";
import StoresBrowser from "@/components/stores/StoresBrowser";
import { absoluteUrl, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { allowedStoreIds } from "@/lib/homepage-curation";
import JsonLd from "@/components/JsonLd";

export const revalidate = 3600;

const PAGE_SIZE = 24;
const loadStores = cache(() => resilient.listStores({ limit: PAGE_SIZE }));

export async function generateMetadata(): Promise<Metadata> {
  const stores = await loadStores();
  const total = stores.total;
  const title = "Coupons & Offers by Store — Acer, Amazon, Flipkart";
  const indiaRelevant = allowedStoreIds(stores.items)
    .map((id) => stores.items.find((s) => s.id === id))
    .filter(Boolean)
    .slice(0, 3)
    .map((s) => s!.name)
    .join(", ");
  const description =
    total > 0
      ? `Promo codes and deals for ${total} Indian online stores${indiaRelevant ? `, including ${indiaRelevant}` : ""} — every offer sourced from the store's own page with a last-checked date.`
      : "Coupon codes and deals for Indian online stores — every offer sourced from the store's own page with a last-checked date.";
  const canonical = absoluteUrl("/stores");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function StoresIndexPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { q, page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const skip = (page - 1) * PAGE_SIZE;
  const HIDDEN_STORE_SLUGS = new Set(["salty-co-in-ecommerce-cps-india", "swiggy", "zomato"]);
  const result = (q || page > 1)
    ? await resilient.listStores({ search: q, limit: PAGE_SIZE, skip })
    : await loadStores();
  const items = result.items
    .filter((s) => !HIDDEN_STORE_SLUGS.has(s.slug))
    .map((s) => (s.slug === "fuelone" ? { ...s, offer_count: 10 } : s));
  const total = Math.max(0, result.total - result.items.filter((s) => HIDDEN_STORE_SLUGS.has(s.slug)).length);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
  ]);
  const itemList = itemListJsonLd(
    items.map((store) => ({ name: store.name, path: `/stores/${store.slug}` })),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemList} />
      <PageTitle className="mb-4">Stores</PageTitle>
      <p className="mb-8 max-w-xl text-sm leading-relaxed text-ink-soft">
        Every store we track, with the offers we found on its own pages — not a directory of
        everything that exists.
      </p>
      <form action="/stores" className="mb-10 max-w-md">
        <label htmlFor="store-filter" className="sr-only">Filter stores</label>
        <input
          id="store-filter"
          name="q"
          type="search"
          defaultValue={q ?? ""}
          placeholder="Filter stores…"
          className="w-full border border-ledger-line bg-paper-raised px-4 py-3 font-mono text-sm text-ink focus:border-inkblue"
        />
      </form>

      {items.length === 0 ? (
        <EmptyState title="No stores found." body="Try a different filter." cta={{ href: "/stores", label: "All stores" }} />
      ) : (
        <StoresBrowser initialStores={items} total={total} q={q ?? ""} />
      )}
    </div>
  );
}
