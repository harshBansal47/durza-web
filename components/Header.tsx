
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import { HeaderSearch, MobileSearch } from "./HeaderSearch";
import Logo from "@/components/Logo";
import { useSession } from "@/components/session/SessionProvider";
import SignOutForm from "@/components/session/SignOutForm";

export interface NavLink {
  href: string;
  label: string;
}

export default function Header({
  links,
  moreLinks = [],
}: {
  links: NavLink[];
  moreLinks?: NavLink[];
}) {
  // The session arrives after hydration (see SessionProvider): keeping it out
  // of the server render is what lets every page below be cached.
  const { session } = useSession();
  const user = session.user;
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const closeMoreMenu = () => setMoreOpen(false);
  const closeAccountMenu = () => setAccountOpen(false);

  // Close either menu when the visitor taps outside it or presses Escape.
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
        setAccountOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // A client-side navigation should never leave a stale menu open. Defer the
  // state reset so React does not treat it as a synchronous effect update.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setMoreOpen(false);
      setAccountOpen(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

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
    const onScroll = () => setScrolled(window.scrollY > 40);

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
          "border-b border-ledger-line",
          "bg-[rgba(250,250,248,0.85)] backdrop-blur-xl",
          "transition-all duration-300",
          scrolled ? "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]" : "",
        ].join(" ")}
      >
        <div className="mx-auto flex min-h-[68px] max-w-[1280px] items-center gap-5 px-6 sm:min-h-[76px] lg:gap-8 lg:px-12">
          {/* Brand */}
          <Link
            href="/"
            className="group flex shrink-0 items-center"
          >
            <Logo
              size={38}
              tagline
              markClassName="transition-transform duration-200 group-hover:scale-[1.04]"
            />
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
                    "relative flex h-10 items-center rounded-full px-4",
                    "text-[13px] font-medium tracking-wide",
                    "transition-colors duration-150",
                    active
                      ? "bg-ink/[0.06] text-ink"
                      : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
            {moreLinks.length > 0 && (
              <div ref={moreMenuRef} className="relative flex h-full items-center">
                <button
                  type="button"
                  aria-expanded={moreOpen}
                  onClick={() => {
                    setMoreOpen((open) => !open);
                    setAccountOpen(false);
                  }}
                  className="flex h-10 items-center rounded-full px-4 text-[13px] font-medium tracking-wide text-ink-soft hover:bg-ink/[0.04] hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
                >
                  More
                  <ChevronDown
                    aria-hidden="true"
                    className={`ml-1 h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                    strokeWidth={1.75}
                  />
                </button>
                {moreOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 min-w-48 rounded-2xl border border-ledger-line bg-white p-2 shadow-[var(--shadow-overlay)]">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMoreMenu}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Search */}
          <div className="ml-auto hidden w-full max-w-[260px] shrink-0 md:block lg:ml-0 lg:max-w-[280px]">
            <HeaderSearch />
          </div>

          {/* Account */}
          <div className="hidden shrink-0 md:block">
            {session.status === "loading" ? (
              // Neutral placeholder: the signed-in state is unknowable until
              // the client fetch lands, and guessing "Sign in" would flash the
              // wrong label at every signed-in visitor.
              <span
                aria-hidden="true"
                className="flex min-h-10 items-center gap-2.5 rounded-full border border-ledger-line bg-white px-4"
              >
                <User className="h-4 w-4 text-accent/40" strokeWidth={1.75} />
                <span className="h-3 w-14 rounded-full bg-ink/10" />
              </span>
            ) : user ? (
              <div ref={accountMenuRef} className="relative">
                <button
                  type="button"
                  aria-expanded={accountOpen}
                  onClick={() => {
                    setAccountOpen((open) => !open);
                    setMoreOpen(false);
                  }}
                  className="group flex min-h-10 items-center gap-2.5 rounded-full border border-ledger-line bg-white px-4 text-sm font-medium text-ink transition-all duration-150 hover:border-accent-soft hover:bg-accent-faint focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt=""
                      width={28}
                      height={28}
                      aria-hidden="true"
                      className="h-7 w-7 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-medium text-white"
                    >
                      {user.name.trim().charAt(0).toUpperCase() || "U"}
                    </span>
                  )}

                  <span className="max-w-[100px] truncate">
                    {user.name}
                  </span>

                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 text-ink-soft transition-transform ${accountOpen ? "rotate-180" : ""}`}
                    strokeWidth={1.75}
                  />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 min-w-48 rounded-2xl border border-ledger-line bg-white p-2 shadow-[var(--shadow-overlay)]">
                    <Link
                      href="/account"
                      onClick={closeAccountMenu}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
                    >
                      Your account
                    </Link>

                    <Link
                      href="/account/settings"
                      onClick={closeAccountMenu}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
                    >
                      Settings
                    </Link>

                    <SignOutForm
                      onClick={closeAccountMenu}
                      className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
                    />
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/account/login"
                className="
                  group flex min-h-10 items-center gap-2.5
                  rounded-full border border-ledger-line
                  bg-white px-4
                  text-sm font-medium text-ink
                  transition-all duration-150
                  hover:border-accent-soft hover:bg-accent-faint
                "
              >
                <User aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={1.75} />

                <span>Sign in</span>
              </Link>
            )}
          </div>

          {/* Mobile actions */}
          <div className="ml-auto flex shrink-0 items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full text-ink-soft
                transition-colors
                hover:bg-ink/[0.04] hover:text-ink
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-accent/50
              "
              aria-label="Open search"
            >
              <Search aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
            </button>

            <MobileNav
              links={[
                ...links,
                // The phone tab bar already owns "Saved"; the hamburger
                // repeating it is the duplicate this menu used to show.
                ...moreLinks.filter((link) => link.href !== "/saved"),
              ]}
              accountLink={
                user
                  ? { href: "/account", label: "Your account" }
                  : session.status === "loading"
                    ? // Mid-check: /account redirects anonymous visitors to the
                      // sign-in page, so this is right either way.
                      { href: "/account", label: "Account" }
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
