import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Star, Sparkles, Gift, Droplets, Leaf, MapPin } from 'lucide-react';
import { products, collections, getProduct } from '../data/products';
import { ORIGINS } from '../data/oud';
import { originPhoto } from '../data/photos';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

const TICKER = ['Cambodian Oud', 'Assam', 'Laotian', 'Kynam', 'Ambergris', 'Thai Oud', 'Borneo', 'Bakhoor', 'Dehn al Oud'];

const REVIEWS = [
  {
    quote: 'One drop and the whole room changed. Soft, honeyed, and it was still on my shirt the next morning.',
    who: 'Layla A.',
    where: 'Dubai',
    product: 'Cambodian Oud Oil',
  },
  {
    quote: 'We burn the bakhoor whenever guests come. Everyone asks where it is from, and the house smells wonderful for hours.',
    who: 'Noura K.',
    where: 'Abu Dhabi',
    product: 'Royal Oud Bakhoor',
  },
  {
    quote: 'Proper Assam oud: dark, earthy, leathery. The packaging is lovely, and I have already ordered the chips.',
    who: 'Omar S.',
    where: 'Sharjah',
    product: 'Assam Oud Oil',
  },
];

export default function Home() {
  const hero = getProduct('oil-cambodia');
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* HERO */}
      <section className="hero pattern">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">House of oud · Ras Al Khaimah</span>
            <h1 className="display">
              Scent is the <em>memory</em> of the desert.
            </h1>
            <p className="lede">
              Pure oud oil, aged oud wood and bakhoor from Cambodia, Assam, Laos and Vietnam, chosen by hand and finished in Ras
              Al Khaimah.
            </p>
            <div className="hero-cta">
              <Link to="/products" className="btn btn-solid btn-lg">
                Shop oud <ArrowRight size={18} />
              </Link>
              <Link to="/oud" className="btn btn-ghost btn-lg">
                Explore the oud guide
              </Link>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>6</dt>
                <dd>Oud origins</dd>
              </div>
              <div>
                <dt>100%</dt>
                <dd>Natural oud</dd>
              </div>
              <div>
                <dt>48h</dt>
                <dd>UAE delivery</dd>
              </div>
            </dl>
          </div>

          <div className="hero-stage">
            <div className="hero-arch" />
            <div className="hero-arch hero-arch-outline" />
            <ProductArt product={hero} className="hero-bottle" />

            <svg className="hero-seal" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="seal-circle" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
              </defs>
              <text>
                <textPath href="#seal-circle" startOffset="0">
                  HANDCRAFTED IN RAS AL KHAIMAH ✦ SMALL BATCH ✦
                </textPath>
              </text>
              <circle cx="100" cy="100" r="34" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M88 118V98a12 12 0 0 1 24 0v20" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>

            <div className="float-card float-notes">
              <span className="eyebrow">{hero.name}</span>
              <strong>{hero.notes.top.join(' · ')}</strong>
            </div>
            <div className="float-card float-rate">
              <span className="stars" aria-hidden="true">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </span>
              <strong>{hero.rating}</strong>
              <small>{hero.reviews} reviews</small>
            </div>
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
              <span key={i}>
                {t} <em>✦</em>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS BENTO */}
      <section className="section container" id="collections">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Collections</span>
            <h2 className="display-md">
              Oud, in <em>every form.</em>
            </h2>
          </div>
          <Link to="/products" className="link-arrow">
            Shop everything <ArrowUpRight size={18} />
          </Link>
        </Reveal>

        <div className="bento">
          {collections.map((c, i) => {
            const p = getProduct(c.productId);
            return (
              <Reveal key={c.id} as="div" delay={i * 90} className={`bento-card bento-${c.id}`}>
                <Link
                  to={`/products?type=${encodeURIComponent(c.type)}`}
                  className="bento-link"
                  style={{ '--t1': p.tint[0], '--t2': p.tint[1] }}
                >
                  <ProductArt product={p} className="bento-bottle" />
                  <div className="bento-text">
                    <span className="eyebrow">{c.type}</span>
                    <h3>{c.title}</h3>
                    <p>{c.blurb}</p>
                  </div>
                  <span className="bento-arrow" aria-hidden="true">
                    <ArrowUpRight size={20} />
                  </span>
                </Link>
              </Reveal>
            );
          })}

          <Reveal delay={270} className="bento-card bento-samples">
            <Link to="/products" className="bento-link bento-plain">
              <Gift size={28} />
              <h3>Two samples, on us</h3>
              <p>Every order ships with two 1 ml oud oil samples from different origins, so you can find your favourite.</p>
              <span className="link-arrow">
                Start shopping <ArrowUpRight size={16} />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Bestsellers</span>
            <h2 className="display-md">
              Where to <em>begin</em>
            </h2>
          </div>
          <Link to="/products" className="link-arrow">
            Shop all <ArrowUpRight size={18} />
          </Link>
        </Reveal>
        <div className="grid-products">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* AMBERGRIS */}
      <section className="container amber-band-wrap">
        <Reveal className="amber-band">
          <div className="amber-copy">
            <span className="eyebrow">New · Ambergris</span>
            <h2 className="display-md">
              Oud’s partner from <em>the sea</em>
            </h2>
            <p className="lede">
              Rare, naturally aged ambergris in raw lumps, as a tincture and blended with Cambodian oud. Warm, sweet and soft, and
              it makes everything it touches last longer.
            </p>
            <div className="hero-cta">
              <Link to="/products?type=Ambergris" className="btn btn-solid btn-lg">
                Shop ambergris <ArrowRight size={18} />
              </Link>
              <Link to="/oud#ambergris" className="btn btn-ghost btn-lg">
                Its history
              </Link>
            </div>
          </div>
          <div className="amber-stage" style={{ '--t1': '#e4e0d6', '--t2': '#a9a393' }}>
            <ProductArt product={getProduct('ambergris-grey')} className="amber-art" />
          </div>
        </Reveal>
      </section>

      {/* ORIGINS */}
      <section className="section container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Origins</span>
            <h2 className="display-md">
              Six origins, six <em>personalities</em>
            </h2>
          </div>
          <Link to="/oud#origins" className="link-arrow">
            Read the oud guide <ArrowUpRight size={18} />
          </Link>
        </Reveal>
        <div className="ingredients">
          {ORIGINS.map((o, i) => {
            const photo = originPhoto(o.id);
            return (
              <Reveal
                key={o.id}
                as={Link}
                to={`/products?origin=${o.id}`}
                delay={(i % 3) * 80}
                className={`ingredient ${photo ? 'has-photo' : ''}`}
                style={{ '--from': o.from, '--to': o.to }}
              >
                {photo ? (
                  <img className="ingredient-photo" src={photo} alt={`${o.label || o.id}, ${o.region}`} loading="lazy" />
                ) : (
                  <MapPin size={26} />
                )}
                <h3>{o.label || o.id}</h3>
                <p>{o.tags.join(' · ')}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* STORY */}
      <section className="story on-dark pattern">
        <div className="container story-grid">
          <Reveal className="story-visual">
            <div className="story-arch">
              <ProductArt product={getProduct('wood-cambodia')} className="story-bottle" />
            </div>
            <div className="story-badge">
              <strong>35</strong>
              <span>years of tradition</span>
            </div>
          </Reveal>

          <Reveal delay={120} className="story-copy">
            <span className="eyebrow">Our heritage</span>
            <h2 className="display-md">
              Oud rewards <em>patience</em>
            </h2>
            <p className="lede">
              A tree can take years to form its resin, and a piece of wood can rest for years more before it is ready. We buy
              slowly, grade by hand and blend in small batches, so every oil and chip we sell has been chosen with care.
            </p>
            <ul className="tick-list">
              <li>
                <Leaf size={18} /> Responsibly sourced from six origins
              </li>
              <li>
                <Droplets size={18} /> Oils distilled in small batches
              </li>
              <li>
                <Sparkles size={18} /> Hand-finished and numbered in Ras Al Khaimah
              </li>
            </ul>
            <Link to="/oud#history" className="btn btn-gold btn-lg">
              The history of oud <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-tint">
        <div className="container">
          <Reveal className="section-head center">
            <div>
              <span className="eyebrow">In their words</span>
              <h2 className="display-md">
                Burned, worn, <em>asked about.</em>
              </h2>
            </div>
          </Reveal>
          <div className="reviews">
            {REVIEWS.map((r, i) => (
              <Reveal as="figure" key={r.who} delay={i * 100} className="review">
                <span className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, n) => (
                    <Star key={n} size={16} fill="currentColor" />
                  ))}
                </span>
                <blockquote>“{r.quote}”</blockquote>
                <figcaption>
                  <strong>{r.who}</strong>, {r.where}
                  <small>Bought {r.product}</small>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
