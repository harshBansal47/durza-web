import type { CollectionEntry } from "@/data/collections";

/**
 * Phase 2 T4 — schema-free publish rules for static collections.
 * The same rules are enforced server-side for DB-backed collections
 * (`couponza/app/services/collection_service.py`).
 */
export function validateCollection(entry: CollectionEntry): string[] {
  const errors: string[] = [];
  if (entry.picks.length < 3) errors.push(`${entry.slug}: needs at least 3 items`);
  entry.picks.forEach((pick, index) => {
    const label = `${entry.slug} item ${index + 1}`;
    if (!pick.why?.trim()) errors.push(`${label}: 'why' must be written by an editor`);
    if (!("skipIf" in pick)) errors.push(`${label}: 'skipIf' field is required (may be empty)`);
    if (!pick.ctaHref) errors.push(`${label}: missing destination link`);
  });
  return errors;
}

export function validateCollections(entries: readonly CollectionEntry[]): string[] {
  return entries.flatMap(validateCollection);
}
