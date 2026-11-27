import type { ReactNode } from "react";
import { parseInlineText } from "@/lib/content/inline";

/**
 * Render restricted inline content from the database.
 *
 * Supported syntax only: **bold**, *italic*, [text](href). No raw HTML is ever
 * rendered. `/go/...` and store links are internal (no added rel); external
 * http(s) links open in a new tab with noopener noreferrer; any `tag=` /
 * affiliate params already present in the href are preserved untouched.
 */

const LINK_CLASS =
  "font-semibold text-inkblue underline decoration-inkblue/30 underline-offset-2 hover:decoration-inkblue";

export function renderInline(text: string | null | undefined): ReactNode {
  if (!text) return null;
  const tokens = parseInlineText(text);
  return tokens.map((token, index) => {
    switch (token.type) {
      case "bold":
        return (
          <strong key={index} className="font-semibold text-ink">
            {token.value}
          </strong>
        );
      case "italic":
        return <em key={index}>{token.value}</em>;
      case "link": {
        const external = /^https?:\/\//i.test(token.href);
        return (
          <a
            key={index}
            href={token.href}
            {...(token.href.startsWith("/go/") ? { target: "_blank", rel: "sponsored nofollow noopener noreferrer" } : external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={LINK_CLASS}
          >
            {token.text}
          </a>
        );
      }
      default:
        return <span key={index}>{token.value}</span>;
    }
  });
}
