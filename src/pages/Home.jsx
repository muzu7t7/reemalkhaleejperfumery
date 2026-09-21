import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Star, Sparkles, Gift, Droplets, Leaf, Flame, Flower2 } from 'lucide-react';
import { products, collections, getProduct } from '../data/products';
import Bottle from '../components/Bottle';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

const TICKER = ['Cambodian Oud', 'Saffron', 'Taif Rose', 'Amber', 'Sandalwood', 'White Musk', 'Frankincense', 'Bergamot'];

const INGREDIENTS = [
  { name: 'Oud', note: 'Aged for years. Dark, resinous, endlessly deep.', icon: Flame, from: '#7a3b12', to: '#241008' },
  { name: 'Saffron', note: 'Hand-picked threads. Warm, leathery, golden.', icon: Sparkles, from: '#e0a020', to: '#8a4a0a' },
  { name: 'Taif Rose', note: 'Harvested at dawn. Velvety, honeyed, luminous.', icon: Flower2, from: '#d98a9a', to: '#7a2f47' },
  { name: 'Sea Salt', note: 'Gulf mineral air. Clean, bright, weightless.', icon: Droplets, from: '#78bccb', to: '#1d5f7a' },
];

const REVIEWS = [
  {
    quote: 'It filled the whole room without shouting. Three people asked what I was wearing before dinner was over.',
    who: 'Layla A.',
    where: 'Dubai',
    product: 'Oud Majesty',
  },
  {
    quote: 'Finally a rose that is not sweet or old-fashioned. It feels modern and it lasts all the way to midnight.',
    who: 'Noura K.',
    where: 'Abu Dhabi',
    product: 'Desert Rose',
  },
  {
    quote: 'The packaging alone is a gift, and what is inside justifies it. I have already ordered a second bottle.',
    who: 'Omar S.',
    where: 'Sharjah',
    product: 'Leather Enigma',
  },
];

export default function Home() {
  const hero = getProduct('1');
  const featured = products.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="hero pattern">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Maison de parfum · Ras Al Khaimah</span>
            <h1 className="display">
              Scent is the <em>memory</em> of the desert.
            </h1>
            <p className="lede">
              Small-batch Arabian perfumes, blended from rare oud, saffron and Taif rose, and finished by hand in Ras Al Khaimah.
            </p>
            <div className="hero-cta">
              <Link to="/products" className="btn btn-solid btn-lg">
                Explore fragrances <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-ghost btn-lg">
                Our story
              </Link>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>4.8</dt>
                <dd>Average rating</dd>
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
            <Bottle shape={hero.shape} liquid={hero.liquid} cap={hero.cap} label={hero.name} className="hero-bottle" />

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
              <span className="eyebrow">Top notes</span>
              <strong>Saffron · Rose de Mai</strong>
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
              Three worlds, <em>one house.</em>
            </h2>
          </div>
          <Link to="/products" className="link-arrow">
            View all fragrances <ArrowUpRight size={18} />
          </Link>
        </Reveal>

        <div className="bento">
          {collections.map((c, i) => {
            const p = getProduct(c.productId);
            return (
              <Reveal
                key={c.id}
                as="div"
                delay={i * 90}
                className={`bento-card bento-${c.id}`}
              >
                <Link to={`/products?cat=${c.category}`} className="bento-link" style={{ '--t1': p.tint[0], '--t2': p.tint[1] }}>
                  <Bottle shape={p.shape} liquid={p.liquid} cap={p.cap} label={p.name} className="bento-bottle" />
                  <div className="bento-text">
                    <span className="eyebrow">{c.category}</span>
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
              <p>Every order ships with two 2 ml discoveries chosen to match your taste.</p>
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
              The signature <em>collection</em>
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

      {/* STORY */}
      <section className="story on-dark pattern">
        <div className="container story-grid">
          <Reveal className="story-visual">
            <div className="story-arch">
              <Bottle shape="arch" liquid={['#eab030', '#9a4f0a']} cap="#d7a83c" label="Saffron Reverie" className="story-bottle" />
            </div>
            <div className="story-badge">
              <strong>35</strong>
              <span>years of tradition</span>
            </div>
          </Reveal>

          <Reveal delay={120} className="story-copy">
            <span className="eyebrow">Our heritage</span>
            <h2 className="display-md">
              The art of <em>slow</em> perfumery
            </h2>
            <p className="lede">
              We blend the way our grandparents did: oils macerated for months, resins aged in cedar, every batch
              signed off by a master perfumer. Modern in spirit, unhurried in method.
            </p>
            <ul className="tick-list">
              <li>
                <Leaf size={18} /> Sustainably sourced oud and rose
              </li>
              <li>
                <Droplets size={18} /> Up to 30% perfume oil concentration
              </li>
              <li>
                <Sparkles size={18} /> Hand-finished and numbered in Ras Al Khaimah
              </li>
            </ul>
            <Link to="/about" className="btn btn-gold btn-lg">
              Discover our story <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="section container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Raw materials</span>
            <h2 className="display-md">
              Built from <em>rare</em> things
            </h2>
          </div>
        </Reveal>
        <div className="ingredients">
          {INGREDIENTS.map((ing, i) => {
            const Icon = ing.icon;
            return (
              <Reveal key={ing.name} delay={i * 80} className="ingredient" style={{ '--from': ing.from, '--to': ing.to }}>
                <Icon size={26} />
                <h3>{ing.name}</h3>
                <p>{ing.note}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-tint">
        <div className="container">
          <Reveal className="section-head center">
            <div>
              <span className="eyebrow">In their words</span>
              <h2 className="display-md">
                Worn, remembered, <em>asked about.</em>
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
                  <small>Wearing {r.product}</small>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
