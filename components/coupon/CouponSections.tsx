import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import SponsoredCard from "@/components/SponsoredCard";
import Skeleton from "@/components/ui/Skeleton";
import { resilient } from "@/lib/api";
import { getSponsored } from "@/lib/ads";
import { storeInitials } from "@/lib/catalog";
import { maskCode } from "@/lib/codes";
import { formatDiscount, formatRelativeTime, stripStorePrefix } from "@/lib/format";
import { storeLogoUrl } from "@/lib/storeLogos";
import type { Store } from "@/lib/types";

/**
 * The parts of a coupon page that add to it but are not it.
 *
 * The page itself waits for two things: the offer, and its store. Everything
 * here is an independent async component behind its own `<Suspense>`, so each
 * loads on its own clock: a slow verification history cannot hold up the
 * related offers, and none of them can hold up the code and the button the
 * visitor came for. Each one also fails on its own (the `resilient` wrappers
 * return an empty fallback, and `apiFetch` gives up after a few seconds), and
 * "empty" simply renders nothing.
 */

/** A section-shaped placeholder: a heading bar and a few rows. */
export function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <section className="mb-8" aria-hidden="true">
      <Skeleton className="mb-4 h-7 w-56" />
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </section>
  );
}

export async function SidebarAd() {
  const ad = await getSponsored("sidebar");
  if (!ad) return null;
  return (
    <section className="mb-8" aria-label="Sponsored">
      <SponsoredCard ad={ad} src="ad-sidebar" aspect="aspect-[4/1] sm:aspect-[5/1]" />
    </section>
  );
}

export async function VerificationHistorySection({ couponId }: { couponId: string }) {
  const history = await resilient.getCouponVerificationHistory(couponId).catch(() => []);
  if (history.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="mb-4 font-serif text-2xl font-extrabold text-ink">Verification History</h2>
      <dl className="divide-y divide-ledger-line">
        {history.map((v, i) => (
          <div key={i} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                  v.worked ? "bg-verified/10 text-verified" : "bg-rust/10 text-rust"
                }`}
              >
                {v.worked ? (
                  <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                ) : (
                  <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                )}
              </span>
              <div>
                <p className="text-sm text-ink">{v.worked ? "Worked" : "Didn't work"}</p>
                <p className="font-mono text-xs text-ink-soft">{formatRelativeTime(v.created_at)}</p>
              </div>
            </div>
            {v.note && <p className="text-sm text-ink-soft sm:w-1/2">{v.note}</p>}
          </div>
        ))}
      </dl>
    </section>
  );
}

export async function RelatedOffers({
  couponId,
  storeId,
  store,
}: {
  couponId: string;
  storeId: string;
  store: Store | null;
}) {
  const related = await resilient
    .listCoupons({ store_id: storeId, limit: 10 })
    .then((page) => page.items.filter((c) => c.id !== couponId).slice(0, 4))
    .catch(() => []);
  if (related.length === 0) return null;

  const storeLogo = storeLogoUrl(store);
  return (
    <section className="mb-8">
      <h2 className="mb-4 font-serif text-2xl font-extrabold text-ink">
        More {store ? `${store.name} savings` : "ways to save"}
      </h2>
      <div className="space-y-3">
        {related.map((c) => (
          <Link key={c.id} href={`/coupons/${c.slug}`} className="block">
            <div className="lift flex items-start gap-3 rounded-2xl border border-ledger-line bg-white p-3">
              {storeLogo ? (
                <Image
                  src={storeLogo}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full border border-ledger-line bg-paper object-contain"
                />
              ) : store ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ledger-line bg-paper-raised font-serif text-sm text-ink-soft">
                  {storeInitials(store.name)}
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
                {/* The logo and the section heading already say which store this is. */}
                <p className="line-clamp-2 font-medium leading-snug text-ink">
                  {stripStorePrefix(c.title, store?.name)}
                </p>
                {c.code && (
                  <span className="mt-1.5 inline-block rounded-lg border border-dashed border-inkblue/40 bg-inkblue/5 px-2 py-0.5 font-mono text-xs font-semibold text-inkblue">
                    {maskCode(c.code) ?? c.code}
                  </span>
                )}
              </div>
              <span className="shrink-0 rounded-full bg-accent-faint px-2.5 py-1 font-mono text-xs font-semibold text-accent">
                {formatDiscount(c, store?.currency ?? "INR")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** "More {category} deals": only a name and a slug are needed, so it waits on its own. */
export async function CategoryLink({ categoryId }: { categoryId: string | null }) {
  if (!categoryId) return null;
  const page = await resilient.listCategories({ limit: 200 }).catch(() => null);
  const category = page?.items.find((c) => c.id === categoryId);
  if (!category) return null;
  return (
    <Link href={`/categories/${category.slug}`} className="btn btn-outline">
      More {category.name} deals
    </Link>
  );
}
