"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDiscount, formatDate } from "@/lib/format";
import { storeInitials } from "@/lib/catalog";
import { storeLogoUrl } from "@/lib/storeLogos";
import type { CouponPublic } from "@/lib/types";

interface DealStackStore {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
}

interface DealStackProps {
  deals: CouponPublic[];
  stores?: DealStackStore[];
}

function StoreLogo({ store }: { store: DealStackStore | undefined }) {
  const logo = storeLogoUrl(store ?? null);
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return (
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink font-serif text-sm font-bold text-paper"
      >
        {storeInitials(store?.name ?? "")}
      </span>
    );
  }

  return (
    <Image
      src={logo}
      alt=""
      width={40}
      height={40}
      className="h-10 w-10 rounded-xl object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export default function DealStack({ deals, stores = [] }: DealStackProps) {
  if (!deals || deals.length === 0) return null;

  const storeById = new Map(stores.map((s) => [s.id, s]));
  const cards = deals.slice(0, 3);

  // The tilt lives on the inner element and the drift on the outer one: the
  // float animation owns `transform`, so a rotation on the same element would
  // be overwritten by the keyframes.
  const tilt = ["-rotate-3", "rotate-0", "rotate-3"];
  // Each card sits lower and further back, so the stack reads as three
  // layered tickets rather than one card covering two others.
  const top = ["lg:top-0", "lg:top-[184px]", "lg:top-[232px]"];
  const depth = ["lg:z-30", "lg:z-20", "lg:z-10"];

  return (
    <div className="relative">
      {/* Soft accent tint behind the stack */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-[48px] bg-accent/5 blur-2xl"
      />

      <ul className="relative flex flex-col items-center gap-4 lg:block lg:h-[440px]">
        {cards.map((coupon, index) => {
          const store = storeById.get(coupon.store_id);
          const hasSource =
            typeof coupon.restrictions?.source_url === "string" &&
            (coupon.restrictions?.source_url as string).length > 0;
          // Only the front card shows the full ticket; the cards behind show
          // their store and discount so the stack reads as a pile, not as a
          // half-clipped duplicate.
          const front = index === 0;

          return (
            <li
              key={coupon.id}
              className={[
                "w-full max-w-sm motion-safe:animate-float-soft",
                index > 1 ? "hidden sm:block" : "",
                "lg:absolute lg:left-1/2 lg:ml-[-8rem] lg:w-64",
                top[index] ?? "",
                depth[index] ?? "",
              ].join(" ")}
              style={{ animationDelay: `${index * 0.6}s` }}
            >
              <Link
                href={`/coupons/${coupon.slug}`}
                className={[
                  "group relative block rounded-2xl border border-ledger-line bg-paper-raised p-5 shadow-[var(--shadow-raised)] transition-transform duration-300 hover:rotate-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  tilt[index] ?? "",
                ].join(" ")}
              >
                {/* Notch cutouts */}
                <span
                  aria-hidden="true"
                  className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-paper"
                />
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-paper"
                />

                {front ? (
                  <>
                    <div className="flex items-center gap-3">
                      <StoreLogo store={store} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{coupon.title}</p>
                        <p className="text-xs text-ink-soft">Featured deal</p>
                      </div>
                      {hasSource && (
                        <span className="shrink-0 rounded-full bg-verified-soft px-2 py-0.5 text-[10px] font-medium text-verified-ink">
                          Source verified
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">
                      {formatDiscount(coupon)}
                    </p>

                    {/* Dashed perforation */}
                    <div
                      aria-hidden="true"
                      className="my-4 border-t border-dashed border-ledger-line"
                    />
                    <p className="text-xs text-ink-soft">
                      Checked {formatDate(coupon.last_checked_at)}
                    </p>
                  </>
                ) : (
                  // The cards behind the front one stay slim: a logo, the
                  // offer and its discount on one line. A full ticket behind
                  // a full ticket only produces clipped duplicates.
                  <div className="flex items-center gap-3">
                    <StoreLogo store={store} />
                    <p className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
                      {coupon.title}
                    </p>
                    <span className="shrink-0 text-sm font-extrabold text-durza-deep">
                      {formatDiscount(coupon)}
                    </span>
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
