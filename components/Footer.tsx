import Link from "next/link";
import SponsoredCard from "@/components/SponsoredCard";
import type { Ad } from "@/lib/types";

const PALETTE = {
  dark: "#16130F",
  muted: "#5C564A", // solid gray-brown, readable on white / light backgrounds
  border: "#E4DFD3",
};

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Deals",
    links: [
      { href: "/coupons", label: "Coupons" },
      { href: "/deals", label: "Today's deals" },
      { href: "/stores", label: "Stores" },
      { href: "/categories", label: "Categories" },
      { href: "/guides", label: "Buying guides" },
      { href: "/reviews", label: "Reviews" },
      { href: "/compare", label: "Comparisons" },
      { href: "/collections", label: "Collections" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/trust", label: "How it works" },
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
      { href: "/trust", label: "How BachatBase Works" },
      { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function Footer({ ad }: { ad?: Ad | null }) {
  return (
    <footer className="mt-16 no-print">
      {ad && (
        <div className="mx-auto mb-8 max-w-6xl px-4 sm:px-6">
          <SponsoredCard
            ad={ad}
            src="ad-footer"
            aspect="aspect-[4/1] sm:aspect-[6/1]"
          />
        </div>
      )}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bg-paper-alt relative overflow-hidden rounded-[20px] px-6 py-10 border border-ledger-line shadow-[var(--shadow-hairline)] sm:px-12">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent-soft/30"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-accent-soft/15"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <h2 className="font-sans text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                Stop checking back. Let the price come to you.
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Follow a product and we email you when its price drops or a
                confirmed code appears. Free, no spam.
              </p>
            </div>
            <Link
              href="/account/register"
              className="btn btn-primary shrink-0 px-6 py-3 text-base"
            >
              Create a free account
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-ledger-line pt-12 text-ink-soft">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 sm:grid-cols-5">
            <div className="sm:col-span-1">
              <p className="flex items-center font-sans text-xl font-medium tracking-tight text-ink">
                <span
                  aria-hidden="true"
                  className="bg-ink mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-white"
                >
                  C
                </span>
                BachatBase
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                Save money before you buy.
              </p>
            </div>
            {COLUMNS.map((col) => (
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
          </div>

          <div
            className="mt-10 flex flex-col gap-3 pt-5 text-[11px] leading-relaxed sm:flex-row sm:items-start sm:justify-between sm:gap-10"
            style={{
              borderTop: `1px solid ${PALETTE.border}`,
              color: PALETTE.muted,
            }}
          >
            <p className="shrink-0">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold" style={{ color: PALETTE.dark }}>
                BachatBase
              </span>
              . Offers built on shopper evidence, every commission disclosed.
            </p>

            <p className="sm:max-w-xl">
              We may earn a commission when you shop through our links.
              Affiliate commissions may be one factor among several signals used
              when ordering offers. Verification, reliability, user success
              rates and relevance remain important ranking factors.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
