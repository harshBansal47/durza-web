"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSenseSlot({ eligible }: { eligible: boolean }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT;
  const initialized = useRef(false);

  useEffect(() => {
    if (!eligible || !client || !slot) return;
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
  }, [eligible, client, slot]);

  if (!eligible || !client || !slot) return null;
  return (
    <ins
      className="adsbygoogle my-10 block min-h-[100px] overflow-hidden text-center"
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      aria-label="Advertisement"
    />
  );
}
