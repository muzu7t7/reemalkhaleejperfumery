import { useState } from 'react';
import Bottle from './Bottle';
import Attar from './Attar';
import OudWood from './OudWood';
import Burner from './Burner';
import Ambergris from './Ambergris';
import { photoFor } from '../data/photos';

/*
 * Draws a product: a real photo from src/assets/products/<id>.* if one exists, otherwise the drawn illustration.
 */
export default function ProductArt({ product, className = '' }) {
  const [failed, setFailed] = useState(false);
  const src = product.photo || photoFor(product.id);

  if (src && !failed) {
    return (
      <img
        className={`art-photo ${className}`}
        src={src}
        alt={product.name}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  const a = product.art;
  switch (a.kind) {
    case 'attar':
      return <Attar liquid={a.liquid} cap={a.cap} label={a.label} className={className} />;
    case 'wood':
      return <OudWood seed={product.id} tones={a.tones} count={a.count} size={a.size} className={className} />;
    case 'bakhoor':
      return <OudWood seed={product.id} tones={a.tones} count={a.count} variant="bakhoor" className={className} />;
    case 'ambergris':
      return <Ambergris seed={product.id} tones={a.tones} count={a.count} size={a.size} className={className} />;
    case 'burner':
      return <Burner cap={a.cap} className={className} />;
    default:
      return <Bottle shape={a.shape} liquid={a.liquid} cap={a.cap} label={product.name} className={className} />;
  }
}
