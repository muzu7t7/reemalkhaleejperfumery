import { useSyncExternalStore } from 'react';
import { getLang, setLang, subscribeLang } from './lang';
import { AR } from './ar';

// Translate an English string. Arabic comes from the dictionary in ./ar; anything missing falls back to English.
// Placeholders like {amount} are filled from vars.
export function t(key, vars) {
  let s = getLang() === 'ar' ? (AR[key] ?? key) : key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(v);
  return s;
}

// Same as t(), but for words whose Arabic depends on context (e.g. 'Light' as a theme vs. a scent).
export function tc(ctx, key) {
  return getLang() === 'ar' ? (AR[`${ctx}:${key}`] ?? t(key)) : key;
}

// Turn *word* into <em>word</em> (used for the gold italic accent in headings; Arabic shows it upright).
export function rich(str, Tag = 'em') {
  return str.split(/\*(.+?)\*/g).map((part, i) => (i % 2 ? <Tag key={i}>{part}</Tag> : part));
}

export function useLang() {
  const lang = useSyncExternalStore(subscribeLang, getLang);
  return { lang, isAr: lang === 'ar', dir: lang === 'ar' ? 'rtl' : 'ltr', t, tc, rich, setLang };
}
