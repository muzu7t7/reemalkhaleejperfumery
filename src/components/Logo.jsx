import LogoMark from './LogoMark';

export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <LogoMark />
      <span className="logo-text">
        <b>Reem Al Khaleej</b>
        <span className="logo-sub">
          <span>Perfumes</span>
          <i className="logo-rule" />
          <em lang="ar" dir="rtl">ريم الخليج للعطور</em>
        </span>
      </span>
    </span>
  );
}
