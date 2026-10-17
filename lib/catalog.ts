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
