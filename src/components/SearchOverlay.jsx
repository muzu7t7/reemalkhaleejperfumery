import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { products, aed } from '../data/products';
import useLockBody from '../hooks/useLockBody';
import ProductArt from './ProductArt';
import { useLang } from '../i18n';
import { localizeProduct } from '../i18n/products';

const SUGGESTIONS = ['Cambodian', 'Assam', 'Kynam', 'Ambergris', 'Bakhoor'];
const SUGGESTIONS_AR = ['كمبودي', 'آسام', 'كينام', 'عنبر', 'بخور'];

export default function SearchOverlay({ open, onClose }) {
  const { t, isAr } = useLang();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  useLockBody(open);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((raw) => {
      const p = localizeProduct(raw);
      return [p.name, p.family, p.type, p.origin, raw.name, raw.arabic, ...(p.notes ? [...p.notes.top, ...p.notes.heart, ...p.notes.base] : [])]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [query, isAr]);

  return (
    <div className={`search ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label={t('Search fragrances')} aria-hidden={!open}>
      <div className="search-backdrop" onClick={onClose} />
      <div className="search-panel">
        <div className="search-field">
          <Search size={20} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Search fragrances, notes or families')}
            aria-label={t('Search')}
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t('Close search')}>
            <X size={20} />
          </button>
        </div>

        {query.trim() === '' ? (
          <div className="search-suggest">
            <span className="eyebrow">{t('Popular')}</span>
            <div className="chips">
              {(isAr ? SUGGESTIONS_AR : SUGGESTIONS).map((s) => (
                <button key={s} type="button" className="chip" onClick={() => setQuery(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="search-empty">{t('No fragrances match “{query}”. Try an origin like Cambodia or Assam, or a form like oil or bakhoor.', { query })}</p>
        ) : (
          <ul className="search-results">
            {results.map((raw) => {
              const p = localizeProduct(raw);
              return (
              <li key={p.id}>
                <Link to={`/product/${p.id}`} onClick={onClose} className="search-row">
                  <span className="search-thumb" style={{ '--t1': p.tint[0], '--t2': p.tint[1] }}>
                    <ProductArt product={p} />
                  </span>
                  <span className="search-meta">
                    <strong>{p.name}</strong>
                    <small>{p.family}</small>
                  </span>
                  <span>{aed(p.price)}</span>
                </Link>
              </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
