"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/brand";

type AdsByGoogle = unknown[] & { requestNonPersonalizedAds?: number };

declare global {
  interface Window {
    adsbygoogle?: AdsByGoogle;
  }
}

/**
 * One responsive AdSense unit.
 *
 * Ads are not gated on the analytics consent banner. Eligible editorial pages
 * show them to every visitor, and every request is marked non-personalized so
 * ad selection does not use the visitor's past behaviour. Google may still use
 * cookies for frequency capping and aggregate reporting; see the privacy page.
 *
 * `slot` lets the article place distinct units (top, mid, lower, end). It falls
 * back to the original content slot so existing deployments keep working.
 * `desktopOnly` is used for the fourth unit: it is never initialized on mobile,
 * which keeps the mobile page to at most three units.
 *
 * The script is loaded here rather than in the root layout, so non-article
 * pages do not pay for it and it only appears on eligible article pages.
 */
export default function AdSenseSlot({
  eligible,
  slot,
  desktopOnly = false,
}: {
  eligible: boolean;
  slot?: string;
  desktopOnly?: boolean;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || BRAND.adsensePublisherId;
  const resolvedSlot = slot || process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT;
  const initialized = useRef(false);
  const [visible, setVisible] = useState(!desktopOnly);

  useEffect(() => {
    if (!desktopOnly) return;
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setVisible(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [desktopOnly]);

  useEffect(() => {
    if (!eligible || !visible || !client || !resolvedSlot) return;
    const scriptId = "google-adsense-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    const initializeSlot = () => {
      if (initialized.current) return;
      window.adsbygoogle = window.adsbygoogle ?? [];
      // https://support.google.com/adsense/answer/7670312
      window.adsbygoogle.requestNonPersonalizedAds = 1;
      window.adsbygoogle.push({});
      initialized.current = true;
    };
    const markLoaded = () => {
      script?.setAttribute("data-loaded", "true");
      initializeSlot();
    };
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
      script.addEventListener("load", markLoaded, { once: true });
      document.head.appendChild(script);
    } else if (script.dataset.loaded === "true") {
      initializeSlot();
    } else {
      script.addEventListener("load", markLoaded, { once: true });
    }
    return () => script?.removeEventListener("load", markLoaded);
  }, [eligible, visible, client, resolvedSlot]);

  if (!eligible || !visible || !client || !resolvedSlot) return null;
  return (
    <ins
      className="adsbygoogle my-10 block min-h-[100px] overflow-hidden text-center"
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={resolvedSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      aria-label="Advertisement"
    />
  );
}
