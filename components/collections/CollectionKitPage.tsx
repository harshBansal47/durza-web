import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CollectionKitClient from "@/components/collections/CollectionKitClient";
import { getCollectionKit } from "@/data/collection-kits";
import { COLLECTIONS, type CollectionEntry } from "@/data/collections";
import { absoluteUrl, faqPageJsonLd } from "@/lib/seo";

/** Shared, image-led collection layout modelled on the Amazon beauty toolkit. */
export default function CollectionKitPage({ entry }: { entry: CollectionEntry }) {
  const kit = getCollectionKit(entry);
  if (!kit) return null;
  const canonical = `/collections/${entry.slug}`;
  const products = kit.sections.flatMap((section) => section.products);
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
    numberOfItems: products.length,
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: product.name,
      description: product.description,
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.metaDescription,
    image: [entry.heroImage],
    datePublished: "2026-11-01",
    dateModified: "2026-11-25",
    author: { "@type": "Organization", name: "Durza Editorial", url: absoluteUrl("/about") },
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
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqPageJsonLd(entry.faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
            { name: entry.title, path: canonical },
          ]}
        />
      </div>

      <CollectionKitClient kit={kit} />

      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <section aria-labelledby="kit-faqs" className="mt-12">
          <h2 id="kit-faqs" className="font-serif text-2xl font-extrabold text-[#141413] sm:text-3xl">
            Frequently asked questions
          </h2>
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

        <section aria-labelledby="kit-explore" className="mt-12 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <h2 id="kit-explore" className="font-serif text-2xl font-extrabold text-[#141413]">Keep exploring</h2>
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
          Live prices, availability and offers are set by each store and can change. Check the final details on the store page before ordering. Some links may be affiliate links that support Durza at no extra cost to you.
        </p>
      </div>
    </div>
  );
}
