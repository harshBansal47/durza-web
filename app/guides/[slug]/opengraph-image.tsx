import { ImageResponse } from "next/og";
import { resilient } from "@/lib/api";
import { loadOgFonts } from "@/lib/og-fonts";
import { LOGO_ASPECT, LOGO_SVG, svgDataUri } from "@/lib/brand";

export const alt = "A Durza buying guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#fafaf8";
const INK = "#141414";
const INK_SOFT = "#565c4e";
const ORANGE = "#ee5a0b";
const LEDGER_LINE = "#d8d4c6";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fonts = await loadOgFonts();

  let title = "A Durza buying guide";
  let summary = "Practical research to help you spend with confidence.";
  let updated = "";

  try {
    const content = await resilient.getEditorial("guide", slug);
    if (content) {
      title = content.title;
      summary = content.summary || summary;
      updated = new Date(content.updated_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  } catch {
    // A share card must never break the page. Fall back to the generic card.
  }

  const serif = fonts.find((f) => f.name === "Fraunces")?.name ?? "serif";
  const sans = fonts.find((f) => f.name === "IBM Plex Sans")?.name ?? "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: 64,
          fontFamily: sans,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <img
            src={svgDataUri(LOGO_SVG)}
            width={Math.round(64 * LOGO_ASPECT)}
            height={64}
            alt="Durza"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: `2px solid ${ORANGE}`,
              borderRadius: 999,
              padding: "10px 18px",
              color: ORANGE,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Buying guide
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div
            style={{
              display: "flex",
              fontFamily: serif,
              fontSize: 54,
              lineHeight: 1.15,
              color: INK,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 26,
              lineHeight: 1.35,
              color: INK_SOFT,
              maxWidth: 900,
            }}
          >
            {summary.length > 170 ? `${summary.slice(0, 167)}…` : summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${LEDGER_LINE}`,
            paddingTop: 24,
            fontSize: 21,
            color: INK_SOFT,
          }}
        >
          <div style={{ display: "flex" }}>Researched from official sources · durza.in/guides</div>
          {updated && <div style={{ display: "flex" }}>Updated {updated}</div>}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
