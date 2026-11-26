import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, aed, TYPES } from '../data/products';
import ProductCard from '../components/ProductCard';
import LegalNotice from '../components/LegalNotice';
import { useLang } from '../i18n';

const ORIGIN_LIST = ['All', ...new Set(products.map((p) => p.origin))];
const MAX = Math.ceil(Math.max(...products.map((p) => p.price)) / 10) * 10;
const MIN = Math.floor(Math.min(...products.map((p) => p.price)) / 10) * 10;

const SORTS = {
  featured: { label: 'Featured', fn: () => 0 },
  low: { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  high: { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  rated: { label: 'Top rated', fn: (a, b) => b.rating - a.rating || b.reviews - a.reviews },
};

function Chips({ label, options, value, onChange }) {
  const { t } = useLang();
  return (
    <fieldset className="seg">
      <legend>{t(label)}</legend>
      <div className="chips">
        {options.map((o) => (
          <button key={o} type="button" className={`chip ${value === o ? 'is-active' : ''}`} aria-pressed={value === o} onClick={() => onChange(o)}>
            {t(o)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function Products() {
  const { t, rich } = useLang();
  const [params, setParams] = useSearchParams();
  const type = TYPES.includes(params.get('type')) ? params.get('type') : 'All';
  const origin = ORIGIN_LIST.includes(params.get('origin')) ? params.get('origin') : 'All';
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [panel, setPanel] = useState(params.has('origin'));

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === 'All') next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const list = useMemo(
    () =>
      products
        .filter((p) => type === 'All' || p.type === type)
        .filter((p) => origin === 'All' || p.origin === origin)
        .filter((p) => p.price <= maxPrice)
        .sort(SORTS[sort].fn),
    [type, origin, maxPrice, sort],
  );

  const activeCount = (origin !== 'All') + (maxPrice < MAX);
  const reset = () => {
    setMaxPrice(MAX);
    setParams({});
  };

  return (
    <>
      <section className="page-hero pattern">
        <div className="container">
          <span className="eyebrow">{t('The collection')}</span>
          <h1 className="display-md">{rich(t('Oud, by *origin* and form'))}</h1>
          <p className="lede">
            {t('{n} pieces: pure oils, aged wood and bakhoor, from six origins. Not sure where to start? Read the', { n: products.length })}{' '}
            <Link to="/oud" className="text-link">
              {t('oud guide')}
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="container shop">
        <div className="shop-bar">
          <div className="chips chips-scroll" role="group" aria-label={t('Product type')}>
            {['All', ...TYPES].map((ty) => (
              <button key={ty} type="button" className={`chip ${type === ty ? 'is-active' : ''}`} aria-pressed={type === ty} onClick={() => setParam('type', ty)}>
                {t(ty)}
              </button>
            ))}
          </div>

          <div className="shop-tools">
            <button type="button" className={`btn btn-ghost btn-sm ${panel ? 'is-active' : ''}`} onClick={() => setPanel((v) => !v)} aria-expanded={panel}>
              <SlidersHorizontal size={16} /> {t('Filters')}{activeCount ? ` (${activeCount})` : ''}
            </button>
            <label className="select">
              <span className="sr-only">{t('Sort by')}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.entries(SORTS).map(([k, s]) => (
                  <option key={k} value={k}>
                    {t(s.label)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className={`filter-panel ${panel ? 'is-open' : ''}`}>
          <div className="filter-inner">
            <Chips label="Origin" options={ORIGIN_LIST} value={origin} onChange={(v) => setParam('origin', v)} />
            <div className="seg">
              <label htmlFor="price-range" className="seg-legend">
                {t('Max price')} <strong>{aed(maxPrice)}</strong>
              </label>
              <input id="price-range" type="range" className="range" min={MIN} max={MAX} step={10} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            </div>
            <button type="button" className="link-btn" onClick={reset}>
              <X size={14} /> {t('Clear all')}
            </button>
          </div>
        </div>

        {type === 'Ambergris' && <LegalNotice compact className="shop-legal" />}

        <p className="shop-count" aria-live="polite">
          {list.length} {list.length === 1 ? t('product') : t('products')}
        </p>

        {list.length === 0 ? (
          <div className="empty">
            <p className="display-sm">{t('Nothing matches those filters')}</p>
            <p className="muted">{t('Try widening your price range or clearing a filter.')}</p>
            <button type="button" className="btn btn-solid" onClick={reset}>
              {t('Reset filters')}
            </button>
          </div>
        ) : (
          <div className="grid-products">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={(i % 4) * 70} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
