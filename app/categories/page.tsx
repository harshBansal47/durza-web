import type { Metadata } from "next";
import Link from "next/link";
import { resilient } from "@/lib/api";
import { categoryLabel } from "@/lib/catalog";
import PageTitle from "@/components/ui/PageTitle";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { items, total } = await resilient.listCategories({ limit: 100 });
  const names = items.slice(0, 4).map((category) => categoryLabel(category));
  const examples = names.length > 0 ? ` — ${names.join(", ")}${total > names.length ? " and more" : ""}` : "";
  const description = `Browse coupons and deals by category on Durza${examples}. Every offer shows the store page it came from and when it was last checked.`;
  const title = "Coupon Categories";
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
  const { items } = await resilient.listCategories({ limit: 100 });
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <PageTitle className="mb-8">Categories</PageTitle>
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
