import type { Metadata } from "next";
import { COMPARISONS } from "@/data/comparisons";
import CompareHub from "@/components/compare/CompareHub";
import ListingHero from "@/components/listing/ListingHero";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 21600;

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
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
      <ListingHero
        eyebrow="Side-by-Side Buying Comparisons"
        title="Compare Before You Buy"
        lead="Real price-bracket breakdowns, bank card stacking rules, and store-vs-store verdicts for Indian shoppers."
        stats={[{ value: COMPARISONS.length.toLocaleString("en-IN"), label: "Comparisons" }]}
        trust={false}
      />
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
  );
}
