import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { displayName, getSessionUser } from "@/lib/session";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceAlertBanner from "@/components/PriceAlertBanner";
import PromoStrip from "@/components/PromoStrip";
import { MobileTabBar } from "@/components/MobileTabBar";
import { AnalyticsPageView } from "@/components/Analytics";
import { getSponsored } from "@/lib/ads";
import ToastProvider from "@/components/ui/Toast";
import ConsentBanner from "@/components/ConsentBanner";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import InstallPrompt from "@/components/InstallPrompt";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Durza",
  },
  description: SITE_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Durza",
  },
  formatDetection: {
    telephone: false,
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
  themeColor: "#fafaf8",
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
  { href: "/categories", label: "Categories" },
  { href: "/reviews", label: "Reviews" },
  { href: "/collections", label: "Collections" },
  { href: "/saved", label: "Saved" },
  { href: "/trust", label: "How Durza works" },
];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, footerAd] = await Promise.all([
    getSessionUser().catch(() => null),
    getSponsored("footer"),
  ]);

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
        <ToastProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          <PromoStrip />
          <Header links={NAV_LINKS} moreLinks={MORE_NAV_LINKS} user={user ? { name: displayName(user) } : null} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <PriceAlertBanner />
          <Footer ad={footerAd} />
          <MobileTabBar />
          <InstallPrompt />
          <ConsentBanner />
          <AnalyticsPageView />
        </ToastProvider>
      </body>
    </html>
  );
}
