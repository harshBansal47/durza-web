import type { Metadata } from "next";
import { Suspense } from "react";
import { GeistSans, GeistMono } from "geist/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterAd, { FooterAdFallback } from "@/components/FooterAd";
import PriceAlertBanner from "@/components/PriceAlertBanner";
import PromoStrip from "@/components/PromoStrip";
import { MobileTabBar } from "@/components/MobileTabBar";
import { AnalyticsPageView } from "@/components/Analytics";
import ToastProvider from "@/components/ui/Toast";
import ConsentBanner from "@/components/ConsentBanner";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import InstallPrompt from "@/components/InstallPrompt";
import { BRAND } from "@/lib/brand";
import { getHasComparisons } from "@/lib/layout-data";
import { SessionProvider } from "@/components/session/SessionProvider";
import "@fontsource-variable/newsreader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Durza",
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Durza",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "google-adsense-account": BRAND.adsensePublisherId,
  },
  openGraph: {
    type: "website",
    siteName: "Durza",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: BRAND.paper,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const NAV_LINKS = [
  { href: "/deals", label: "Deals" },
  { href: "/coupons", label: "Coupons" },
  { href: "/stores", label: "Stores" },
  { href: "/guides", label: "Guides" },
  { href: "/compare", label: "Compare" },
];

const MORE_NAV_LINKS = [
  { href: "/bank-offers", label: "Bank & card offers" },
  { href: "/categories", label: "Categories" },
  { href: "/reviews", label: "Reviews" },
  { href: "/collections", label: "Collections" },
  { href: "/saved", label: "Saved" },
  { href: "/trust", label: "How Durza works" },
];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The only data the shell waits on. Session state and the footer ad are
  // deliberately NOT awaited here: reading the session cookie would opt every
  // route in the app into dynamic rendering, and the ad sits behind Suspense.
  const hasComparisons = await getHasComparisons();

  const navLinks = hasComparisons
    ? NAV_LINKS
    : NAV_LINKS.filter((l) => l.href !== "/compare");
  const moreNavLinks = hasComparisons
    ? MORE_NAV_LINKS
    : MORE_NAV_LINKS.filter((l) => l.href !== "/compare");

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {/* Organization + WebSite speak for the whole site, once. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <SessionProvider>
          <ToastProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
            >
              Skip to content
            </a>
            <PromoStrip />
            <Header links={navLinks} moreLinks={moreNavLinks} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <PriceAlertBanner />
            <Footer
              hasComparisons={hasComparisons}
              adSlot={
                <Suspense fallback={<FooterAdFallback />}>
                  <FooterAd />
                </Suspense>
              }
            />
            <MobileTabBar />
            <InstallPrompt />
            <ConsentBanner />
            <AnalyticsPageView />
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
