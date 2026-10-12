import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/og-fonts";
import { LOGO_ASPECT, LOGO_SVG, svgDataUri } from "@/lib/brand";

export const alt = "Durza: Coupon & Deals — deals verified by people, not paid placement";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f7f6f1";
const INK = "#22261f";
const VERIFIED = "#1f6f4a";

export default async function Image() {
  const fonts = await loadOgFonts();
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
          justifyContent: "center",
          backgroundColor: PAPER,
          padding: 80,
          fontFamily: sans,
        }}
      >
        <img
          src={svgDataUri(LOGO_SVG)}
          width={Math.round(96 * LOGO_ASPECT * 1.15)}
          height={Math.round(96 * 1.15)}
          alt="Durza: Coupon & Deals"
          style={{ marginBottom: 40 }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: serif,
            fontSize: 64,
            lineHeight: 1.2,
            color: INK,
            maxWidth: 980,
          }}
        >
          The deals we show you, verified by people — not by whoever paid us most.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: VERIFIED, marginTop: 32 }}>
          Every code has a real success rate. Every commission is disclosed.
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
