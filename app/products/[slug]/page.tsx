import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api, lookup, resilient } from "@/lib/api";
import { formatMoney, formatRelativeTime } from "@/lib/format";
import { absoluteUrl } from "@/lib/seo";
import PageTitle from "@/components/ui/PageTitle";
import { LogoMark } from "@/components/Logo";
import PriceHistory from "@/components/product/PriceHistory";
import JsonLd from "@/components/JsonLd";

export const revalidate = 300;

// Without this export a dynamic route is rendered on every request and `revalidate` is ignored
// for the page (it goes out `private, no-store`). Returning nothing keeps builds from needing
// the API; pages are rendered on first request, then cached and refreshed. See stores/[slug].
export function generateStaticParams() {
  return [];
}

// Shared by generateMetadata and the page. `cache()` does the sharing because apiFetch's
// AbortSignal stops Next memoizing the fetch itself. Only a real 404 is "not found"; an API
// failure throws rather than becoming a cacheable 404 (see `lookup`).
const loadProduct = cache((slug: string) => lookup.getProductBySlug(slug));
const loadStore = cache((storeId: string) => resilient.getStoreById(storeId));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug).catch(() => null);
  // Explicit: a cached page does not get the automatic noindex a streamed 404 does.
  if (!product) return { title: "Product not found", robots: { index: false, follow: false } };

  const store = await loadStore(product.store_id);
  const price =
    product.current_price !== null ? formatMoney(product.current_price, product.currency) : null;
  // The price is real data from the API, and it is only mentioned when it
  // exists — never estimated from the list price.
  const description = `Current price${price ? ` (${price})` : ""} and price history for ${product.name}${store ? ` at ${store.name}` : ""}.`;
  const ogTitle = `${product.name} — ${price ?? "price unknown"}`;
  const canonical = absoluteUrl(`/products/${product.slug}`);

  return {
    title: `${product.name} price history`,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      images: product.image_url ? [product.image_url] : undefined,
    },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  const [store, history] = await Promise.all([
    loadStore(product.store_id),
    resilient.getPriceHistory(product.id),
  ]);

  // A product with a URL is the only case where we can link out; without one the
  // page is still useful (price history) so it renders without a CTA.
  const dropPct =
    product.last_price_drop_at !== null && product.last_price_drop_pct !== null
      ? product.last_price_drop_pct
      : null;

  // An Offer without a price is invalid structured data (Google reports it as an error on the
  // whole Product), so the offer is only described when there is a real price to state.
  const offerPrice = product.effective_price ?? product.current_price;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(product.image_url ? { image: product.image_url } : {}),
    ...(offerPrice !== null && offerPrice !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: offerPrice,
            priceCurrency: product.currency,
            availability: product.in_stock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: absoluteUrl(`/products/${product.slug}`),
          },
        }
      : {}),
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd data={jsonLd} />

      <nav className="text-sm text-ink-soft">
        <Link href="/search" className="hover:text-ink hover:underline">
          Search
        </Link>
        {store && (
          <>
            {" / "}
            <Link href={`/stores/${store.slug}`} className="hover:text-ink hover:underline">
              {store.name}
            </Link>
          </>
        )}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              width={600}
              height={600}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="w-full border border-ledger-line bg-paper object-contain"
            />
          ) : (
            <div className="flex aspect-square flex-col items-center justify-center gap-3 border border-dashed border-ledger-line bg-paper-alt text-ink-soft">
              <LogoMark size={64} tone="light" className="opacity-30" />
              <p className="text-sm">No product image available</p>
            </div>
          )}
        </div>

        <div>
          <PageTitle className="leading-tight">{product.name}</PageTitle>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-3xl text-ink">
              {product.current_price !== null
                ? formatMoney(product.current_price, product.currency)
                : "Price unknown"}
            </span>
            {product.list_price !== null && product.list_price > (product.current_price ?? 0) && (
              <span className="font-mono text-lg text-ink-soft line-through">
                {formatMoney(product.list_price, product.currency)}
              </span>
            )}
            {dropPct !== null && (
              <span className="rounded-sm border border-rust/30 bg-rust-soft px-2 py-0.5 font-mono text-xs text-rust">
                {dropPct.toFixed(0)}% lower
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-ink-soft">
            {product.in_stock
              ? "In stock at last capture"
              : "Out of stock at last capture"}
            {product.last_captured_at && ` · captured ${formatRelativeTime(product.last_captured_at)}`}
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-ledger-line py-4 text-sm">
            {(
              [
                ["7-day low", product.lowest_price_7d],
                ["30-day low", product.lowest_price_30d],
                ["90-day low", product.lowest_price_90d],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wider text-ink-soft">{label}</dt>
                <dd className="mt-1 font-mono text-ink">
                  {value !== null ? formatMoney(value, product.currency) : "—"}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {product.has_url && (
              <a
                href={api.productGoUrl(product.id, "product-page")}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="btn btn-cta"
              >
                View at {store?.name ?? "the store"}
              </a>
            )}
          </div>

          {store && (
            <p className="mt-6 border border-ledger-line bg-paper-raised p-4 text-sm text-ink-soft">
              We may earn a commission if you buy through this link. It does not change the
              price, and commissions may be one factor among several signals used when
              ordering offers.{" "}
              <Link href={`/stores/${store.slug}`} className="text-inkblue hover:underline">
                Everything about {store.name}
              </Link>
              .
            </p>
          )}
        </div>
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-xl text-ink">Price history</h2>
        <PriceHistory points={history} currency={product.currency} currentPrice={product.current_price} />
      </section>
    </div>
  );
}