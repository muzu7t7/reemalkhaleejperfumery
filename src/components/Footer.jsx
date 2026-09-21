import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="footer on-dark">
      <div className="container">
        <div className="footer-top">
          <div className="footer-news">
            <span className="eyebrow">The Majlis Letter</span>
            <h2 className="display-md">
              New launches, <em>first.</em>
            </h2>
            {subscribed ? (
              <p className="footer-thanks">
                <Check size={18} /> Thank you. You are on the list.
              </p>
            ) : (
              <form className="news-form" onSubmit={onSubmit}>
                <label htmlFor="news-email" className="sr-only">
                  Email address
                </label>
                <input id="news-email" type="email" required placeholder="Your email address" autoComplete="email" />
                <button type="submit" className="btn btn-gold">
                  Subscribe <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          <nav className="footer-cols" aria-label="Footer">
            <div>
              <h4>Shop</h4>
              <Link to="/products">All fragrances</Link>
              <Link to="/products?cat=Oud">Oud</Link>
              <Link to="/products?cat=Floral">Floral</Link>
              <Link to="/products?cat=Fresh">Fresh</Link>
            </div>
            <div>
              <h4>Maison</h4>
              <Link to="/about">Our story</Link>
              <Link to="/about#craft">Craftsmanship</Link>
              <Link to="/profile">Account</Link>
            </div>
            <div>
              <h4>Care</h4>
              <Link to="/about">Delivery &amp; returns</Link>
              <Link to="/about">Contact</Link>
              <Link to="/about">FAQ</Link>
            </div>
          </nav>
        </div>

        <div className="footer-word" aria-hidden="true">
          Reem Al Khaleej Perfumes
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Reem Al Khaleej Perfumes. Dubai, United Arab Emirates.</span>
          <span>Prices in AED. 5% VAT is added at checkout.</span>
        </div>
      </div>
    </footer>
  );
}
