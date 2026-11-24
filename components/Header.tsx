"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Compass, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { HeaderSearch, MobileSearch } from "@/components/HeaderSearch";
import AccountMenu from "@/components/header/AccountMenu";
import NavScrollStrip from "@/components/header/NavScrollStrip";
import {
  EXPLORE_TOPICS_NAV,
  PRIMARY_NAV,
  SAVED_NAV,
  SECONDARY_NAV,
  type NavIcon,
  type SiteNavItem,
} from "@/lib/nav-config";
import { useSession } from "@/components/session/SessionProvider";

const ICONS: Record<NavIcon, typeof ShieldCheck> = {
  shield: ShieldCheck,
  sparkles: Sparkles,
  bookmark: Bookmark,
  compass: Compass,
};

/** Three-row Amazon-style header. All links come from the single nav config. */
export default function Header() {
  const { session } = useSession();
  const user = session.user;
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const stickyRef = useRef<HTMLDivElement>(null);

  // Only rows 1–2 are sticky; the contextual row 3 scrolls away with the page.
  useLayoutEffect(() => {
    const update = () => {
      const height = stickyRef.current?.getBoundingClientRect().height ?? 100;
      document.documentElement.style.setProperty("--header-height", `${height}px`);
    };
    update();
    const observer = new ResizeObserver(update);
    if (stickyRef.current) observer.observe(stickyRef.current);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const ExploreIcon = ICONS[EXPLORE_TOPICS_NAV.icon];

  const renderLink = (item: SiteNavItem, variant: "primary" | "secondary") => {
    const active = isActive(item.href);
    const Icon = item.icon ? ICONS[item.icon] : null;
    if (variant === "primary") {
      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`relative flex h-full shrink-0 items-center px-3 text-[13px] font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent ${active ? "text-accent after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-accent" : "text-ink"}`}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent ${
          active ? "bg-accent text-white hover:text-white" : "text-ink"
        }`}
      >
        {Icon ? <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} /> : null}
        <span>{item.label}</span>
        {item.seasonal && item.badge ? (
          <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
            {item.badge}
          </span>
        ) : null}
      </Link>
    );
  };

  return (
    <>
      <header className="no-print">
        <div
          ref={stickyRef}
          className={`sticky top-0 z-40 border-b border-ledger-line bg-white transition-shadow duration-300 ${
            scrolled ? "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]" : ""
          }`}
        >
          {/* ROW 1 — brand, search, saved shortcut, account */}
          <div className="mx-auto flex h-[56px] max-w-[1280px] items-center gap-2 px-4 sm:h-[60px] sm:gap-4 sm:px-6 lg:px-12">
            <Link href="/" className="group flex shrink-0 items-center" aria-label="Durza home">
              <Logo
                size={32}
                tagline={false}
                markClassName="transition-transform duration-200 group-hover:scale-[1.04]"
              />
            </Link>

            <div className="hidden min-w-0 flex-1 md:block">
              <HeaderSearch prominent />
            </div>

            <div className="hidden shrink-0 md:block">
              {SAVED_NAV ? (
                <Link
                  href={SAVED_NAV.href}
                  aria-current={isActive(SAVED_NAV.href) ? "page" : undefined}
                  className="flex h-9 items-center gap-1.5 rounded-full px-2 text-[13px] font-medium text-ink hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <Bookmark aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                  <span>Saved</span>
                </Link>
              ) : null}
            </div>

            {/* Mobile: expanding search opens the existing overlay. */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Open search"
              className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 md:hidden"
            >
              <Search aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
            </button>

            <div className="shrink-0">
              <AccountMenu />
            </div>
          </div>

          {/* ROW 2 — primary nav + the single rotating trust message */}
          <nav
            aria-label="Primary"
            className="mx-auto flex h-[40px] max-w-[1280px] items-center justify-between border-t border-ledger-line/70 px-4 sm:px-6 lg:px-12"
          >
            <NavScrollStrip>
              {PRIMARY_NAV.map((item) => renderLink(item, "primary"))}
            </NavScrollStrip>
            <Link
              href={EXPLORE_TOPICS_NAV.href}
              aria-current={isActive(EXPLORE_TOPICS_NAV.href) ? "page" : undefined}
              className={`ml-3 hidden shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent sm:flex ${
                isActive(EXPLORE_TOPICS_NAV.href)
                  ? "border-accent text-accent"
                  : "border-ledger-line text-ink hover:border-accent hover:text-accent"
              }`}
            >
              <ExploreIcon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span>{EXPLORE_TOPICS_NAV.label}</span>
            </Link>
          </nav>
        </div>

        {/* ROW 3 — contextual strip, scrolls away with the page */}
        <nav
          aria-label="Secondary"
          className="h-[38px] border-b border-ledger-line bg-accent-faint"
        >
          <div className="mx-auto flex h-full max-w-[1280px] items-center px-2 sm:px-4 lg:px-8">
            <NavScrollStrip tone="cream">
              {SECONDARY_NAV.map((item) => renderLink(item, "secondary"))}
            </NavScrollStrip>
          </div>
        </nav>
      </header>

      <MobileSearch isOpen={mobileSearchOpen} onClose={() => setMobileSearchOpen(false)} />
    </>
  );
}
