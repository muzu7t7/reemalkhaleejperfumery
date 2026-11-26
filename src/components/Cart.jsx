import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { aed, products, FREE_SHIPPING } from '../data/products';
import useLockBody from '../hooks/useLockBody';
import ProductArt from './ProductArt';
import { useLang } from '../i18n';
import { localizeProduct } from '../i18n/products';
import LegalNotice from './LegalNotice';
import { isAmbergris } from '../data/ambergris';

export default function Cart() {
  const { isCartOpen, closeCart, cartItems, cartTotal, cartVat, cartCount, updateQty, removeFromCart, addToCart } = useCart();
  const { t, rich } = useLang();
  useLockBody(isCartOpen);

  useEffect(() => {
    if (!isCartOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartOpen, closeCart]);

  const remaining = Math.max(0, FREE_SHIPPING - cartTotal);
  const progress = Math.min(1, cartTotal / FREE_SHIPPING);
  const suggestions = products.filter((p) => !cartItems.some((i) => i.id === p.id)).slice(0, 3);

  return (
    <div className={`drawer ${isCartOpen ? 'is-open' : ''}`} aria-hidden={!isCartOpen}>
      <div className="drawer-backdrop" onClick={closeCart} />
      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label={t('Shopping bag')}>
        <header className="drawer-head">
          <h2>
            {t('Your bag')} <span className="muted">({cartCount})</span>
          </h2>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label={t('Close bag')}>
            <X size={22} />
          </button>
        </header>

        <div className="ship-meter">
          <p>
            <Truck size={16} />
            {cartItems.length === 0 ? (
              <>{t('Complimentary delivery over {amount}', { amount: aed(FREE_SHIPPING) })}</>
            ) : remaining > 0 ? (
              <>{rich(t('You are *{amount}* away from complimentary delivery', { amount: aed(remaining) }), 'strong')}</>
            ) : (
              <>{t('You have unlocked complimentary delivery')}</>
            )}
          </p>
          <div className="ship-track">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="drawer-empty">
              <p className="display-sm">{t('Your bag is empty')}</p>
              <p className="muted">{t('Begin with an oil, a chip of wood or a little bakhoor.')}</p>
              <div className="drawer-suggest">
                {suggestions.map((raw) => {
                  const p = localizeProduct(raw);
                  return (
                  <Link key={p.id} to={`/product/${p.id}`} onClick={closeCart} className="mini-card">
                    <span className="mini-thumb" style={{ '--t1': p.tint[0], '--t2': p.tint[1] }}>
                      <ProductArt product={p} />
                    </span>
                    <span>{p.name}</span>
                    <small>{aed(p.price)}</small>
                  </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <ul className="line-list">
              {cartItems.map((rawItem) => {
                const item = { ...localizeProduct(rawItem), quantity: rawItem.quantity };
                return (
                <li key={item.id} className="line">
                  <Link
                    to={`/product/${item.id}`}
                    onClick={closeCart}
                    className="line-thumb"
                    style={{ '--t1': item.tint[0], '--t2': item.tint[1] }}
                  >
                    <ProductArt product={item} />
                  </Link>
                  <div className="line-info">
                    <div className="line-top">
                      <div>
                        <h3>{item.name}</h3>
                        <p className="muted">{item.size}</p>
                      </div>
                      <button type="button" className="icon-btn sm" onClick={() => removeFromCart(item.id)} aria-label={t('Remove {name}', { name: item.name })}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="line-bottom">
                      <div className="stepper sm">
                        <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} aria-label={t('Decrease quantity')}>
                          <Minus size={14} />
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} aria-label={t('Increase quantity')}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <strong>{aed(item.price * item.quantity)}</strong>
                    </div>
                  </div>
                </li>
                );
              })}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <footer className="drawer-foot">
            <div className="sum-row">
              <span>{t('Subtotal')}</span>
              <strong>{aed(cartTotal)}</strong>
            </div>
            <div className="sum-row vat-row">
              <span>{t('Includes VAT (5%)')}</span>
              <span>{aed(cartVat)}</span>
            </div>
            {cartItems.some(isAmbergris) && <LegalNotice compact />}
            <p className="muted small">{t('All prices include VAT. Delivery is calculated at checkout.')}</p>
            <Link to="/checkout" onClick={closeCart} className="btn btn-solid btn-lg btn-block">
              {t('Checkout')} <ArrowRight size={18} />
            </Link>
            <button
              type="button"
              className="link-btn"
              onClick={closeCart}
            >
              {t('Continue shopping')}
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
