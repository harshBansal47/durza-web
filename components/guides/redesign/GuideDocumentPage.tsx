import Link from "next/link";
import { ArrowDownRight, BadgeCheck, ExternalLink, Gamepad2, GraduationCap, Laptop } from "lucide-react";
import type { GuideDocument } from "@/lib/guide-document";
import {
  GuideCard,
  GuideCtaRow,
  GuideExploreLinks,
  GuideFaq,
  GuideGrid,
  GuideMain,
  GuidePill,
  GuideSection,
  GuideSteps,
  GuideTable,
  GuideTemplate,
} from "./GuideTemplate";
import Reveal from "./Reveal";

const SCENARIO_ICONS = {
  gamepad: Gamepad2,
  laptop: Laptop,
  cap: GraduationCap,
} as const;

/** Renders one content-frozen GuideDocument through the redesigned template. */
export default function GuideDocumentPage({ doc }: { doc: GuideDocument }) {
  return (
    <GuideTemplate>
      <div className="gd-hero">
        <div className="gd-wrap">
          <Reveal>
            {doc.researchReviewedDate || doc.evidenceBadges.length > 0 ? (
              <div className="gd-chip-row">
                {doc.researchReviewedDate ? (
                  <GuidePill kind="verified">
                    <BadgeCheck aria-hidden="true" size={14} strokeWidth={2.4} />
                    <span>Research reviewed {doc.researchReviewedDate} · Codes accepted only at checkout</span>
                  </GuidePill>
                ) : null}
                {doc.evidenceBadges.map((badge) => (
                  <GuidePill key={badge}>{badge}</GuidePill>
                ))}
              </div>
            ) : null}
            <h1 style={{ marginTop: doc.researchReviewedDate || doc.evidenceBadges.length > 0 ? 24 : 0 }}>
              {doc.title}
            </h1>
            <p className="gd-hero-lede">{doc.description}</p>
          </Reveal>
        </div>
      </div>

      <GuideMain>
        {doc.audience ? (
          <GuideSection id="audience">
            <Reveal>
              <GuideGrid columns={2}>
                <GuideCard>
                  <span className="gd-eyebrow">Who it is for</span>
                  <ul className="gd-bullets gd-bullets--check">
                    {doc.audience.bestFor.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </GuideCard>
                <GuideCard className="gd-audience-bad">
                  <span className="gd-eyebrow">Who should skip it</span>
                  <ul className="gd-bullets gd-bullets--check">
                    {doc.audience.skipIf.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </GuideCard>
              </GuideGrid>
            </Reveal>
          </GuideSection>
        ) : null}

        {doc.byline ? (
          <GuideSection id="byline">
            <Reveal>
              <GuideCard>
                <div className="gd-chip-row gd-num">
                  <span className="gd-pill">{doc.byline.author}</span>
                  <span className="gd-pill">{doc.byline.role}</span>
                  <span className="gd-pill">Published {doc.byline.published}</span>
                  <span className="gd-pill">Last updated {doc.byline.updated}</span>
                  <span className="gd-pill">Facts checked {doc.byline.factsChecked}</span>
                </div>
                <p style={{ marginTop: 16 }}>{doc.byline.bio}</p>
                <Link href={doc.byline.methodHref} className="gd-text-link" style={{ marginTop: 8 }}>
                  How Durza researches
                </Link>
              </GuideCard>
            </Reveal>
          </GuideSection>
        ) : null}

        {doc.quickAnswer ? (
          <GuideSection id="quick-answer" tone="mist">
            <Reveal>
              <GuideCard className="gd-quick">
                <span className="gd-eyebrow">Answer in 10 seconds</span>
                <h2 style={{ marginTop: 6, fontSize: 22 }}>{doc.quickAnswer.question}</h2>
                <p className="gd-quick-answer">{doc.quickAnswer.answer}</p>
                <a href={doc.quickAnswer.jumpHref} className="gd-text-link">
                  {doc.quickAnswer.jumpLabel}
                  <ArrowDownRight aria-hidden="true" size={15} />
                </a>
              </GuideCard>
            </Reveal>
          </GuideSection>
        ) : null}

        {doc.ctas.length > 0 || doc.methodNote ? (
          <GuideSection id="ctas">
            <Reveal>
              {doc.ctas.length > 0 ? <GuideCtaRow ctas={doc.ctas} /> : null}
              {doc.methodNote ? <p style={{ marginTop: 32, maxWidth: "72ch" }}>{doc.methodNote}</p> : null}
            </Reveal>
          </GuideSection>
        ) : null}

        {doc.scenarios && doc.scenarios.length > 0 ? (
          <GuideSection id="scenarios">
            <Reveal>
              <GuideGrid columns={3}>
                {doc.scenarios.map((scenario) => {
                  const Icon = scenario.icon ? SCENARIO_ICONS[scenario.icon] : null;
                  return (
                    <GuideCard key={scenario.heading} className="gd-scenario">
                      {Icon ? (
                        <span className="gd-scenario-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>
                      ) : null}
                      <h3>{scenario.heading}</h3>
                      <p>{scenario.body}</p>
                    </GuideCard>
                  );
                })}
              </GuideGrid>
            </Reveal>
          </GuideSection>
        ) : null}

        {doc.skuTable ? (
          <GuideSection id="sku-table">
            <Reveal><GuideTable headers={doc.skuTable.headers} rows={doc.skuTable.rows} /></Reveal>
          </GuideSection>
        ) : null}

        {doc.checkoutSteps ? (
          <GuideSection id="checkout">
            <Reveal>
              <GuideSteps steps={doc.checkoutSteps} />
              {doc.checkoutNote ? <p className="gd-callout--caution">{doc.checkoutNote}</p> : null}
            </Reveal>
          </GuideSection>
        ) : null}

        {doc.verifiedFacts ? (
          <GuideSection id="verified-facts">
            <Reveal>
              <GuideCard className="gd-verified">
                <span className="gd-eyebrow">{doc.verifiedFacts.kicker}</span>
                <h2 style={{ marginTop: 6, fontSize: 22 }}>{doc.verifiedFacts.title}</h2>
                <ul className="gd-bullets" style={{ marginTop: 16 }}>
                  {doc.verifiedFacts.facts.map((fact) => (
                    <li key={fact.label}>
                      <strong>{fact.label}.</strong> {fact.detail}{" "}
                      {fact.href ? (
                        <a href={fact.href} target="_blank" rel="noopener noreferrer nofollow">
                          Source <ExternalLink aria-hidden="true" size={12} />
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: 16 }}>{doc.verifiedFacts.note}</p>
                <Link href={doc.verifiedFacts.methodHref} className="gd-text-link">How Durza researches →</Link>
              </GuideCard>
            </Reveal>
          </GuideSection>
        ) : null}

        {doc.verificationParagraph || doc.verificationNotes ? (
          <GuideSection id="verification">
            <Reveal>
              {doc.verificationParagraph ? <p style={{ maxWidth: "72ch" }}>{doc.verificationParagraph}</p> : null}
              {doc.verificationNotes ? (
                <ul className="gd-bullets gd-bullets--check" style={{ marginTop: 20 }}>
                  {doc.verificationNotes.map((line) => <li key={line}>{line}</li>)}
                </ul>
              ) : null}
            </Reveal>
          </GuideSection>
        ) : null}

        {doc.exploreLinks && doc.exploreLinks.length > 0 ? (
          <GuideSection id="explore">
            <Reveal><GuideExploreLinks links={doc.exploreLinks} /></Reveal>
          </GuideSection>
        ) : null}

        {doc.faqs && doc.faqs.length > 0 ? (
          <GuideSection id="faq">
            <Reveal><GuideFaq items={doc.faqs} /></Reveal>
          </GuideSection>
        ) : null}

        {doc.sources && doc.sources.length > 0 ? (
          <GuideSection id="sources">
            <Reveal>
              <GuideCard>
                <span className="gd-eyebrow">Sources</span>
                <h2 style={{ marginTop: 6, fontSize: 22 }}>Sources and checks</h2>
                <ul className="gd-bullets" style={{ marginTop: 16 }}>
                  {doc.sources.map((source) => (
                    <li key={`${source.href}-${source.label}`}>
                      <a href={source.href} target="_blank" rel="noopener noreferrer nofollow">
                        {source.label} <ExternalLink aria-hidden="true" size={12} />
                      </a>
                      {source.checkedAt ? <span> — checked {source.checkedAt}</span> : null}
                    </li>
                  ))}
                </ul>
              </GuideCard>
            </Reveal>
          </GuideSection>
        ) : null}

        {doc.editorialNote ? (
          <GuideSection id="editorial-note">
            <Reveal>
              <div className="gd-card gd-editorial-note"><p>{doc.editorialNote}</p></div>
            </Reveal>
          </GuideSection>
        ) : null}
      </GuideMain>
    </GuideTemplate>
  );
}
