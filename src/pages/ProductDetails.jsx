import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, Star, Truck, ShieldCheck, Gift, Check, ChevronDown, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { aed, getProduct, products, TYPE_META } from '../data/products';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';
import NotFound from './NotFound';

const level = (v) => (v >= 85 ? 'Exceptional' : v >= 70 ? 'Strong' : 'Moderate');

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setJustAdded(false);
  }, [id]);

  if (!product) return <NotFound />;

  const meta = TYPE_META[product.type];
  const wished = wishlist.includes(product.id);
  const hasMeters = product.longevity != null;
  const related = [
    ...products.filter((p) => p.id !== product.id && p.type === product.type),
    ...products.filter((p) => p.id !== product.id && p.type !== product.type),
  ].slice(0, 4);

  const handleAdd = () => {
    addToCart(product.id, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <>
      <section className="container pdp">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/products?type=${encodeURIComponent(product.type)}`}>{product.type}</Link>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pdp-grid">
          <div className="pdp-media">
            <div className="pdp-stage pattern" style={{ '--t1': product.tint[0], '--t2': product.tint[1] }}>
              <div className="pdp-glow" />
              <ProductArt product={product} className="pdp-bottle" />
              {product.badge && <span className="badge">{product.badge}</span>}
              <span className="pdp-size">{product.size}</span>
            </div>
          </div>

          <div className="pdp-info">
            <span className="eyebrow">{product.family}</span>
            <h1 className="display-md">{product.name}</h1>
            <p className="pdp-ar" lang="ar" dir="rtl">
              {product.arabic}
            </p>

            <div className="pdp-rating">
              <span className="stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, n) => (
                  <Star key={n} size={16} fill={n < Math.round(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </span>
              <span>
                {product.rating.toFixed(1)} <span className="muted">({product.reviews} reviews)</span>
              </span>
            </div>

            <p className="pdp-price">{aed(product.price)}</p>
            <p className="pdp-desc">{product.description}</p>

            <div className="pdp-buy">
              <div className="stepper">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <Minus size={16} />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                  <Plus size={16} />
                </button>
              </div>
              <button type="button" className={`btn btn-solid btn-lg pdp-add ${justAdded ? 'is-done' : ''}`} onClick={handleAdd}>
                {justAdded ? (
                  <>
                    <Check size={18} /> Added to bag
                  </>
                ) : (
                  <>Add to bag · {aed(product.price * quantity)}</>
                )}
              </button>
              <button
                type="button"
                className={`icon-btn bordered ${wished ? 'is-on' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={wished}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={20} fill={wished ? 'currentColor' : 'none'} />
              </button>
            </div>

            <ul className="trust">
              <li>
                <Truck size={18} /> 48h UAE delivery
              </li>
              <li>
                <Gift size={18} /> 2 free samples
              </li>
              <li>
                <ShieldCheck size={18} /> Authenticity guaranteed
              </li>
            </ul>

            {product.notes && (
              <div className="pyramid">
                <h2 className="eyebrow">Scent profile</h2>
                {meta.tiers.map(([key, label, when]) => (
                  <div key={key} className={`tier tier-${key}`}>
                    <div className="tier-label">
                      <strong>{label}</strong>
                      <small>{when}</small>
                    </div>
                    <div className="tier-notes">
                      {product.notes[key].map((n) => (
                        <span key={n} className="note">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {hasMeters && (
              <div className="meters">
                {[
                  [meta.meters[0], product.longevity],
                  [meta.meters[1], product.projection],
                ].map(([name, value]) => (
                  <div className="meter" key={name}>
                    <span>{name}</span>
                    <div className="meter-bar">
                      <i style={{ '--v': value / 100 }} />
                    </div>
                    <b>{level(value)}</b>
                  </div>
                ))}
              </div>
            )}

            <dl className="spec">
              {product.spec.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            {(product.type === 'Oud Oil' || product.type === 'Oud Wood' || product.type === 'Ambergris') && (
              <Link to={product.type === 'Ambergris' ? '/oud#ambergris' : '/oud#origins'} className="origin-link">
                <MapPin size={18} />
                <span>
                  <strong>{product.type === 'Ambergris' ? 'About ambergris' : `About ${product.origin} oud`}</strong>
                  <small>
                    {product.type === 'Ambergris'
                      ? 'What it is, how it ages and its long history'
                      : 'How it smells, where it grows and how it differs'}
                  </small>
                </span>
              </Link>
            )}

            <div className="accordion">
              <details open>
                <summary>
                  How to use <ChevronDown size={18} />
                </summary>
                <p>{meta.howTo}</p>
              </details>
              <details>
                <summary>
                  Delivery <ChevronDown size={18} />
                </summary>
                <p>Complimentary across the UAE on orders over AED 500, otherwise AED 25. Dispatched within 24 hours and delivered in 48.</p>
              </details>
              <details>
                <summary>
                  Returns <ChevronDown size={18} />
                </summary>
                <p>Unopened items can be returned within 14 days. Opened oils, wood and bakhoor are non-returnable, so try our samples first.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Continue exploring</span>
            <h2 className="display-md">
              You may also <em>love</em>
            </h2>
          </div>
        </div>
        <div className="grid-products">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 70} />
          ))}
        </div>
      </section>

      <div className="buybar">
        <div>
          <strong>{product.name}</strong>
          <small>{aed(product.price * quantity)}</small>
        </div>
        <button type="button" className="btn btn-solid" onClick={handleAdd}>
          {justAdded ? 'Added' : 'Add to bag'}
        </button>
      </div>
    </>
  );
}
