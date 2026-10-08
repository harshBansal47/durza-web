
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import { HeaderSearch, MobileSearch } from "./HeaderSearch";

export interface NavLink {
  href: string;
  label: string;
}

export default function Header({
  links,
  moreLinks = [],
  user,
}: {
  links: NavLink[];
  moreLinks?: NavLink[];
  user?: { name: string } | null;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      const height =
        headerRef.current?.getBoundingClientRect().height ?? 0;

      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
      );
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(updateHeaderHeight);

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "sticky top-0 z-40",
          "border-b border-ledger-line/80",
          "bg-[rgba(255,255,255,0.78)] backdrop-blur-2xl",
          "transition-all duration-200",
          scrolled ? "shadow-[0_12px_28px_rgba(33,38,92,0.08)]" : "shadow-[0_1px_0_rgba(28,25,23,0.06)]",
        ].join(" ")}
      >
        <div className="mx-auto flex min-h-[68px] max-w-7xl items-center gap-5 px-4 sm:min-h-[76px] sm:px-6 lg:gap-8 lg:px-8">
          {/* Brand */}
          <Link
            href="/"
            aria-label="BachatBase home"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span
              aria-hidden="true"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl bg-brand
                font-serif text-xl font-extrabold text-white
                shadow-[var(--shadow-glow)]
                transition-transform duration-200
                group-hover:scale-[1.04]
              "
            >
              C
            </span>

            <span className="font-serif text-[21px] font-extrabold tracking-tight text-ink sm:text-[23px]">
              BachatBase
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden h-full flex-1 items-center justify-center gap-1 xl:flex"
            aria-label="Main navigation"
          >
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative flex h-10 items-center rounded-lg px-3.5",
                    "text-[13px] font-semibold tracking-wide",
                    "transition-colors duration-150",
                    active
                      ? "bg-inkblue/[0.07] text-inkblue"
                      : "text-ink-soft hover:bg-inkblue/[0.05] hover:text-inkblue",
                    "after:absolute after:bottom-0 after:left-3.5 after:right-3.5",
                    "after:h-0.5 after:rounded-full after:bg-inkblue",
                    "after:transition-transform after:duration-150",
                    active
                      ? "after:scale-x-100"
                      : "after:scale-x-0 hover:after:scale-x-100",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
            {moreLinks.length > 0 && (
              <details className="group relative flex h-full items-center">
                <summary className="flex h-10 cursor-pointer list-none items-center rounded-lg px-3.5 text-[13px] font-semibold tracking-wide text-ink-soft hover:bg-inkblue/[0.05] hover:text-inkblue focus-visible:outline-2 focus-visible:outline-inkblue">
                  Explore
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="ml-1 h-4 w-4">
                    <path d="m6 8 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-48 translate-y-1 rounded-2xl border border-ledger-line bg-white p-2 opacity-0 shadow-[var(--shadow-overlay)] transition group-open:visible group-open:translate-y-0 group-open:opacity-100">
                  {moreLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-inkblue/[0.05] hover:text-inkblue">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>
            )}
          </nav>

          {/* Search */}
          <div className="ml-auto hidden w-full max-w-[260px] shrink-0 md:block lg:ml-0 lg:max-w-[280px]">
            <HeaderSearch />
          </div>

          {/* Account */}
          <div className="hidden shrink-0 md:block">
            <Link
              href={user ? "/account" : "/account/login"}
              className="
                group flex min-h-10 items-center gap-2.5
                rounded-xl border border-ledger-line
                bg-white px-3
                text-sm font-semibold text-ink
                transition-all duration-150
                hover:border-inkblue/30 hover:bg-inkblue/[0.03]
              "
            >
              {user ? (
                <>
                  <span
                    aria-hidden="true"
                    className="
                      flex h-7 w-7 shrink-0 items-center justify-center
                      rounded-lg bg-brand
                      text-xs font-bold text-white
                    "
                  >
                    {user.name.trim().charAt(0).toUpperCase() || "U"}
                  </span>

                  <span className="max-w-[100px] truncate">
                    {user.name}
                  </span>

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4 text-ink-soft"
                  >
                    <path
                      d="m6 8 4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-[17px] w-[17px] text-inkblue"
                  >
                    <path
                      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>

                  <span>Sign in</span>
                </>
              )}
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="ml-auto flex shrink-0 items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl text-ink-soft
                transition-colors
                hover:bg-inkblue/[0.06] hover:text-inkblue
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-inkblue/50
              "
              aria-label="Open search"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7.5" />
                <path d="m16.5 16.5 4 4" />
              </svg>
            </button>

            <MobileNav
              links={[...links, ...moreLinks]}
              accountLink={
                user
                  ? { href: "/account", label: "Your account" }
                  : { href: "/account/login", label: "Sign in" }
              }
              onOpenSearch={() => setMobileSearchOpen(true)}
            />
          </div>
        </div>
      </header>

      <MobileSearch
        isOpen={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
      />
    </>
  );
}