import { SITE_URL } from "./site";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * A meta description is one plain-text line and search engines cut it near
 * 155-160 characters. Copy from the API arrives as paragraphs and can contain
 * newlines, which is what renders a snippet as a half sentence. Collapse the
 * whitespace and, when the text is too long, stop at the last word boundary
 * before the limit and trim trailing punctuation so the ellipsis does not
 * follow a comma. Returns undefined for empty input so callers can fall back
 * to their own copy.
 */
export function metaDescription(text: string | null | undefined, max = 158): string | undefined {
  const normalized = text?.replace(/\s+/g, " ").trim();
  if (!normalized) return undefined;
  if (normalized.length <= max) return normalized;
  const clipped = normalized.slice(0, max - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  const base = (lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).replace(
    /[\s,;:.!?\-–—]+$/,
    "",
  );
  return `${base}…`;
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
 * The site's Organization entity — name, URL and the logo we actually ship.
 * Nothing here is a claim: no ratings, no founding date, no address.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Durza",
    url: SITE_URL,
    logo: absoluteUrl("/logo.png"),
  };
}

/**
 * WebSite node with the SearchAction for the search box the site actually
 * has (/search?q=…), so engines can wire their sitelinks search box to it.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Durza",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
