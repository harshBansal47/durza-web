import type { Metadata } from "next";
import AccountShell from "@/components/account/AccountShell";
import { SavedCouponRow, StoreFollowRow } from "@/components/account/SaveButtons";
import { requireAccount, toggleSavedCoupon, toggleSavedStore } from "@/app/account/actions";
import { resilient } from "@/lib/api";
import PopularChips from "@/components/PopularChips";
import type { Store } from "@/lib/types";
import { expiryLabel, formatDiscount } from "@/lib/format";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Saved deals",
  description: "The stores you follow and the coupon codes you have saved.",
  alternates: { canonical: absoluteUrl("/account/saved") },
  robots: { index: false, follow: false },
};

export default async function SavedPage() {
  const { user, stores, coupons } = await requireAccount();

  const storeIds = stores.filter((s) => s.kind === "store").map((s) => s.item_id);
  const couponIds = coupons.filter((c) => c.kind === "coupon").map((c) => c.item_id);

  // Stores come from the cached directory (one request, shared with every other page that
  // lists stores) rather than one request per saved store, then per store behind a saved
  // coupon. The per-id lookup only runs for a store the directory does not include.
  const [directory, savedCoupons] = await Promise.all([
    resilient
      .listStores({ limit: 100 })
      .then((page) => new Map<string, Store>(page.items.map((s) => [s.id, s])))
      .catch(() => new Map<string, Store>()),
    Promise.all(couponIds.map((id) => resilient.getCouponById(id))),
  ]);
  const storeFor = async (id: string) => directory.get(id) ?? (await resilient.getStoreById(id));
  const savedStores = await Promise.all(storeIds.map(storeFor));

  const rows = savedStores.filter((s) => s !== null);
  const couponRows = savedCoupons.filter((c) => c !== null);

  // Store names for each saved coupon, fetched once rather than per coupon.
  const storeIdForCoupon = [...new Set(couponRows.map((c) => c.store_id))];
  const storeById = new Map(
    (await Promise.all(storeIdForCoupon.map(storeFor)))
      .filter((s) => s !== null)
      .map((s) => [s.id, s]),
  );

  const isEmpty = rows.length === 0 && couponRows.length === 0;

  return (
    <AccountShell
      user={user}
      active="/account/saved"
      counts={{ "/account/saved": rows.length + couponRows.length }}
    >
      <h2 className="font-serif text-xl text-ink">Saved</h2>

      {isEmpty ? (
        <div className="mt-6 border border-dashed border-ledger-line px-6 py-12 text-center">
          <p className="font-serif text-lg text-ink">Nothing saved yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            Follow a store and we&apos;ll email you when it adds an offer. Track an offer and we&apos;ll
            tell you if it&apos;s confirmed working, about to end, or stops working. At most one email a day.
          </p>
          <PopularChips stores={[...directory.values()]} categories={[]} />
        </div>
      ) : (
        <>
          {rows.length > 0 && (
            <section className="mt-6">
              <h3 className="text-sm uppercase tracking-wider text-ink-soft">
                Stores you follow
              </h3>
              <ul className="mt-3 space-y-2">
                {rows.map((store) => (
                  <StoreFollowRow
                    key={store.id}
                    store={store}
                    initiallySaved
                    action={toggleSavedStore}
                  />
                ))}
              </ul>
            </section>
          )}

          {couponRows.length > 0 && (
            <section className="mt-8">
              <h3 className="text-sm uppercase tracking-wider text-ink-soft">Saved codes</h3>
              <ul className="mt-3 space-y-2">
                {couponRows.map((coupon) => (
                  <SavedCouponRow
                    key={coupon.id}
                    coupon={coupon}
                    storeName={storeById.get(coupon.store_id)?.name}
                    discount={formatDiscount(coupon)}
                    expiry={coupon.expires_at ? expiryLabel(coupon.expires_at) : null}
                    initiallySaved
                    action={toggleSavedCoupon}
                  />
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </AccountShell>
  );
}