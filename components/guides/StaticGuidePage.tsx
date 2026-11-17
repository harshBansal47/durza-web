import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import type { StaticGuide } from "@/data/store-guides";
import JsonLd from "@/components/JsonLd";
import AdSenseSlot from "@/components/editorial/AdSenseSlot";
import { BRAND } from "@/lib/brand";
import GuideCodeCta from "@/components/guides/GuideCodeCta";
import GuideInteractiveToolCard from "@/components/guides/GuideInteractiveToolCard";
import AdidasStyleCompare from "@/components/guides/AdidasStyleCompare";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { toolHref } from "@/data/store-glossary";

/**
 * Renders a statically authored buying guide — used only when the DB editorial
 * layer has no row for the slug. Everything a user needs is here: ₹-first
 * buying advice, one deal CTA, FAQPage-answered FAQs (rendered 1:1 into the
 * FAQPage JSON-LD) and bidirectional internal links (guide → store hub,
 * guide → related stores).
 */

function storeDisplayName(slug: string): string {
  return slug
    .replace(/-com-ecommerce-cps-india$/, "")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function StaticGuideJsonLd({ guide }: { guide: StaticGuide }) {
  const url = `${SITE_URL}/guides/${guide.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.seo.title,
          description: guide.seo.description,
          author: { "@type": "Organization", name: "Durza Coupons India", url: SITE_URL },
          publisher: { "@type": "Organization", name: "Durza Coupons India", url: SITE_URL },
          datePublished: guide.auditedOn ?? "2026-11-14",
          dateModified: guide.auditedOn ?? "2026-11-14",
          mainEntityOfPage: url,
          ...(guide.heroImage ? { image: [`${SITE_URL}${guide.heroImage}`] } : {}),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Buying guides", path: "/guides" },
          { name: storeDisplayName(guide.storeSlug), path: `/guides/${guide.slug}` },
        ])}
      />
      <JsonLd data={faqPageJsonLd(guide.faqs)} />
    </>
  );
}

export const staticGuideMetadata = (guide: StaticGuide): Metadata => ({
  title: guide.seo.title,
  description: guide.seo.description,
  alternates: { canonical: `/guides/${guide.slug}` },
  openGraph: {
    title: guide.seo.title,
    description: guide.seo.description,
    url: `${SITE_URL}/guides/${guide.slug}`,
    type: "article",
    ...(guide.heroImage ? { images: [{ url: `${SITE_URL}${guide.heroImage}` }] } : {}),
  },
});

export default function StaticGuidePage({ guide }: { guide: StaticGuide }) {
  const storeName = storeDisplayName(guide.storeSlug);
  const toolLink = guide.interactiveTool ? toolHref(guide.storeSlug) : undefined;
  // Ad units mirror the editorial article layout: for an article this length
  // (< 900 words) Google placements are the top unit before the body and the
  // end unit before the footer — same as the editorial 2-ad word-count case.
  const contentAdSlot = process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT;
  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || BRAND.adsenseSlots.top || contentAdSlot;
  const endAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_END || BRAND.adsenseSlots.end || contentAdSlot;

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <StaticGuideJsonLd guide={guide} />

      <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
        {guide.category} · Shopping guide
      </p>
      <h1 className="mt-2 font-serif text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {guide.seo.title}
      </h1>
      <p className="mt-3 text-base leading-7 text-ink-soft">{guide.summary}</p>

      {guide.heroImage && (
        <div
          className={`relative mt-6 w-full overflow-hidden rounded-2xl border border-ledger-line bg-paper-raised ${
            guide.heroImageLayout === "editorial" ? "aspect-[16/9]" : "h-44 sm:h-56"
          }`}
        >
          <Image
            src={guide.heroImage}
            alt={guide.heroImageAlt ?? `${storeName} logo`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className={guide.heroImageLayout === "editorial" ? "object-cover" : "object-contain p-6"}
          />
        </div>
      )}

      <AdSenseSlot eligible slot={topAdSlot} />

      <div className="prose prose-slate mt-8 max-w-none text-base leading-8 text-ink-soft">
        {guide.blocks.map((block, i) => {
          switch (block.type) {
            case "callout":
              return (
                <blockquote
                  key={i}
                  className="my-6 rounded-2xl border-l-4 border-amber-400 bg-amber-50 px-5 py-4 text-ink"
                >
                  {block.text}
                </blockquote>
              );
            case "heading":
              return (
                <h2 key={i} className="mt-10 font-serif text-2xl font-extrabold text-ink">
                  {block.heading}
                </h2>
              );
            case "paragraph":
              return (
                <p key={i} className="my-5 text-base leading-8 text-ink-soft">
                  {block.text}
                </p>
              );
            case "list":
              return (
                <ul key={i} className="my-5 space-y-2 pl-6 text-base leading-7 text-ink-soft">
                  {block.items.map((item, j) => (
                    <li key={j} className="list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            case "ordered_list":
              return (
                <ol key={i} className="my-5 space-y-2 pl-6 text-base leading-7 text-ink-soft">
                  {block.items.map((item, j) => (
                    <li key={j} className="list-decimal">
                      {item}
                    </li>
                  ))}
                </ol>
              );
            case "table":
              return (
                <div key={i} className="my-6 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
                  <table className="min-w-full text-sm">
                    <thead className="bg-paper-raised">
                      <tr>
                        {block.headers.map((h, j) => (
                          <th key={j} scope="col" className="px-4 py-3 text-left font-bold text-ink">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, j) => (
                        <tr key={j} className="border-t border-slate-100">
                          {row.map((cell, k) => (
                            <td key={k} className="px-4 py-3 text-ink-soft">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>

      {guide.interactiveTool && toolLink && (
        <GuideInteractiveToolCard
          storeName={storeName}
          href={toolLink}
          headline={guide.interactiveTool.headline}
          sublabel={guide.interactiveTool.sublabel}
        />
      )}

      {guide.slug === "adidas-india-ultraboost-originals-training-2026-guide" && (
        <AdidasStyleCompare />
      )}

      {guide.primaryCta && (
        <GuideCodeCta storeSlug={guide.storeSlug} storeName={storeName} cta={guide.primaryCta} />
      )}

      <FaqAccordion faqs={guide.faqs} />

      <AdSenseSlot eligible slot={endAdSlot} />

      <aside className="not-prose mt-10 border-t border-ledger-line pt-8">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-inkblue">
          Keep exploring
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link
            href={`/stores/${guide.storeSlug}`}
            className="group flex h-full flex-col rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/80 via-slate-50 to-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-300"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-indigo-600">Store hub</p>
            <p className="mt-1 font-semibold leading-tight text-ink">
              View all {storeName} coupons &amp; deals
            </p>
            <ArrowRight
              aria-hidden="true"
              className="mt-3 h-4 w-4 text-indigo-600 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
          {guide.relatedStores.slice(0, 2).map((slug) => (
            <Link
              key={slug}
              href={`/stores/${slug}`}
              className="group flex h-full flex-col rounded-2xl border border-ledger-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-inkblue"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Related store</p>
              <p className="mt-1 font-semibold capitalize leading-tight text-ink">
                {storeDisplayName(slug)} coupons
              </p>
              <ArrowRight
                aria-hidden="true"
                className="mt-3 h-4 w-4 text-ink-soft transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          ))}
        </div>
      </aside>

      {guide.auditedOn && (
        <p className="mt-8 border-t border-ledger-line pt-6 text-[10px] uppercase tracking-wider text-ink-soft">
          Audited {new Date(guide.auditedOn).toLocaleDateString("en-IN")} · Offers linked via Durza&apos;s tracked affiliate routes
        </p>
      )}
    </article>
  );
}

/** FAQ accordion — emits no JSON-LD; the page-level FAQPage script mirrors this content. */
function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section aria-labelledby="faq" className="mt-10">
      <h2 id="faq" className="font-serif text-2xl font-extrabold text-ink">
        FAQs
      </h2>
      <div className="mt-4 space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-xl border border-ledger-line bg-white p-4">
            <summary className="cursor-pointer text-base font-semibold text-ink">
              {faq.question}
            </summary>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
