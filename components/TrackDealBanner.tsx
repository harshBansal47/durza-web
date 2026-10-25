"use client";

import { Bell, Check, Mail } from "lucide-react";
import { useState } from "react";
import { useTypedToast } from "@/components/ui/Toast";

export interface TrackDealBannerProps {
  currentPrice?: number | null;
  targetPrice?: number | null;
  currency?: string;
  dealTitle?: string;
}

export default function TrackDealBanner({
  currentPrice,
  targetPrice,
  currency = "INR",
  dealTitle,
}: TrackDealBannerProps) {
  const [email, setEmail] = useState("");
  const [tracked, setTracked] = useState(false);
  const { success } = useTypedToast();

  function trackDeal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTracked(true);
    success("You're all set! We'll alert you the moment this drops in price. Smart shopping!");
  }

  const priceText =
    currentPrice !== null && currentPrice !== undefined
      ? new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(currentPrice)
      : null;
  const targetText =
    targetPrice !== null && targetPrice !== undefined
      ? new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(targetPrice)
      : null;

  return (
    <section className="rounded-xl border border-accent-soft bg-accent-faint p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Bell aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-ink">Don&apos;t check back. Let the price come to you.</h3>
            <p className="mt-1 text-sm text-ink-soft">
              {priceText
                ? `Current price: ${priceText}. Follow this deal and we'll email you if it drops${targetText ? ` below ${targetText}` : ""} or a better code appears.`
                : "Follow this deal and we'll email you if the price drops or a better code appears."}
            </p>
            {dealTitle && <p className="mt-1 text-xs text-ink-soft">{dealTitle}</p>}
          </div>
        </div>

        {tracked ? (
          <p className="inline-flex items-center gap-2 rounded-xl bg-paper-raised px-4 py-3 text-sm font-medium text-verified">
            <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
            You&apos;re all set! We&apos;ll alert you the moment this drops in price. Smart shopping!
          </p>
        ) : (
          <form onSubmit={trackDeal} className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
            <label className="sr-only" htmlFor="track-deal-email">
              Email address
            </label>
            <div className="relative flex-1 md:min-w-[16rem]">
              <Mail aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" strokeWidth={2} />
              <input
                id="track-deal-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-ledger-line bg-paper-raised py-2.5 pl-10 pr-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
              />
            </div>
            <button
              type="submit"
              className="btn btn-cta min-h-11 shrink-0"
            >
              Track Deal
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
