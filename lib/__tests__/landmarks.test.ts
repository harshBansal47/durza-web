import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * `app/layout.tsx` already wraps every route in `<main id="main">`. A page that renders its
 * own `<main>` nests one inside the other: invalid HTML, and two "main" landmarks for a
 * screen reader. Pages use a <div> or <section>.
 */
function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "__tests__" && entry.name !== "node_modules") sourceFiles(path, out);
    } else if (path.endsWith(".tsx") && !path.endsWith(".test.tsx")) out.push(path);
  }
  return out;
}

describe("landmarks", () => {
  it("only the root layout (and the standalone global-error page) render <main>", () => {
    const root = process.cwd();
    const allowed = new Set([join(root, "app/layout.tsx"), join(root, "app/global-error.tsx")]);
    const offenders = [...sourceFiles(join(root, "app")), ...sourceFiles(join(root, "components"))]
      .filter((file) => !allowed.has(file))
      .filter((file) => /<main[\s>]/.test(readFileSync(file, "utf8")));
    expect(offenders.map((file) => file.replace(root + "/", ""))).toEqual([]);
  });
});
