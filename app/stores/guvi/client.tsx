"use client";

import StoreGuidePage from "@/components/store/StoreGuidePage";
import type { TrustStatsProps } from "@/components/store/TrustStats";

interface Props {
  faqs: { question: string; answer: string }[];
  stats: TrustStatsProps;
  // Accepted for route parity; the shared template does not need these yet.
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

const ADVANTAGES = [{"title": "Recognized ed-tech backing", "desc": "GUVI highlights its incubation and industry partnerships (including IIT-M incubation and HCL Group association) \u2014 see official credentials on guvi.in."}, {"title": "Vernacular learning options", "desc": "Many courses and resources are offered in Indian languages alongside English, helping learners build tech skills with greater clarity."}, {"title": "Hands-on practice ecosystem", "desc": "GUVI provides practice platforms and project-based learning across its programs, as described on official course pages."}, {"title": "Career-focused programs", "desc": "Select mentor-led programs include projects, interview preparation and placement assistance as per program terms \u2014 review details on the specific track."}] as const;
const MATCHERS = [{"id": "career-switch", "label": "Career Switch", "headline": "Structured bootcamps for job-ready skills", "bullets": ["Review syllabus, projects and mentorship format for the track", "Check eligibility, schedule (weekday/weekend) and time commitment", "Understand placement assistance scope and terms on the program page"], "cta": "Explore career programs \u2192", "src": "matcher-career-switch"}, {"id": "upskill", "label": "Domain Upskilling", "headline": "Advance in AI, cloud, testing, design and more", "bullets": ["Pick a specialization aligned to your current role and goals", "Check prerequisites, tools covered and hands-on components", "Compare live vs self-paced formats and support options"], "cta": "Explore upskilling tracks \u2192", "src": "matcher-upskill"}, {"id": "single-skill", "label": "Learn a Skill/Tool", "headline": "Focused courses to build one capability at a time", "bullets": ["Start with fundamentals and practice through exercises/projects", "Choose language/stack and difficulty level that fits you", "Verify certificate details and access duration on the course page"], "cta": "Explore courses \u2192", "src": "matcher-single-skill"}, {"id": "vernacular", "label": "Learn in Your Language", "headline": "Tech learning in vernacular-friendly formats", "bullets": ["Preview modules available in your preferred language where offered", "Combine lessons with practice to reinforce concepts", "Check course language, format and outcomes on guvi.in"], "cta": "Explore vernacular learning \u2192", "src": "matcher-vernacular"}] as const;
const LINEUP = [{"title": "Full-Stack Development", "badge": "Career track", "copy": "End-to-end web development programs with projects \u2014 review curriculum and format.", "src": "lineup-fullstack"}, {"title": "Data Science & AI/ML", "badge": "Career track", "copy": "Data and AI-focused learning paths \u2014 check tools, projects and prerequisites.", "src": "lineup-datascience"}, {"title": "Automation Testing & QA", "badge": "Career track", "copy": "Testing and QA skill tracks \u2014 compare tools covered and program structure.", "src": "lineup-testing"}, {"title": "UI/UX Design", "badge": "Design", "copy": "Design-focused programs with portfolio work \u2014 review tools and outcomes.", "src": "lineup-uiux"}, {"title": "DevOps & Cloud", "badge": "Upskilling", "copy": "Cloud and DevOps learning paths \u2014 check modules and hands-on components.", "src": "lineup-devops"}, {"title": "Self-Paced Courses", "badge": "Flexible", "copy": "Learn specific languages or tools at your pace \u2014 verify access and details.", "src": "lineup-selfpaced"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="guvi"
      name="Choose the right GUVI path"
      headline="GUVI Official Learning — Career Tracks & Coding Courses"
      lead="Choose a GUVI program by your learning goal, compare tracks and formats, then check live curriculum, schedules and enrollment options on the official site."
      matcherHeading="Choose the right GUVI path"
      matcherDescription="Pick your goal to get a checklist, then view the matching GUVI track and live details on the official site."
      lineupEyebrow="Programs & courses"
      lineupTitle="Explore GUVI by track"
      lineupDescription="Browse popular GUVI learning tracks and confirm live curriculum, schedules and pricing on the official site."
      faqNote="Program inclusions, placement assistance, schedules and pricing vary by track — always confirm current details and terms on guvi.in."
      mobileCtaLabel="Check live range & offers on GUVI"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
