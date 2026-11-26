import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, Star, Truck, ShieldCheck, Gift, Check, ChevronDown, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { aed, getProduct, products, TYPE_META, FREE_SHIPPING, SHIPPING_FEE } from '../data/products';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';
import LegalNotice from '../components/LegalNotice';
import { isAmbergris } from '../data/ambergris';
import { useLang } from '../i18n';
import { localizeProduct } from '../i18n/products';
import NotFound from './NotFound';

const level = (v) => (v >= 85 ? 'Exceptional' : v >= 70 ? 'Strong' : 'Moderate');

export default function ProductDetails() {
  const { id } = useParams();
  const { t, rich, isAr } = useLang();
  const product = localizeProduct(getProduct(id));
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
        <nav className="crumbs" aria-label={t('Breadcrumb')}>
          <Link to="/">{t('Home')}</Link>
          <span>/</span>
          <Link to={`/products?type=${encodeURIComponent(product.type)}`}>{t(product.type)}</Link>
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
            {!isAr && (
              <p className="pdp-ar" lang="ar" dir="rtl">
                {product.arabic}
              </p>
            )}

            <div className="pdp-rating">
              <span className="stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, n) => (
                  <Star key={n} size={16} fill={n < Math.round(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </span>
              <span>
                {product.rating.toFixed(1)} <span className="muted">({t('{n} reviews', { n: product.reviews })})</span>
              </span>
            </div>

            <p className="pdp-price">
              {aed(product.price)} <small className="pdp-vat">{t('incl. 5% VAT')}</small>
            </p>
            <p className="pdp-desc">{product.description}</p>

            {isAmbergris(product) && <LegalNotice />}

            <div className="pdp-buy">
              <div className="stepper">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label={t('Decrease quantity')}>
                  <Minus size={16} />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label={t('Increase quantity')}>
                  <Plus size={16} />
                </button>
              </div>
              <button type="button" className={`btn btn-solid btn-lg pdp-add ${justAdded ? 'is-done' : ''}`} onClick={handleAdd}>
                {justAdded ? (
                  <>
                    <Check size={18} /> {t('Added to bag')}
                  </>
                ) : (
                  <>{t('Add to bag')} · {aed(product.price * quantity)}</>
                )}
              </button>
              <button
                type="button"
                className={`icon-btn bordered ${wished ? 'is-on' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={wished}
                aria-label={wished ? t('Remove from wishlist') : t('Add to wishlist')}
              >
                <Heart size={20} fill={wished ? 'currentColor' : 'none'} />
              </button>
            </div>

            <ul className="trust">
              <li>
                <Truck size={18} /> {t('48h UAE delivery')}
              </li>
              <li>
                <Gift size={18} /> {t('2 free samples')}
              </li>
              <li>
                <ShieldCheck size={18} /> {t('Authenticity guaranteed')}
              </li>
            </ul>

            {product.notes && (
              <div className="pyramid">
                <h2 className="eyebrow">{t('Scent profile')}</h2>
                {meta.tiers.map(([key, label, when]) => (
                  <div key={key} className={`tier tier-${key}`}>
                    <div className="tier-label">
                      <strong>{t(label)}</strong>
                      <small>{t(when)}</small>
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
                    <span>{t(name)}</span>
                    <div className="meter-bar">
                      <i style={{ '--v': value / 100 }} />
                    </div>
                    <b>{t(level(value))}</b>
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
                  <strong>{product.type === 'Ambergris' ? t('About ambergris') : t('About {origin} oud', { origin: product.originLabel || product.origin })}</strong>
                  <small>
                    {product.type === 'Ambergris'
                      ? t('What it is, how it ages and its long history')
                      : t('How it smells, where it grows and how it differs')}
                  </small>
                </span>
              </Link>
            )}

            <div className="accordion">
              <details open>
                <summary>
                  {t('How to use')} <ChevronDown size={18} />
                </summary>
                <p>{t(meta.howTo)}</p>
              </details>
              <details>
                <summary>
                  {t('Delivery')} <ChevronDown size={18} />
                </summary>
                <p>{t('Complimentary across the UAE on orders over {free}, otherwise {fee}. Dispatched within 24 hours and delivered in 48.', { free: aed(FREE_SHIPPING), fee: aed(SHIPPING_FEE) })}</p>
              </details>
              <details>
                <summary>
                  {t('Returns')} <ChevronDown size={18} />
                </summary>
                <p>{t('Unopened items can be returned within 14 days. Opened oils, wood and bakhoor are non-returnable, so try our samples first.')}</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t('Continue exploring')}</span>
            <h2 className="display-md">{rich(t('You may also *love*'))}</h2>
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
          {justAdded ? t('Added') : t('Add to bag')}
        </button>
      </div>
    </>
  );
}
