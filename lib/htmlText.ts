const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

function decodeEntity(entity: string): string {
  const named = NAMED_ENTITIES[entity.toLowerCase()];
  if (named) return named;

  const numeric = entity.startsWith("#")
    ? entity[1]?.toLowerCase() === "x"
      ? Number.parseInt(entity.slice(2), 16)
      : Number.parseInt(entity.slice(1), 10)
    : Number.NaN;
  return Number.isInteger(numeric) && numeric > 0 && numeric <= 0x10ffff
    ? String.fromCodePoint(numeric)
    : `&${entity};`;
}

/** Convert feed-provided HTML descriptions into safe, readable plain text. */
export function htmlToText(value: string | null | undefined): string {
  if (!value) return "";

  return value
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li\b[^>]*>/gi, "\n• ")
    .replace(/<\/(p|div|h[1-6]|ul|ol|li|tr)\s*>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z][a-z0-9]+);/gi, (_, entity: string) =>
      decodeEntity(entity),
    )
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}
