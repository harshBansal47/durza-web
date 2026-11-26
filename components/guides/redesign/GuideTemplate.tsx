import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./guide.css";

export function GuideTemplate({ children }: { children: ReactNode }) {
  return <div className="gd-root">{children}</div>;
}

export function GuideMain({ children }: { children: ReactNode }) {
  return <div className="gd-main">{children}</div>;
}

export function GuideSection({
  id,
  eyebrow,
  title,
  tone,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  tone?: "mist";
  children: ReactNode;
}) {
  return (
    <section id={id} className="gd-section" data-tone={tone} aria-labelledby={title ? `${id}-heading` : undefined}>
      <div className="gd-wrap">
        {eyebrow || title ? (
          <div className="gd-section-head">
            {eyebrow ? <span className="gd-eyebrow">{eyebrow}</span> : null}
            {title ? <h2 id={`${id}-heading`}>{title}</h2> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function GuideCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`gd-card ${className}`.trim()}>{children}</div>;
}

export function GuideGrid({ columns = 2, children }: { columns?: 2 | 3; children: ReactNode }) {
  return <div className={`gd-grid gd-grid--${columns}`}>{children}</div>;
}

export function GuidePill({ kind, children }: { kind?: "verified" | "caution" | "info" | "brand"; children: ReactNode }) {
  return <span className={`gd-pill${kind ? ` gd-pill--${kind}` : ""}`}>{children}</span>;
}

export function GuideCtaRow({ ctas }: { ctas: { href: string; label: string; primary?: boolean }[] }) {
  return (
    <div className="gd-cta-row">
      {ctas.map((cta, i) => {
        const external = /^https?:\/\//.test(cta.href);
        return (
        <a
          key={cta.href}
          href={cta.href}
          {...(external ? { target: "_blank", rel: "sponsored nofollow noopener noreferrer" } : {})}
          className={`gd-cta${cta.primary ? " gd-cta--primary" : ""}`}
          data-reveal-index={i}
        >
          {cta.label} <ArrowUpRight aria-hidden="true" size={15} />
        </a>
        );
      })}
    </div>
  );
}

export function GuideTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <>
      <div className="gd-table-wrap">
        <table className="gd-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                <th scope="row">{row[0]}</th>
                {row.slice(1).map((cell, i) => (
                  <td key={`${row[0]}-${i}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="gd-cards-table">
        {rows.map((row) => (
          <article key={row[0]} className="gd-card gd-card--quiet">
            <h3>{row[0]}</h3>
            <dl>
              {headers.slice(1).map((header, i) => (
                <div key={header}>
                  <dt>{header}</dt>
                  <dd>{row[i + 1]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}

export function GuideSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="gd-steps">
      {steps.map((step, i) => (
        <li key={step}>
          <span className="gd-step-num" aria-hidden="true">{i + 1}</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function GuideFaq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="gd-faq">
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <div className="gd-faq-answer">
            <div>
              <p className="gd-faq-body">{item.answer}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

export function GuideExploreLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <div className="gd-explore">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <span aria-hidden="true">→</span>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
