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
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    unoptimized: process.env.CAPACITOR_BUILD === "true",
  },
  // `headers()` is not supported by a static export (the Capacitor build), so it is only
  // defined for the server build.
  ...(isStaticExport
    ? {}
    : {
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
