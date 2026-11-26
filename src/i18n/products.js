import { getLang } from './lang';
import { t } from './index';

const cache = new Map();

// Arabic view of a product: same data, translated text. Raw fields used for filtering (origin, type) stay as they are.
export function localizeProduct(p) {
  if (!p || getLang() !== 'ar') return p;
  let fields = cache.get(p.id);
  if (!fields) {
    fields = {
      name: p.arabic || p.name,
      family: t(p.family),
      badge: p.badge ? t(p.badge) : p.badge,
      description: t(p.description),
      size: t(p.size),
      originLabel: t(p.origin),
      notes: p.notes
        ? { top: p.notes.top.map((n) => t(n)), heart: p.notes.heart.map((n) => t(n)), base: p.notes.base.map((n) => t(n)) }
        : p.notes,
      spec: p.spec.map(([k, v]) => [t(k), t(v)]),
    };
    cache.set(p.id, fields);
  }
  return { ...p, ...fields };
}

// Call when the language changes so cached translations are rebuilt.
export const clearProductCache = () => cache.clear();
