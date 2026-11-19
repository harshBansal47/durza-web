import fs from "node:fs";
import path from "node:path";

function discoverCustomStoreSlugs(): string[] {
  try {
    const storesDir = path.join(process.cwd(), "app", "stores");
    return fs
      .readdirSync(storesDir, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          entry.name !== "[slug]" &&
          entry.name !== "__tests__" &&
          !entry.name.startsWith("."),
      )
      .filter((entry) =>
        fs.existsSync(path.join(storesDir, entry.name, "page.tsx")),
      )
      .map((entry) => entry.name)
      .sort();
  } catch {
    return [];
  }
}

/**
 * Slugs with a designed custom store page at app/stores/<slug>/page.tsx.
 * Derived from the filesystem so adding a custom page automatically opts it out
 * of the generic template and is recognized everywhere (routing guard, sitemap, etc.).
 */
export const CUSTOM_STORE_SLUGS = new Set(discoverCustomStoreSlugs());

export function hasCustomStorePage(slug: string): boolean {
  return CUSTOM_STORE_SLUGS.has(slug);
}
