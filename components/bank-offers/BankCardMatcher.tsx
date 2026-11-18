"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ExternalLink } from "lucide-react";
import { GO_REL } from "@/lib/go";

type TabId = "tech" | "everyday" | "travel" | "home";

const TABS: { id: TabId; label: string }[] = [
  { id: "tech", label: "Laptops & Big Electronics (₹30K+)" },
  { id: "everyday", label: "Everyday Online Shopping (Under ₹25K)" },
  { id: "travel", label: "Flights & Hotels" },
  { id: "home", label: "Home Appliances & Furniture" },
];

const CONTENT: Record<TabId, { bestMove: string; trap?: string; ctas: { href: string; label: string; external?: boolean; down?: boolean }[] }> = {
  tech: {
    bestMove:
      "Use core HDFC, ICICI, or SBI credit cards when a 10% instant bank discount banner is active (typically ₹1,750–₹8,000 caps) on Amazon, Flipkart, Lenovo.com, or ASUS eShop—or swipe Amazon Pay ICICI (unlimited 5% for Prime) when no instant-discount banner is live.",
    trap:
      "Co-branded Cashback SBI and Flipkart SBI cards are excluded from SBI 10% instant-discount sale banners, and EMI orders forfeit cashback on most co-branded cards.",
    ctas: [
      { href: "/go/lenovo-india?src=bank-matcher-tech", label: "Check Lenovo.com Bank Offers →", external: true },
      { href: "/go/amazon-in?src=bank-matcher-tech", label: "Check Amazon India Bank Slabs →", external: true },
    ],
  },
  everyday: {
    bestMove:
      "Swipe Cashback SBI Card (5% online cashback up to ₹2,000/statement cycle = ₹40,000 monthly spend cap), Amazon Pay ICICI (unlimited 5% on Amazon for Prime / 3% non-Prime), or HDFC Millennia (5% CashPoints on Amazon, Flipkart, Myntra, Swiggy/Zomato up to 1,000 pts/calendar month = ₹20,000 spend).",
    trap:
      "Above ₹40,000/month on SBI Cashback or ₹20,000/month on HDFC Millennia, the 5% rate drops off—switch to a second card for larger carts.",
    ctas: [
      { href: "/go/amazon-in?src=bank-matcher-everyday", label: "Shop Amazon India →", external: true },
      { href: "/stores", label: "Browse All Partner Stores →", external: false },
    ],
  },
  travel: {
    bestMove:
      "Compare bank promo codes and card offers on travel booking sites, and check the final payable amount on the checkout page. Terms, caps, and eligible cards vary by campaign and booking type.",
    ctas: [{ href: "#live-offers", label: "Jump to Live Travel Bank Codes ↓", external: false, down: true }],
  },
  home: {
    bestMove:
      "Check Havells and Nilkamal Furniture official stores for bank instant discounts and No-Cost EMI plans—always confirm the checkout banner explicitly reads “Valid on Credit Card EMI” before choosing EMI over a full swipe.",
    ctas: [
      { href: "/go/havells?src=bank-matcher-home", label: "Check Havells Official Store →", external: true },
      { href: "/go/nilkamalfurniture?src=bank-matcher-home", label: "Check Nilkamal Furniture →", external: true },
    ],
  },
};

export default function BankCardMatcher() {
  const [active, setActive] = useState<TabId>("tech");
  const data = CONTENT[active];

  return (
    <section aria-labelledby="card-matcher-heading" className="mt-10 rounded-3xl border border-ledger-line bg-white p-5 shadow-sm sm:p-7">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-inkblue">Smart card picker</p>
      <h2 id="card-matcher-heading" className="mt-2 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
        Which Card Should You Swipe Today?
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft sm:text-base">
        Pick your purchase category to see a practical card strategy, common traps, and tracked store links. Always confirm the live offer terms on the checkout page before paying.
      </p>

      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Purchase categories">
        {TABS.map((tab) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.id)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                selected
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-ledger-line bg-paper text-ink hover:border-slate-900/40 hover:bg-paper-alt",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 sm:p-5">
          <h3 className="font-semibold text-green-900">Best move</h3>
          <p className="mt-2 text-sm leading-7 text-green-950/90 sm:text-base">{data.bestMove}</p>
        </div>
        {data.trap ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
            <h3 className="font-semibold text-amber-900">Trap to avoid</h3>
            <p className="mt-2 text-sm leading-7 text-amber-950/90 sm:text-base">{data.trap}</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-ledger-line bg-paper-raised p-4 sm:p-5">
            <h3 className="font-semibold text-ink">Quick tip</h3>
            <p className="mt-2 text-sm leading-7 text-ink-soft sm:text-base">Compare the final payable amount at checkout (after promo code, instant discount, and any EMI fees) before you confirm payment.</p>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {data.ctas.map((cta) =>
          cta.external ? (
            <a
              key={cta.label}
              href={cta.href}
              target="_blank"
              rel={GO_REL}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-inkblue"
            >
              {cta.label.replace(/ →$/, "")} <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : cta.down ? (
            <a
              key={cta.label}
              href={cta.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-inkblue"
            >
              {cta.label.replace(/ ↓$/, "")} <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : (
            <Link
              key={cta.label}
              href={cta.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ledger-line bg-white px-5 text-sm font-semibold text-ink transition hover:border-inkblue/40 hover:text-inkblue"
            >
              {cta.label.replace(/ →$/, "")}
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
