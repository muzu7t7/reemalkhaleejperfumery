import { useId, useMemo } from 'react';
import { hash, mulberry32 } from '../utils/seeded';

/*
 * Procedural illustration of oud wood: a pile of irregular, resin-veined chips on a brass dish.
 * Shapes are generated from a seed, so each product always draws the same pieces.
 * tones = [light wood, dark wood, resin vein]; variant="bakhoor" draws rounder lumps plus smoke.
 */
// x, y, scale, rotation
const LAYOUT = [
  [100, 212, 1.3, -6],
  [68, 230, 1.0, 22],
  [134, 230, 1.1, -20],
  [90, 190, 0.9, 14],
  [122, 196, 0.78, 38],
  [76, 204, 0.72, -38],
  [106, 224, 0.7, 60],
  [62, 222, 0.62, -12],
];
const SINGLE = [[100, 226, 1, -6]];

function makeChunks(seed, count, bakhoor, size) {
  const rand = mulberry32(hash(seed));
  const layout = count === 1 ? SINGLE : LAYOUT.slice(0, count);
  return layout
    .map(([x, y, s, rot]) => {
      const n = bakhoor ? 9 : 8 + Math.floor(rand() * 2);
      const rx = bakhoor ? 17 : 28;
      const ry = bakhoor ? 14 : 11;
      const pts = Array.from({ length: n }, (_, k) => {
        const ang = (k / n) * Math.PI * 2 + (rand() - 0.5) * 0.5;
        const r = 0.78 + rand() * 0.4;
        return [Math.cos(ang) * rx * r, Math.sin(ang) * ry * r];
      });
      const grain = Array.from({ length: 4 }, (_, j) => {
        const gy = (j - 1.5) * ry * 0.42 + (rand() - 0.5) * 2;
        return `M${-rx * 0.7} ${gy}Q0 ${gy + (rand() - 0.5) * 6} ${rx * 0.7} ${gy + (rand() - 0.5) * 4}`;
      });
      const resin = Array.from({ length: 2 }, () => {
        const gy = (rand() - 0.5) * ry * 0.9;
        return `M${-rx * 0.55} ${gy}Q${-rx * 0.1} ${gy + (rand() - 0.5) * 8} ${rx * 0.5} ${gy + (rand() - 0.5) * 5}`;
      });
      return { x, y, s: s * size, rot, rx, ry, points: pts.map((p) => p.join(',')).join(' '), grain, resin };
    })
    .sort((a, b) => a.y - b.y);
}

export default function OudWood({
  seed = 'oud',
  tones = ['#8a5a2a', '#2e1809', '#e0a947'],
  count = 5,
  size = 1,
  variant = 'wood',
  dish = '#c9974a',
  className = '',
}) {
  const uid = useId().replace(/:/g, '');
  const bakhoor = variant === 'bakhoor';
  const chunks = useMemo(() => makeChunks(seed, count, bakhoor, size), [seed, count, bakhoor, size]);
  const [light, dark, resin] = tones;

  return (
    <svg
      className={`bottle ${className}`}
      viewBox="0 92 200 178"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={bakhoor ? 'Pieces of oud bakhoor' : 'Pieces of oud wood'}
    >
      <defs>
        <linearGradient id={`wood${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`dish${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={dish} />
          <stop offset=".3" stopColor="#fff" stopOpacity=".6" />
          <stop offset=".6" stopColor={dish} />
          <stop offset="1" stopColor="#000" stopOpacity=".5" />
        </linearGradient>
        <radialGradient id={`pool${uid}`}>
          <stop offset="0" stopColor="#3a2410" stopOpacity=".95" />
          <stop offset="1" stopColor="#6b4710" stopOpacity=".9" />
        </radialGradient>
      </defs>

      {/* brass dish */}
      <ellipse cx="100" cy="252" rx="86" ry="16" fill="#000" fillOpacity=".25" />
      <ellipse cx="100" cy="246" rx="82" ry="15" fill={`url(#dish${uid})`} />
      <ellipse cx="100" cy="243" rx="70" ry="11" fill={`url(#pool${uid})`} />

      {bakhoor && (
        <g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2">
          <path className="smoke" d="M92 176C80 156 106 142 94 120S84 84 98 62" />
          <path className="smoke smoke-2" d="M112 180C124 158 100 146 114 126S124 92 110 70" />
          <path className="smoke smoke-3" d="M102 168C96 150 112 138 104 118" strokeWidth="1.4" />
        </g>
      )}

      {chunks.map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y})`}>
          <ellipse cx="0" cy={c.ry * c.s * 0.75} rx={c.rx * c.s * 0.95} ry={c.ry * c.s * 0.3} fill="#000" fillOpacity=".3" />
          <g transform={`rotate(${c.rot}) scale(${c.s})`}>
            <polygon points={c.points} fill={`url(#wood${uid})`} stroke={dark} strokeWidth="1.2" strokeLinejoin="round" />
            {c.grain.map((d, k) => (
              <path key={k} d={d} fill="none" stroke="#000" strokeOpacity=".3" strokeWidth=".8" strokeLinecap="round" />
            ))}
            {c.resin.map((d, k) => (
              <path key={k} d={d} fill="none" stroke={resin} strokeOpacity=".8" strokeWidth="1.5" strokeLinecap="round" />
            ))}
            <ellipse cx={-c.rx * 0.2} cy={-c.ry * 0.35} rx={c.rx * 0.34} ry={c.ry * 0.17} fill="#fff" fillOpacity=".16" />
          </g>
        </g>
      ))}
    </svg>
  );
}
