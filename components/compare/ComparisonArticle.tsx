import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { GO_REL } from "@/lib/go";
import { COMPARE_CATEGORIES, COMPARISONS, type CompareEntry } from "@/data/comparisons";
import EditorialByline from "@/components/editorial/EditorialByline";

function goHref(storeSlug: string, src: string) {
  return `/go/${encodeURIComponent(storeSlug)}?src=${encodeURIComponent(src)}`;
}

function StoreActionButton({
  storeSlug,
  label,
  src,
  primary = false,
  full = false,
}: {
  storeSlug: string;
  label: string;
  src: string;
  primary?: boolean;
  full?: boolean;
}) {
  return (
    <a
      href={goHref(storeSlug, src)}
      rel={GO_REL}
      target="_blank"
      className={[
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition",
        full ? "w-full" : "",
        primary
          ? "bg-[#141413] text-white hover:bg-[#2a2a27]"
          : "border border-[#141413]/15 bg-white text-[#141413] hover:border-[#141413]/35 hover:bg-[#FAF8F5]",
      ].join(" ")}
    >
      {label} <ExternalLink aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

export default function ComparisonArticle({ entry }: { entry: CompareEntry }) {
  const canonical = `/compare/${entry.slug}`;
  const relatedComparisons = entry.relatedComparisons
    .map((slug) => COMPARISONS.find((c) => c.slug === slug))
    .filter((c): c is CompareEntry => Boolean(c))
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.metaDescription,
    image: [entry.heroImage],
    datePublished: entry.factsCheckedOn ?? "2026-11-01",
    dateModified: entry.factsCheckedOn ?? "2026-11-18",
    author: entry.authorName
      ? { "@type": "Person", name: entry.authorName, url: absoluteUrl("/about") }
      : { "@type": "Organization", name: "Durza Research Desk", url: absoluteUrl("/about") },
    publisher: {
      "@type": "Organization",
      name: "Durza",
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
  };

  return (
    <div className="bg-[#FAF8F5] text-[#141413]">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqPageJsonLd(entry.faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: entry.title, path: canonical },
        ])}
      />

      <article className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:px-6 sm:pt-10 md:pb-16">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-[#5a564f]">
          <Link href="/" className="hover:text-[#141413]">Home</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <Link href="/compare" className="hover:text-[#141413]">Compare</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <span className="text-[#141413]">{entry.category}</span>
        </nav>

        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">
          {entry.category} · {entry.updatedLabel}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-extrabold leading-tight tracking-tight text-[#141413] sm:text-5xl">
          {entry.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#3f3b35]">{entry.summary}</p>

        {entry.audience && (
          <section aria-label="Who this comparison is for" className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#141413]/10 bg-white p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#8a4b12]">Who it is for</p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-[#3f3b35]">
                {entry.audience.bestFor.map((line) => <li key={line}>• {line}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Who should skip it</p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-[#3f3b35]">
                {entry.audience.skipIf.map((line) => <li key={line}>• {line}</li>)}
              </ul>
            </div>
          </section>
        )}

        {(entry.authorName || entry.factsCheckedOn) && (
          <EditorialByline
            authorName={entry.authorName}
            updatedAt={entry.factsCheckedOn}
            checkedAt={entry.factsCheckedOn}
            hasMethod
          />
        )}

        <div className="relative mt-7 overflow-hidden rounded-3xl border border-[#141413]/10 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full">
            <Image src={entry.heroImage} alt="" fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
          </div>
        </div>

        <section aria-labelledby="quick-verdict" className="mt-8 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Quick verdict</p>
          <h2 id="quick-verdict" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">Which one should you pick?</h2>
          <p className="mt-3 text-base leading-8 text-[#2f2b26]">{entry.verdict.text}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <StoreActionButton
              storeSlug={entry.verdict.primaryStoreSlug}
              label={`Check Live Price on ${entry.verdict.primaryStoreLabel}`}
              src="compare-verdict"
              primary
              full
            />
            <StoreActionButton
              storeSlug={entry.verdict.secondaryStoreSlug}
              label={`Check Live Price on ${entry.verdict.secondaryStoreLabel}`}
              src="compare-verdict"
              full
            />
          </div>
        </section>

        <section aria-labelledby="comparison-table" className="mt-10">
          <h2 id="comparison-table" className="font-serif text-2xl font-extrabold text-[#141413] sm:text-3xl">Side-by-side comparison</h2>
          <div className="mt-4 overflow-x-auto rounded-3xl border border-[#141413]/10 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm sm:text-base">
              <thead className="bg-[#F3EFE8] text-[#141413]">
                <tr>
                  <th scope="col" className="px-4 py-4 font-semibold sm:px-6">Factor</th>
                  <th scope="col" className="px-4 py-4 font-semibold sm:px-6">{entry.table.leftName}</th>
                  <th scope="col" className="px-4 py-4 font-semibold sm:px-6">{entry.table.rightName}</th>
                  {entry.table.extraName && (
                    <th scope="col" className="px-4 py-4 font-semibold sm:px-6">{entry.table.extraName}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {entry.table.rows.map((row, i) => (
                  <tr key={row.factor} className={i === 0 ? "" : "border-t border-[#141413]/10"}>
                    <th scope="row" className="px-4 py-4 align-top font-semibold text-[#141413] sm:px-6">{row.factor}</th>
                    <td className="px-4 py-4 align-top leading-7 text-[#3f3b35] sm:px-6">{row.left}</td>
                    <td className="px-4 py-4 align-top leading-7 text-[#3f3b35] sm:px-6">{row.right}</td>
                    {entry.table.extraName && (
                      <td className="px-4 py-4 align-top leading-7 text-[#3f3b35] sm:px-6">{row.extra ?? "—"}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {entry.productLinks && entry.productLinks.length > 0 && (
          <section aria-labelledby="product-links" className="mt-10 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Check live prices</p>
            <h2 id="product-links" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">
              The exact models in this comparison
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5a564f]">
              Prices are snapshots from the date on this page, not live quotes. Confirm the model and price on Amazon before paying. As an Amazon Associate we earn from qualifying purchases.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {entry.productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex min-h-11 items-start gap-1.5 text-sm font-semibold text-[#8a4b12] hover:underline"
                  >
                    <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                    {link.label}
                  </a>
                  {link.note && <p className="ml-6 text-xs leading-5 text-[#5a564f]">{link.note}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {entry.sources && entry.sources.length > 0 && (
          <section aria-labelledby="comparison-sources" className="mt-10 rounded-2xl border border-ledger-line bg-white p-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Evidence</p>
            <h2 id="comparison-sources" className="mt-2 font-serif text-xl font-extrabold text-[#141413]">
              Sources behind this comparison
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#5a564f]">
              Figures are attributed to the publications and listings below. Durza did not physically test these products.
            </p>
            <ul className="mt-3 space-y-2">
              {entry.sources.map((source) => (
                <li key={source.href} className="text-sm">
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#8a4b12] hover:underline">
                    {source.label} ↗
                  </a>
                  {source.checkedAt && <span className="ml-2 text-xs text-[#5a564f]">checked {source.checkedAt}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="insider-reality" className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-800">Insider reality</p>
          <h2 id="insider-reality" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">{entry.insider.title}</h2>
          <ul className="mt-4 space-y-3">
            {entry.insider.points.map((point) => (
              <li key={point} className="flex gap-3 text-base leading-7 text-[#2f2b26]">
                <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-amber-700" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 space-y-8">
          {entry.blocks.map((block) => (
            <section key={block.heading} aria-labelledby={block.heading.replace(/\s+/g, "-").toLowerCase()}>
              <h2 id={block.heading.replace(/\s+/g, "-").toLowerCase()} className="font-serif text-2xl font-extrabold text-[#141413] sm:text-3xl">
                {block.heading}
              </h2>
              <div className="mt-3 space-y-4">
                {block.paragraphs.map((p) => (
                  <p key={p} className="text-base leading-8 text-[#3f3b35]">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </section>

        {entry.storeActions.length > 0 && (
          <section aria-labelledby="store-actions" className="mt-10">
            <h2 id="store-actions" className="font-serif text-2xl font-extrabold text-[#141413] sm:text-3xl">Check live offers</h2>
            <p className="mt-2 text-base leading-7 text-[#5a564f]">Compare the final payable price on the official store before you buy.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {entry.storeActions.map((store) => (
                <div key={store.storeSlug} className="rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#141413] text-sm font-bold text-white">
                      {store.storeName.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-[#141413]">{store.storeName}</p>
                      <p className="text-xs text-[#5a564f]">Official/partner store link</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-[#3f3b35]">
                    {store.bullets.map((b) => (
                      <li key={b} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8a4b12]" />{b}</li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <StoreActionButton
                      storeSlug={store.storeSlug}
                      label={`Check Live Offers on ${store.storeName} →`}
                      src="compare-mid"
                      primary
                      full
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-[#141413]">Related comparisons</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {relatedComparisons.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/compare/${c.slug}`} className="inline-flex items-start gap-1.5 text-[#8a4b12] hover:underline">
                      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#141413]">Deep-dive buying guides</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {entry.relatedGuides.length > 0 ? entry.relatedGuides.map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} className="inline-flex items-start gap-1.5 text-[#8a4b12] hover:underline">
                      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{g.label}
                    </Link>
                  </li>
                )) : (
                  <li>
                    <Link href="/guides" className="inline-flex items-start gap-1.5 text-[#8a4b12] hover:underline">
                      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />Browse all buying guides
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#141413]">Verified reviews & store hubs</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {entry.relatedReviewsStores.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="inline-flex items-start gap-1.5 text-[#8a4b12] hover:underline">
                      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </article>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#141413]/10 bg-[#FAF8F5]/95 p-3 backdrop-blur md:hidden">
        <a
          href={goHref(entry.verdict.primaryStoreSlug, "compare-mobile-sticky")}
          rel={GO_REL}
          target="_blank"
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#141413] px-4 py-3 text-sm font-semibold text-white"
        >
          Check {entry.verdict.primaryStoreLabel} live price <ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
