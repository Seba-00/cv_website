/*
  The site's signature: wind paths drifting slowly across the section,
  after "صبا" — the gentle east wind. Pure SVG + CSS, no JS cost.
*/
export default function Breeze({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1440 720"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <path
        className="breeze-path"
        d="M-120 540 C 180 500, 420 590, 700 520 C 940 460, 1140 400, 1560 450"
        stroke="rgb(var(--color-accent))"
        strokeOpacity="0.22"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className="breeze-path-slow"
        d="M-120 430 C 240 390, 480 470, 760 410 C 1020 355, 1220 300, 1560 340"
        stroke="rgb(var(--color-accent))"
        strokeOpacity="0.12"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        className="breeze-path"
        d="M-120 620 C 300 660, 560 580, 860 610 C 1120 635, 1300 560, 1560 590"
        stroke="rgb(var(--color-coral))"
        strokeOpacity="0.14"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ animationDuration: '120s' }}
      />
    </svg>
  );
}
