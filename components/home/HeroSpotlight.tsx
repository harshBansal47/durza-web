"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, formatDiscount } from "@/lib/format";
import { storeInitials } from "@/lib/catalog";
import { storeLogoUrl } from "@/lib/storeLogos";
import type { CouponPublic } from "@/lib/types";

interface HeroSpotlightProps {
  coupon: CouponPublic;
  store?: { name: string; logo_url?: string | null } | null;
}

/**
 * One real, linked deal under the hero illustration. Every value comes from
 * the coupon itself (title, discount, last checked date) — nothing is invented.
 */
export default function HeroSpotlight({ coupon, store }: HeroSpotlightProps) {
  const logo = storeLogoUrl(store ?? null);
  const [failed, setFailed] = useState(false);
  const checked = coupon.last_checked_at ? formatDate(coupon.last_checked_at) : null;

  return (
    <Link
      href={`/coupons/${coupon.slug}`}
      className="group flex items-center gap-3 rounded-2xl border border-ledger-line bg-paper-raised p-3 shadow-[var(--shadow-raised)] transition-shadow hover:shadow-[var(--shadow-overlay)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {logo && !failed ? (
        <Image
          src={logo}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-xl object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink font-serif text-sm font-bold text-paper"
        >
          {storeInitials(store?.name ?? coupon.title)}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium text-ink-soft">
          Featured deal{checked ? `, checked ${checked}` : ""}
        </span>
        <span className="block truncate text-sm font-semibold text-ink">{coupon.title}</span>
      </span>

      <span className="shrink-0 text-right">
        <span className="block text-base font-extrabold leading-tight text-accent">
          {formatDiscount(coupon)}
        </span>
        <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-ink-soft transition-colors group-hover:text-ink">
          View offer
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
