/*
 * Brand mark: an arch (the Gulf doorway), a perfume drop, and a four-point star.
 * The arches follow currentColor; the star and drop use the --gold token.
 */
export default function LogoMark({ className = '' }) {
  return (
    <svg className={`logo-mark ${className}`} viewBox="0 0 64 80" fill="none" aria-hidden="true">
      <path d="M4 76V33a28 28 0 0 1 56 0v43" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M11 76V34a21 21 0 0 1 42 0v42" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M0 76.5h64" stroke="currentColor" strokeWidth="1" />
      <path className="mark-star" d="M32 18.5l1.8 4.7 4.7 1.8-4.7 1.8L32 31.5l-1.8-4.7L25.5 25l4.7-1.8z" />
      <path className="mark-drop" d="M32 40S22 52.5 22 59.5a10 10 0 0 0 20 0C42 52.5 32 40 32 40z" />
      <path className="mark-shine" d="M27.5 58.5a4.6 4.6 0 0 0 2.6 4.4" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
