import { SITE_URL } from "./site";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * An ItemList over the things a listing page actually shows. Items must be
 * visible on the page — a hidden list is exactly what Google penalises.
 */
export function itemListJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/** FAQPage structured data. Only pair this with a visible Q&A on the page. */
export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Maps our community "worked" / "didn't work" reports onto schema.org's
 * AggregateRating (1-5 scale), since that's the vocabulary search engines
 * understand for rich snippets. This is a real, disclosed mapping of a real
 * user signal — not a fabricated rating: successRate 1.0 (always worked) ->
 * 5 stars, successRate 0.0 (never worked) -> 1 star, linear between. Google's
 * structured-data guidelines require ratings to reflect genuine user
 * feedback; ours does, just expressed as a binary rather than a 1-5 input.
 * Returns undefined with zero reports — no rating claimed, none shown.
 */
export function aggregateRatingJsonLd(successCount: number, failCount: number) {
  const total = successCount + failCount;
  if (total === 0) return undefined;
  const ratingValue = ((successCount / total) * 4 + 1).toFixed(2);
  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount: total,
    bestRating: "5",
    worstRating: "1",
  };
}
