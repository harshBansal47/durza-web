import { cache } from "react";
import type { Metadata } from "next";
import { resilient } from "@/lib/api";
import ListingHero from "@/components/listing/ListingHero";
import EmptyState from "@/components/EmptyState";
import StoresDirectoryClient from "@/components/stores/StoresDirectoryClient";
import { absoluteUrl, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { allowedStoreIds } from "@/lib/homepage-curation";
import JsonLd from "@/components/JsonLd";

export const revalidate = 3600;

const loadStores = cache(async () => {
  // Fetch the full directory for instant search/A-Z. API may cap page size (often 100).
  const limit = 100;
  let skip = 0;
  let total = Number.POSITIVE_INFINITY;
  const items: Awaited<ReturnType<typeof resilient.listStores>>["items"] = [];
  while (items.length < total) {
    const res = await resilient.listStores({ skip, limit });
    // If the request failed, resilient returns an empty page.
    if (res.items.length === 0 && res.total === 0 && skip === 0) return res;
    if (res.items.length === 0) break;
    items.push(...res.items);
    total = typeof res.total === "number" && res.total > 0 ? res.total : items.length;
    skip += res.items.length;
    if (res.items.length < limit) break;
    if (skip > 1000) break; // safety bound
  }
  return { items, total: Number.isFinite(total) ? total : items.length, skip: 0, limit: items.length };
});

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
      ? `Promo codes and deals for ${total} Indian online stores${indiaRelevant ? `, including ${indiaRelevant}` : ""} — offer types and check dates shown when available.`
      : "Coupon codes and deals for Indian online stores — offer types and check dates shown when available.";
  const canonical = absoluteUrl("/stores");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function StoresIndexPage() {
  const HIDDEN_STORE_SLUGS = new Set(["swiggy", "zomato"]);
  const result = await loadStores();
  const items = result.items
    .filter((s) => !HIDDEN_STORE_SLUGS.has(s.slug))
    .map((s) => {
      if (s.slug === "fuelone") return { ...s, offer_count: 10 };
      if (s.slug === "salty-co-in-ecommerce-cps-india") return { ...s, slug: "salty" };
      return s;
    });
  const total = Math.max(0, result.total - result.items.filter((s) => HIDDEN_STORE_SLUGS.has(s.slug)).length);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
  ]);
  const itemList = itemListJsonLd(
    items.slice(0, 100).map((store) => ({ name: store.name, path: `/stores/${store.slug}` })),
  );

  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemList} />
      <ListingHero
        eyebrow={`${total.toLocaleString("en-IN")} ${total === 1 ? "store" : "stores"} tracked`}
        title="Stores"
        lead="Every store we track, with the offers we found on its own pages — not a directory of everything that exists."
        stats={total > 0 ? [{ value: total.toLocaleString("en-IN"), label: "Stores tracked" }] : undefined}
      />

      {items.length === 0 ? (
        <EmptyState title="No stores found." body="Try a different filter." cta={{ href: "/stores", label: "All stores" }} />
      ) : (
        <StoresDirectoryClient stores={items} />
      )}
    </div>
  );
}
