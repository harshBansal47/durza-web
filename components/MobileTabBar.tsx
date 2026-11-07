"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TicketPercent, Store, Percent } from "lucide-react";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/coupons", label: "Coupons", icon: TicketPercent },
  { href: "/deals", label: "Deals", icon: Percent },
  { href: "/stores", label: "Stores", icon: Store },
];

/**
 * Thumb-zone tab bar for phones (§27). Hidden on desktop and on coupon
 * detail pages, where the StickyDealBar owns the bottom edge.
 */
export function MobileTabBar() {
  const pathname = usePathname();

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
                  className={`relative flex flex-col items-center gap-1 py-2 text-[11px] font-medium ${
                    active ? "text-accent" : "text-ink-soft"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      active ? "bg-accent/10 text-accent" : "text-ink-soft"
                    }`}
                  >
                    <tab.icon aria-hidden="true" className="h-5 w-5" strokeWidth={active ? 2 : 1.75} />
                  </span>
                  {tab.label}
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
