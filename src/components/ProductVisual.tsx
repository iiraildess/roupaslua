import type { VisualKind } from "@/lib/types";

const PATHS: Record<VisualKind, React.ReactNode> = {
  dress: (
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M60 22 L60 40" />
      <path d="M92 22 L92 40" />
      <path d="M60 40 L52 66 Q76 76 100 66 L92 40" />
      <path d="M52 66 L44 132" />
      <path d="M100 66 L108 132" />
    </g>
  ),
  blouse: (
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M60 20 L60 46" />
      <path d="M92 20 L92 46" />
      <path d="M60 46 L50 68 L38 88" />
      <path d="M92 46 L102 68 L114 88" />
      <path d="M50 68 Q76 84 102 68 L96 132 L56 132 Z" />
      <path d="M70 48 L76 62 L82 48" />
    </g>
  ),
  pants: (
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M56 22 L96 22 L94 44 L90 130 L76 130 L74 60 L70 130 L56 130 L52 44 Z" />
    </g>
  ),
  jacket: (
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M56 18 L56 40" />
      <path d="M96 18 L96 40" />
      <path d="M56 40 L44 62 L32 86" />
      <path d="M96 40 L108 62 L120 86" />
      <path d="M44 62 Q76 78 108 62 L116 128 L96 128 L92 84 L80 128 L72 128 L68 84 L56 128 L36 128 Z" />
      <path d="M70 44 L76 60 L82 44" />
    </g>
  ),
  shoes: (
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M34 78 Q34 58 52 58 L76 58 Q96 58 108 72 Q124 90 130 102 L130 110 L34 110 Z" />
      <path d="M44 92 L120 92" />
      <path d="M56 70 L64 84 M74 68 L82 84 M92 68 L100 84" />
    </g>
  ),
  bag: (
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M56 48 Q56 24 76 24 Q96 24 96 48" />
      <path d="M44 48 L108 48 L116 122 Q76 136 36 122 Z" />
      <path d="M68 48 L68 60 M84 48 L84 60" />
    </g>
  ),
  hat: (
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M44 96 Q44 52 76 52 Q108 52 108 96" />
      <path d="M30 96 L122 96" />
      <path d="M58 62 Q76 72 94 62" />
    </g>
  ),
  sunglasses: (
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M28 66 L48 66 Q54 50 76 50 Q98 50 104 66 L124 66" />
      <rect x="40" y="66" width="26" height="22" rx="8" />
      <rect x="86" y="66" width="26" height="22" rx="8" />
      <path d="M66 74 L86 74" />
    </g>
  ),
};

export function ProductVisual({
  kind,
  gradient,
  className = "",
}: {
  kind: VisualKind;
  gradient: [string, string];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 152 160"
      className={className}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`g-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <rect width="152" height="160" fill={`url(#g-${kind})`} />
      <circle cx="128" cy="34" r="46" fill="white" opacity="0.12" />
      <circle cx="18" cy="132" r="34" fill="white" opacity="0.10" />
      <g transform="translate(0,-8)" color="rgba(255,255,255,0.92)">
        {PATHS[kind]}
      </g>
    </svg>
  );
}
