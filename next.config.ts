import type { NextConfig } from "next";

const isStaticExport = Boolean(process.env.CAPACITOR_BUILD);

/**
 * Sent on every response. Deliberately conservative: nothing here can break a page, so it is
 * safe to ship without a staging pass.
 *
 * Not included: a Content-Security-Policy. The site loads AdSense and analytics, whose script
 * and frame origins change without notice, so an enforced policy written blind would silently
 * break ads or tracking. Roll one out as `Content-Security-Policy-Report-Only` first and tighten
 * it from the reports.
 */
const securityHeaders = [
  // Browsers must not guess a content type: stops an uploaded/proxied file being run as script.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Do not leak full URLs (which can carry search terms and tokens) to other origins.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site is never meant to be framed; this blocks clickjacking on the vote/copy buttons.
  { key: "X-Frame-Options", value: "DENY" },
  // Nothing here uses the camera, microphone or location, so no embedded script may either.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HTTPS only, for a year. No includeSubDomains/preload: those are one-way doors that should
  // be a deliberate decision, not a side effect of a patch.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  // Do not advertise the framework in a response header.
  poweredByHeader: false,
  images: {
    // Store logos / ad images are admin-supplied URLs from arbitrary hosts.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "https", hostname: "m.media-amazon.com" },
    ],
    unoptimized: process.env.CAPACITOR_BUILD === "true",
  },
  // `headers()` is not supported by a static export (the Capacitor build), so it is only
  // defined for the server build.
  ...(isStaticExport
    ? {}
    : {
        // A real HTTP 308, which a page-level redirect cannot give for a prerendered route.
        // The campaigns catalogue is admin-only now (/admin/campaigns); the old public address
        // is kept only so existing links and search results land somewhere sensible.
        async redirects() {
          return [
            { source: "/affiliate-campaigns", destination: "/", permanent: true },
            { source: "/how-it-works", destination: "/trust", permanent: true },
            // Consolidated duplicate store rows (see stores deduped 2026-11).
            { source: "/stores/pepperfry-com-cps-india", destination: "/stores/pepperfry-com-ecommerce-cps-india", permanent: true },
            { source: "/stores/salty-co-in-ecommerce-cps-india", destination: "/stores/salty", permanent: true },
            { source: "/stores/milton-in", destination: "/stores/milton", permanent: true },
            { source: "/stores/charles-keith", destination: "/stores/charles-and-keith", permanent: true },
            { source: "/stores/aldo-new", destination: "/stores/aldo-shoes", permanent: true },
            // Custom store pages whose route slug differs from the API/store slug.
            { source: "/stores/bath-body-works", destination: "/stores/bath-and-body-works", permanent: true },
            { source: "/stores/bliss-club", destination: "/stores/blissclub", permanent: true },
            { source: "/stores/lenovo-india", destination: "/stores/lenovo", permanent: true },
            { source: "/stores/perforacare-com-ecommerce-cps-india", destination: "/stores/perfora-care", permanent: true },
            { source: "/stores/purevpn-com-utility-cpa-worldwide", destination: "/stores/purevpn", permanent: true },
            { source: "/stores/rforrabbit-com-ecommerce-cps-india", destination: "/stores/r-for-rabbit", permanent: true },
            { source: "/stores/sanskrutihomes-in-ecommerce-cps-india", destination: "/stores/sanskruti-homes", permanent: true },
            { source: "/stores/shoptupperware-in-ecommerce-cps-india", destination: "/stores/shop-tupperware", permanent: true },
            { source: "/stores/veromoda", destination: "/stores/vero-moda", permanent: true },
            // Canonicalized duplicate Tata CLiQ route (raw-suffix canonical kept).
            { source: "/stores/tata-cliq", destination: "/stores/tatacliq-com-ecommerce-cps-india", permanent: true },
            // Beauty toolkit consolidated to single page (sections on one page).
            { source: "/collections/complete-amazon-makeup-toolkit/trending-now", destination: "/collections/complete-amazon-makeup-toolkit#trending-now", permanent: true },
            { source: "/collections/complete-amazon-makeup-toolkit/5-minute-everyday", destination: "/collections/complete-amazon-makeup-toolkit#5-minute-everyday", permanent: true },
            { source: "/collections/complete-amazon-makeup-toolkit/party-glam", destination: "/collections/complete-amazon-makeup-toolkit#party-glam", permanent: true },
            { source: "/collections/complete-amazon-makeup-toolkit/wedding-festive", destination: "/collections/complete-amazon-makeup-toolkit#wedding-festive", permanent: true },
            { source: "/collections/complete-amazon-makeup-toolkit/starter-basics", destination: "/collections/complete-amazon-makeup-toolkit#starter-basics", permanent: true },
            { source: "/collections/complete-amazon-makeup-toolkit/tools-touch-ups", destination: "/collections/complete-amazon-makeup-toolkit#tools-touch-ups", permanent: true },
            { source: "/collections/complete-amazon-makeup-toolkit/college-daily", destination: "/collections/complete-amazon-makeup-toolkit", permanent: true },
            { source: "/collections/complete-amazon-makeup-toolkit/office-ready", destination: "/collections/complete-amazon-makeup-toolkit", permanent: true },
            { source: "/collections/complete-amazon-makeup-toolkit/budget-beauty", destination: "/collections/complete-amazon-makeup-toolkit", permanent: true },
            { source: "/collections/complete-amazon-makeup-toolkit/everyday-essentials", destination: "/collections/complete-amazon-makeup-toolkit", permanent: true },
          ];
        },
        // Content-system Phase 3 preview: /__preview/... is not routable as a
        // Next.js private folder, so rewrite it to the /preview route.
        async rewrites() {
          return [
            { source: "/__preview/:kind/:slug", destination: "/preview/:kind/:slug" },
          ];
        },
        async headers() {
          return [
            { source: "/:path*", headers: securityHeaders },
            {
              // Files in /public are served `max-age=0` by default, so every visit revalidates
              // every logo. Matched by extension only: `/stores/<slug>` is an HTML page and
              // must keep its own caching. A day, then serve stale while refreshing, because
              // these filenames are not content-hashed.
              source: "/:dir(stores|site_images)/:file(.+\\.(?:png|jpe?g|webp|svg|gif|ico))",
              headers: [
                { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
