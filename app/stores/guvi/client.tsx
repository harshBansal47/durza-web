"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, BadgeCheck, Truck, Shield, Wrench, CreditCard, Zap, Home, Sparkles } from "lucide-react";
import FaqSection from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import { GO_REL, storeGoHref } from "@/lib/go";

interface Props {
  faqs: { question: string; answer: string }[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}


const ADVANTAGES = [{"title": "Recognized ed-tech backing", "desc": "GUVI highlights its incubation and industry partnerships (including IIT-M incubation and HCL Group association) \u2014 see official credentials on guvi.in."}, {"title": "Vernacular learning options", "desc": "Many courses and resources are offered in Indian languages alongside English, helping learners build tech skills with greater clarity."}, {"title": "Hands-on practice ecosystem", "desc": "GUVI provides practice platforms and project-based learning across its programs, as described on official course pages."}, {"title": "Career-focused programs", "desc": "Select mentor-led programs include projects, interview preparation and placement assistance as per program terms \u2014 review details on the specific track."}] as const;
const MATCHERS = [{"id": "career-switch", "label": "Career Switch", "headline": "Structured bootcamps for job-ready skills", "bullets": ["Review syllabus, projects and mentorship format for the track", "Check eligibility, schedule (weekday/weekend) and time commitment", "Understand placement assistance scope and terms on the program page"], "cta": "Explore career programs \u2192", "src": "matcher-career-switch"}, {"id": "upskill", "label": "Domain Upskilling", "headline": "Advance in AI, cloud, testing, design and more", "bullets": ["Pick a specialization aligned to your current role and goals", "Check prerequisites, tools covered and hands-on components", "Compare live vs self-paced formats and support options"], "cta": "Explore upskilling tracks \u2192", "src": "matcher-upskill"}, {"id": "single-skill", "label": "Learn a Skill/Tool", "headline": "Focused courses to build one capability at a time", "bullets": ["Start with fundamentals and practice through exercises/projects", "Choose language/stack and difficulty level that fits you", "Verify certificate details and access duration on the course page"], "cta": "Explore courses \u2192", "src": "matcher-single-skill"}, {"id": "vernacular", "label": "Learn in Your Language", "headline": "Tech learning in vernacular-friendly formats", "bullets": ["Preview modules available in your preferred language where offered", "Combine lessons with practice to reinforce concepts", "Check course language, format and outcomes on guvi.in"], "cta": "Explore vernacular learning \u2192", "src": "matcher-vernacular"}] as const;
const LINEUP = [{"title": "Full-Stack Development", "badge": "Career track", "copy": "End-to-end web development programs with projects \u2014 review curriculum and format.", "src": "lineup-fullstack"}, {"title": "Data Science & AI/ML", "badge": "Career track", "copy": "Data and AI-focused learning paths \u2014 check tools, projects and prerequisites.", "src": "lineup-datascience"}, {"title": "Automation Testing & QA", "badge": "Career track", "copy": "Testing and QA skill tracks \u2014 compare tools covered and program structure.", "src": "lineup-testing"}, {"title": "UI/UX Design", "badge": "Design", "copy": "Design-focused programs with portfolio work \u2014 review tools and outcomes.", "src": "lineup-uiux"}, {"title": "DevOps & Cloud", "badge": "Upskilling", "copy": "Cloud and DevOps learning paths \u2014 check modules and hands-on components.", "src": "lineup-devops"}, {"title": "Self-Paced Courses", "badge": "Flexible", "copy": "Learn specific languages or tools at your pace \u2014 verify access and details.", "src": "lineup-selfpaced"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("guvi", "store-page");
  const mobileHref = storeGoHref("guvi", "mobile-sticky");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">GUVI Official Learning — Career Tracks & Coding Courses</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Choose a GUVI program by your learning goal, compare tracks and formats, then check live curriculum, schedules and enrollment options on the official site.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Explore GUVI programs → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#guvi-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why learn with GUVI direct</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((a, i) => {
            const Icon = [Shield, Truck, Wrench, CreditCard, Zap, Home, BadgeCheck, Sparkles][i % 8];
            return (
              <div key={a.title} className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm">
                <Icon className="h-5 w-5 text-amber-700" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{a.desc}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-ink-soft">Benefits, availability and terms are determined by the official store and may vary by product, location or time.</p>
      </section>

      <section id="guvi-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Choose the right GUVI path</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Pick your goal to get a checklist, then view the matching GUVI track and live details on the official site.</p>
        <div role="tablist" aria-label="GUVI matcher" className="mt-5 flex flex-wrap gap-2">
          {MATCHERS.map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={active === m.id} onClick={() => setActive(m.id)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === m.id ? "bg-ink text-white" : "border border-ledger-line bg-white text-ink hover:bg-slate-50"}`}>
              {m.label}
            </button>
          ))}
        </div>
        {current && (
          <div className="mt-5 grid gap-5 rounded-2xl border border-ledger-line bg-white p-5 shadow-sm lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h3 className="text-xl font-bold text-ink">{current.headline}</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {current.bullets.map((b) => (<li key={b} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />{b}</li>))}
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-ink-soft">Browse the matching range on the official GUVI store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("guvi", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Programs & courses</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Explore GUVI by track</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse popular GUVI learning tracks and confirm live curriculum, schedules and pricing on the official site.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("guvi", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">{item.badge}</p>
              <h3 className="mt-2 text-lg font-bold text-ink group-hover:text-inkblue">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.copy}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink">View on official store <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-10"><AffiliateDisclosure /></div>

      <section className="mt-10">
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">Program inclusions, placement assistance, schedules and pricing vary by track — always confirm current details and terms on guvi.in.</p>
        <FaqSection eyebrow="GUVI FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on GUVI</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
