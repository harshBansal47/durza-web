"use client";

import { useEffect, useState } from "react";

/**
 * BeforeInstallPromptEvent is not yet in the TypeScript DOM lib.
 * It fires when the browser is ready to install the PWA.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsVisible(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm">
      <div className="rounded-2xl border border-ledger-line bg-white p-4 shadow-[var(--shadow-overlay)]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-lg font-bold text-white">
            S
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-ink">Install Savevero</h3>
            <p className="mt-0.5 text-xs text-ink-soft">
              Add to your home screen for quick access to deals and coupons.
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleInstall}
            className="btn-primary flex-1 text-sm"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="btn-ghost text-sm"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
