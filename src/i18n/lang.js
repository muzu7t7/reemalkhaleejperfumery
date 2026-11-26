// Language store: 'en' | 'ar'. Written to <html lang dir>, which the CSS keys off (rtl layout for Arabic).
// The choice is remembered; first visit follows the browser language.
const KEY = 'rk.lang';
const TITLES = { en: 'Reem Al Khaleej Perfumes', ar: 'ريم الخليج للعطور' };
const listeners = new Set();

const readLang = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'ar' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  return (navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : 'en';
};

let lang = readLang();

function apply() {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = TITLES[lang];
}

apply();

export function setLang(next) {
  if (next !== 'ar' && next !== 'en') return;
  lang = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* the choice still applies for this session */
  }
  apply();
  listeners.forEach((l) => l());
}

export const subscribeLang = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
export const getLang = () => lang;
