import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { products, aed } from '../data/products';
import useLockBody from '../hooks/useLockBody';
import ProductArt from './ProductArt';

const SUGGESTIONS = ['Cambodian', 'Assam', 'Kynam', 'Ambergris', 'Bakhoor'];

export default function SearchOverlay({ open, onClose }) {
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
    return products.filter((p) =>
      [p.name, p.family, p.type, p.origin, ...(p.notes ? [...p.notes.top, ...p.notes.heart, ...p.notes.base] : [])]
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  return (
    <div className={`search ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Search fragrances" aria-hidden={!open}>
      <div className="search-backdrop" onClick={onClose} />
      <div className="search-panel">
        <div className="search-field">
          <Search size={20} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances, notes or families"
            aria-label="Search"
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        {query.trim() === '' ? (
          <div className="search-suggest">
            <span className="eyebrow">Popular</span>
            <div className="chips">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" className="chip" onClick={() => setQuery(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="search-empty">No fragrances match “{query}”. Try an origin like Cambodia or Assam, or a form like oil or bakhoor.</p>
        ) : (
          <ul className="search-results">
            {results.map((p) => (
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
