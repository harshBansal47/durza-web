"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSavedCouponIds } from "@/lib/personalization";

const TABS = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/search", label: "Search", icon: "⚲" },
  { href: "/saved", label: "Saved", icon: "▱", badge: true },
  { href: "/account", label: "Account", icon: "○" },
];

/**
 * Thumb-zone tab bar for phones (§27). Hidden on desktop and on coupon
 * detail pages, where the StickyDealBar owns the bottom edge.
 */
export function MobileTabBar() {
  const pathname = usePathname();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    function refresh() {
      setSavedCount(getSavedCouponIds().length);
    }
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [pathname]);

  if (pathname.startsWith("/coupons/")) return null;

  return (
    <>
      <nav
        aria-label="Primary"
        className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-ledger-line bg-white/95 backdrop-blur-md md:hidden"
      >
        <ul className="grid grid-cols-4">
          {TABS.map((tab) => {
            const active =
              tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${
                    active ? "text-accent" : "text-ink-soft"
                  }`}
                >
                  <span aria-hidden="true" className="text-lg leading-none">
                    {tab.icon}
                  </span>
                  {tab.label}
                  {tab.badge && savedCount > 0 && (
                    <span
                      aria-label={`${savedCount} saved deals`}
                      className="absolute right-1/2 top-1 flex h-4 min-w-4 translate-x-5 items-center justify-center rounded-full bg-accent px-1 font-mono text-[9px] font-medium text-white"
                    >
                      {savedCount > 99 ? "99+" : savedCount}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Spacer so the fixed bar never covers the footer. */}
      <div aria-hidden="true" className="h-16 md:hidden" />
    </>
  );
}
