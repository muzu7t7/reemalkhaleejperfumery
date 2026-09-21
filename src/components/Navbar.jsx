import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import useLockBody from '../hooks/useLockBody';
import Logo from './Logo';
import SearchOverlay from './SearchOverlay';

const LINKS = [
  { to: '/products', label: 'Fragrances', end: true },
  { to: '/#collections', label: 'Collections' },
  { to: '/about', label: 'Our Story' },
];

export default function Navbar() {
  const { openCart, cartCount } = useCart();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
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

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('rk.theme', next);
    } catch {
      /* ignore */
    }
  };

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <div className="announce">
        <span>Complimentary UAE delivery over AED 500</span>
        <span className="announce-dot" aria-hidden="true">✦</span>
        <span>Two complimentary samples with every order</span>
      </div>

      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner">
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) =>
              l.to.includes('#') ? (
                <Link key={l.label} to={l.to} className="nav-link">
                  {l.label}
                </Link>
              ) : (
                <NavLink key={l.label} to={l.to} end={l.end} className="nav-link">
                  {l.label}
                </NavLink>
              ),
            )}
          </nav>

          <button
            type="button"
            className="icon-btn nav-burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="nav-brand" aria-label="Reem Al Khaleej Perfumes, home">
            <Logo />
          </Link>

          <div className="nav-actions">
            <button type="button" className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search (Ctrl+K)">
              <Search size={20} />
            </button>
            <button
              type="button"
              className="icon-btn nav-theme"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to={user ? '/profile' : '/auth'} className="icon-btn nav-account" aria-label={user ? 'Your account' : 'Sign in'}>
              <User size={20} />
            </Link>
            <button type="button" className="nav-bag" onClick={openCart} aria-label={`Open bag, ${cartCount} items`}>
              <ShoppingBag size={18} />
              <span>Bag</span>
              <span className={`nav-count ${cartCount ? 'has-items' : ''}`}>{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <div className={`menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="menu-top">
          <Logo />
          <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <nav className="menu-links" aria-label="Mobile">
          {[{ to: '/', label: 'Home' }, ...LINKS, { to: user ? '/profile' : '/auth', label: user ? 'Account' : 'Sign in' }].map(
            (l, i) => (
              <Link key={l.label} to={l.to} style={{ '--i': i }}>
                {l.label} <ArrowUpRight size={28} />
              </Link>
            ),
          )}
        </nav>
        <button type="button" className="btn btn-ghost" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} {theme === 'dark' ? 'Light' : 'Dark'} theme
        </button>
      </div>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
