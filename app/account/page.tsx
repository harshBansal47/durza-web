import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AccountShell from "@/components/account/AccountShell";
import { requireAccount } from "@/app/account/actions";
import { resilient } from "@/lib/api";
import { formatMoney, formatRelativeTime } from "@/lib/format";
import { absoluteUrl } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { storeLogoUrl } from "@/lib/storeLogos";

export const metadata: Metadata = {
  title: "Your account",
  description: "Saved deals, tracked prices and alert history.",
  alternates: { canonical: absoluteUrl("/account") },
  robots: { index: false, follow: false },
};

export default async function AccountOverviewPage() {
  const { user, stores, coupons, tracked, prefs, alerts } = await requireAccount();

  const storeIds = new Set(stores.filter((s) => s.kind === "store").map((s) => s.item_id));
  const couponIds = new Set(coupons.filter((c) => c.kind === "coupon").map((c) => c.item_id));

  // The /me endpoints return bare ids, so the rows themselves are fetched here.
  // Everything runs in parallel (one network round-trip, not three in a row),
  // and only what the page actually renders is fetched: every followed store,
  // but just the first few tracked products (it shows 4; the extra two cover
  // any that were deleted from the catalogue). Saved coupons are only counted
  // on this page, never displayed, so they are not looked up at all.
  const [savedStores, trackedWithPrices] = await Promise.all([
    Promise.all([...storeIds].map((id) => resilient.getStoreById(id))),
    Promise.all(
      tracked.slice(0, 6).map(async (row) => ({
        row,
        product: await resilient.getProductById(row.product_id),
      })),
    ),
  ]);

  // A saved row whose catalogue entry has since been deleted is dropped rather
  // than rendered as a broken link.
  const resolvedStores = savedStores.filter((s) => s !== null);
  const liveProducts = trackedWithPrices.filter((t) => t.product !== null);

  // Count distinct alerts, not delivery attempts. A user with email and push on
  // got one price drop, not two — showing "2 alerts sent" for a single drop is
  // the kind of small inaccuracy that makes a statistics panel untrustworthy.
  const alertKeys = new Set(alerts.map((a) => a.price_point_id ?? a.batch_id ?? a.id));

  // These counts come from the authenticated account endpoints, not catalogue
  // lookups that may fail or no longer have a matching public row.
  const storeCount = storeIds.size;
  const couponCount = couponIds.size;
  const trackedCount = tracked.length;

  const stats = [
    { label: "Stores followed", value: storeCount, href: "/account/saved" },
    { label: "Codes saved", value: couponCount, href: "/account/saved" },
    { label: "Products tracked", value: trackedCount, href: "/account/products" },
    { label: "Alerts", value: alertKeys.size, href: "/account/alerts" },
  ];

  return (
    <AccountShell
      user={user}
      active="/account"
      counts={{
        "/account/saved": storeCount + couponCount,
        "/account/products": trackedCount,
        "/account/alerts": alertKeys.size,
      }}
    >
      <h2 className="font-serif text-xl text-ink">Overview</h2>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-inkblue/20 bg-inkblue/5 px-3 py-1.5 text-sm font-medium text-inkblue">
        Smart shopper badge: savings estimate coming soon
      </div>

      {!prefs.email_enabled && !prefs.push_enabled && (
        <p className="mt-4 border border-rust bg-rust-soft px-4 py-3 text-sm text-rust">
          All alerts are off, so nothing will reach you when a tracked price drops.{" "}
          <Link href="/account/notifications" className="underline underline-offset-2">
            Turn them on
          </Link>
          .
        </p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border border-ledger-line bg-paper-raised p-4 transition-colors hover:border-inkblue"
          >
            <dt className="text-xs uppercase tracking-wider text-ink-soft">{stat.label}</dt>
            <dd className="mt-1 font-serif text-2xl text-ink">{stat.value}</dd>
          </Link>
        ))}
      </dl>

      <section className="mt-10">
        <h3 className="font-serif text-lg text-ink">Recent alerts</h3>
        {alerts.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft">
            Nothing yet. Follow a product and we will email you when its price drops.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-ledger-line border-y border-ledger-line">
            {alerts.slice(0, 5).map((alert) => (
              <li key={alert.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
                <span className="text-ink">{alert.detail ?? "An alert was raised."}</span>
                <span className="font-mono text-xs text-ink-soft">
                  {formatRelativeTime(alert.created_at)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {liveProducts.length > 0 && (
        <section className="mt-10">
          <h3 className="font-serif text-lg text-ink">Tracked products</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {liveProducts.slice(0, 4).map(({ row, product }) => (
              <li key={row.id} className="border border-ledger-line bg-paper-raised p-3">
                <p className="text-sm font-medium text-ink">{product!.name}</p>
                <p className="mt-1 font-mono text-xs text-ink-soft">
                  Now {product!.current_price !== null ? formatMoney(product!.current_price, product!.currency) : "unknown"}
                  {row.target_price !== null &&
                    ` · alert below ${formatMoney(row.target_price, product!.currency)}`}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <Link href="/account/products" className="inline-flex items-center gap-1 text-inkblue hover:underline">
              Manage tracked products
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </p>
        </section>
      )}

      {resolvedStores.length > 0 && (
        <section className="mt-10">
          <h3 className="font-serif text-lg text-ink">Stores you follow</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {resolvedStores.map((store) => {
              const logo = storeLogoUrl(store);
              return (
                <li key={store.id}>
                  <Link
                    href={`/stores/${store.slug}`}
                    className="flex items-center gap-2 border border-ledger-line bg-paper-raised px-3 py-1.5 text-sm text-ink transition-colors hover:border-inkblue"
                  >
                    {logo && (
                      <Image
                        src={logo}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 rounded-full border border-ledger-line bg-paper object-contain"
                      />
                    )}
                    {store.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </AccountShell>
  );
}