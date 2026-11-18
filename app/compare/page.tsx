import type { Metadata } from "next";
import { COMPARISONS } from "@/data/comparisons";
import CompareHub from "@/components/compare/CompareHub";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Compare Before You Buy | Side-by-Side Comparisons | Durza",
  description:
    "Real price-bracket breakdowns, bank card stacking rules, and store-vs-store verdicts for Indian shoppers.",
  alternates: { canonical: absoluteUrl("/compare") },
  openGraph: {
    title: "Compare Before You Buy | Durza",
    description:
      "Real price-bracket breakdowns, bank card stacking rules, and store-vs-store verdicts for Indian shoppers.",
    url: absoluteUrl("/compare"),
    type: "website",
  },
};

const TOP_COMPARED_STORES = [
  { href: "/stores/amazon-in", label: "Amazon" },
  { href: "/stores/flipkart", label: "Flipkart" },
  { href: "/stores/lenovo", label: "Lenovo" },
  { href: "/stores/asus", label: "ASUS" },
];

export default function ComparisonsPage() {
  return (
    <main className="bg-[#FAF8F5] text-[#141413]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">
          Side-by-Side Buying Comparisons
        </p>
        <h1 className="mt-3 font-serif text-4xl font-extrabold leading-tight tracking-tight text-[#141413] sm:text-5xl">
          Compare Before You Buy
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#3f3b35]">
          Real price-bracket breakdowns, bank card stacking rules, and store-vs-store verdicts for Indian shoppers.
        </p>
        <div className="mt-8">
          <CompareHub items={COMPARISONS} />
        </div>

        <section aria-labelledby="top-compared-stores" className="mt-12 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-6">
          <h2 id="top-compared-stores" className="text-lg font-semibold text-[#141413]">
            Jump to top compared stores
          </h2>
          <p className="mt-1 text-sm leading-6 text-[#5a564f]">
            Check live deals and offers after reading a comparison.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOP_COMPARED_STORES.map((store) => (
              <a
                key={store.href}
                href={store.href}
                className="inline-flex min-h-11 items-center rounded-full border border-[#141413]/15 bg-[#FAF8F5] px-4 py-2 text-sm font-semibold text-[#141413] transition hover:border-[#141413]/35 hover:bg-[#f3efe8]"
              >
                {store.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
