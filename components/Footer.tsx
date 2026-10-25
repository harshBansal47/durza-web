import Link from "next/link";
import type { ReactNode } from "react";
import SponsoredCard from "@/components/SponsoredCard";
import type { Ad } from "@/lib/types";
import Logo from "@/components/Logo";
import AppDownloadLink from "@/components/AppDownloadLink";

const PALETTE = {
  dark: "var(--color-ink-warm)",
  muted: "var(--color-ink-soft)",
  border: "var(--color-ledger-line)",
};

function columns(hasComparisons: boolean) {
  const dealsLinks = [
    { href: "/coupons", label: "Coupons" },
    { href: "/deals", label: "Today's deals" },
    { href: "/bank-offers", label: "Bank & card offers" },
    { href: "/stores", label: "Stores" },
    { href: "/categories", label: "Categories" },
    { href: "/guides", label: "Buying guides" },
    { href: "/reviews", label: "Reviews" },
    ...(hasComparisons ? [{ href: "/compare", label: "Comparisons" }] : []),
    { href: "/collections", label: "Collections" },
  ];
  return [
    { title: "Deals", links: dealsLinks },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About" },
        { href: "/how-it-works", label: "How it works" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Account",
      links: [
        { href: "/account", label: "My account" },
        { href: "/account/saved", label: "Saved deals" },
        { href: "/account/products", label: "Tracked prices" },
        { href: "/account/unsubscribe", label: "Turn off emails" },
      ],
    },
    {
      title: "Trust",
      links: [
        { href: "/trust", label: "How Durza Works" },
        { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ],
    },
  ];
}

export default function Footer({
  ad,
  adSlot,
  hasComparisons = false,
}: {
  ad?: Ad | null;
  /** Pre-rendered ad block; takes precedence over `ad` (see the layout). */
  adSlot?: ReactNode;
  hasComparisons?: boolean;
}) {
  return (
    <footer className="mt-16 no-print">
      {adSlot ??
        (ad ? (
          <div className="mx-auto mb-8 max-w-6xl px-4 sm:px-6">
            <SponsoredCard
              ad={ad}
              src="ad-footer"
              aspect="aspect-[4/1] sm:aspect-[6/1]"
            />
          </div>
        ) : null)}

      <div className="mt-14 border-t border-ledger-line pt-12 text-ink-soft">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-4 sm:grid-cols-5 sm:gap-10">
            <div className="col-span-2 sm:col-span-1">
              <Link
                href="/"
                aria-label="Durza: Coupon & Deals — home"
                className="inline-flex"
              >
                <Logo size={34} tagline />
              </Link>
              <p className="mt-3 text-sm text-ink-soft">
                Save money before you buy.
              </p>
            </div>
            {columns(hasComparisons).map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium text-ink">{col.title}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-ink-soft transition-colors hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 empty:hidden sm:col-span-1">
              <AppDownloadLink />
            </div>
          </div>

          <div
            className=" flex flex-col gap-3 pt-5 text-[11px] leading-relaxed sm:flex-row sm:items-start sm:justify-between sm:gap-10 pb-5"
            style={{
              borderTop: `1px solid ${PALETTE.border}`,
              color: PALETTE.muted,
            }}
          >
            <p className="shrink-0">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold" style={{ color: PALETTE.dark }}>
                Durza
              </span>
              . Offers researched from official store pages; commissions
              disclosed on offer pages.
            </p>

            <p className="sm:max-w-xl">
              {/* We may earn a commission when you shop through our links. */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}