import { describe, expect, it } from "vitest";
import { contentBlockSchema, contentPageSchema } from "@/lib/content/schema";
import { parseInlineText } from "@/lib/content/inline";
import type { ContentBlock, ContentPage } from "@/lib/content/schema";

describe("parseInlineText", () => {
  it("parses bold, italic and link syntax", () => {
    expect(parseInlineText("Save **20%** on *select* items [here](https://example.com/x) now")).toEqual([
      { type: "text", value: "Save " },
      { type: "bold", value: "20%" },
      { type: "text", value: " on " },
      { type: "italic", value: "select" },
      { type: "text", value: " items " },
      { type: "link", text: "here", href: "https://example.com/x" },
      { type: "text", value: " now" },
    ]);
  });

  it("returns no tokens for empty input", () => {
    expect(parseInlineText(null)).toEqual([]);
    expect(parseInlineText("")).toEqual([]);
  });
});

describe("contentBlockSchema", () => {
  it("accepts a verdict block", () => {
    const block: ContentBlock = contentBlockSchema.parse({
      type: "verdict",
      variant: "quick",
      heading: "Which one should you pick?",
      body: "Pick the cheaper one.",
      ctas: [{ label: "Check Live Price", href: "/go/amazon-in?src=compare-verdict" }],
    });
    expect(block.type).toBe("verdict");
  });

  it("accepts a faq block", () => {
    const block = contentBlockSchema.parse({
      type: "faq",
      items: [{ q: "Is it worth it?", a: "Yes for most.", sort_order: 0 }],
    });
    expect(block.type).toBe("faq");
  });

  it("accepts a table block", () => {
    const block = contentBlockSchema.parse({
      type: "table",
      columns: ["Factor", "Amazon", "Flipkart"],
      rows: [["Price", "₹1", "₹2"]],
    });
    expect(block.type).toBe("table");
  });

  it("rejects an unknown block type", () => {
    expect(contentBlockSchema.safeParse({ type: "not-a-block", body: "x" }).success).toBe(false);
  });
});

describe("contentPageSchema", () => {
  it("accepts a published guide content page", () => {
    const page: ContentPage = contentPageSchema.parse({
      kind: "guide",
      slug: "how-to-stack-myntra-discounts",
      title: "How to Stack Myntra Discounts",
      description: "Stack Myntra discounts the right way.",
      status: "published",
      content_blocks: [{ type: "prose", paragraphs: ["Hello"] }],
      structured_data: {},
      is_indexable: true,
      is_featured: false,
      published_at: "2026-11-25T00:00:00Z",
      updated_at: "2026-11-25T00:00:00Z",
    });
    expect(page.kind).toBe("guide");
    expect(page.content_blocks).toHaveLength(1);
  });

  it("rejects a page missing its title", () => {
    const result = contentPageSchema.safeParse({
      kind: "review",
      slug: "kapiva-himalayan-shilajit-resin-india-review-2026",
      status: "published",
    });
    expect(result.success).toBe(false);
  });
});
