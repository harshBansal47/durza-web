import type { CollectionEntry } from "@/data/collections";

/**
 * Share text assembled only from existing collection fields.
 */
export const DISCLOSURE = "Durza may earn a commission on tracked links at no extra cost to you.";

export function shareUrl(entry: CollectionEntry, origin = "https://durza.in"): string {
  const url = new URL(`/collections/${entry.slug}`, origin);
  url.searchParams.set("utm_source", "share");
  return url.toString();
}

export function buildShareText(entry: CollectionEntry, origin?: string): string {
  const lines = [entry.title, "", entry.summary, ""];
  for (const pick of entry.picks.slice(0, 5)) {
    lines.push(`- ${pick.name}: ${pick.why}`);
  }
  lines.push("", DISCLOSURE, "", shareUrl(entry, origin));
  return lines.join("\n").trim();
}

export function buildDigestText(
  collections: readonly CollectionEntry[],
  offers: readonly { title: string }[],
  origin?: string,
): string {
  const lines = ["DRAFT — Durza weekly digest (copy only; nothing is sent)", "", "Curated collections", ""];
  for (const entry of collections.slice(0, 5)) {
    lines.push(`- ${entry.title}: ${shareUrl(entry, origin)}`);
  }
  lines.push("", "Offers", "");
  for (const offer of offers) {
    lines.push(`- ${offer.title}`);
  }
  lines.push("", DISCLOSURE);
  return lines.join("\n").trim();
}
