/**
 * Serialises structured data for a `<script type="application/ld+json">` tag.
 *
 * `JSON.stringify` alone is not safe there. The browser ends a script element at the first
 * `</script`, whatever surrounds it, and several fields below are not ours: offer titles and
 * descriptions arrive from third-party affiliate feeds. A title containing `</script><script>…`
 * would otherwise run as code on our origin. Escaping `<`, `>` and `&` as unicode escapes keeps
 * the JSON identical to every parser (it decodes back to the same text) while removing every
 * sequence the HTML tokenizer could act on. U+2028/2029 are escaped as well because older
 * script engines treat them as line terminators.
 */
export function jsonLdString(data: unknown): string {
  return (JSON.stringify(data) ?? "null")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
