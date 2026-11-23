import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import { resilient } from "@/lib/api";
import { categoryLabel } from "@/lib/catalog";
import ListingHero from "@/components/listing/ListingHero";
import CategoriesHub, { type CategoryCardData } from "@/components/categories/CategoriesHub";
import { categorySubtitle } from "@/lib/category-subtitle";
import type { CouponPublic, Store } from "@/lib/types";

export const revalidate = 3600;

async function fetchCouponsForCounts(maxPages = 5): Promise<CouponPublic[]> {
  const items: CouponPublic[] = [];
  for (let page = 0; page < maxPages; page++) {
    const result = await resilient.listCoupons({ active_only: true, skip: page * 100, limit: 100 }).catch(() => null);
    if (!result) break;
    items.push(...result.items);
    if (result.items.length < 100) break;
  }
  return items;
}

export async function generateMetadata(): Promise<Metadata> {
  const { items, total } = await resilient.listCategories({ limit: 100, live_only: true });
  const names = items.slice(0, 4).map((category) => categoryLabel(category));
  const examples = names.length > 0 ? ` — ${names.join(", ")}${total > names.length ? " and more" : ""}` : "";
  const title = `Coupons by Category — Electronics, Fashion & More`;
  const description = `Browse coupons and deals by shopping category${examples}. Offers show their type, and a source or check date when we have one.`;
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
  const [{ items: categories }, storesPage, coupons] = await Promise.all([
    resilient.listCategories({ limit: 100, live_only: true }),
    resilient.listStores({ limit: 100 }).catch(() => ({ items: [] as Store[], total: 0, skip: 0, limit: 0 })),
    fetchCouponsForCounts(10),
  ]);

  const storeById = new Map(storesPage.items.map((s) => [s.id, s]));
  const countsByCategory = new Map<string, { offerCount: number; storeCounts: Map<string, number> }>();
  for (const coupon of coupons) {
    const catId = coupon.category_id;
    if (!catId) continue;
    let entry = countsByCategory.get(catId);
    if (!entry) {
      entry = { offerCount: 0, storeCounts: new Map() };
      countsByCategory.set(catId, entry);
    }
    entry.offerCount += 1;
    if (coupon.store_id) {
      entry.storeCounts.set(coupon.store_id, (entry.storeCounts.get(coupon.store_id) || 0) + 1);
    }
  }

  const cards: CategoryCardData[] = categories.map((cat) => {
    const stats = countsByCategory.get(cat.id);
    const offerCount = stats?.offerCount ?? 0;
    const storeIds = stats ? Array.from(stats.storeCounts.entries()).sort((a, b) => b[1] - a[1]).map(([id]) => id) : [];
    const topStoreNames = storeIds
      .map((id) => storeById.get(id)?.name)
      .filter((name): name is string => Boolean(name))
      .slice(0, 4);
    const storeCount = storeIds.length;
    return {
      id: cat.id,
      name: categoryLabel(cat),
      slug: cat.slug,
      href: `/categories/${cat.slug}`,
      iconCategory: cat,
      storeCount,
      offerCount,
      topStoreNames,
      subtitle: categorySubtitle(cat),
    };
  });

  cards.sort((a, b) => {
    const aOther = a.slug === "other" ? 1 : 0;
    const bOther = b.slug === "other" ? 1 : 0;
    if (aOther !== bOther) return aOther - bOther;
    if (b.offerCount !== a.offerCount) return b.offerCount - a.offerCount;
    if (b.storeCount !== a.storeCount) return b.storeCount - a.storeCount;
    return a.name.localeCompare(b.name);
  });

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
        numberOfItems: categories.length,
        itemListElement: categories.slice(0, 24).map((cat, i) => ({
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
          eyebrow={`${categories.length} categor${categories.length === 1 ? "y" : "ies"} with live offers`}
          title="Categories"
          lead="Browse coupon codes and deals by shopping category — offer types and check dates shown when available."
          chips={cards.slice(0, 8).map((c) => ({ href: c.href, label: c.name }))}
          stats={cards.length > 0 ? [{ value: cards.length.toLocaleString("en-IN"), label: "Categories" }] : undefined}
        />
        <CategoriesHub items={cards} />
      </div>
    </>
  );
}
