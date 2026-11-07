import { cache } from "react";
import type { Metadata } from "next";
import { resilient } from "@/lib/api";
import PageTitle from "@/components/ui/PageTitle";
import EmptyState from "@/components/EmptyState";
import StoreCard from "@/components/stores/StoreCard";
import { absoluteUrl, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const revalidate = 300;

const PAGE_SIZE = 24;
const loadStores = cache(() => resilient.listStores({ limit: PAGE_SIZE }));

export async function generateMetadata(): Promise<Metadata> {
  const stores = await loadStores();
  const total = stores.total;
  const examples = stores.items.slice(0, 3).map((store) => store.name).join(", ");
  const description =
    total > 0
      ? `Browse ${total} stores on Durza${examples ? `, including ${examples}` : ""} — every coupon and deal shows the store page it came from and when it was last checked.`
      : "Browse stores on Durza with coupon codes, deals and offers, each sourced from the store's own page.";
  const title = "Stores with Coupons & Deals";
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
  const { items, total } = (q || page > 1)
    ? await resilient.listStores({ search: q, limit: PAGE_SIZE, skip })
    : await loadStores();

  const groups = new Map<string, typeof items>();
  for (const store of items) {
    const letter = store.name[0]?.toUpperCase() ?? "#";
    const key = /[A-Z]/.test(letter) ? letter : "#";
    groups.set(key, [...(groups.get(key) ?? []), store]);
  }
  const letters = [...groups.keys()].sort();

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

      {letters.length > 0 && (
        <nav className="mb-10 flex flex-wrap gap-2" aria-label="Jump to letter">
          {letters.map((l) => (
            <a
              key={l}
              href={`#letter-${l}`}
              className="rounded-full border border-ledger-line px-3 py-1 font-mono text-xs font-medium text-ink-soft transition-colors hover:border-inkblue hover:text-inkblue"
            >
              {l}
            </a>
          ))}
        </nav>
      )}

      {items.length === 0 ? (
        <EmptyState title="No stores found." body="Try a different filter." cta={{ href: "/stores", label: "All stores" }} />
      ) : (
        <div className="space-y-10">
          {letters.map((l) => (
            <section key={l} id={`letter-${l}`} className="scroll-mt-24">
              <h2 className="mb-4 flex items-baseline gap-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                  {l === "#" ? "Others" : l}
                </span>
                <span className="text-[11px] text-ink-soft">
                  {groups.get(l)!.length} {groups.get(l)!.length === 1 ? "store" : "stores"}
                </span>
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {groups.get(l)!.map((s) => (
                  <li key={s.id}>
                    <StoreCard store={s} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {Math.ceil(total / PAGE_SIZE) > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
          {page > 1 && (
            <a
              href={`/stores?${new URLSearchParams({ ...(q ? { q } : {}), page: String(page - 1) }).toString()}`}
              className="rounded-full border border-ledger-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-inkblue hover:text-inkblue"
            >
              Previous
            </a>
          )}
          <span className="px-3 text-sm text-ink-soft">
            Page {page} of {Math.ceil(total / PAGE_SIZE)}
          </span>
          {page < Math.ceil(total / PAGE_SIZE) && (
            <a
              href={`/stores?${new URLSearchParams({ ...(q ? { q } : {}), page: String(page + 1) }).toString()}`}
              className="rounded-full border border-ledger-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-inkblue hover:text-inkblue"
            >
              Next
            </a>
          )}
        </nav>
      )}
    </div>
  );
}
