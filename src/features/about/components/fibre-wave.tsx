/**
 * Decorative ribbon of fine lines that twists across the credentials card.
 * Pure SVG generated at build time: no images, no client JavaScript.
 */

const LINES = 72;
const WIDTH = 1200;
const HEIGHT = 340;

function linePath(t: number) {
  // Negative spread above the ribbon's centre line, positive below. The sign
  // flips between the two halves, which produces the twist.
  const s = t - 0.5;
  const r = (n: number) => Math.round(n * 10) / 10;

  return [
    `M0 ${r(206 + s * 84)}`,
    `C210 ${r(250 + s * 74)} 430 ${r(246 + s * 30)} 610 ${r(226 + s * 4)}`,
    `S990 ${r(150 - s * 170)} ${WIDTH} ${r(84 - s * 236)}`,
  ].join(" ");
}

const paths = Array.from({ length: LINES }, (_, index) =>
  linePath(index / (LINES - 1)),
);

export function FibreWave({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="credentials-wave"
          x1="0"
          x2={WIDTH}
          y1="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffb38a" stopOpacity="0" />
          <stop offset="0.14" stopColor="#ff8f6b" />
          <stop offset="0.42" stopColor="#f0552b" />
          <stop offset="0.62" stopColor="#e0479e" />
          <stop offset="0.86" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#6d5bd0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="url(#credentials-wave)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {paths.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
