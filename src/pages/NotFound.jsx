import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../i18n';

export default function NotFound() {
  const { t, rich } = useLang();
  return (
    <section className="container notfound">
      <span className="eyebrow">404</span>
      <h1 className="display-md">{rich(t('This scent has *evaporated.*'))}</h1>
      <p className="lede">{t('The page you are looking for does not exist or has moved.')}</p>
      <Link to="/products" className="btn btn-solid btn-lg">
        {t('Browse fragrances')} <ArrowRight size={18} />
      </Link>
    </section>
  );
}
