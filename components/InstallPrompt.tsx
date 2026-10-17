"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/Logo";

/**
 * BeforeInstallPromptEvent is not yet in the TypeScript DOM lib.
 * It fires when the browser is ready to install the PWA.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * The banner belongs on phones and tablets, never on desktop, and it asks at
 * most once: whichever way the visitor answers — "Not now", or cancelling the
 * native install dialog — the answer is remembered on the device and the
 * banner does not come back page after page.
 */
const MAX_TABLET_WIDTH = 1366;
const ANSWERED_KEY = "durza.install-prompt.answered";

/**
 * Phones and tablets have touch screens and fit tablet width. A narrow desktop
 * window has no touch points, and a touch laptop at desktop width is desktop.
 */
function isCandidateDevice() {
  if (typeof window === "undefined") return false;
  const touch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
  return touch && window.innerWidth <= MAX_TABLET_WIDTH;
}

function hasAnswered() {
  try {
    return window.localStorage.getItem(ANSWERED_KEY) === "1";
  } catch {
    // Storage blocked — fall back to asking (nothing can be remembered).
    return false;
  }
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      // Desktop (no touch), an already-answered device, or anything wider than
      // a tablet: the banner simply never appears.
      if (!isCandidateDevice() || hasAnswered()) return;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleResize = () => {
      // Rotating or resizing into desktop width puts the banner away.
      setIsVisible((visible) => visible && isCandidateDevice());
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /** Either answer ends the question for good. */
  function rememberAnswer() {
    try {
      window.localStorage.setItem(ANSWERED_KEY, "1");
    } catch {
      // Storage blocked: the banner still hides for this page view.
    }
    setIsVisible(false);
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    // Accepted or cancelled, the visitor has answered the install question:
    // do not ask again on the next page.
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    rememberAnswer();
  };

  // Installed PWAs run standalone. Rendering null for them is identical on
  // server and client (the prompt is never visible before hydration anyway),
  // so no state is needed — unlike isInstalled, which used to force a
  // setState inside the effect below.
  const isStandalone =
    typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches;

  if (!isVisible || isStandalone) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm">
      <div className="rounded-2xl border border-ledger-line bg-white p-4 shadow-[var(--shadow-overlay)]">
        <div className="flex items-start gap-3">
          <LogoMark size={40} />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-ink">Install Durza</h3>
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
            onClick={rememberAnswer}
            className="btn-ghost text-sm"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
