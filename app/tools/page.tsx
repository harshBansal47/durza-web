import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ToolsPageClient from "@/components/tools/ToolsPageClient";
import { STORE_TOOLS } from "@/lib/store-tools";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const title = "Shopping Tools — Calculators & Finders for Indian Shoppers";
const description = `${STORE_TOOLS.length} free tools: fan wattage, protein cost per gram, cup size, GST net cost, diaper cost per pant and more — each tied to the store page it came from.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/tools") },
  openGraph: { title, description, url: absoluteUrl("/tools"), type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const FEATURED_HELPERS = [
  {
    href: "/bank-offers",
    title: "Credit Card & Bank Offer Guide",
    description: "Compare core instant-discount rules vs. co-branded cashback caps.",
  },
  {
    href: "/stores/havells/bldc-calculator",
    title: "Havells BLDC Fan Savings Estimator",
    description: "Estimate annual electricity units saved when upgrading from induction to BLDC fans.",
  },
  {
    href: "/stores/firstcry/club-calculator",
    title: "FirstCry Club & Diaper Cost Planner",
    description: "Plan monthly baby essentials and membership break-even.",
    extraLinks: [
      { href: "/stores/firstcry/diaper-cost-tracker", label: "Diaper cost tracker" },
    ],
  },
  {
    href: "/compare",
    title: "Side-by-Side Buying Comparisons",
    description: "Compare official brand eStores vs. marketplaces before checkout.",
  },
];

export default function ToolsPage() {
  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }])} />

      <section aria-labelledby="featured-shopping-helpers" className="mb-8 rounded-3xl border border-ledger-line bg-white p-5 shadow-sm sm:p-7">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-inkblue">Featured shopping helpers</p>
        <h2 id="featured-shopping-helpers" className="mt-2 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
          Start with Durza&apos;s key calculators and guides
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft sm:text-base">
          Interactive tools and guides to help you compare offers, estimate savings, and plan purchases before checkout.
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {FEATURED_HELPERS.map((item) => (
            <li key={item.href} className="rounded-2xl border border-ledger-line bg-paper-raised p-4 sm:p-5">
              <h3 className="text-base font-semibold text-ink">
                <Link href={item.href} className="hover:text-inkblue underline-offset-2 hover:underline">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
              {item.extraLinks?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.extraLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex min-h-9 items-center rounded-full border border-ledger-line bg-white px-3 text-xs font-semibold text-inkblue transition-colors hover:border-inkblue/40"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <ToolsPageClient />
    </div>
  );
}
