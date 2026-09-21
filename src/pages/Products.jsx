import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, aed } from '../data/products';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', ...new Set(products.map((p) => p.category))];
const GENDERS = ['All', 'Women', 'Men', 'Unisex'];
const OCCASIONS = ['All', 'Daily', 'Evening', 'Wedding'];
const MAX = Math.max(...products.map((p) => p.price));
const MIN = Math.min(...products.map((p) => p.price));

const SORTS = {
  featured: { label: 'Featured', fn: () => 0 },
  low: { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  high: { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  rated: { label: 'Top rated', fn: (a, b) => b.rating - a.rating || b.reviews - a.reviews },
};

function Segmented({ label, options, value, onChange }) {
  return (
    <fieldset className="seg">
      <legend>{label}</legend>
      <div className="chips">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={`chip ${value === o ? 'is-active' : ''}`}
            aria-pressed={value === o}
            onClick={() => onChange(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const cat = CATEGORIES.includes(params.get('cat')) ? params.get('cat') : 'All';
  const [sort, setSort] = useState('featured');
  const [gender, setGender] = useState('All');
  const [occasion, setOccasion] = useState('All');
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [panel, setPanel] = useState(false);

  const setCat = (c) => setParams(c === 'All' ? {} : { cat: c });

  const list = useMemo(
    () =>
      products
        .filter((p) => cat === 'All' || p.category === cat)
        .filter((p) => gender === 'All' || p.gender === gender)
        .filter((p) => occasion === 'All' || p.occasion === occasion)
        .filter((p) => p.price <= maxPrice)
        .sort(SORTS[sort].fn),
    [cat, gender, occasion, maxPrice, sort],
  );

  const activeCount = (gender !== 'All') + (occasion !== 'All') + (maxPrice < MAX);
  const reset = () => {
    setGender('All');
    setOccasion('All');
    setMaxPrice(MAX);
    setCat('All');
  };

  return (
    <>
      <section className="page-hero pattern">
        <div className="container">
          <span className="eyebrow">The collection</span>
          <h1 className="display-md">
            Our <em>fragrances</em>
          </h1>
          <p className="lede">Eight compositions, each finished by hand. Filter by family, wearer or occasion.</p>
        </div>
      </section>

      <section className="container shop">
        <div className="shop-bar">
          <div className="chips chips-scroll" role="group" aria-label="Fragrance family">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip ${cat === c ? 'is-active' : ''}`}
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="shop-tools">
            <button
              type="button"
              className={`btn btn-ghost btn-sm ${panel ? 'is-active' : ''}`}
              onClick={() => setPanel((v) => !v)}
              aria-expanded={panel}
            >
              <SlidersHorizontal size={16} /> Filters{activeCount ? ` (${activeCount})` : ''}
            </button>
            <label className="select">
              <span className="sr-only">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.entries(SORTS).map(([k, s]) => (
                  <option key={k} value={k}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className={`filter-panel ${panel ? 'is-open' : ''}`}>
          <div className="filter-inner">
            <Segmented label="For" options={GENDERS} value={gender} onChange={setGender} />
            <Segmented label="Occasion" options={OCCASIONS} value={occasion} onChange={setOccasion} />
            <div className="seg">
              <label htmlFor="price-range" className="seg-legend">
                Max price <strong>{aed(maxPrice)}</strong>
              </label>
              <input
                id="price-range"
                type="range"
                className="range"
                min={MIN}
                max={MAX}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
            <button type="button" className="link-btn" onClick={reset}>
              <X size={14} /> Clear all
            </button>
          </div>
        </div>

        <p className="shop-count" aria-live="polite">
          {list.length} {list.length === 1 ? 'fragrance' : 'fragrances'}
        </p>

        {list.length === 0 ? (
          <div className="empty">
            <p className="display-sm">Nothing matches those filters</p>
            <p className="muted">Try widening your price range or clearing a filter.</p>
            <button type="button" className="btn btn-solid" onClick={reset}>
              Reset filters
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
