import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import JsonLd from "@/components/JsonLd";
import { jsonLdString } from "@/lib/json-ld";

const HOSTILE = '</script><script>window.__pwned=1</script>';

describe("jsonLdString", () => {
  it("never emits a character the HTML tokenizer could act on", () => {
    const out = jsonLdString({ name: HOSTILE, a: "x & y", b: "<!-- c -->" });
    expect(out).not.toMatch(/[<>&]/);
  });

  it("round-trips: parsers decode the escapes back to the original text", () => {
    const data = { name: HOSTILE, price: 9.5, nested: { list: ["<b>", "a&b", "\u2028\u2029"] } };
    expect(JSON.parse(jsonLdString(data))).toEqual(data);
  });

  it("escapes the JS line separators", () => {
    expect(jsonLdString("\u2028\u2029")).toBe('"\\u2028\\u2029"');
  });

  it("does not throw on undefined", () => {
    expect(jsonLdString(undefined)).toBe("null");
  });
});

describe("<JsonLd>", () => {
  it("cannot be broken out of by a hostile title", () => {
    const html = renderToStaticMarkup(<JsonLd data={{ "@type": "Offer", name: HOSTILE }} />);
    // exactly one script element: the injected closing tag did not end it early
    expect(html.match(/<script/g)).toHaveLength(1);
    expect(html.match(/<\/script>/g)).toHaveLength(1);
    expect(html).toContain('type="application/ld+json"');
  });
});
