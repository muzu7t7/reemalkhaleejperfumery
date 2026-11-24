// Theme store: mode is 'light' | 'dark' | 'auto'. 'auto' follows the OS setting live.
// The resolved value ('light' | 'dark') is written to <html data-theme>, which the CSS keys off.
const KEY = 'rk.theme';
const COLORS = { light: '#f4eee3', dark: '#100c08' };
const query = window.matchMedia('(prefers-color-scheme: dark)');
const listeners = new Set();

const readMode = () => {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === 'light' || saved === 'dark' ? saved : 'auto';
  } catch {
    return 'auto';
  }
};

let mode = readMode();

const resolve = () => (mode === 'auto' ? (query.matches ? 'dark' : 'light') : mode);

function apply() {
  const resolved = resolve();
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themeMode = mode;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[resolved]);
}

query.addEventListener('change', () => {
  if (mode === 'auto') apply();
});

apply();

export function setThemeMode(next) {
  mode = next;
  try {
    if (next === 'auto') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, next);
  } catch {
    /* storage unavailable: the choice still applies for this session */
  }
  apply();
  listeners.forEach((l) => l());
}

export const subscribeTheme = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
export const getThemeMode = () => mode;
