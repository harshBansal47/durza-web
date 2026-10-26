"use client";

/**
 * Last line of defence against a blank white page.
 *
 * `app/error.tsx` catches a crash inside a page, but it renders *inside* the
 * root layout. If the layout itself throws, nothing is left to render it, and
 * the visitor sees an empty screen. This replaces the whole document instead.
 *
 * It is deliberately self-contained: the layout (and with it the stylesheet,
 * fonts and providers) may be the thing that failed, so there are inline styles
 * and plain elements here, nothing imported from the app.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#f6f5f2",
          color: "#1c1b18",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <main style={{ maxWidth: 440, textAlign: "center" }}>
          <h1 style={{ fontSize: 24, margin: "0 0 8px" }}>Something went wrong on our side</h1>
          <p style={{ margin: "0 0 20px", lineHeight: 1.5, color: "#5b574f" }}>
            The page could not load. It is usually temporary: try again, or head back to the home page.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                minHeight: 44,
                padding: "0 20px",
                border: 0,
                borderRadius: 10,
                background: "#c2410c",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* A plain anchor on purpose: a full page load resets whatever state broke. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                minHeight: 44,
                padding: "0 20px",
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid #1c1b18",
                borderRadius: 10,
                color: "#1c1b18",
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Go to Durza home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
