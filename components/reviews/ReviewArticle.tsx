import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink, X } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { GO_REL } from "@/lib/go";
import type { ReviewEntry } from "@/data/reviews";
import { REVIEWS } from "@/data/reviews";

export default function ReviewArticle({ entry }: { entry: ReviewEntry }) {
  const canonical = `/reviews/${entry.slug}`;
  const relatedReviews = entry.relatedReviews
    .map((slug) => REVIEWS.find((r) => r.slug === slug))
    .filter((r): r is ReviewEntry => Boolean(r))
    .slice(0, 3);

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: entry.title,
    description: entry.metaDescription,
    image: [entry.heroImage],
    datePublished: "2026-11-01",
    dateModified: "2026-11-18",
    author: { "@type": "Organization", name: "Durza Editors", url: absoluteUrl("/about") },
    publisher: {
      "@type": "Organization",
      name: "Durza",
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    itemReviewed: {
      "@type": "Product",
      name: entry.title,
      image: entry.heroImage,
      category: entry.category,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(entry.ratingValue),
      bestRating: String(entry.bestRating ?? 5),
      worstRating: String(entry.worstRating ?? 1),
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
  };

  return (
    <main className="bg-[#FAF8F5] text-[#141413]">
      <JsonLd data={reviewJsonLd} />
      <JsonLd data={faqPageJsonLd(entry.faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
          { name: entry.title, path: canonical },
        ])}
      />

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-[#5a564f]">
          <Link href="/" className="hover:text-[#141413]">Home</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <Link href="/reviews" className="hover:text-[#141413]">Reviews</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <span className="text-[#141413]">{entry.category}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-[#f3efe8] px-2.5 py-1 font-semibold text-[#141413]">{entry.category}</span>
          <span className="rounded-full border border-[#141413]/10 bg-white px-2.5 py-1 font-medium text-[#5a564f]">{entry.updatedLabel}</span>
          <span className="rounded-full border border-[#141413]/10 bg-white px-2.5 py-1 font-medium text-[#5a564f]">Durza Editors</span>
        </div>

        <h1 className="mt-4 font-serif text-3xl font-extrabold leading-tight tracking-tight text-[#141413] sm:text-5xl">
          {entry.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#3f3b35]">{entry.summary}</p>

        <div className="relative mt-7 overflow-hidden rounded-3xl border border-[#141413]/10 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full">
            <Image src={entry.heroImage} alt="" fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
          </div>
        </div>

        <section aria-labelledby="quick-verdict" className="mt-8 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Quick verdict</p>
          <h2 id="quick-verdict" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">Should you buy it?</h2>
          <p className="mt-3 text-base leading-8 text-[#2f2b26]">{entry.verdict}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <h3 className="flex items-center gap-2 font-semibold text-green-900"><Check aria-hidden="true" className="h-4 w-4" /> Who Should Buy</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-green-950/90">
                {entry.whoShouldBuy.map((item) => (
                  <li key={item} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
              <h3 className="flex items-center gap-2 font-semibold text-rose-900"><X aria-hidden="true" className="h-4 w-4" /> Who Should Skip</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-rose-950/90">
                {entry.whoShouldSkip.map((item) => (
                  <li key={item} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-700" />{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5">
            <a
              href={entry.primaryCtaHref}
              target="_blank"
              rel={GO_REL}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#141413] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2a2a27] sm:w-auto"
            >
              {entry.primaryCtaLabel} <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section aria-labelledby="pros-cons" className="mt-10">
          <h2 id="pros-cons" className="font-serif text-2xl font-extrabold text-[#141413] sm:text-3xl">Pros & cons</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-[#141413]">Pros</h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#3f3b35]">
                {entry.pros.map((p) => (
                  <li key={p} className="flex gap-2"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-green-700" />{p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-[#141413]">Cons</h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#3f3b35]">
                {entry.cons.map((c) => (
                  <li key={c} className="flex gap-2"><X aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-rose-700" />{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="fact-table" className="mt-10">
          <h2 id="fact-table" className="font-serif text-2xl font-extrabold text-[#141413] sm:text-3xl">Key facts at a glance</h2>
          <div className="mt-4 overflow-x-auto rounded-3xl border border-[#141413]/10 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm sm:text-base">
              <tbody>
                {entry.factTable.map((row, i) => (
                  <tr key={row.label} className={i === 0 ? "" : "border-t border-[#141413]/10"}>
                    <th scope="row" className="w-1/3 px-4 py-4 align-top font-semibold text-[#141413] sm:px-6">{row.label}</th>
                    <td className="px-4 py-4 align-top leading-7 text-[#3f3b35] sm:px-6">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 space-y-8">
          {entry.body.map((section) => (
            <section key={section.heading} aria-labelledby={section.heading.replace(/\s+/g, "-").toLowerCase()}>
              <h2 id={section.heading.replace(/\s+/g, "-").toLowerCase()} className="font-serif text-2xl font-extrabold text-[#141413] sm:text-3xl">{section.heading}</h2>
              <div className="mt-3 space-y-4">
                {section.paragraphs.map((p) => (
                  <p key={p} className="text-base leading-8 text-[#3f3b35]">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </section>

        <section aria-labelledby="faqs" className="mt-12">
          <h2 id="faqs" className="font-serif text-2xl font-extrabold text-[#141413] sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {entry.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-[#141413]/10 bg-white p-4 shadow-sm open:border-[#141413]/20">
                <summary className="cursor-pointer list-none pr-6 font-semibold text-[#141413] marker:content-none">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-[#3f3b35] sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="discovery" className="mt-12 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <h2 id="discovery" className="font-serif text-2xl font-extrabold text-[#141413]">Keep exploring</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold text-[#141413]">Related reviews</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {relatedReviews.length > 0 ? relatedReviews.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/reviews/${r.slug}`} className="inline-flex items-start gap-1.5 text-[#8a4b12] hover:underline">
                      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{r.title}
                    </Link>
                  </li>
                )) : <li className="text-[#5a564f]">Explore <Link href="/reviews" className="text-[#8a4b12] hover:underline">all reviews</Link>.</li>}
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
          This review reflects independent editorial assessment based on available product information, store policies, and buyer considerations at the time of update. Plans, pricing, availability, and benefits can change—check the official store page before buying.
        </p>
      </article>
    </main>
  );
}
