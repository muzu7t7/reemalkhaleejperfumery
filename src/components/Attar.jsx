import { useId } from 'react';

// Classic attar flask: bulb body, long neck, tapered brass stopper. Canvas matches Bottle (200×300).
const BODY =
  'M58 268Q44 268 46 250Q48 214 76 196Q90 188 92 172L92 134L108 134L108 172Q110 188 124 196Q152 214 154 250Q156 268 142 268Z';

export default function Attar({ liquid = ['#b8741f', '#3a1c08'], cap = '#c9974a', label = '', className = '' }) {
  const uid = useId().replace(/:/g, '');
  const [l1, l2] = liquid;

  return (
    <svg
      className={`bottle ${className}`}
      viewBox="30 38 140 240"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={label ? `${label} oud oil flask` : 'Oud oil flask'}
    >
      <defs>
        <linearGradient id={`liq${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="190" x2="0" y2="266">
          <stop offset="0" stopColor={l1} />
          <stop offset="1" stopColor={l2} />
        </linearGradient>
        <linearGradient id={`glass${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".5" />
          <stop offset=".45" stopColor="#fff" stopOpacity=".1" />
          <stop offset="1" stopColor="#fff" stopOpacity=".34" />
        </linearGradient>
        <linearGradient id={`brass${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={cap} />
          <stop offset=".35" stopColor="#fff" stopOpacity=".6" />
          <stop offset=".62" stopColor={cap} />
          <stop offset="1" stopColor="#000" stopOpacity=".5" />
        </linearGradient>
        <radialGradient id={`shadow${uid}`}>
          <stop offset="0" stopColor="#000" stopOpacity=".34" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`clip${uid}`}>
          <rect x="0" y="188" width="200" height="120" />
        </clipPath>
      </defs>

      <g transform="translate(0 -6)">
        <ellipse cx="100" cy="270" rx="64" ry="7" fill={`url(#shadow${uid})`} />

        {/* stopper and collar */}
        <path d="M96 136L95 80Q100 50 105 80L104 136Z" fill={`url(#brass${uid})`} />
        <rect x="87" y="128" width="26" height="10" rx="2.5" fill={`url(#brass${uid})`} />

        {/* oil, inset from the glass */}
        <g transform="translate(100 235) scale(.92) translate(-100 -235)">
          <path d={BODY} fill={`url(#liq${uid})`} clipPath={`url(#clip${uid})`} />
        </g>

        {/* glass */}
        <path d={BODY} fill={`url(#glass${uid})`} stroke="#fff" strokeOpacity=".6" strokeWidth="1.2" />

        {/* label */}
        <rect x="68" y="226" width="64" height="32" rx="2" fill="#fbf6ea" fillOpacity=".92" />
        <text x="100" y="237" textAnchor="middle" fontSize="4.4" letterSpacing=".9" fill="#17110b" fontFamily="Manrope, sans-serif" fontWeight="600">
          REEM AL KHALEEJ
        </text>
        <line x1="86" x2="114" y1="241" y2="241" stroke="#a06a1c" strokeWidth=".6" />
        <text x="100" y="251" textAnchor="middle" fontSize="7" fontStyle="italic" fill="#17110b" fontFamily="Fraunces, serif">
          {label.slice(0, 12)}
        </text>

        {/* highlights */}
        <rect x="56" y="214" width="5" height="38" rx="2.5" fill="#fff" fillOpacity=".5" />
        <rect x="139" y="222" width="3" height="22" rx="1.5" fill="#fff" fillOpacity=".3" />
        <rect x="94.5" y="142" width="2.5" height="26" rx="1.2" fill="#fff" fillOpacity=".45" />
      </g>
    </svg>
  );
}
