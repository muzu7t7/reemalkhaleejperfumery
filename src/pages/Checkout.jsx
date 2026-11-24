import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, CreditCard, Smartphone, Banknote, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { saveOrder } from '../data/orders';
import { aed, round2, FREE_SHIPPING, SHIPPING_FEE, VAT_RATE } from '../data/products';
import ProductArt from '../components/ProductArt';

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

const PAYMENTS = [
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'apple', label: 'Apple Pay', icon: Smartphone },
  { id: 'cod', label: 'Cash on delivery', icon: Banknote },
];

const formatCard = (v) =>
  v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

const formatExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

function Field({ label, id, children, className = '' }) {
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [pay, setPay] = useState('card');
  const [placed, setPlaced] = useState(null);
  const [form, setForm] = useState({
    email: user?.email || '',
    phone: '',
    first: user?.name?.split(' ')[0] || '',
    last: user?.name?.split(' ').slice(1).join(' ') || '',
    address: '',
    city: '',
    emirate: 'Dubai',
    card: '',
    expiry: '',
    cvc: '',
  });

  const set = (name) => (e) => {
    let value = e.target.value;
    if (name === 'card') value = formatCard(value);
    if (name === 'expiry') value = formatExpiry(value);
    if (name === 'cvc') value = value.replace(/\D/g, '').slice(0, 4);
    setForm((f) => ({ ...f, [name]: value }));
  };

  const shipping = cartTotal === 0 || cartTotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  const vat = round2(cartTotal * VAT_RATE);
  const total = round2(cartTotal + shipping + vat);

  const onSubmit = (e) => {
    e.preventDefault();
    const order = {
      id: `RK-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      status: 'Processing',
      items: cartItems.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      subtotal: cartTotal,
      shipping,
      vat,
      total,
      payment: PAYMENTS.find((p) => p.id === pay).label,
      shipTo: {
        name: `${form.first} ${form.last}`.trim(),
        address: form.address,
        city: form.city,
        emirate: form.emirate,
        phone: form.phone,
      },
    };
    saveOrder(order);
    clearCart();
    setPlaced(order);
    window.scrollTo({ top: 0 });
  };

  if (placed) {
    return (
      <section className="container confirm">
        <div className="confirm-mark">
          <Check size={34} />
        </div>
        <span className="eyebrow">Order {placed.id}</span>
        <h1 className="display-md">
          Shukran, {placed.shipTo.name.split(' ')[0] || 'friend'}. <em>Your order is placed.</em>
        </h1>
        <p className="lede">
          We will confirm by email and dispatch within 24 hours. This is a demo store, so no payment was taken.
        </p>
        <div className="confirm-card">
          {placed.items.map((i) => (
            <div key={i.id} className="sum-row">
              <span>
                {i.name} × {i.quantity}
              </span>
              <span>{aed(i.price * i.quantity)}</span>
            </div>
          ))}
          <div className="sum-row total">
            <span>Total paid</span>
            <strong>{aed(placed.total)}</strong>
          </div>
        </div>
        <div className="hero-cta">
          <Link to="/profile" className="btn btn-solid btn-lg">
            View my orders
          </Link>
          <Link to="/products" className="btn btn-ghost btn-lg">
            Keep browsing
          </Link>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="container notfound">
        <span className="eyebrow">Checkout</span>
        <h1 className="display-md">
          Your bag is <em>empty.</em>
        </h1>
        <p className="lede">Add a fragrance to your bag and it will appear here.</p>
        <Link to="/products" className="btn btn-solid btn-lg">
          Browse fragrances <ArrowRight size={18} />
        </Link>
      </section>
    );
  }

  return (
    <section className="container checkout">
      <header className="checkout-head">
        <span className="eyebrow">Secure checkout</span>
        <h1 className="display-md">
          Almost <em>yours</em>
        </h1>
      </header>

      <form className="checkout-grid" onSubmit={onSubmit}>
        <div className="checkout-forms">
          <fieldset className="panel">
            <legend>
              <span className="step">1</span> Contact
            </legend>
            <div className="grid-2">
              <Field label="Email" id="email">
                <input id="email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
              </Field>
              <Field label="Mobile" id="phone">
                <input id="phone" type="tel" required autoComplete="tel" value={form.phone} onChange={set('phone')} placeholder="+971 50 000 0000" />
              </Field>
            </div>
          </fieldset>

          <fieldset className="panel">
            <legend>
              <span className="step">2</span> Delivery
            </legend>
            <div className="grid-2">
              <Field label="First name" id="first">
                <input id="first" required autoComplete="given-name" value={form.first} onChange={set('first')} />
              </Field>
              <Field label="Last name" id="last">
                <input id="last" required autoComplete="family-name" value={form.last} onChange={set('last')} />
              </Field>
            </div>
            <Field label="Address" id="address">
              <input id="address" required autoComplete="street-address" value={form.address} onChange={set('address')} placeholder="Villa or apartment, street, area" />
            </Field>
            <div className="grid-2">
              <Field label="City / area" id="city">
                <input id="city" required autoComplete="address-level2" value={form.city} onChange={set('city')} />
              </Field>
              <Field label="Emirate" id="emirate">
                <select id="emirate" value={form.emirate} onChange={set('emirate')}>
                  {EMIRATES.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset className="panel">
            <legend>
              <span className="step">3</span> Payment
            </legend>
            <div className="pay-options" role="radiogroup" aria-label="Payment method">
              {PAYMENTS.map(({ id, label, icon: Icon }) => (
                <label key={id} className={`pay-option ${pay === id ? 'is-active' : ''}`}>
                  <input type="radio" name="pay" value={id} checked={pay === id} onChange={() => setPay(id)} />
                  <Icon size={20} />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            {pay === 'card' && (
              <div className="pay-card">
                <Field label="Card number" id="cc-number">
                  <input id="cc-number" inputMode="numeric" autoComplete="cc-number" required value={form.card} onChange={set('card')} placeholder="0000 0000 0000 0000" />
                </Field>
                <div className="grid-2">
                  <Field label="Expiry" id="cc-exp">
                    <input id="cc-exp" inputMode="numeric" autoComplete="cc-exp" required value={form.expiry} onChange={set('expiry')} placeholder="MM/YY" />
                  </Field>
                  <Field label="CVC" id="cc-csc">
                    <input id="cc-csc" inputMode="numeric" autoComplete="cc-csc" required value={form.cvc} onChange={set('cvc')} placeholder="123" />
                  </Field>
                </div>
                <p className="muted small">
                  <Lock size={13} /> Demo store: card details are never stored or sent anywhere.
                </p>
              </div>
            )}
            {pay === 'apple' && <p className="muted pay-note">You will confirm with Apple Pay on your device once payments are connected.</p>}
            {pay === 'cod' && <p className="muted pay-note">Pay in cash when your order arrives. Please keep the exact amount ready.</p>}
          </fieldset>
        </div>

        <aside className="summary">
          <h2 className="eyebrow">Order summary</h2>
          <ul className="sum-lines">
            {cartItems.map((i) => (
              <li key={i.id}>
                <span className="sum-thumb" style={{ '--t1': i.tint[0], '--t2': i.tint[1] }}>
                  <ProductArt product={i} />
                  <b>{i.quantity}</b>
                </span>
                <span className="sum-name">
                  {i.name}
                  <small>{i.size}</small>
                </span>
                <span>{aed(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="sum-row">
            <span>Subtotal</span>
            <span>{aed(cartTotal)}</span>
          </div>
          <div className="sum-row">
            <span>Delivery</span>
            <span>{shipping ? aed(shipping) : 'Complimentary'}</span>
          </div>
          <div className="sum-row">
            <span>VAT (5%)</span>
            <span>{aed(vat)}</span>
          </div>
          <div className="sum-row total">
            <span>Total</span>
            <strong>{aed(total)}</strong>
          </div>
          <button type="submit" className="btn btn-solid btn-lg btn-block">
            Place order · {aed(total)}
          </button>
        </aside>
      </form>
    </section>
  );
}
