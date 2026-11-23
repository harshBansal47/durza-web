import type { CollectionEntry } from "@/data/collections";

/**
 * Phase 2 T6 — share text assembled only from existing fields.
 * Items without a source date are never promoted in shared text.
 */
export const DISCLOSURE = "Durza may earn a commission on tracked links at no extra cost to you.";

export function shareUrl(entry: CollectionEntry, origin = "https://durza.in"): string {
  const url = new URL(`/collections/${entry.slug}`, origin);
  url.searchParams.set("utm_source", "share");
  return url.toString();
}

export function buildShareText(entry: CollectionEntry, origin?: string): string {
  const lines = [entry.title, "", entry.summary, ""];
  const sourced = entry.picks.filter((pick) => (pick.evidence ?? "").startsWith("Source page seen"));
  for (const pick of sourced) {
    lines.push(`- ${pick.name}: ${pick.why} (${pick.evidence})`);
  }
  lines.push("", DISCLOSURE, "", shareUrl(entry, origin));
  return lines.join("\n").trim();
}

export function buildDigestText(
  collections: readonly CollectionEntry[],
  offers: readonly { title: string; source_url: string | null; checked_on: string | null; evidence_tier: string }[],
  origin?: string,
): string {
  const lines = ["DRAFT — Durza weekly digest (copy only; nothing is sent)", "", "Curated collections", ""];
  for (const entry of collections.slice(0, 5)) {
    lines.push(`- ${entry.title}: ${shareUrl(entry, origin)}`);
  }
  lines.push("", "Sourced offers", "");
  const sourced = offers.filter(
    (offer) => offer.evidence_tier === "source_seen" && offer.source_url && offer.checked_on,
  );
  for (const offer of sourced) {
    lines.push(`- ${offer.title} — source checked ${new Date(offer.checked_on as string).toLocaleDateString("en-IN")}`);
  }
  lines.push("", DISCLOSURE);
  return lines.join("\n").trim();
}
