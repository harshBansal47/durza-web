import { NextResponse } from "next/server";

/**
 * The `amazon-vs-flipkart-electronics-2026` comparison was removed (content
 * system migration). Permanently redirect any inbound links to the canonical
 * Amazon-vs-Flipkart smartphone comparison instead. A true HTTP 301 (not
 * Next.js's permanent `308`), and its links are removed from other pages'
 * related sections.
 */
const TARGET =
  `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://durza.in"}/compare/best-smartphone-deals-india-amazon-vs-flipkart-2026`;

export const dynamic = "force-static";

export function GET() {
  return NextResponse.redirect(TARGET, 301);
}
