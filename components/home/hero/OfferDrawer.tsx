"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { BadgeCheck, Check, Copy, ExternalLink, ShieldCheck, X } from "lucide-react";
import OutboundLink from "@/components/OutboundLink";
import VerifyWidget from "@/components/VerifyWidget";
import { CardSaveButton } from "@/components/CardSaveButton";
import type { HeroDeal } from "@/lib/home-hero";
import { useCopyDealCode } from "./CopyCodeButton";
import StoreMark from "./StoreMark";
import { useDialog } from "./useDialog";

function DrawerCode({ deal }: { deal: HeroDeal }) {
  const { copied, copy } = useCopyDealCode(deal);
  if (!deal.code) {
    return (
      <div className="hx-codebox none">
        <span className="hx-code">NO CODE LISTED</span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--hx-tx2)" }}>Applies at the store</span>
      </div>
    );
  }
  return (
    <div className="hx-codebox">
      <span className="hx-code">{deal.code}</span>
      <button type="button" className={`hx-copybtn${copied ? " copied" : ""}`} onClick={copy} aria-label={`Copy code ${deal.code}`}>
        {copied ? <Check aria-hidden="true" size={14} strokeWidth={3} /> : <Copy aria-hidden="true" size={14} strokeWidth={2.3} />}
        {copied ? "Copied" : "Copy code"}
      </button>
    </div>
  );
}

/** Right-hand offer panel: code, what we checked and when, the store's own terms, and the real "did it work?" vote. */
export default function OfferDrawer({ deal, onClose }: { deal: HeroDeal; onClose: () => void }) {
  const ref = useRef<HTMLElement>(null);
  useDialog(ref, onClose);

  return createPortal(
    <div className="hx-portal">
      <div className="hx-scrim" onClick={onClose} aria-hidden="true" />
      <aside className="hx-drawer" ref={ref} role="dialog" aria-modal="true" aria-label={`Offer details: ${deal.store.name}`} tabIndex={-1}>
        <div className={`hx-dr-head${deal.verified ? "" : " plain"}`}>
          {deal.verified ? <ShieldCheck aria-hidden="true" size={16} strokeWidth={2.4} /> : <BadgeCheck aria-hidden="true" size={16} strokeWidth={2.4} />}
          {deal.verified ? "VERIFIED OFFER" : "OFFER DETAILS"}
          <button type="button" className="hx-iconbtn" style={{ marginLeft: "auto" }} aria-label="Close offer details" onClick={onClose}>
            <X aria-hidden="true" size={14} strokeWidth={2.6} />
          </button>
        </div>

        <div className="hx-dr-body">
          <div className="hx-dr-storeline">
            <StoreMark store={deal.store} size={52} />
            <div>
              <Link href={`/stores/${deal.store.slug}`} className="hx-dr-store" onClick={onClose}>
                {deal.store.name}
              </Link>
              <div className="hx-dr-cat">
                {[deal.category, deal.store.offerCount != null ? `${deal.store.offerCount} live offers` : null].filter(Boolean).join(" · ")}
              </div>
            </div>
          </div>
          <h3 className="hx-dr-title">{deal.title}</h3>
          <div className="hx-dr-off">
            {deal.discount}
            {deal.endsInDays !== null && ` · ${deal.endsInDays === 0 ? "ends today" : `ends in ${deal.endsInDays} day${deal.endsInDays === 1 ? "" : "s"}`}`}
          </div>

          <DrawerCode deal={deal} />

          <div className={`hx-verify${deal.verified ? "" : " unverified"}`}>
            <ShieldCheck aria-hidden="true" size={14} strokeWidth={2.4} />
            <span>
              {deal.checkedLabel ? (
                <>
                  Last checked <b>{deal.checkedLabel}</b> against the store&apos;s page.
                </>
              ) : (
                <>Not re-checked yet — treat it as unconfirmed.</>
              )}{" "}
              {deal.verified ? "Status: verified." : "Status: not yet independently verified."}
            </span>
          </div>

          {deal.terms.length > 0 && (
            <>
              <div className="hx-sect">Stated terms — as published by the store</div>
              <ul className="hx-terms">
                {deal.terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </>
          )}

          {deal.sourceText && (
            <>
              <div className="hx-sect">Source</div>
              <p className="hx-source">{deal.sourceText}</p>
            </>
          )}

          <div className="hx-sect">Did it work?</div>
          <VerifyWidget coupon={deal.coupon} />
        </div>

        <div className="hx-dr-foot">
          <OutboundLink coupon={deal.coupon} storeName={deal.store.name} src="homepage" className="hx-cta">
            Open {deal.store.name}
            {deal.code ? " & paste code" : ""}
            <ExternalLink aria-hidden="true" size={14} strokeWidth={2.4} />
          </OutboundLink>
          <CardSaveButton couponId={deal.id} />
        </div>
      </aside>
    </div>,
    document.body,
  );
}
