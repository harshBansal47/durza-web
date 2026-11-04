import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import PriceHistory from "@/components/product/PriceHistory";
import type { PricePoint } from "@/lib/types";

function point(captured_at: string, price: number): PricePoint {
  return { id: captured_at, product_id: "p", price, captured_at } as PricePoint;
}

const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

describe("PriceHistory trend sentence", () => {
  const fell = [point("2026-01-01T00:00:00Z", 1000), point("2026-02-01T00:00:00Z", 900), point("2026-03-01T00:00:00Z", 800)];

  it("says Down when the price fell from the oldest to the newest capture", () => {
    const out = text(renderToStaticMarkup(<PriceHistory points={fell} currency="INR" currentPrice={800} />));
    expect(out).toMatch(/Down 20% since/);
    expect(out).not.toMatch(/Up \d+%/);
  });

  it("anchors 'since' on the oldest capture, with from=oldest and to=newest", () => {
    const out = text(renderToStaticMarkup(<PriceHistory points={fell} currency="INR" currentPrice={800} />));
    const sentence = out.match(/Down 20% since.*?\./)![0];
    expect(sentence).toMatch(/1 Jan 2026|Jan(uary)? 1,? 2026/);
    expect(sentence.indexOf("1,000")).toBeGreaterThan(-1);
    expect(sentence.indexOf("1,000")).toBeLessThan(sentence.indexOf("800"));
  });

  it("says Up when the price rose, regardless of the order points arrive in", () => {
    const rose = [point("2026-03-01T00:00:00Z", 1200), point("2026-01-01T00:00:00Z", 1000)];
    const out = text(renderToStaticMarkup(<PriceHistory points={rose} currency="INR" currentPrice={1200} />));
    expect(out).toMatch(/Up 20% since/);
  });
});
