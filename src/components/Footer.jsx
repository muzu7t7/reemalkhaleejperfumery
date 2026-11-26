import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useLang } from '../i18n';

export default function Footer() {
  const { t, rich, isAr } = useLang();
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
            <span className="eyebrow">{t('The Majlis Letter')}</span>
            <h2 className="display-md">{rich(t('New launches, *first.*'))}</h2>
            {subscribed ? (
              <p className="footer-thanks">
                <Check size={18} /> {t('Thank you. You are on the list.')}
              </p>
            ) : (
              <form className="news-form" onSubmit={onSubmit}>
                <label htmlFor="news-email" className="sr-only">
                  {t('Email address')}
                </label>
                <input id="news-email" type="email" required placeholder={t('Your email address')} autoComplete="email" />
                <button type="submit" className="btn btn-gold">
                  {t('Subscribe')} <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          <nav className="footer-cols" aria-label={t('Footer')}>
            <div>
              <h4>{t('Shop')}</h4>
              <Link to="/products">{t('All products')}</Link>
              <Link to="/products?type=Oud%20Oil">{t('Oud oil')}</Link>
              <Link to="/products?type=Oud%20Wood">{t('Oud wood')}</Link>
              <Link to="/products?type=Bakhoor%20%26%20Burners">{t('Bakhoor')}</Link>
              <Link to="/products?type=Ambergris">{t('Ambergris')}</Link>
            </div>
            <div>
              <h4>{t('Maison')}</h4>
              <Link to="/oud">{t('Oud & ambergris guide')}</Link>
              <Link to="/about">{t('Our story')}</Link>
              <Link to="/profile">{t('Account')}</Link>
            </div>
            <div>
              <h4>{t('Care')}</h4>
              <Link to="/about">{t('Delivery & returns')}</Link>
              <Link to="/about">{t('Contact')}</Link>
              <Link to="/about">{t('FAQ')}</Link>
            </div>
          </nav>
        </div>

        <div className="footer-word" aria-hidden="true">
          {isAr ? 'ريم الخليج للعطور' : 'Reem Al Khaleej Perfumes'}
        </div>

        <div className="footer-bottom">
          <span>{t('© {year} Reem Al Khaleej Perfumes. Dubai, United Arab Emirates.', { year: new Date().getFullYear() })}</span>
          <span>{t('Prices in AED and include 5% VAT.')}</span>
        </div>
      </div>
    </footer>
  );
}
