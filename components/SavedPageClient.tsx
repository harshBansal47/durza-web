"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { OfferBrand } from "@/components/OfferBrandMark";
import { lastCheckedLine, offerType, offerTypeLabel } from "@/lib/offer-presentation";
import { storeInitials } from "@/lib/catalog";
import { getFollowedStores, getSavedCouponIds } from "@/lib/personalization";
import OfferCard from "@/components/OfferCard";
import type { CouponPublic, Store } from "@/lib/types";

/**
 * "My Deals" (§23) for anonymous visitors: saved coupons + stores
 * from localStorage, resolved to live catalogue rows. Signed-in users get
 * the cross-device version at /account/saved — this page points them there.
 */
export function SavedPageClient() {
  const [coupons, setCoupons] = useState<CouponPublic[] | null>(null);
  const [stores, setStores] = useState<Store[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ids = getSavedCouponIds().slice(0, 50);
      const slugs = getFollowedStores().slice(0, 50);
      const [found, foundStores] = await Promise.all([
        Promise.all(ids.map((id) => api.getCouponById(id).catch(() => null))),
        Promise.all(slugs.map((slug) => api.getStoreBySlug(slug).catch(() => null))),
      ]);
      if (cancelled) return;
      setCoupons(found.filter((c): c is CouponPublic => c !== null));
      setStores(foundStores.filter((s): s is Store => s !== null && s.is_active));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (coupons === null || stores === null) {
    return (
      <div className="grid gap-4 sm:grid-cols-2" aria-label="Loading saved deals">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="shimmer h-48 rounded-[20px] border border-ledger-line" />
        ))}
      </div>
    );
  }

  if (coupons.length === 0 && stores.length === 0) {
    return (
      <section className="rounded-[24px] border-2 border-dashed border-ledger-line bg-white px-6 py-14 text-center">
        <p className="font-serif text-2xl font-extrabold text-ink">Nothing saved yet</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
          Save any deal or store and it will wait for you here —
          no account needed. Sign in later to sync saved deals across devices.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/coupons" className="btn btn-cta">
            Find deals to save
          </Link>
          <Link href="/stores" className="btn btn-outline">
            Browse stores
          </Link>
          <Link href="/account/login" className="text-sm font-semibold text-inkblue hover:underline">
            Sign in to sync →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-10">
      {coupons.length > 0 && (
        <section aria-labelledby="saved-deals">
          <h2 id="saved-deals" className="font-serif text-xl font-extrabold text-ink">
            Saved deals ({coupons.length})
          </h2>
          <div className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {coupons.map((c) => (
                <OfferCard
                  key={c.id}
                  bookmarkId={c.id}
                  code={c.code}
                  badge={null}
                  badgeTone={c.code ? "amber" : "emerald"}
                  title={c.title}
                  description={c.description}
                  ctaHref={api.goUrl(c.id, "coupons")}
                  ctaLabel={c.code ? "View code" : "View offer"}
                  expiresAt={c.expires_at}
                  brand={stores.find((st) => st.id === c.store_id) as OfferBrand | undefined}
                  typeLabelOverride={offerTypeLabel(offerType(c))}
                  lastChecked={lastCheckedLine(c)}
                  autoSuppressed={c.auto_suppressed}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      {stores.length > 0 && (
        <section aria-labelledby="saved-stores">
          <h2 id="saved-stores" className="font-serif text-xl font-extrabold text-ink">
            Saved stores ({stores.length})
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {stores.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/stores/${s.slug}`}
                  className="lift flex items-center gap-3 rounded-2xl border border-ledger-line bg-white p-3"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ledger-line bg-paper font-serif text-sm text-ink-soft"
                  >
                    {storeInitials(s.name)}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{s.name}</span>
                  <span className="shrink-0 text-sm text-ink-soft">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="rounded-2xl border border-inkblue/20 bg-inkblue/5 px-5 py-4 text-sm text-ink">
        Want these on every device?{" "}
        <Link href="/account/login" className="font-semibold text-inkblue hover:underline">
          Sign in to sync saved deals
        </Link>{" "}
        — your anonymous saves carry over.
      </p>
    </div>
  );
}
