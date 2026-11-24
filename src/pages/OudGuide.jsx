import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { NAMES, PROCESS, ORIGINS, FORMS, HISTORY } from '../data/oud';
import { AMBERGRIS_STEPS, AMBERGRIS_GRADES, AMBERGRIS_HISTORY } from '../data/ambergris';
import { getProduct } from '../data/products';
import { originPhoto } from '../data/photos';
import OudWood from '../components/OudWood';
import Ambergris from '../components/Ambergris';
import ProductArt from '../components/ProductArt';
import Reveal from '../components/Reveal';

export default function OudGuide() {
  return (
    <>
      <section className="page-hero pattern">
        <div className="container">
          <span className="eyebrow">The guide</span>
          <h1 className="display">
            The world of <em>oud.</em>
          </h1>
          <p className="lede">
            Oud is the dark, resinous heart of Arabian perfumery, and ambergris is its sea-born partner. This is a short guide to
            what they are, where they come from, how they differ and how they have travelled for centuries.
          </p>
          <nav className="jump" aria-label="On this page">
            <a href="#origins">Origins</a>
            <a href="#forms">Forms</a>
            <a href="#history">Oud history</a>
            <a href="#ambergris">Ambergris</a>
          </nav>
          <ul className="names" aria-label="Names for oud around the world">
            {NAMES.map(([place, name]) => (
              <li key={place}>
                <small>{place}</small>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT IS OUD */}
      <section className="section container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">What is oud</span>
            <h2 className="display-md">
              A tree’s <em>defence</em>, turned into perfume
            </h2>
          </div>
        </Reveal>
        <ol className="steps oud-steps">
          {PROCESS.map(([n, t, d], i) => (
            <Reveal as="li" key={n} delay={i * 90} className="step-card">
              <span className="step-n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ORIGINS */}
      <section className="section section-tint" id="origins">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Origins</span>
              <h2 className="display-md">
                Where it grows <em>changes</em> how it smells
              </h2>
            </div>
          </Reveal>
          <div className="origin-grid">
            {ORIGINS.map((o, i) => {
              const photo = originPhoto(o.id);
              return (
              <Reveal key={o.id} as="article" delay={(i % 3) * 90} className="origin-card">
                <div className="origin-stage" style={{ '--from': o.from, '--to': o.to }}>
                  {photo && <img className="origin-photo" src={photo} alt={`${o.label || o.id}, ${o.region}`} loading="lazy" />}
                  <OudWood
                    seed={`origin-${o.id}`}
                    tones={o.tones}
                    count={o.id === 'Vietnam' ? 1 : 3}
                    size={o.id === 'Vietnam' ? 1.9 : 1.1}
                    className={photo ? 'origin-art origin-art-chip' : 'origin-art'}
                  />
                </div>
                <div className="origin-body">
                  <span className="eyebrow">{o.region}</span>
                  <h3>{o.label || o.id}</h3>
                  <div className="chips">
                    {o.tags.map((t) => (
                      <span key={t} className="note">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p>{o.text}</p>
                  <Link to={`/products?origin=${o.id}`} className="link-arrow">
                    Shop {o.id} oud <ArrowUpRight size={16} />
                  </Link>
                </div>
              </Reveal>
              );
            })}
          </div>
          <p className="guide-note">
            Tasting notes are generalisations. Every tree, region and distillation is different, which is part of oud’s charm.
          </p>
        </div>
      </section>

      {/* FORMS */}
      <section className="section container" id="forms">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Forms</span>
            <h2 className="display-md">
              Oil, wood and <em>bakhoor</em>
            </h2>
          </div>
        </Reveal>
        <div className="forms">
          {FORMS.map((f, i) => {
            const p = getProduct(f.productId);
            return (
              <Reveal key={f.id} as="article" delay={i * 90} className="form-card">
                <div className="form-stage" style={{ '--t1': p.tint[0], '--t2': p.tint[1] }}>
                  <ProductArt product={p} className="form-art" />
                </div>
                <h3>
                  {f.title} <span lang="ar" dir="rtl">{f.arabic}</span>
                </h3>
                <p>{f.text}</p>
                <p className="form-how">{f.how}</p>
                <Link to={`/products?type=${encodeURIComponent(f.type)}`} className="link-arrow">
                  Shop {f.title.toLowerCase()} <ArrowUpRight size={16} />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* HISTORY */}
      <section className="section on-dark pattern" id="history">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">History</span>
              <h2 className="display-md">
                Two thousand years of <em>smoke and scent</em>
              </h2>
            </div>
          </Reveal>
          <ol className="timeline">
            {HISTORY.map((h, i) => (
              <Reveal as="li" key={h.when} delay={(i % 3) * 70} className="tl-item">
                <span className="tl-when">{h.when}</span>
                <div>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* AMBERGRIS */}
      <section className="section container" id="ambergris">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Ambergris · عنبر</span>
            <h2 className="display-md">
              The sea’s <em>rarest</em> perfume
            </h2>
          </div>
          <Link to="/products?type=Ambergris" className="link-arrow">
            Shop ambergris <ArrowUpRight size={18} />
          </Link>
        </Reveal>
        <p className="lede amber-lede">
          Ambergris (anbar in Arabic) is a waxy substance that forms in the gut of some sperm whales and is cast into the sea.
          After years of drifting it turns sweet, soft and musky, and is prized for its warmth and for how long it makes a
          fragrance last.
        </p>

        <ol className="steps oud-steps">
          {AMBERGRIS_STEPS.map(([n, t, d], i) => (
            <Reveal as="li" key={n} delay={i * 90} className="step-card">
              <span className="step-n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </ol>

        <h3 className="sub-head">Three grades</h3>
        <div className="origin-grid three">
          {AMBERGRIS_GRADES.map((g, i) => (
            <Reveal key={g.id} as="article" delay={i * 90} className="origin-card">
              <div className="origin-stage" style={{ '--from': g.from, '--to': g.to }}>
                <Ambergris seed={`grade-${g.id}`} tones={g.tones} count={g.id === 'black' ? 3 : g.id === 'white' ? 2 : 3} className="origin-art" />
              </div>
              <div className="origin-body">
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="sub-head">A short history of ambergris</h3>
        <ol className="timeline timeline-light">
          {AMBERGRIS_HISTORY.map((h, i) => (
            <Reveal as="li" key={h.when} delay={(i % 3) * 70} className="tl-item">
              <span className="tl-when">{h.when}</span>
              <div>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section container guide-cta">
        <Reveal>
          <h2 className="display-md">
            Find your <em>oud.</em>
          </h2>
          <p className="lede">Start with a single oil or a few chips, and let two free samples with your order help you decide.</p>
          <Link to="/products" className="btn btn-solid btn-lg">
            Shop oud <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
