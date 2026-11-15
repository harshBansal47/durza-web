import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Landmark, ShieldCheck } from "lucide-react";
import type { BankOfferGroup } from "@/lib/bank-offers";
import { expiryLabel, formatDiscount, successRateLabel } from "@/lib/format";
import { storeLogoUrl } from "@/lib/storeLogos";

/**
 * Live bank-matched offers, read from Durza's own catalogue at request time.
 * Server component — no client JS, no fabricated data: when the catalogue is
 * unreachable the section says so plainly instead of inventing offers.
 */
export default function LiveBankOffers(
  {
    groups,
    requestedBankIds,
    heading,
    asOfLabel,
  }: {
    groups: BankOfferGroup[];
    requestedBankIds: string[];
    heading: string;
    asOfLabel?: string;
  },
) {
  const wanted = groups.filter((group) => requestedBankIds.includes(group.bank.id));

  return (
    <section aria-labelledby="live-bank-offers-heading" className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ledger-line pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-ink text-white">
            <Landmark aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <h2 id="live-bank-offers-heading" className="font-serif text-xl font-extrabold text-ink sm:text-2xl">
              {heading}
            </h2>
            <p className="mt-0.5 text-xs text-ink-soft">
              {asOfLabel ?? "Read live from Durza’s own coupon catalogue every few minutes — never from a hardcoded list."}
            </p>
          </div>
        </div>
        <ShieldCheck aria-hidden="true" className="h-6 w-6 text-ink-soft" strokeWidth={1.5} />
      </div>

      {wanted.length === 0 ? (
        <p className="mt-5 rounded-xl border border-ledger-line bg-paper-alt p-4 text-sm leading-6 text-ink-soft">
          No live offers for this bank in our catalogue right now — this panel refreshes automatically as offers come and go, so check back on sale days. Every offer we list is read from Durza’s own database; we never pad this section.
        </p>
      ) : (
        <div className="mt-5 space-y-6">
          {wanted.map((group) => (
            <div key={group.bank.id}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
                {group.bank.name} — {group.coupons.length} live offer{group.coupons.length === 1 ? "" : "s"}
              </h3>
              <ul className="mt-3 space-y-3">
                {group.coupons.map((coupon) => {
                  const store = group.stores.find((entry) => entry.id === coupon.store_id);
                  const logo = store ? storeLogoUrl(store) : null;
                  const rate = successRateLabel(coupon);
                  const expiry = expiryLabel(coupon.expires_at);
                  return (
                    <li key={coupon.id}>
                      <article className="flex flex-col gap-4 rounded-2xl border border-ledger-line bg-paper-raised p-4 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                          {logo ? (
                            <Image
                              src={logo}
                              alt=""
                              width={40}
                              height={40}
                              unoptimized
                              className="h-10 w-10 flex-none rounded-lg border border-ledger-line object-contain"
                            />
                          ) : (
                            <div aria-hidden="true" className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-paper-alt text-xs font-bold text-ink-soft">
                              {store?.name?.slice(0, 2).toUpperCase() ?? "ST"}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                              {store?.name ?? "Store"}
                            </p>
                            <Link
                              href={`/coupons/${coupon.slug}`}
                              className="mt-0.5 block font-medium leading-snug text-ink hover:text-inkblue"
                            >
                              {coupon.title}
                            </Link>
                            <p className="mt-1 text-xs text-ink-soft">
                              {rate ? `${rate} reported working` : "No shopper reports yet"}
                              {expiry ? ` · ${expiry}` : ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-none items-center gap-3 sm:flex-col sm:items-end">
                          <span className="rounded-full bg-verified-soft px-3 py-1 text-sm font-bold text-verified">
                            {formatDiscount(coupon, store?.currency ?? "INR")}
                          </span>
                          <Link
                            href={`/coupons/${coupon.slug}`}
                            className="inline-flex min-h-11 items-center gap-1 rounded-full bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-inkblue"
                          >
                            See offer
                            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                          </Link>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
