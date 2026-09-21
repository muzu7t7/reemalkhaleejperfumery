import { useId } from 'react';

// Body outlines share a 200×300 canvas; `top` is the y of the shoulder where the neck starts.
const SHAPES = {
  rect: {
    d: 'M40 256Q40 270 54 270L146 270Q160 270 160 256L160 124Q160 110 146 110L54 110Q40 110 40 124Z',
    top: 110, cy: 190, capW: 46, half: 60,
  },
  round: {
    d: 'M20 190a80 80 0 1 0 160 0a80 80 0 1 0 -160 0Z',
    top: 110, cy: 190, capW: 42, half: 78,
  },
  tall: {
    d: 'M62 258Q62 270 74 270L126 270Q138 270 138 258L138 84Q138 72 126 72L74 72Q62 72 62 84Z',
    top: 72, cy: 171, capW: 36, half: 38,
  },
  arch: {
    d: 'M40 256Q40 270 54 270L146 270Q160 270 160 256L160 160Q160 106 100 106Q40 106 40 160Z',
    top: 106, cy: 188, capW: 44, half: 60,
  },
  flask: {
    d: 'M70 110L130 110L166 250Q168 270 148 270L52 270Q32 270 34 250Z',
    top: 110, cy: 190, capW: 42, half: 52,
  },
};

const NECK_H = 22;
const CAP_H = 50;

export default function Bottle({ shape = 'rect', liquid, cap = '#c9974a', label = '', className = '' }) {
  const uid = useId().replace(/:/g, '');
  const s = SHAPES[shape] || SHAPES.rect;
  const [l1, l2] = liquid || ['#9a5418', '#2a1207'];

  const capTop = s.top - NECK_H - CAP_H + 6;
  const contentH = 278 - capTop;
  const ty = (300 - contentH) / 2 - capTop;
  const level = s.top + (270 - s.top) * 0.16;

  return (
    <svg
      className={`bottle ${className}`}
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={label ? `${label} perfume bottle` : 'Perfume bottle'}
    >
      <defs>
        <linearGradient id={`liq${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={l1} />
          <stop offset="1" stopColor={l2} />
        </linearGradient>
        <linearGradient id={`glass${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".45" stopColor="#fff" stopOpacity=".12" />
          <stop offset="1" stopColor="#fff" stopOpacity=".38" />
        </linearGradient>
        <linearGradient id={`cap${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={cap} />
          <stop offset=".35" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".6" stopColor={cap} />
          <stop offset="1" stopColor="#000" stopOpacity=".45" />
        </linearGradient>
        <radialGradient id={`shadow${uid}`}>
          <stop offset="0" stopColor="#000" stopOpacity=".32" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`clip${uid}`}>
          <rect x="0" y={level} width="200" height="300" />
        </clipPath>
      </defs>

      <g transform={`translate(0 ${ty})`}>
        <ellipse cx="100" cy="272" rx="70" ry="8" fill={`url(#shadow${uid})`} />

        {/* neck + collar */}
        <rect x="86" y={s.top - NECK_H} width="28" height={NECK_H + 6} fill="#fff" fillOpacity=".3" />
        <rect x="82" y={s.top - NECK_H - 2} width="36" height="8" rx="2" fill={`url(#cap${uid})`} />

        {/* cap */}
        <rect
          x={100 - s.capW / 2}
          y={capTop}
          width={s.capW}
          height={CAP_H}
          rx={shape === 'round' ? 20 : 6}
          fill={`url(#cap${uid})`}
        />
        <rect x={100 - s.capW / 2} y={capTop + CAP_H - 6} width={s.capW} height="2" fill="#000" fillOpacity=".18" />

        {/* liquid, inset from the glass */}
        <g transform={`translate(100 ${s.cy}) scale(.9) translate(-100 ${-s.cy})`}>
          <path d={s.d} fill={`url(#liq${uid})`} clipPath={`url(#clip${uid})`} />
        </g>

        {/* glass */}
        <path d={s.d} fill={`url(#glass${uid})`} stroke="#fff" strokeOpacity=".6" strokeWidth="1.2" />

        {/* label */}
        <g>
          <rect x="74" y={s.cy - 24} width="52" height="46" rx="2" fill="#fbf6ea" fillOpacity=".92" />
          <text x="100" y={s.cy - 10} textAnchor="middle" fontSize="6.4" letterSpacing="1.6" fill="#17110b" fontFamily="Manrope, sans-serif" fontWeight="600">
            REEM
          </text>
          <text x="100" y={s.cy - 3} textAnchor="middle" fontSize="3.6" letterSpacing="1.4" fill="#5b4f42" fontFamily="Manrope, sans-serif">
            AL KHALEEJ
          </text>
          <line x1="88" x2="112" y1={s.cy + 3} y2={s.cy + 3} stroke="#a06a1c" strokeWidth=".6" />
          <text x="100" y={s.cy + 13} textAnchor="middle" fontSize="6" fontStyle="italic" fill="#17110b" fontFamily="Fraunces, serif">
            {label.length > 14 ? label.slice(0, 14) : label}
          </text>
        </g>

        {/* specular highlights */}
        <rect x={100 - s.half + 10} y={s.top + 16} width="7" height={(270 - s.top) * 0.62} rx="3.5" fill="#fff" fillOpacity=".55" />
        <rect x={100 + s.half - 20} y={s.top + 30} width="3" height={(270 - s.top) * 0.35} rx="1.5" fill="#fff" fillOpacity=".35" />
      </g>
    </svg>
  );
}
