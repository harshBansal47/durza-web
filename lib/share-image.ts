import type { CollectionEntry } from "@/data/collections";
import { validateCollection } from "@/lib/collection-integrity";
import { DISCLOSURE } from "@/lib/share-text";

/**
 * Phase 3 T7 — eligibility for generated share assets. Text only, no figures,
 * no urgency, no "verified" wording unless a tier is checkout-tested.
 */
export function assetEligibility(entry: CollectionEntry | undefined): string[] {
  if (!entry) return ["Collection not found"];
  const errors = validateCollection(entry);
  const unsourced = entry.picks.filter((pick) => !pick.evidence || pick.evidence === "No source date yet");
  if (unsourced.length) errors.push(`${unsourced.length} item(s) lack a source date`);
  if (entry.picks.length < 3) errors.push("fewer than 3 live items");
  return errors;
}

export function shareImageText(entry: CollectionEntry): string {
  const lines = [entry.title, "", ...entry.picks.slice(0, 5).map((pick) => `- ${pick.name} (${pick.evidence ?? "No source date yet"})`), "", DISCLOSURE];
  return lines.join("\n");
}
