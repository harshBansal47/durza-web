import type { CollectionEntry } from "@/data/collections";
import { validateCollection } from "@/lib/collection-integrity";
import { DISCLOSURE } from "@/lib/share-text";

/**
 * Eligibility for generated share assets. Text only, no figures, no urgency.
 */
export function assetEligibility(entry: CollectionEntry | undefined): string[] {
  if (!entry) return ["Collection not found"];
  const errors = validateCollection(entry);
  if (entry.picks.length < 3) errors.push("fewer than 3 live items");
  return errors;
}

export function shareImageText(entry: CollectionEntry): string {
  const lines = [entry.title, "", ...entry.picks.slice(0, 5).map((pick) => `- ${pick.name}`), "", DISCLOSURE];
  return lines.join("\n");
}
