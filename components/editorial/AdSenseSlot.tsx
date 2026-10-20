"use client";

import { useEffect, useRef, useState } from "react";
import { getConsent, onConsentChange } from "@/lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * One responsive AdSense unit.
 *
 * `slot` lets the article place distinct units (top, mid, lower, end). It falls
 * back to the original content slot so existing deployments keep working.
 * `desktopOnly` is used for the fourth unit: it is never initialized on mobile,
 * which keeps the mobile page to at most three units.
 *
 * The script is loaded here rather than in the root layout, so non-article
 * pages do not pay for it and it only loads after the visitor has consented.
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
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const resolvedSlot = slot ?? process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT;
  const initialized = useRef(false);
  const [consented, setConsented] = useState(false);
  const [visible, setVisible] = useState(!desktopOnly);

  useEffect(() => {
    const update = () => setConsented(getConsent() === "accepted");
    update();
    return onConsentChange(update);
  }, []);

  useEffect(() => {
    if (!desktopOnly) return;
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setVisible(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [desktopOnly]);

  useEffect(() => {
    if (!eligible || !consented || !visible || !client || !resolvedSlot) return;
    const scriptId = "google-adsense-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    const initializeSlot = () => {
      if (initialized.current) return;
      window.adsbygoogle = window.adsbygoogle ?? [];
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
  }, [eligible, consented, visible, client, resolvedSlot]);

  if (!eligible || !consented || !visible || !client || !resolvedSlot) return null;
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
