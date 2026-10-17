import type { Metadata } from "next";
import Link from "next/link";
import { resilient } from "@/lib/api";
import { categoryLabel } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse coupons and deals by category.",
  alternates: { canonical: absoluteUrl("/categories") },
};

export default async function CategoriesIndexPage() {
  const { items } = await resilient.listCategories({ limit: 100 });
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 font-serif text-4xl font-extrabold text-ink sm:text-5xl">Categories</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((c) => (
          <Link
            key={c.id}
            href={`/categories/${c.slug}`}
            className="border border-ledger-line bg-paper-raised px-4 py-6 text-ink transition-colors hover:border-inkblue hover:text-inkblue"
          >
            {categoryLabel(c)}
          </Link>
        ))}
      </div>
    </div>
  );
}
