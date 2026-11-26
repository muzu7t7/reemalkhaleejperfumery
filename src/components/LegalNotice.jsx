import { TriangleAlert } from 'lucide-react';
import { AMBERGRIS_LEGAL } from '../data/ambergris';
import { useLang } from '../i18n';

// Warning shown on ambergris product pages, in the bag and at checkout.
export default function LegalNotice({ compact = false, className = '' }) {
  const { t } = useLang();
  return (
    <aside className={`legal-notice ${compact ? 'is-compact' : ''} ${className}`} role="note">
      <TriangleAlert size={compact ? 16 : 20} aria-hidden="true" />
      <div>
        <strong>{t(compact ? AMBERGRIS_LEGAL.short : AMBERGRIS_LEGAL.title)}</strong>
        {!compact && <p>{t(AMBERGRIS_LEGAL.text)}</p>}
      </div>
    </aside>
  );
}
