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

  it("accepts an h2 heading block", () => {
    const block = contentBlockSchema.parse({ type: "h2", heading: "What Black Friday actually costs you" });
    expect(block.type).toBe("h2");
  });

  it("accepts a paragraph block", () => {
    const block = contentBlockSchema.parse({
      type: "paragraph",
      text: "We pick combinations we would actually recommend to a colleague.",
    });
    expect(block.type).toBe("paragraph");
  });

  it("accepts a list block", () => {
    const block = contentBlockSchema.parse({ type: "list", items: ["One", "Two"] });
    expect(block.type).toBe("list");
  });

  it("accepts an ordered_list block", () => {
    const block = contentBlockSchema.parse({ type: "ordered_list", items: ["First", "Second"] });
    expect(block.type).toBe("ordered_list");
  });

  it("accepts a callout block", () => {
    const block = contentBlockSchema.parse({
      type: "callout",
      text: "The short version: stack in this order.",
    });
    expect(block.type).toBe("callout");
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

  it("accepts a published review content page with paragraph blocks", () => {
    const page = contentPageSchema.parse({
      kind: "review",
      slug: "amazon-prime-india-review-2026",
      title: "Amazon Prime India 2026",
      description: "Prime review.",
      status: "published",
      content_blocks: [
        { type: "callout", text: "Prime pays off under ~2 shipments a year." },
        { type: "paragraph", text: "Amazon Prime India is four plans, not one." },
      ],
      structured_data: {},
    });
    expect(page.content_blocks).toHaveLength(2);
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
