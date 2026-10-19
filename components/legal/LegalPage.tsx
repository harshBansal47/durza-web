import Link from "next/link";
import type { ReactNode } from "react";
import PageTitle from "@/components/ui/PageTitle";

export type LegalTocItem = { id: string; label: string };
export type LegalRelatedLink = { href: string; label: string };

/**
 * The shared shell for Durza's long-form informational pages (About, Contact,
 * Privacy, Terms, Affiliate Disclosure).
 *
 * The pages are plain content, but they are also the pages an affiliate network
 * reads first, so they get the same premium treatment as the storefront: a
 * real hero with an eyebrow and lede, a sticky table of contents, and a
 * consistent reading measure. Legal copy stays exactly as authored in the page
 * component; this shell only supplies the layout.
 */
export default function LegalPage({
  eyebrow,
  title,
  lede,
  updated,
  highlights,
  toc,
  related,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  updated?: string;
  highlights?: string[];
  toc?: LegalTocItem[];
  related?: LegalRelatedLink[];
  children: ReactNode;
}) {
  const showToc = !!toc && toc.length > 0;
  return (
    <main className="relative min-h-screen overflow-hidden bg-paper text-ink antialiased">
      {/* A quiet grid and a single warm glow: the same "premium, quiet
          confidence" surface as the storefront hero, toned down for reading. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0a0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a0a 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 90% 55% at 50% 0%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 55% at 50% 0%, #000 30%, transparent 100%)",
          }}
        />
        <div className="absolute -top-32 left-1/2 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(238,90,11,0.08),transparent)] blur-3xl" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-6 pb-10 pt-14 sm:pb-14 sm:pt-20">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink-soft">
              <Link href="/" className="hover:text-inkblue">
                Home
              </Link>
              <span className="px-2" aria-hidden="true">
                /
              </span>
              {title}
            </nav>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
              {eyebrow}
            </p>
            <PageTitle className="mt-3 leading-tight">{title}</PageTitle>
            {lede && (
              <div className="mt-4 text-lg leading-8 text-ink-soft">{lede}</div>
            )}
            {updated && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-ledger-line bg-white/70 px-3 py-1 text-xs text-ink-soft shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-verified" aria-hidden="true" />
                Last updated {updated}
              </p>
            )}
          </div>
        </section>

        {/* Body */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <div className={`grid gap-10 ${showToc ? "md:grid-cols-4" : ""}`}>
              {showToc && (
                <aside className="hidden md:block">
                  <nav className="sticky top-24 space-y-1" aria-label="On this page">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                      On this page
                    </p>
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block rounded-md px-2 py-1.5 text-sm text-ink-soft transition-colors hover:bg-white hover:text-ink"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </aside>
              )}

              <div className={showToc ? "md:col-span-3" : ""}>
                <article className="space-y-4 text-ink-soft">
                  {highlights && highlights.length > 0 && (
                    <div className="mb-8 rounded-xl border border-verified/20 bg-verified-soft p-6">
                      <p className="mb-2 font-semibold text-ink">Key highlights</p>
                      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-ink-soft">
                        {highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {children}
                </article>

                {related && related.length > 0 && (
                  <nav className="mt-12" aria-label="Related pages">
                    <h2 className="font-serif text-xl font-bold text-ink">Keep reading</h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {related.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="inline-flex min-h-11 items-center rounded-full border border-ledger-line bg-white px-4 text-sm font-semibold text-inkblue transition-colors hover:border-inkblue/40"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
