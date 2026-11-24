import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans, GeistMono } from "geist/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterAd, { FooterAdFallback } from "@/components/FooterAd";
import SavedUpdatesBanner from "@/components/SavedUpdatesBanner";
import { FilterNavigationProvider } from "@/components/filters/FilterNavigation";
import { MobileTabBar } from "@/components/MobileTabBar";
import { AnalyticsPageView } from "@/components/Analytics";
import ToastProvider from "@/components/ui/Toast";
import ConsentBanner from "@/components/ConsentBanner";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, TITLE_TEMPLATE } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import InstallPrompt from "@/components/InstallPrompt";
import QueryProvider from "@/components/providers/QueryProvider";
import { BRAND } from "@/lib/brand";
import { getHasComparisons } from "@/lib/layout-data";
import { SessionProvider } from "@/components/session/SessionProvider";
import "@fontsource-variable/newsreader";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: TITLE_TEMPLATE,
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
    "fo-verify": BRAND.verification.foVerify,
  },
  openGraph: {
    type: "website",
    siteName: "Durza Coupons India",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The only data the shell waits on. Session state and the footer ad are
  // deliberately NOT awaited here: reading the session cookie would opt every
  // route in the app into dynamic rendering, and the ad sits behind Suspense.
  const hasComparisons = await getHasComparisons().catch(() => false);

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {/* Organization + WebSite speak for the whole site, once. */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <QueryProvider>
          <SessionProvider>
            <ToastProvider>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
              >
                Skip to content
              </a>
              <Header />
              <FilterNavigationProvider>
                <main id="main" className="flex-1">
                  {children}
                </main>
              </FilterNavigationProvider>
              <SavedUpdatesBanner />
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
              <Analytics />
            </ToastProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
