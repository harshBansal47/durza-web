import { ImageResponse } from "next/og";
import { cookies } from "next/headers";
import { mergedCollections } from "@/lib/collections";
import { assetEligibility, shareImageText } from "@/lib/share-image";
import { loadOgFonts } from "@/lib/og-fonts";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const jar = await cookies();
  if (!jar.get("durza_access") && !jar.get("durza_refresh")) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { slug } = await params;
  const entry = (await mergedCollections()).find((item) => item.slug === slug);
  const errors = assetEligibility(entry);
  if (errors.length || !entry) return Response.json({ errors }, { status: 400 });

  const url = new URL(request.url);
  const format = url.searchParams.get("format") === "square" ? "square" : "portrait";
  const size = format === "square" ? { width: 1080, height: 1080 } : { width: 1080, height: 1350 };
  const fonts = await loadOgFonts();
  const text = shareImageText(entry);
  const lines = text.split("\n");

  const image = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f7f6f1", color: "#22261f", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 26, color: "#1f6f4a", letterSpacing: 2 }}>DURZA · CURATED</div>
        <div style={{ fontSize: 58, fontWeight: 700, marginTop: 30, lineHeight: 1.1 }}>{entry.title.slice(0, 100)}</div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 36, fontSize: 26, lineHeight: 1.35 }}>
          {lines.slice(2, 9).map((line, index) => <div key={index}>{line.slice(0, 120)}</div>)}
        </div>
        <div style={{ marginTop: "auto", fontSize: 20, color: "#555" }}>{lines[lines.length - 1]}</div>
      </div>
    ),
    { ...size, fonts },
  );
  if (url.searchParams.get("download") === "1") {
    return new Response(image.body, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="durza-${slug}-${format}.png"`,
      },
    });
  }
  return image;
}
