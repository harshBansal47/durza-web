import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "purevpn-india-plans-pricing-2026-guide",
  url: "https://durza.in/guides/purevpn-india-plans-pricing-2026-guide",
  title: "PureVPN India 2026 — Plan Math, Renewal Traps & A Privacy-Claim Ledger",
  description:
    "The official order page prices in US dollars, not rupees, and the introductory rate is not the renewal rate. Here is the dated arithmetic and a line-by-line ledger of the privacy claims Durza can and cannot verify.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official order page", "Official renewal schedule", "Original renewal arithmetic", "Privacy-claim ledger", "No result guarantees"],
  audience: {
    bestFor: [
      "Readers who want to understand what a long-term VPN plan costs after the introductory term, in the currency the vendor actually quotes.",
      "Privacy-conscious users who want the exceptions to a no-logs policy written out plainly.",
    ],
    skipIf: [
      "Anyone expecting verified INR prices from an Indian storefront — the official order page we checked quoted USD and did not show an India rupee price.",
      "Anyone who believes a VPN guarantees anonymity, immunity from law, or reliable access to any streaming library. None of those is verified.",
      "Users who cannot accept automatic renewal at a higher rate unless they actively cancel.",
    ],
  },
  byline: {
    author: "Harsh Bansal",
    role: "Senior software engineer · 8+ years in technology",
    published: "16 Nov 2026",
    updated: "26 Nov 2026",
    factsChecked: "26 Nov 2026",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    methodHref: "/methodology",
  },
  quickAnswer: {
    question: "What do PureVPN's 2026 plans really cost, and can Durza verify the no-logs claim?",
    answer:
      "On 26 Nov 2026 the official order page showed a Black Friday offer: Standard at $1.49/mo billed $93.87 for 63 months, then $47.95 a year; 2-year Standard at $2.15/mo billed $58.20 for 27 months, then $47.95 a year; 1-year Standard at $3.40/mo billed $40.80, then $57.95 a year. All figures are USD before tax. Durza can verify that PureVPN publishes a no-logs policy and an audit page, but cannot verify the audit report itself: the public page names no auditor and the report is email-gated. Exceptions exist — a dedicated IP stays in records for 25 days after subscription end, and the tracker blocker temporarily records domain names. No anonymity or streaming result is guaranteed.",
    jumpHref: "#scenarios",
    jumpLabel: "See the claim ledger",
  },
  ctas: [
    {
      href: "/go/purevpn-com-utility-cpa-worldwide?src=guide&sub=guide_purevpn-india-plans-pricing-2026-guide",
      label: "See PureVPN's live plans",
      primary: true,
    },
    {
      href: "https://www.purevpn.com/order-now.php",
      label: "Read the official order page",
    },
    {
      href: "https://www.purevpn.com/subscription-renewal-plan",
      label: "Read the renewal price schedule",
    },
    {
      href: "https://www.purevpn.com/privacy-policy.php",
      label: "Read the privacy policy in full",
    },
  ],
  methodNote:
    "On 26 Nov 2026 we read PureVPN's order page, renewal schedule, privacy policy and no-log assessment page. All prices are reproduced as published in USD; Durza did not purchase a subscription, test a server, obtain the audit report or test any streaming service. Renewal arithmetic is our own division of published figures.",
  scenarios: [
    {
      heading: "Plan math: the rate you see is not the rate you renew at",
      body: "Standard: $93.87 for 63 months works out to $1.49/mo, but the published renewal is $47.95/year — about $4.00/mo, roughly 2.7 times the introductory rate. The 27-month plan at $58.20 is $2.16/mo and also renews at $47.95/year. The 12-month plan at $40.80 is $3.40/mo and renews at $57.95/year, about $4.83/mo. Monthly is $12.95 with no discount. These are Durza's divisions of published figures, not quotes.",
      icon: "laptop",
    },
    {
      heading: "Tier ladder: Standard, Plus and Max are feature bundles",
      body: "On the checked order page, Standard includes the VPN and tracker blocker; Plus adds a password manager; Max adds data removal, dark-web monitoring and 3 GB eSIM data. At the 63-month Black Friday rate the published totals were $93.87 (Standard), $137.97 (Plus) and $156.87 (Max), with published annual renewals of $47.95, $69.95 and $84.95 respectively. Feature descriptions are the vendor's own.",
      icon: "gamepad",
    },
    {
      heading: "Privacy-claim ledger: verified text versus open questions",
      body: "VERIFIED TEXT — the privacy policy says it does not store browsing activity, identifiable connection logs, assigned IPs, the customer's original IP, connection timestamps or DNS queries generated by the user. VERIFIED EXCEPTIONS — the same policy says a dedicated IP remains in records for 25 days after the subscription ends; an Extended WireGuard add-on IP remains 24 hours; the tracker/ad blocker temporarily records blocked domain names in memory; total bandwidth is tracked; analytics tools include Google Analytics, Firebase, New Relic, MixPanel and Sentry. OPEN — the no-log assessment page describes a fourth assessment done 16–22 Feb 2023 with validation in Mar–Apr 2023 but names no audit firm and gates the report behind an email form. A separate partner notice mentions a 'KPMG-Audited No-Logs Network' for partner deployments, which is not the same as a published consumer audit report.",
      icon: "cap",
    },
    {
      heading: "Jurisdiction and marketing numbers are self-declared",
      body: "The privacy policy names GZ Systems Private Ltd, Intershore Chambers, Road Town, Tortola, British Virgin Islands, as the contracting entity. The order page claims 6,000+ servers, 80+ locations, 5M+ users and a 31-day money-back guarantee. Durza did not independently verify the server count, user count, jurisdiction of operation beyond the policy text, or guarantee processing. We also did not verify the current legal position of VPN use in India — check official government sources before relying on it.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Plan (order page, 26 Nov 2026)", "Introductory rate shown", "Billed now", "Published renewal", "Our arithmetic"],
    rows: [
      ["Standard · 5-year + 3 months (63 months)", "$1.49/mo", "$93.87", "$47.95/year", "$1.49/mo intro; about $4.00/mo on renewal"],
      ["Plus · 5-year + 3 months (63 months)", "$2.19/mo", "$137.97", "$69.95/year", "about $5.83/mo on renewal"],
      ["Max · 5-year + 3 months (63 months)", "$2.49/mo", "$156.87", "$84.95/year", "about $7.08/mo on renewal"],
      ["Standard · 2-year + 3 months (27 months)", "$2.15/mo", "$58.20", "$47.95/year", "$2.16/mo intro by our division; about $4.00/mo on renewal"],
      ["Standard · 1-year (12 months)", "$3.40/mo", "$40.80", "$57.95/year", "about $4.83/mo on renewal"],
      ["Standard · monthly", "$12.95/mo", "$12.95 first month", "standard monthly price", "No discount; renews at the standard rate"],
    ],
  },
  checkoutSteps: [
    "Decide whether you need Standard, Plus or Max. The password manager, data removal, dark-web monitoring and eSIM benefits exist only on the higher tiers per the order page.",
    "Convert the headline monthly rate into the total billed for the full term. $1.49/mo on a 63-month plan means $93.87 charged today, not $1.49.",
    "Read the published renewal row before buying. A 5-year Standard plan renews at $47.95/year — around four times the monthly equivalent of the introductory rate.",
    "Check the country/tax selector on the order page. We saw a USD-denominated checkout with a country list of European states; we did not find a quoted INR price for India.",
    "Note the 31-day money-back guarantee as stated on the order page, but verify the refund mechanics in the terms before relying on it.",
    "Turn off auto-renew in the member area if you do not want the renewal rate. The site says auto-renew can be disabled there.",
    "Do not treat a no-logs policy as immunity. Keep separate security habits — unique passwords, two-factor authentication and care with what you type while connected.",
  ],
  checkoutNote:
    "All prices are USD snapshots from the official order and renewal pages checked 26 Nov 2026, during a Black Friday promotion. Introductory and renewal rates differ; no INR conversion or Indian tax treatment was verified.",
  verifiedFacts: {
    kicker: "PureVPN · checked 26 Nov 2026",
    title: "What the official pages say, and where they conflict",
    facts: [
      {
        label: "The order page quotes USD, not INR.",
        detail:
          "The checkout showed a Black Friday offer with dollar totals, a country tax selector listing European states and a $93.87 card payment line. Durza found no verified rupee price for an India buyer.",
        href: "https://www.purevpn.com/order-now.php",
      },
      {
        label: "Renewal prices are published separately.",
        detail:
          "The renewal page lists Standard at $57.95/year for a 1-year plan and $47.95/year for 2-year and 5-year plans; Plus renews at $69.95/year and Max at $84.95/year for the long plans.",
        href: "https://www.purevpn.com/subscription-renewal-plan",
      },
      {
        label: "The monthly Plus price conflicts between two official pages.",
        detail:
          "The order page showed Plus monthly at $17.95, while the renewal schedule lists the 1-month Plus renewal at $15.95. Durza cannot resolve the discrepancy; the checkout you see wins.",
        href: null,
      },
      {
        label: "The no-logs policy has stated exceptions.",
        detail:
          "Dedicated IPs are kept 25 days after subscription end, Extended WireGuard IPs 24 hours, tracker-blocker domain names are held briefly in memory, and bandwidth totals are tracked. These are the vendor's own disclosures.",
        href: "https://www.purevpn.com/privacy-policy.php",
      },
      {
        label: "The public audit page does not name an auditor.",
        detail:
          "The no-log assessment page describes a fourth assessment in February 2023 and validation in March–April 2023, but describes the auditor only as a 'well known audit firm' and gates the report behind an email form. Durza could not inspect the report.",
        href: "https://www.purevpn.com/no-log-assessment",
      },
      {
        label: "The KPMG reference applies to partner deployments, not the consumer plan.",
        detail:
          "A partner-program notice in the privacy policy mentions a KPMG-audited no-logs network for white-label partner deployments. It does not supply a consumer audit report, so Durza does not treat it as verification of the retail service.",
        href: "https://www.purevpn.com/privacy-policy.php",
      },
    ],
    note: "We did not buy a subscription, access the gated audit report, test servers or verify streaming access. All plan numbers are dated public-page snapshots.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We read PureVPN's order page, subscription renewal schedule, privacy policy (last updated 22 Oct 2026) and no-log assessment page on 26 Nov 2026. Prices are USD snapshots from a Black Friday promotion; renewal arithmetic is Durza's. We could not verify the no-logs audit independently because the public page names no auditor and the report is email-gated, and we found a price discrepancy between two official pages for monthly Plus. We did not test the service, verify streaming compatibility, verify Indian legal rules, or confirm any INR price. A VPN reduces certain exposures; it does not guarantee anonymity or safety. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Introductory monthly equivalents are not renewal prices — the renewal rate can be roughly 2.7 times the promotional rate.",
    "Prices are USD before tax; the checkout country selector determines any tax added.",
    "No-logs is a published policy with disclosed exceptions: dedicated IP retention, brief tracker domain records and bandwidth totals.",
    "The audit claim is self-published and the report was not available to Durza; no independent verification is claimed.",
    "Older Durza copy claiming verified JioHotstar/Netflix compatibility and a British Virgin Islands 'commercially audited' no-logs status is not carried forward as verified.",
    "Do not rely on a VPN for legal advice, and do not assume it makes an activity lawful.",
  ],
  exploreLinks: [
    { href: "/stores/purevpn", label: "PureVPN store hub" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "How Durza verifies offers" },
    { href: "/guides/how-to-match-laptop-model-codes-india", label: "Cross-store price comparison method" },
    { href: "/methodology", label: "Research method" },
  ],
  faqs: [
    {
      question: "Is there an India-specific rupee price for PureVPN?",
      answer:
        "We did not find one. The official order page we checked on 26 Nov 2026 quoted USD with a country tax selector, and the renewal schedule says prices are in US dollars before taxes. Confirm the amount in your own checkout.",
    },
    {
      question: "What does a 5-year plan actually cost over time?",
      answer:
        "The black-friday snapshot showed $93.87 for 63 months ($1.49/mo equivalent), then $47.95 per year. Over the first five years plus three months you pay $93.87; after that, each year costs $47.95 unless you cancel.",
    },
    {
      question: "Is PureVPN really no-logs?",
      answer:
        "Durza can verify that it publishes a no-logs policy and an assessment page. We cannot independently verify the audit: the public page does not name the auditor and the report is email-gated. The policy itself lists exceptions — dedicated IP retention, brief tracker domain records and bandwidth totals.",
    },
    {
      question: "Does the KPMG reference on the site prove the consumer service is audited?",
      answer:
        "No. The KPMG wording appears in a partner-program notice about white-label partner deployments. It is not a published consumer audit report, so we do not use it as proof for the retail plan.",
    },
    {
      question: "Will PureVPN work with JioHotstar or Netflix?",
      answer:
        "Unverified. Older Durza copy claimed compatibility and suggested switching servers, but we did not test any streaming service on 26 Nov 2026. Streaming access changes and is not guaranteed.",
    },
    {
      question: "What was the price discrepancy you found?",
      answer:
        "The order page showed Plus at $17.95/month while the renewal schedule lists $15.95 for a 1-month Plus plan. We cannot reconcile them; the live checkout is authoritative.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Original contributions: a renewal-rate arithmetic table derived from published USD prices, a privacy-claim ledger that lists disclosed no-logs exceptions, and an explicit statement of what could not be verified (the gated audit, INR pricing, streaming access and Indian legal rules). No anonymity or outcome is guaranteed. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "PureVPN official order page — Black Friday 2026 prices",
      href: "https://www.purevpn.com/order-now.php",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "PureVPN subscription renewal prices",
      href: "https://www.purevpn.com/subscription-renewal-plan",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "PureVPN privacy policy (last updated 22 Oct 2026)",
      href: "https://www.purevpn.com/privacy-policy.php",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "PureVPN no-log assessment page",
      href: "https://www.purevpn.com/no-log-assessment",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "PureVPN trust centre",
      href: "https://www.purevpn.com/trust-center",
      checkedAt: "26 Nov 2026",
    },
  ],
};
