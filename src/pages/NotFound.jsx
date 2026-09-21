import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="container notfound">
      <span className="eyebrow">404</span>
      <h1 className="display-md">
        This scent has <em>evaporated.</em>
      </h1>
      <p className="lede">The page you are looking for does not exist or has moved.</p>
      <Link to="/products" className="btn btn-solid btn-lg">
        Browse fragrances <ArrowRight size={18} />
      </Link>
    </section>
  );
}
