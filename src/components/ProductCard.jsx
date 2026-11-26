import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { aed } from '../data/products';
import ProductArt from './ProductArt';
import Reveal from './Reveal';
import { useLang } from '../i18n';
import { localizeProduct } from '../i18n/products';

export default function ProductCard({ product: raw, delay = 0 }) {
  const { t } = useLang();
  const product = localizeProduct(raw);
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const wished = wishlist.includes(product.id);

  return (
    <Reveal as="article" className="pcard" delay={delay}>
      <div className="pcard-stage" style={{ '--t1': product.tint[0], '--t2': product.tint[1] }}>
        <Link to={`/product/${product.id}`} className="pcard-link" aria-label={t('View {name}', { name: product.name })}>
          <ProductArt product={product} className="pcard-bottle" />
        </Link>
        {product.badge && <span className="badge">{product.badge}</span>}
        <button
          type="button"
          className={`icon-btn pcard-wish ${wished ? 'is-on' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={wished ? t('Remove {name} from wishlist', { name: product.name }) : t('Add {name} to wishlist', { name: product.name })}
        >
          <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
        </button>
        <button type="button" className="pcard-add" onClick={() => addToCart(product.id)}>
          <Plus size={16} /> {t('Add to bag')}
        </button>
      </div>
      <div className="pcard-info">
        <div>
          <h3 className="pcard-name">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="pcard-family">{product.family}</p>
        </div>
        <span className="pcard-price">{aed(product.price)}</span>
      </div>
    </Reveal>
  );
}
