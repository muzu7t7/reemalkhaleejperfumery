import { Languages } from 'lucide-react';
import { useLang } from '../i18n';
import { clearProductCache } from '../i18n/products';

/* variant="icon": compact button in the header showing the other language's name.
   variant="labelled": pill button for the mobile menu. */
export default function LangSwitcher({ variant = 'icon', className = '' }) {
  const { isAr, setLang } = useLang();
  const next = isAr ? 'en' : 'ar';
  const label = isAr ? 'English' : 'العربية';
  const hint = isAr ? 'Switch to English' : 'التبديل إلى العربية';
  const toggle = () => {
    clearProductCache();
    setLang(next);
  };

  if (variant === 'labelled') {
    return (
      <button type="button" className={`btn btn-ghost theme-btn ${className}`} onClick={toggle} aria-label={hint} lang={next}>
        <Languages size={18} /> {label}
      </button>
    );
  }

  return (
    <button type="button" className={`lang-btn ${className}`} onClick={toggle} aria-label={hint} title={hint} lang={next}>
      <Languages size={17} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
