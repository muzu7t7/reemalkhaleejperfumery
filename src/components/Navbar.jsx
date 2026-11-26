import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { aed, FREE_SHIPPING } from '../data/products';
import { useAuth } from '../context/AuthContext';
import useLockBody from '../hooks/useLockBody';
import Logo from './Logo';
import SearchOverlay from './SearchOverlay';
import ThemeSwitcher from './ThemeSwitcher';
import LangSwitcher from './LangSwitcher';
import { useLang } from '../i18n';

const LINKS = [
  { to: '/products', label: 'Shop', end: true },
  { to: '/#collections', label: 'Collections' },
  { to: '/oud', label: 'Guide' },
  { to: '/about', label: 'Our Story' },
];

export default function Navbar() {
  const { openCart, cartCount } = useCart();
  const { user } = useAuth();
  const { t } = useLang();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useLockBody(menuOpen);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <div className="announce">
        <span>{t('Complimentary UAE delivery over {amount}', { amount: aed(FREE_SHIPPING) })}</span>
        <span className="announce-dot" aria-hidden="true">✦</span>
        <span>{t('Two complimentary samples with every order')}</span>
      </div>

      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner">
          <nav className="nav-links" aria-label={t('Primary')}>
            {LINKS.map((l) =>
              l.to.includes('#') ? (
                <Link key={l.label} to={l.to} className="nav-link">
                  {t(l.label)}
                </Link>
              ) : (
                <NavLink key={l.label} to={l.to} end={l.end} className="nav-link">
                  {t(l.label)}
                </NavLink>
              ),
            )}
          </nav>

          <button
            type="button"
            className="icon-btn nav-burger"
            onClick={() => setMenuOpen(true)}
            aria-label={t('Open menu')}
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="nav-brand" aria-label={t('Reem Al Khaleej Perfumes, home')}>
            <Logo />
          </Link>

          <div className="nav-actions">
            <button type="button" className="icon-btn" onClick={() => setSearchOpen(true)} aria-label={t('Search (Ctrl+K)')}>
              <Search size={20} />
            </button>
            <LangSwitcher className="nav-lang" />
            <ThemeSwitcher className="nav-theme" />
            <Link to={user ? '/profile' : '/auth'} className="icon-btn nav-account" aria-label={user ? t('Your account') : t('Sign in')}>
              <User size={20} />
            </Link>
            <button type="button" className="nav-bag" onClick={openCart} aria-label={t('Open bag, {n} items', { n: cartCount })}>
              <ShoppingBag size={18} />
              <span>{t('Bag')}</span>
              <span className={`nav-count ${cartCount ? 'has-items' : ''}`}>{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <div className={`menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="menu-top">
          <Logo />
          <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label={t('Close menu')}>
            <X size={24} />
          </button>
        </div>
        <nav className="menu-links" aria-label={t('Mobile menu')}>
          {[{ to: '/', label: 'Home' }, ...LINKS, { to: user ? '/profile' : '/auth', label: user ? 'Account' : 'Sign in' }].map(
            (l, i) => (
              <Link key={l.label} to={l.to} style={{ '--i': i }}>
                {t(l.label)} <ArrowUpRight size={28} />
              </Link>
            ),
          )}
        </nav>
        <LangSwitcher variant="labelled" />
        <ThemeSwitcher variant="labelled" />
      </div>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
