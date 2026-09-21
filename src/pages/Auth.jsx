import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Bottle from '../components/Bottle';

const titleCase = (s) => s.replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function Auth() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  if (user) return <Navigate to="/profile" replace />;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const name = mode === 'signup' ? form.name.trim() : titleCase(form.email.split('@')[0]);
    login({ name, email: form.email.trim() });
    navigate('/profile');
  };

  return (
    <section className="auth">
      <div className="auth-visual on-dark pattern" aria-hidden="true">
        <div className="auth-arch">
          <Bottle shape="rect" liquid={['#9a5418', '#2a1207']} cap="#c9974a" label="Oud Majesty" className="auth-bottle" />
        </div>
        <p className="auth-quote">
          “A fragrance is the <em>signature</em> you leave in the room.”
        </p>
      </div>

      <div className="auth-form">
        <div className="auth-box">
          <div className="tabs" role="tablist" aria-label="Account">
            <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'is-active' : ''} onClick={() => setMode('login')}>
              Sign in
            </button>
            <button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'is-active' : ''} onClick={() => setMode('signup')}>
              Create account
            </button>
          </div>

          <h1 className="display-sm">{mode === 'login' ? 'Welcome back' : 'Join the house'}</h1>
          <p className="muted">
            {mode === 'login'
              ? 'Sign in to view orders and your wishlist.'
              : 'Save favourites, track orders and get early access to launches.'}
          </p>

          <form onSubmit={onSubmit} className="auth-fields">
            {mode === 'signup' && (
              <div className="field">
                <label htmlFor="a-name">Full name</label>
                <input id="a-name" required autoComplete="name" value={form.name} onChange={set('name')} />
              </div>
            )}
            <div className="field">
              <label htmlFor="a-email">Email</label>
              <input id="a-email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="a-pass">Password</label>
              <input
                id="a-pass"
                type="password"
                required
                minLength={6}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                value={form.password}
                onChange={set('password')}
              />
            </div>
            <button type="submit" className="btn btn-solid btn-lg btn-block">
              {mode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={18} />
            </button>
          </form>
          <p className="muted small">Demo mode: your name and email stay in this browser only, and passwords are never stored.</p>
        </div>
      </div>
    </section>
  );
}
