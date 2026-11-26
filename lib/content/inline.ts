/**
 * Restricted inline-text parser for content blocks.
 *
 * Supported inline syntax (intentionally tiny — no HTML ever enters from the
 * database):
 *   **bold**, *italic*, [text](href)
 *
 * Returns tokens so block renderers can compose React nodes without re-parsing
 * per render. Unknown syntax is treated as plain text.
 */

export type InlineToken =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "italic"; value: string }
  | { type: "link"; text: string; href: string };

const INLINE_PATTERN = /(\*\*[^*]+\*\*)|(\*[^*\n]+\*)|(\[[^\]]+\]\([^)\s]+\))/g;

const LINK_PATTERN = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

export function parseInlineText(input: string | null | undefined): InlineToken[] {
  if (!input) return [];
  const tokens: InlineToken[] = [];
  const pattern = new RegExp(INLINE_PATTERN.source, "g");
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(input)) !== null) {
    if (match.index > cursor) {
      tokens.push({ type: "text", value: input.slice(cursor, match.index) });
    }
    const whole = match[0];
    const bold = match[1];
    const italic = match[2];
    const link = match[3];
    if (bold) {
      tokens.push({ type: "bold", value: bold.slice(2, -2) });
    } else if (italic) {
      tokens.push({ type: "italic", value: italic.slice(1, -1) });
    } else if (link) {
      const parsed = LINK_PATTERN.exec(link);
      if (parsed) tokens.push({ type: "link", text: parsed[1], href: parsed[2] });
      else tokens.push({ type: "text", value: link });
    }
    cursor = match.index + whole.length;
  }
  if (cursor < input.length) tokens.push({ type: "text", value: input.slice(cursor) });
  return tokens;
}
