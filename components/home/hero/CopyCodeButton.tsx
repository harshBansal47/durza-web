"use client";

import { Check, Copy } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { markRevealed } from "@/lib/deviceState";
import { track } from "@/lib/analytics";
import type { HeroDeal } from "@/lib/home-hero";
import { useCopiedFlag, writeClipboard } from "./hooks";

/**
 * Copies the offer's exact code, flips to "COPIED" for two seconds, and raises a
 * toast with an "Open store" action that goes through the tracked /go redirect.
 * Copying counts as revealing the code, which is what unlocks "Did it work?".
 */
export function useCopyDealCode(deal: HeroDeal) {
  const { toast } = useToast();
  const [copied, flash] = useCopiedFlag();

  async function copy() {
    if (!deal.code) return;
    const ok = await writeClipboard(deal.code);
    if (ok) {
      flash();
      markRevealed(deal.id);
      track("copy_code", { coupon_id: deal.id, src: "homepage-hero" });
    }
    toast(ok ? `Code ${deal.code} copied — paste it at ${deal.store.name} checkout` : `Copy failed — your code is ${deal.code}`, {
      type: ok ? "success" : "warning",
      duration: ok ? 6000 : 8000,
      action: ok ? { label: "Open store", onClick: () => window.open(deal.goHref, "_blank", "noopener") } : undefined,
    });
  }
  return { copied, copy };
}

export default function CopyCodeButton({ deal, className = "hx-codebtn" }: { deal: HeroDeal; className?: string }) {
  const { copied, copy } = useCopyDealCode(deal);
  if (!deal.code) return null;
  return (
    <button type="button" className={`${className}${copied ? " copied" : ""}`} onClick={copy} aria-label={`Copy code ${deal.code}`}>
      {copied ? <Check aria-hidden="true" size={13} strokeWidth={3} /> : <Copy aria-hidden="true" size={13} strokeWidth={2.3} />}
      {copied ? "COPIED" : deal.code}
    </button>
  );
}
