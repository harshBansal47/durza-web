"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Download, Share, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Env = "standalone" | "ios" | "android" | "desktop";

/** Read once on the client. Server render assumes "desktop" and React reconciles. */
function getEnv(): Env {
  const nav = navigator as Navigator & { standalone?: boolean };
  if (window.matchMedia("(display-mode: standalone)").matches || nav.standalone) {
    return "standalone";
  }
  const ua = nav.userAgent;
  // iPadOS reports itself as a Mac; touch support is what gives it away.
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && nav.maxTouchPoints > 1)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

const subscribeNever = () => () => {};
const getServerEnv = (): Env => "desktop";

/**
 * Footer "Get the app" card.
 *
 * Installs the PWA. Where the browser offers a native install prompt
 * (Chrome/Edge/Android) the button opens it; everywhere else (iOS Safari,
 * Firefox, desktop Safari) there is no API to call, so the button reveals the
 * short manual steps for that platform right in the card — not an alert box.
 * Hidden entirely once the app is installed or the site is already running as
 * the installed app.
 */
export default function AppDownloadLink() {
  const env = useSyncExternalStore(subscribeNever, getEnv, getServerEnv);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || env === "standalone") return null;

  async function handleInstall() {
    if (deferred) {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      return;
    }
    setShowSteps((open) => !open);
  }

  return (
    <div>
      <p className="text-sm font-medium text-ink">Get the app</p>

      <div className="mt-3 border border-ledger-line bg-paper-raised p-4">
        <div className="flex items-center gap-3">
          <Image
            src="/icon-192.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-xl border border-ledger-line"
          />
          <div className="min-w-0 leading-tight">
            <p className="text-sm font-medium text-ink">Durza</p>
            <p className="mt-0.5 text-xs text-ink-soft">Free · installs in seconds</p>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-ink-soft">
          Price-drop alerts, saved codes and your followed stores, one tap from your home screen.
        </p>

        <Button
          type="button"
          size="sm"
          fullWidth
          className="mt-3"
          leftIcon={<Download className="h-4 w-4" strokeWidth={1.75} />}
          onClick={handleInstall}
          aria-expanded={deferred ? undefined : showSteps}
          aria-controls={deferred ? undefined : "install-steps"}
        >
          Install app
        </Button>

        {!deferred && showSteps && (
          <p
            id="install-steps"
            className="mt-3 border-t border-ledger-line pt-3 text-xs leading-relaxed text-ink-soft"
          >
            {env === "ios" ? (
              <>
                Tap <Share aria-label="Share" className="inline h-3.5 w-3.5 align-text-bottom text-ink" strokeWidth={1.75} />{" "}
                in Safari, then choose <span className="font-medium text-ink">Add to Home Screen</span>.
              </>
            ) : env === "android" ? (
              <>
                Tap <EllipsisVertical aria-label="Menu" className="inline h-3.5 w-3.5 align-text-bottom text-ink" strokeWidth={1.75} />{" "}
                in your browser, then choose <span className="font-medium text-ink">Install app</span> or{" "}
                <span className="font-medium text-ink">Add to Home screen</span>.
              </>
            ) : (
              <>
                Click the install icon at the right of the address bar, or open the browser menu and
                choose <span className="font-medium text-ink">Install Durza</span>.
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}