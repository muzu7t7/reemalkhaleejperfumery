import LogoMark from './LogoMark';
import { useLang } from '../i18n';

export default function Logo({ className = '' }) {
  const { isAr } = useLang();
  return (
    <span className={`logo ${className}`}>
      <LogoMark />
      <span className="logo-text">
        {isAr ? (
          <>
            <b lang="ar">ريم الخليج</b>
            <span className="logo-sub">
              <span lang="ar">للعطور</span>
              <i className="logo-rule" />
              <em lang="en" dir="ltr">PERFUMES</em>
            </span>
          </>
        ) : (
          <>
            <b>Reem Al Khaleej</b>
            <span className="logo-sub">
              <span>Perfumes</span>
              <i className="logo-rule" />
              <em lang="ar" dir="rtl">ريم الخليج للعطور</em>
            </span>
          </>
        )}
      </span>
    </span>
  );
}
