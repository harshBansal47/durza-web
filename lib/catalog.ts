/**
 * Every category on the site must render as a human label. The API's `name`
 * is authoritative; if it is ever empty the slug is title-cased instead of
 * leaking a raw path segment like "grocery" or "/categories/grocery".
 */
export function categoryLabel(category: { name?: string | null; slug: string }): string {
  const name = category.name?.trim();
  if (name) return name;
  return category.slug
    .replace(/^\/?categories\//, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

/**
 * Two-letter initials for the store-logo fallback: "Amazon India" → "AI",
 * "Ajio" → "AJ", "Myntra" → "MY". No logo is ever invented from these.
 */
export function storeInitials(name: string | null | undefined): string {
  const words = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
