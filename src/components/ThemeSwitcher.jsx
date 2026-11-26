import { useSyncExternalStore } from 'react';
import { Sun, Moon, SunMoon } from 'lucide-react';
import { getThemeMode, setThemeMode, subscribeTheme } from '../theme';
import { useLang } from '../i18n';

// Click order: light -> dark -> auto -> light. Auto gets its own half-sun / half-moon icon.
const ORDER = ['light', 'dark', 'auto'];
const META = {
  light: { label: 'Light', Icon: Sun },
  dark: { label: 'Dark', Icon: Moon },
  auto: { label: 'Auto', Icon: SunMoon },
};

/* variant="icon": round icon button (desktop nav).
   variant="labelled": pill button with the mode name (mobile menu). */
export default function ThemeSwitcher({ variant = 'icon', className = '' }) {
  const { t, tc } = useLang();
  const mode = useSyncExternalStore(subscribeTheme, getThemeMode);
  const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
  const { label, Icon } = META[mode];
  const hint = t('Theme: {mode}. Switch to {next}', { mode: tc('theme', label), next: tc('theme', META[next].label) });
  const cycle = () => setThemeMode(next);

  if (variant === 'labelled') {
    return (
      <button type="button" className={`btn btn-ghost theme-btn ${className}`} onClick={cycle} aria-label={hint}>
        <Icon key={mode} size={18} className="theme-icon" /> {t('Theme: {mode}', { mode: tc('theme', label) })}
      </button>
    );
  }

  return (
    <button type="button" className={`icon-btn ${className}`} onClick={cycle} aria-label={hint} title={hint}>
      <Icon key={mode} size={20} className="theme-icon" />
    </button>
  );
}
