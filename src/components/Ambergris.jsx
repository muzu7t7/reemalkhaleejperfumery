import { useId, useMemo } from 'react';
import { hash, mulberry32 } from '../utils/seeded';

/*
 * Illustration of ambergris: a waxy, marbled, slightly pitted lump on a brass dish.
 * tones = [light wax, dark wax, streak]. Shapes come from a seed so each product always draws the same piece.
 */
const blobPath = (rand, cx, cy, rx, ry, n = 12) => {
  const pts = Array.from({ length: n }, (_, k) => {
    const ang = (k / n) * Math.PI * 2;
    const r = 0.84 + rand() * 0.28;
    return [cx + Math.cos(ang) * rx * r, cy + Math.sin(ang) * ry * r];
  });
  const f = (v) => v.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i += 1) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return `${d}Z`;
};

function makeLump(rand, cx, cy, rx, ry) {
  const streaks = Array.from({ length: 6 }, (_, i) => {
    const y = cy - ry * 0.75 + (i / 5) * ry * 1.5 + (rand() - 0.5) * 6;
    const bend = (rand() - 0.5) * 22;
    return {
      d: `M${cx - rx * 1.1} ${y}Q${cx - rx * 0.3} ${y + bend} ${cx + rx * 0.2} ${y - bend * 0.4}T${cx + rx * 1.1} ${y + bend * 0.5}`,
      w: 1.2 + rand() * 3.2,
      dark: i % 2 === 1,
    };
  });
  const pits = Array.from({ length: 8 }, () => {
    const ang = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * 0.72;
    return [cx + Math.cos(ang) * rx * dist, cy + Math.sin(ang) * ry * dist, 1 + rand() * 1.8];
  });
  return { d: blobPath(rand, cx, cy, rx, ry), streaks, pits, cx, cy, rx, ry };
}

export default function Ambergris({
  seed = 'ambergris',
  tones = ['#a9a393', '#4f4a40', '#e0dacb'],
  count = 3,
  size = 1,
  dish = '#c9974a',
  className = '',
}) {
  const uid = useId().replace(/:/g, '');
  const lumps = useMemo(() => {
    const rand = mulberry32(hash(seed));
    const layout = [
      [100, 212, 52 * size, 36 * size],
      [54, 232, 16 * size, 11 * size],
      [148, 234, 18 * size, 12 * size],
    ].slice(0, count);
    return layout.map(([cx, cy, rx, ry]) => makeLump(rand, cx, cy, rx, ry)).sort((a, b) => a.cy - b.cy);
  }, [seed, count, size]);
  const [light, dark, streak] = tones;

  return (
    <svg className={`bottle ${className}`} viewBox="0 92 200 178" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Piece of ambergris">
      <defs>
        <radialGradient id={`wax${uid}`} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={dark} />
        </radialGradient>
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
        {lumps.map((l, i) => (
          <clipPath key={i} id={`clip${uid}${i}`}>
            <path d={l.d} />
          </clipPath>
        ))}
      </defs>

      <ellipse cx="100" cy="252" rx="86" ry="16" fill="#000" fillOpacity=".25" />
      <ellipse cx="100" cy="246" rx="82" ry="15" fill={`url(#dish${uid})`} />
      <ellipse cx="100" cy="243" rx="70" ry="11" fill={`url(#pool${uid})`} />

      {lumps.map((l, i) => (
        <g key={i}>
          <ellipse cx={l.cx} cy={l.cy + l.ry * 0.85} rx={l.rx * 0.95} ry={l.ry * 0.28} fill="#000" fillOpacity=".3" />
          <path d={l.d} fill={`url(#wax${uid})`} />
          <g clipPath={`url(#clip${uid}${i})`} fill="none" strokeLinecap="round">
            {l.streaks.map((s, k) => (
              <path key={k} d={s.d} stroke={s.dark ? dark : streak} strokeOpacity={s.dark ? 0.4 : 0.55} strokeWidth={s.w} />
            ))}
            {l.pits.map(([x, y, r], k) => (
              <g key={k}>
                <circle cx={x} cy={y} r={r} fill={dark} fillOpacity=".55" />
                <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.4} fill="#fff" fillOpacity=".25" />
              </g>
            ))}
          </g>
          <path d={l.d} fill="none" stroke={dark} strokeOpacity=".45" strokeWidth="1" />
          <ellipse cx={l.cx - l.rx * 0.3} cy={l.cy - l.ry * 0.45} rx={l.rx * 0.34} ry={l.ry * 0.16} fill="#fff" fillOpacity=".22" />
        </g>
      ))}
    </svg>
  );
}
