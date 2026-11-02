import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AccountShell from "@/components/account/AccountShell";
import { requireAccount } from "@/app/account/actions";
import { resilient } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";
import { storeLogoUrl } from "@/lib/storeLogos";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your saved coupons and stores.",
  alternates: { canonical: absoluteUrl("/account") },
  robots: { index: false, follow: false },
};

export default async function AccountOverviewPage() {
  const { user, stores, coupons } = await requireAccount();

  const storeIds = new Set(stores.filter((s) => s.kind === "store").map((s) => s.item_id));
  const couponIds = new Set(coupons.filter((c) => c.kind === "coupon").map((c) => c.item_id));

  const savedStores = await Promise.all([...storeIds].map((id) => resilient.getStoreById(id)));

  const resolvedStores = savedStores.filter((s) => s !== null);

  const storeCount = storeIds.size;
  const couponCount = couponIds.size;

  const stats = [
    { label: "Stores saved", value: storeCount, href: "/account/saved" },
    { label: "Codes saved", value: couponCount, href: "/account/saved" },
  ];

  return (
    <AccountShell
      user={user}
      active="/account"
      counts={{ "/account/saved": storeCount + couponCount }}
    >
      <h2 className="font-serif text-xl text-ink">Overview</h2>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-inkblue/20 bg-inkblue/5 px-3 py-1.5 text-sm font-medium text-inkblue">
        Smart shopper badge: savings estimate coming soon
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3">
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

      {resolvedStores.length > 0 && (
        <section className="mt-10">
          <h3 className="font-serif text-lg text-ink">Saved stores</h3>
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
