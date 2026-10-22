import type { CSSProperties, ReactNode } from "react";

/**
 * Hero illustration: the Durza promise drawn as one scene.
 *
 * A shopping bag with coupons coming out of it, a "verified" seal, a calendar
 * with a check (every offer shows when it was checked) and a price tag with the
 * old price struck through. It is purely decorative (aria-hidden), contains no
 * numbers or claims, and uses plain hex values from the brand palette so it
 * renders identically anywhere, including in the OG image pipeline.
 *
 * Motion is limited to a slow vertical drift on a few pieces and is switched
 * off for people who prefer reduced motion (motion-safe).
 */

const C = {
  accent: "#ea580c",
  accentDeep: "#c2410c",
  accentSoft: "#fdba74",
  accentFaint: "#fff7ed",
  ink: "#111827",
  inkSoft: "#4b5563",
  line: "#e5e7eb",
  gold: "#f5b335",
  goldTint: "#fff1d0",
  verified: "#16a34a",
  white: "#ffffff",
};

/** Four-point sparkle centred on 0,0. */
const SPARKLE =
  "M0 -12 C2 -4 4 -2 12 0 C4 2 2 4 0 12 C-2 4 -4 2 -12 0 C-4 -2 -2 -4 0 -12 Z";

/** A 16-point starburst used for the verified seal. */
function burst(radius: number, inner: number, points: number): string {
  const steps = points * 2;
  const out: string[] = [];
  for (let i = 0; i < steps; i += 1) {
    const r = i % 2 === 0 ? radius : inner;
    const a = (Math.PI * 2 * i) / steps - Math.PI / 2;
    out.push(`${i === 0 ? "M" : "L"}${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`);
  }
  return `${out.join(" ")} Z`;
}

const SEAL_PATH = burst(40, 35, 14);

/** Ticket outline with a notch on each side, 170 x 84. */
const TICKET_PATH = "M0 0 H170 V34 a8 8 0 0 0 0 16 V84 H0 V50 a8 8 0 0 0 0 -16 Z";

function Percent({ x, y, scale, color }: { x: number; y: number; scale: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={color} stroke={color}>
      <circle cx="-9" cy="-9" r="5" stroke="none" />
      <circle cx="9" cy="9" r="5" stroke="none" />
      <line x1="11" y1="-11" x2="-11" y2="11" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    </g>
  );
}

function Drift({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const style: CSSProperties = { animationDelay: `${delay}s` };
  return (
    <g className="motion-safe:animate-float-soft" style={style}>
      {children}
    </g>
  );
}

export default function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 440"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="dz-bag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f97316" />
          <stop offset="1" stopColor={C.accent} />
        </linearGradient>
        <radialGradient id="dz-disc" cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor={C.white} />
          <stop offset="1" stopColor={C.accentFaint} />
        </radialGradient>
        <pattern id="dz-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={C.accentSoft} />
        </pattern>
        <clipPath id="dz-disc-clip">
          <circle cx="260" cy="228" r="196" />
        </clipPath>
        <filter id="dz-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#111827" floodOpacity="0.14" />
        </filter>
      </defs>

      {/* Backdrop: soft disc, dot texture and an orbit line */}
      <circle cx="260" cy="228" r="196" fill="url(#dz-disc)" />
      <rect x="64" y="32" width="392" height="392" fill="url(#dz-dots)" clipPath="url(#dz-disc-clip)" opacity="0.55" />
      <circle cx="260" cy="228" r="214" fill="none" stroke={C.accentSoft} strokeWidth="1.5" strokeDasharray="2 9" strokeLinecap="round" />
      <circle cx="260" cy="228" r="150" fill="none" stroke={C.line} strokeWidth="1" />

      {/* Ground shadow */}
      <ellipse cx="260" cy="404" rx="128" ry="13" fill={C.ink} opacity="0.09" />

      {/* Coupon tickets coming out of the bag (drawn behind it) */}
      <g transform="translate(292 92) rotate(11)">
        <Drift delay={0.8}>
          <g filter="url(#dz-shadow)">
            <path d={TICKET_PATH} fill={C.goldTint} stroke={C.gold} strokeWidth="1.5" />
            <line x1="120" y1="9" x2="120" y2="75" stroke={C.gold} strokeWidth="1.5" strokeDasharray="3 4" />
            <rect x="16" y="22" width="76" height="9" rx="4.5" fill={C.accentDeep} opacity="0.85" />
            <rect x="16" y="40" width="54" height="7" rx="3.5" fill={C.gold} opacity="0.7" />
            <rect x="16" y="54" width="64" height="7" rx="3.5" fill={C.gold} opacity="0.45" />
            <Percent x={145} y={42} scale={1} color={C.accentDeep} />
          </g>
        </Drift>
      </g>
      <g transform="translate(86 104) rotate(-12)">
        <Drift delay={0.2}>
          <g filter="url(#dz-shadow)">
            <path d={TICKET_PATH} fill={C.white} stroke={C.line} strokeWidth="1.5" />
            <line x1="120" y1="9" x2="120" y2="75" stroke={C.accentSoft} strokeWidth="1.5" strokeDasharray="3 4" />
            <rect x="16" y="22" width="70" height="9" rx="4.5" fill={C.ink} opacity="0.85" />
            <rect x="16" y="40" width="52" height="7" rx="3.5" fill="#d1d5db" />
            <rect x="16" y="54" width="62" height="7" rx="3.5" fill="#e5e7eb" />
            <circle cx="145" cy="42" r="17" fill={C.accentFaint} />
            <Percent x={145} y={42} scale={0.8} color={C.accent} />
          </g>
        </Drift>
      </g>

      {/* Shopping bag */}
      <g filter="url(#dz-shadow)">
        <path d="M172 176 H348 L362 384 a14 14 0 0 1 -14 14 H172 a14 14 0 0 1 -14 -14 Z" fill="url(#dz-bag)" />
        <path d="M172 176 H214 L200 398 H172 a14 14 0 0 1 -14 -14 Z" fill={C.white} opacity="0.09" />
        <path d="M172 176 H348 L349 198 H171 Z" fill={C.accentDeep} opacity="0.35" />
      </g>
      <path d="M214 180 C214 116 306 116 306 180" fill="none" stroke={C.accentDeep} strokeWidth="9" strokeLinecap="round" />
      <circle cx="214" cy="190" r="4.5" fill={C.white} opacity="0.9" />
      <circle cx="306" cy="190" r="4.5" fill={C.white} opacity="0.9" />
      <circle cx="260" cy="292" r="48" fill={C.white} />
      <circle cx="260" cy="292" r="48" fill="none" stroke={C.accentFaint} strokeWidth="6" />
      <Percent x={260} y={292} scale={1.85} color={C.accent} />

      {/* Masked code with a reveal button, resting on the bag */}
      <g transform="translate(330 290) rotate(7)">
        <Drift delay={1.4}>
          <g filter="url(#dz-shadow)">
            <rect width="140" height="46" rx="12" fill={C.white} stroke={C.accentSoft} strokeWidth="1.5" strokeDasharray="4 4" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx={20 + i * 12} cy="23" r="3" fill={C.inkSoft} opacity="0.5" />
            ))}
            <rect x="98" y="9" width="34" height="28" rx="9" fill={C.ink} />
            <path d="M109 23 H121 M117 18 L122 23 L117 28" fill="none" stroke={C.white} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </Drift>
      </g>

      {/* Verified seal */}
      <g transform="translate(424 92)">
        <Drift delay={0.5}>
          <g filter="url(#dz-shadow)">
            <path d={SEAL_PATH} fill={C.verified} stroke={C.verified} strokeWidth="5" strokeLinejoin="round" />
            <circle r="27" fill="none" stroke={C.white} strokeWidth="2" opacity="0.8" />
            <path d="M-12 1 L-4 9 L13 -10" fill="none" stroke={C.white} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </Drift>
      </g>

      {/* Calendar: every offer shows the date it was checked */}
      <g transform="translate(40 268)">
        <Drift delay={1.1}>
          <g filter="url(#dz-shadow)">
            <rect width="100" height="100" rx="18" fill={C.white} stroke={C.line} strokeWidth="1.5" />
            <path d="M0 18 a18 18 0 0 1 18 -18 H82 a18 18 0 0 1 18 18 V30 H0 Z" fill={C.accent} />
            <rect x="26" y="-6" width="9" height="20" rx="4.5" fill={C.ink} />
            <rect x="65" y="-6" width="9" height="20" rx="4.5" fill={C.ink} />
            {[0, 1, 2].map((col) =>
              [0, 1].map((row) => (
                <rect key={`${col}-${row}`} x={14 + col * 26} y={44 + row * 22} width="16" height="12" rx="4" fill={row === 1 && col === 2 ? "none" : "#e5e7eb"} />
              )),
            )}
            <circle cx="82" cy="84" r="18" fill={C.verified} stroke={C.white} strokeWidth="4" />
            <path d="M74 84 L80 90 L91 78" fill="none" stroke={C.white} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </Drift>
      </g>

      {/* Price tag with the old price struck through */}
      <g transform="translate(392 368) rotate(-8)">
        <Drift delay={1.8}>
          <g filter="url(#dz-shadow)">
            <path d="M0 14 a14 14 0 0 1 14 -14 H98 a14 14 0 0 1 14 14 V42 a14 14 0 0 1 -14 14 H14 a14 14 0 0 1 -14 -14 Z" fill={C.white} stroke={C.line} strokeWidth="1.5" />
            <circle cx="16" cy="28" r="5" fill={C.accentFaint} stroke={C.accentSoft} strokeWidth="1.5" />
            <rect x="34" y="12" width="44" height="8" rx="4" fill="#d1d5db" />
            <line x1="30" y1="16" x2="84" y2="16" stroke={C.inkSoft} strokeWidth="2" strokeLinecap="round" />
            <rect x="34" y="30" width="62" height="14" rx="7" fill={C.accent} />
          </g>
        </Drift>
      </g>

      {/* Sparkles and confetti */}
      <path d={SPARKLE} transform="translate(64 168) scale(1.1)" fill={C.accent} />
      <path d={SPARKLE} transform="translate(486 214)" fill={C.gold} />
      <path d={SPARKLE} transform="translate(468 40) scale(0.7)" fill={C.accentSoft} />
      <path d={SPARKLE} transform="translate(150 62) scale(0.8)" fill={C.gold} />
      <path d={SPARKLE} transform="translate(234 24) scale(0.6)" fill={C.accent} />
      <circle cx="40" cy="236" r="4" fill={C.accentSoft} />
      <circle cx="498" cy="140" r="5" fill={C.accent} opacity="0.5" />
      <circle cx="196" cy="48" r="3.5" fill={C.verified} opacity="0.55" />
      <circle cx="352" cy="22" r="4" fill={C.gold} />
      <circle cx="30" cy="150" r="3" fill={C.gold} />
      <circle cx="500" cy="352" r="4" fill={C.accentSoft} />
    </svg>
  );
}
