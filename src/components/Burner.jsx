import { useId } from 'react';

// Traditional mabkhara: footed bowl, perforated dome, finial and drifting smoke.
const HOLES = [
  [100, 152],
  [84, 160],
  [116, 160],
  [70, 172],
  [100, 170],
  [130, 172],
  [84, 182],
  [116, 182],
];

export default function Burner({ cap = '#c9974a', className = '' }) {
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      className={`bottle ${className}`}
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Brass mabkhara incense burner"
    >
      <defs>
        <linearGradient id={`brass${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={cap} />
          <stop offset=".3" stopColor="#fff" stopOpacity=".65" />
          <stop offset=".58" stopColor={cap} />
          <stop offset="1" stopColor="#000" stopOpacity=".55" />
        </linearGradient>
        <radialGradient id={`shadow${uid}`}>
          <stop offset="0" stopColor="#000" stopOpacity=".34" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="274" rx="62" ry="7" fill={`url(#shadow${uid})`} />

      <g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2">
        <path className="smoke" d="M84 128C72 108 98 94 86 72S76 44 90 26" />
        <path className="smoke smoke-2" d="M118 130C130 110 104 96 118 76S128 48 112 30" />
      </g>

      {/* foot and stem */}
      <path d="M72 270L128 270L120 252L80 252Z" fill={`url(#brass${uid})`} />
      <rect x="93" y="232" width="14" height="22" fill={`url(#brass${uid})`} />
      {/* bowl */}
      <path d="M48 196Q48 238 100 240Q152 238 152 196Z" fill={`url(#brass${uid})`} />
      {/* rim band */}
      <rect x="44" y="188" width="112" height="10" rx="3" fill={`url(#brass${uid})`} />
      <rect x="44" y="196" width="112" height="2" fill="#000" fillOpacity=".25" />
      {/* dome */}
      <path d="M56 190Q56 140 100 134Q144 140 144 190Z" fill={`url(#brass${uid})`} />
      {HOLES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.2" fill="#2a1a08" fillOpacity=".75" />
      ))}
      {/* finial */}
      <rect x="96" y="124" width="8" height="14" rx="2" fill={`url(#brass${uid})`} />
      <circle cx="100" cy="120" r="6.5" fill={`url(#brass${uid})`} />
      {/* highlight */}
      <path d="M70 186Q70 154 92 142" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
