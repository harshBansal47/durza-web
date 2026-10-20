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
    <section className="rounded-xl border border-orange-100 bg-orange-50/50 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Bell aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Don&apos;t check back. Let the price come to you.</h3>
            <p className="mt-1 text-sm text-gray-600">
              {priceText
                ? `Current price: ${priceText}. Follow this deal and we'll email you if it drops${targetText ? ` below ${targetText}` : ""} or a better code appears.`
                : "Follow this deal and we'll email you if the price drops or a better code appears."}
            </p>
            {dealTitle && <p className="mt-1 text-xs text-gray-500">{dealTitle}</p>}
          </div>
        </div>

        {tracked ? (
          <p className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-green-700">
            <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
            You&apos;re all set! We&apos;ll alert you the moment this drops in price. Smart shopping!
          </p>
        ) : (
          <form onSubmit={trackDeal} className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
            <label className="sr-only" htmlFor="track-deal-email">
              Email address
            </label>
            <div className="relative flex-1 md:min-w-[16rem]">
              <Mail aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" strokeWidth={2} />
              <input
                id="track-deal-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-orange-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-700 active:scale-95"
            >
              Track Deal
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
