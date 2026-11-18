import type { Metadata } from "next";
import { COMPARISONS } from "@/data/comparisons";
import CompareHub from "@/components/compare/CompareHub";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Side-by-Side Buying Comparisons for India | Durza",
  description:
    "Practical comparisons for Indian shoppers: Amazon vs Flipkart, laptops, smartphones, fashion, supplements, appliances, card offers and more—focused on real checkout value.",
  alternates: { canonical: absoluteUrl("/compare") },
  openGraph: {
    title: "Side-by-Side Buying Comparisons for India | Durza",
    description:
      "Practical comparisons for Indian shoppers with clear verdicts, real checkout math, and direct links to official stores.",
    url: absoluteUrl("/compare"),
    type: "website",
  },
};

export default function ComparisonsPage() {
  return (
    <main className="bg-[#FAF8F5] text-[#141413]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Durza comparisons</p>
        <h1 className="mt-3 font-serif text-4xl font-extrabold leading-tight tracking-tight text-[#141413] sm:text-5xl">
          Side-by-Side Buying Comparisons
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#3f3b35]">
          Clear, India-first comparisons to help you pick the better option before checkout—based on real pricing patterns, delivery and warranty trade-offs, and bank offer math.
        </p>
        <div className="mt-8">
          <CompareHub items={COMPARISONS} />
        </div>
      </div>
    </main>
  );
}
