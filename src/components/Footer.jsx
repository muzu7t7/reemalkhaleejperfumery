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
              <Link to="/products">All products</Link>
              <Link to="/products?type=Oud%20Oil">Oud oil</Link>
              <Link to="/products?type=Oud%20Wood">Oud wood</Link>
              <Link to="/products?type=Bakhoor%20%26%20Burners">Bakhoor</Link>
              <Link to="/products?type=Ambergris">Ambergris</Link>
            </div>
            <div>
              <h4>Maison</h4>
              <Link to="/oud">Oud &amp; ambergris guide</Link>
              <Link to="/about">Our story</Link>
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
          <span>Prices in AED and include 5% VAT.</span>
        </div>
      </div>
    </footer>
  );
}
