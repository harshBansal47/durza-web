import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import { resilient } from "@/lib/api";
import { categoryLabel } from "@/lib/catalog";
import ListingHero from "@/components/listing/ListingHero";
import CategoryIcon from "@/components/CategoryIcon";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { items, total } = await resilient.listCategories({ limit: 100, live_only: true });
  const names = items.slice(0, 4).map((category) => categoryLabel(category));
  const examples = names.length > 0 ? ` — ${names.join(", ")}${total > names.length ? " and more" : ""}` : "";
  const title = `Coupons by Category — Electronics, Fashion & More`;
  const description = `Browse coupons and deals by shopping category${examples}. Every offer on Durza shows the store page it came from and when it was last checked.`;
  const canonical = absoluteUrl("/categories");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoriesIndexPage() {
  const { items } = await resilient.listCategories({ limit: 100, live_only: true });
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Categories", item: absoluteUrl("/categories") },
        ],
      },
      {
        "@type": "ItemList",
        name: "Coupon categories",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: items.length,
        itemListElement: items.slice(0, 24).map((cat, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: cat.name,
          url: absoluteUrl(`/categories/${cat.slug}`),
        })),
      },
    ],
  };
  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <ListingHero
          eyebrow={`${items.length} categor${items.length === 1 ? "y" : "ies"} with live offers`}
          title="Categories"
          lead="Browse coupons and deals by shopping category — each offer sourced from the store’s own page with a last-checked date."
          chips={items.slice(0, 8).map((c) => ({ href: `/categories/${c.slug}`, label: categoryLabel(c) }))}
          stats={items.length > 0 ? [{ value: items.length.toLocaleString("en-IN"), label: "Categories" }] : undefined}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-ledger-line bg-white px-4 py-6 text-center shadow-[var(--shadow-hairline)] transition-all hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-sm"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-ledger-line bg-paper text-ink shadow-[var(--shadow-hairline)] transition-all duration-200 group-hover:border-accent-soft"
              >
                <CategoryIcon category={c} className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-ink group-hover:text-accent">{categoryLabel(c)}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
