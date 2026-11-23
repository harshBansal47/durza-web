import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/og-fonts";
import { mergedCollections } from "@/lib/collections";

export const alt = "Durza curated collection";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Text-only share image built from existing collection fields (Phase 2 T6). */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = (await mergedCollections()).find((item) => item.slug === slug);
  const fonts = await loadOgFonts();
  const sans = fonts.find((f) => f.name === "IBM Plex Sans")?.name ?? "sans-serif";
  const title = entry?.title ?? "Durza curated collection";
  const summary = entry?.summary ?? "Discover genuine deals. Shop smarter. Save more.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "center", backgroundColor: "#f7f6f1", padding: 80, fontFamily: sans,
        }}
      >
        <div style={{ fontSize: 24, color: "#1f6f4a", letterSpacing: 3 }}>DURZA · CURATED COLLECTION</div>
        <div style={{ fontSize: 62, fontWeight: 700, color: "#22261f", marginTop: 28, lineHeight: 1.1 }}>{title.slice(0, 110)}</div>
        <div style={{ fontSize: 28, color: "#555", marginTop: 28 }}>{summary.slice(0, 180)}</div>
        <div style={{ fontSize: 22, color: "#1f6f4a", marginTop: 48 }}>Discover genuine deals. Shop smarter. Save more.</div>
      </div>
    ),
    { ...size, fonts },
  );
}
