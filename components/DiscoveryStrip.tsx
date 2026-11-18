import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DiscoveryStrip({
  items = [
    { href: "/bank-offers", title: "Stack With Bank Card Offers", note: "Compare instant discounts, co-branded cashback caps, and No-Cost EMI rules." },
    { href: "/compare", title: "Side-by-Side Comparisons", note: "See where brand stores, marketplaces, and card offers actually win." },
    { href: "/collections", title: "Curated Buying Kits", note: "Multi-store picks built around real goals and everyday Indian use cases." },
  ],
}: {
  items?: { href: string; title: string; note: string }[];
}) {
  return (
    <section className="mt-12 grid gap-4 sm:grid-cols-3" aria-label="Keep exploring">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="group rounded-3xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-inkblue/30 hover:shadow-md">
          <p className="font-serif text-lg font-extrabold text-ink">{item.title}</p>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{item.note}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a4b12]">Explore <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
        </Link>
      ))}
    </section>
  );
}
