import type { Metadata } from "next";
import { resilient } from "@/lib/api";
import PageTitle from "@/components/ui/PageTitle";
import EmptyState from "@/components/EmptyState";
import StoreCard from "@/components/stores/StoreCard";
import { absoluteUrl, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const stores = await resilient.listStores({ limit: 3 });
  const total = stores.total;
  const examples = stores.items.map((store) => store.name).join(", ");
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
  const { q } = await searchParams;
  const { items } = await resilient.listStores({ search: q, limit: 100 });

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
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
    </div>
  );
}
