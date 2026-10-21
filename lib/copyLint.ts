import { BANNED_HYPE, BANNED_URGENCY, GLOSSARY_TERMS } from "./copy";

export type CopyIssue = {
  kind: "hype" | "caps" | "punctuation" | "glossary" | "length" | "urgency";
  detail: string;
};

export function lintCopy(text: string, maxLength = 155): CopyIssue[] {
  const issues: CopyIssue[] = [];
  const lowered = text.toLowerCase();
  for (const word of BANNED_HYPE) {
    if (lowered.includes(word)) issues.push({ kind: "hype", detail: word });
  }
  for (const phrase of BANNED_URGENCY) {
    if (lowered.includes(phrase)) issues.push({ kind: "urgency", detail: phrase });
  }
  if (/\bonly\s+\d+\s+left\b/i.test(text)) {
    issues.push({ kind: "urgency", detail: "scarcity countdown" });
  }
  if (/\b\d+\s+people\s+(are\s+)?viewing\b/i.test(text)) {
    issues.push({ kind: "urgency", detail: "viewer countdown" });
  }
  if (/\b[A-Z]{4,}\b/.test(text)) issues.push({ kind: "caps", detail: "ALL-CAPS run" });
  if (/!!+/.test(text)) issues.push({ kind: "punctuation", detail: "repeated !" });
  if (text.length > maxLength) issues.push({ kind: "length", detail: `${text.length} chars` });
  for (const rule of GLOSSARY_TERMS) {
    if (lowered.includes(rule.term) && !rule.allowed.some((allowed) => lowered.includes(allowed))) {
      issues.push({ kind: "glossary", detail: rule.term });
    }
  }
  return issues;
}
