import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { GO_REL } from "@/lib/go";
import type { CollectionEntry } from "@/data/collections";
import { COLLECTIONS } from "@/data/collections";
import ShareControls from "@/components/collections/ShareControls";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function trackedHref(href: string, contentRef: string): string {
  try {
    const url = new URL(href, "https://durza.in");
    url.searchParams.set("content_ref", contentRef);
    return href.startsWith("/") ? `${url.pathname}${url.search}` : url.toString();
  } catch {
    return href;
  }
}

function CtaButton({
  href,
  label,
  contentRef,
  full = false,
}: {
  href: string;
  label: string;
  contentRef?: string;
  full?: boolean;
}) {
  return (
    <a
      href={contentRef ? trackedHref(href, contentRef) : href}
      target="_blank"
      rel={GO_REL}
      className={[
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#141413] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2a2a27]",
        full ? "w-full" : "",
      ].join(" ")}
    >
      {label} <ExternalLink aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

export default function CollectionArticle({ entry }: { entry: CollectionEntry }) {
  const canonical = `/collections/${entry.slug}`;
  const relatedCollections = entry.relatedCollections
    .map((slug) => COLLECTIONS.find((c) => c.slug === slug))
    .filter((c): c is CollectionEntry => Boolean(c))
    .slice(0, 4);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: entry.title,
    description: entry.metaDescription,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: entry.picks.length,
    itemListElement: entry.picks.map((pick, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: pick.name,
      description: pick.why,
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.metaDescription,
    image: [entry.heroImage],
    datePublished: "2026-11-01",
    dateModified: "2026-11-18",
    author: { "@type": "Organization", name: "Durza Editorial", url: absoluteUrl("/about") },
    publisher: {
      "@type": "Organization",
      name: "Durza",
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
  };

  return (
    <main className="bg-[#FAF8F5] text-[#141413]">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqPageJsonLd(entry.faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: entry.title, path: canonical },
        ])}
      />

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-[#5a564f]">
          <Link href="/" className="hover:text-[#141413]">Home</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <Link href="/collections" className="hover:text-[#141413]">Collections</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <span className="text-[#141413]">{entry.category}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-[#f3efe8] px-2.5 py-1 font-semibold text-[#141413]">{entry.category}</span>
          <span className="rounded-full border border-[#141413]/10 bg-white px-2.5 py-1 font-medium text-[#5a564f]">{entry.itemCountLabel}</span>
          <span className="rounded-full border border-[#141413]/10 bg-white px-2.5 py-1 font-medium text-[#5a564f]">{entry.updatedLabel}</span>
        </div>

        <h1 className="mt-4 font-serif text-3xl font-extrabold leading-tight tracking-tight text-[#141413] sm:text-5xl">
          {entry.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#3f3b35]">{entry.summary}</p>

        <div className="relative mt-7 overflow-hidden rounded-3xl border border-[#141413]/10 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={entry.heroImage}
              alt=""
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>

        <section aria-labelledby="kit-summary" className="mt-8 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3EFE8] text-[#8a4b12]">
              <Info aria-hidden="true" className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Kit summary</p>
              <h2 id="kit-summary" className="mt-1 font-serif text-2xl font-extrabold text-[#141413]">Who this kit is for</h2>
              <p className="mt-3 text-base leading-8 text-[#2f2b26]">{entry.kitSummary}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="vetted-picks" className="mt-10">
          <h2 id="vetted-picks" className="font-serif text-2xl font-extrabold text-[#141413] sm:text-3xl">Vetted picks in smart order</h2>
          <p className="mt-2 text-base leading-7 text-[#5a564f]">Every pick is chosen for real utility. Use the tier and “when to skip” notes to avoid buying what you don’t need.</p>

          <div className="mt-6 space-y-5">
            {entry.picks.map((pick, idx) => (
              <article
                key={pick.name}
                className="rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#141413] font-mono text-sm font-bold text-white">
                      {pad2(idx + 1)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#f3efe8] px-2.5 py-1 text-xs font-semibold text-[#141413]">
                          {pick.storeBadge}
                        </span>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
                          {pick.tier}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-[#141413] sm:text-xl">{pick.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-base leading-7 text-[#3f3b35]">
                  <p className="text-xs text-[#5a564f]">
                    <span className="rounded bg-[#f3efe8] px-1.5 py-0.5 font-medium">{(pick.offerType ?? "curated_pick").replace(/_/g, " ")}</span>
                    <span className="ml-2" aria-label="Evidence">{pick.evidence ?? "No source date yet"}</span>
                  </p>
                  <p><span className="font-semibold text-[#141413]">Why it made the cut:</span> {pick.why}</p>
                  {pick.skipIf && (
                    <p><span className="font-semibold text-[#141413]">When to skip it:</span> {pick.skipIf}</p>
                  )}
                </div>

                <div className="mt-5">
                  <CtaButton href={pick.ctaHref} label={`${pick.ctaLabel} →`} contentRef={`collection_${entry.slug}`} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <p className="mt-8 text-xs text-[#5a564f]">
          Durza may earn a commission on tracked links at no extra cost to you. Offer type and
          evidence are shown per item; a coupon code is only shown when one is actually listed.
        </p>
        <ShareControls entry={entry} />

        <section aria-labelledby="faqs" className="mt-12">
          <h2 id="faqs" className="font-serif text-2xl font-extrabold text-[#141413] sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {entry.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-[#141413]/10 bg-white p-4 shadow-sm open:border-[#141413]/20">
                <summary className="cursor-pointer list-none pr-6 font-semibold text-[#141413] marker:content-none">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-[#3f3b35] sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="discovery" className="mt-12 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <h2 id="discovery" className="font-serif text-2xl font-extrabold text-[#141413]">Keep exploring</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold text-[#141413]">Related collections</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {relatedCollections.length > 0 ? relatedCollections.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/collections/${c.slug}`} className="inline-flex items-start gap-1.5 text-[#8a4b12] hover:underline">
                      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{c.title}
                    </Link>
                  </li>
                )) : <li className="text-[#5a564f]">More collections coming soon.</li>}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#141413]">Buying guides</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {entry.relatedGuides.length > 0 ? entry.relatedGuides.map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} className="inline-flex items-start gap-1.5 text-[#8a4b12] hover:underline">
                      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{g.label}
                    </Link>
                  </li>
                )) : <li className="text-[#5a564f]">Explore <Link href="/guides" className="text-[#8a4b12] hover:underline">all guides</Link>.</li>}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#141413]">Comparisons</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {entry.relatedCompares.length > 0 ? entry.relatedCompares.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="inline-flex items-start gap-1.5 text-[#8a4b12] hover:underline">
                      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{c.label}
                    </Link>
                  </li>
                )) : <li className="text-[#5a564f]">Explore <Link href="/compare" className="text-[#8a4b12] hover:underline">all comparisons</Link>.</li>}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#141413]">Store hubs</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {entry.relatedStores.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="inline-flex items-start gap-1.5 text-[#8a4b12] hover:underline">
                      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <p className="mt-10 border-t border-[#141413]/10 pt-5 text-xs leading-5 text-[#5a564f]">
          Live prices, availability, and offers are set by each store and can change. Check the final details on the store page before ordering. Some links may be affiliate links that support Durza at no extra cost to you.
        </p>
      </article>
    </main>
  );
}
