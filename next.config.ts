import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.CAPACITOR_BUILD ? "export" : undefined,
  images: {
    // Store logos / ad images are admin-supplied URLs from arbitrary hosts.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    unoptimized: process.env.CAPACITOR_BUILD === "true",
  },
};

export default nextConfig;
