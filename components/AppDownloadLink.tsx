"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Permanent footer entry point to install Durza. Reuses the browser's
 * beforeinstallprompt when it is available; on desktop (where the prompt
 * never fires) it falls back to a short instruction.
 */
export default function AppDownloadLink() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const installedHandler = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  if (installed) return null;

  async function handleClick() {
    if (deferred) {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      return;
    }
    // No native prompt (desktop or unsupported browser): point at the PWA.
    window.alert("Install Durza: use your browser's \"Install app\" or \"Add to Home Screen\" option from the address bar.");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-accent"
    >
      <Download aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
      Get the app
    </button>
  );
}
