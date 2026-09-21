import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LogOut, Package, Heart, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getOrders } from '../data/orders';
import { aed, getProduct } from '../data/products';
import ProductCard from '../components/ProductCard';

const TABS = [
  ['overview', 'Overview', Package],
  ['orders', 'Orders', Package],
  ['wishlist', 'Wishlist', Heart],
];

const dateFmt = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

function OrderTable({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="empty">
        <p className="display-sm">No orders yet</p>
        <p className="muted">When you place an order it will appear here.</p>
        <Link to="/products" className="btn btn-solid">
          Browse fragrances
        </Link>
      </div>
    );
  }
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Items</th>
            <th>Status</th>
            <th className="right">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>
                <strong>{o.id}</strong>
              </td>
              <td>{dateFmt(o.date)}</td>
              <td>{o.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}</td>
              <td>
                <span className="status">{o.status}</span>
              </td>
              <td className="right">{aed(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();
  const { wishlist } = useCart();
  const [tab, setTab] = useState('overview');

  if (!user) return <Navigate to="/auth" replace />;

  const orders = getOrders();
  const wished = wishlist.map(getProduct).filter(Boolean);
  const spent = orders.reduce((s, o) => s + o.total, 0);
  const lastShip = orders[0]?.shipTo;
  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="container account">
      <header className="account-head">
        <div className="avatar" aria-hidden="true">
          {initials || 'RK'}
        </div>
        <div>
          <span className="eyebrow">Your account</span>
          <h1 className="display-md">
            Marhaba, <em>{user.name.split(' ')[0]}</em>
          </h1>
          <p className="muted">{user.email}</p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm account-out" onClick={logout}>
          <LogOut size={16} /> Sign out
        </button>
      </header>

      <div className="tabs tabs-line" role="tablist" aria-label="Account sections">
        {TABS.map(([key, label]) => (
          <button key={key} type="button" role="tab" aria-selected={tab === key} className={tab === key ? 'is-active' : ''} onClick={() => setTab(key)}>
            {label}
            {key === 'wishlist' && wished.length > 0 && <span className="tab-count">{wished.length}</span>}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="account-body">
          <div className="stats">
            <div className="stat">
              <span>Orders</span>
              <strong>{orders.length}</strong>
            </div>
            <div className="stat">
              <span>Total spent</span>
              <strong>{aed(spent)}</strong>
            </div>
            <div className="stat">
              <span>Circle points</span>
              <strong>{Math.floor(spent / 10)}</strong>
            </div>
            <div className="stat">
              <span>Wishlist</span>
              <strong>{wished.length}</strong>
            </div>
          </div>

          <div className="account-cols">
            <div className="panel">
              <h2 className="panel-title">Recent orders</h2>
              <OrderTable orders={orders.slice(0, 3)} />
            </div>
            <div className="panel">
              <h2 className="panel-title">
                <MapPin size={18} /> Last delivery address
              </h2>
              {lastShip ? (
                <p className="address">
                  {lastShip.name}
                  <br />
                  {lastShip.address}
                  <br />
                  {lastShip.city}, {lastShip.emirate}
                  <br />
                  United Arab Emirates
                  <br />
                  {lastShip.phone}
                </p>
              ) : (
                <p className="muted">Your delivery address is saved after your first order.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="account-body">
          <OrderTable orders={orders} />
        </div>
      )}

      {tab === 'wishlist' && (
        <div className="account-body">
          {wished.length === 0 ? (
            <div className="empty">
              <p className="display-sm">Nothing saved yet</p>
              <p className="muted">Tap the heart on any fragrance to keep it here.</p>
              <Link to="/products" className="btn btn-solid">
                Browse fragrances
              </Link>
            </div>
          ) : (
            <div className="grid-products">
              {wished.map((p, i) => (
                <ProductCard key={p.id} product={p} delay={i * 60} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
