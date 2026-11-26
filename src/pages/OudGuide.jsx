import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { NAMES, PROCESS, ORIGINS, FORMS, HISTORY } from '../data/oud';
import { AMBERGRIS_STEPS, AMBERGRIS_GRADES, AMBERGRIS_HISTORY } from '../data/ambergris';
import { getProduct } from '../data/products';
import { originPhoto, chipsPhoto, photoFor } from '../data/photos';
import OudWood from '../components/OudWood';
import Ambergris from '../components/Ambergris';
import ProductArt from '../components/ProductArt';
import Reveal from '../components/Reveal';
import { useLang } from '../i18n';
import { localizeProduct } from '../i18n/products';

export default function OudGuide() {
  const { t, rich, isAr } = useLang();
  return (
    <>
      <section className="page-hero pattern">
        <div className="container">
          <span className="eyebrow">{t('The guide')}</span>
          <h1 className="display">{rich(t('The world of *oud.*'))}</h1>
          <p className="lede">{t('Oud is the dark, resinous heart of Arabian perfumery, and ambergris is its sea-born partner. This is a short guide to what they are, where they come from, how they differ and how they have travelled for centuries.')}</p>
          <nav className="jump" aria-label={t('On this page')}>
            <a href="#origins">{t('Origins')}</a>
            <a href="#forms">{t('Forms')}</a>
            <a href="#history">{t('Oud history')}</a>
            <a href="#ambergris">{t('Ambergris')}</a>
          </nav>
          <ul className="names" aria-label={t('Names for oud around the world')}>
            {NAMES.map(([place, name]) => (
              <li key={place}>
                <small>{t(place)}</small>
                <span>{t(name)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT IS OUD */}
      <section className="section container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">{t('What is oud')}</span>
            <h2 className="display-md">{rich(t('A tree’s *defence*, turned into perfume'))}</h2>
          </div>
        </Reveal>
        <ol className="steps oud-steps">
          {PROCESS.map(([n, title, d], i) => (
            <Reveal as="li" key={n} delay={i * 90} className="step-card">
              <span className="step-n">{n}</span>
              <h3>{t(title)}</h3>
              <p>{t(d)}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ORIGINS */}
      <section className="section section-tint" id="origins">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">{t('Origins')}</span>
              <h2 className="display-md">{rich(t('Where it grows *changes* how it smells'))}</h2>
            </div>
          </Reveal>
          <div className="origin-grid">
            {ORIGINS.map((o, i) => {
              const photo = originPhoto(o.id);
              const chips = chipsPhoto(o.id);
              // location photo fills the card, real oud chips sit in a round badge; fall back to whichever exists, then the drawing
              const cover = photo || chips;
              const badge = photo && chips;
              return (
              <Reveal key={o.id} as="article" delay={(i % 3) * 90} className="origin-card">
                <div className="origin-stage" style={{ '--from': o.from, '--to': o.to }}>
                  {cover && <img className="origin-photo" src={cover} alt={`${t(o.label || o.id)}, ${t(o.region)}`} loading="lazy" />}
                  {badge && <img className="origin-chip" src={chips} alt={t('{origin} oud chips', { origin: t(o.id) })} loading="lazy" />}
                  {!cover && (
                    <OudWood
                      seed={`origin-${o.id}`}
                      tones={o.tones}
                      count={o.id === 'Vietnam' ? 1 : 3}
                      size={o.id === 'Vietnam' ? 1.9 : 1.1}
                      className="origin-art"
                    />
                  )}
                  {!chips && photo && (
                    <OudWood
                      seed={`origin-${o.id}`}
                      tones={o.tones}
                      count={o.id === 'Vietnam' ? 1 : 3}
                      size={o.id === 'Vietnam' ? 1.9 : 1.1}
                      className="origin-art origin-art-chip"
                    />
                  )}
                </div>
                <div className="origin-body">
                  <span className="eyebrow">{t(o.region)}</span>
                  <h3>{t(o.label || o.id)}</h3>
                  <div className="chips">
                    {o.tags.map((g) => (
                      <span key={g} className="note">
                        {t(g)}
                      </span>
                    ))}
                  </div>
                  <p>{t(o.text)}</p>
                  <Link to={`/products?origin=${o.id}`} className="link-arrow">
                    {t('Shop {origin} oud', { origin: t(o.id) })} <ArrowUpRight size={16} />
                  </Link>
                </div>
              </Reveal>
              );
            })}
          </div>
          <p className="guide-note">
            {t('Tasting notes are generalisations. Every tree, region and distillation is different, which is part of oud’s charm.')}
          </p>
        </div>
      </section>

      {/* FORMS */}
      <section className="section container" id="forms">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">{t('Forms')}</span>
            <h2 className="display-md">{rich(t('Oil, wood and *bakhoor*'))}</h2>
          </div>
        </Reveal>
        <div className="forms">
          {FORMS.map((f, i) => {
            const p = localizeProduct(getProduct(f.productId));
            return (
              <Reveal key={f.id} as="article" delay={i * 90} className="form-card">
                <div className="form-stage" style={{ '--t1': p.tint[0], '--t2': p.tint[1] }}>
                  <ProductArt product={p} className="form-art" />
                </div>
                <h3>
                  {t(f.title)} {!isAr && <span lang="ar" dir="rtl">{f.arabic}</span>}
                </h3>
                <p>{t(f.text)}</p>
                <p className="form-how">{t(f.how)}</p>
                <Link to={`/products?type=${encodeURIComponent(f.type)}`} className="link-arrow">
                  {t('Shop {form}', { form: isAr ? t(f.title) : f.title.toLowerCase() })} <ArrowUpRight size={16} />
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
              <span className="eyebrow">{t('History')}</span>
              <h2 className="display-md">{rich(t('Two thousand years of *smoke and scent*'))}</h2>
            </div>
          </Reveal>
          <ol className="timeline">
            {HISTORY.map((h, i) => (
              <Reveal as="li" key={h.when} delay={(i % 3) * 70} className="tl-item">
                <span className="tl-when">{t(h.when)}</span>
                <div>
                  <h3>{t(h.title)}</h3>
                  <p>{t(h.text)}</p>
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
            <span className="eyebrow">{isAr ? 'العنبر' : 'Ambergris · عنبر'}</span>
            <h2 className="display-md">{rich(t('The sea’s *rarest* perfume'))}</h2>
          </div>
          <Link to="/products?type=Ambergris" className="link-arrow">
            {t('Shop ambergris')} <ArrowUpRight size={18} />
          </Link>
        </Reveal>
        <p className="lede amber-lede">
          {t('Ambergris (anbar in Arabic) is a waxy substance that forms in the gut of some sperm whales and is cast into the sea. After years of drifting it turns sweet, soft and musky, and is prized for its warmth and for how long it makes a fragrance last.')}
        </p>

        <ol className="steps oud-steps">
          {AMBERGRIS_STEPS.map(([n, title, d], i) => (
            <Reveal as="li" key={n} delay={i * 90} className="step-card">
              <span className="step-n">{n}</span>
              <h3>{t(title)}</h3>
              <p>{t(d)}</p>
            </Reveal>
          ))}
        </ol>

        <h3 className="sub-head">{t('Three grades')}</h3>
        <div className="origin-grid three">
          {AMBERGRIS_GRADES.map((g, i) => (
            <Reveal key={g.id} as="article" delay={i * 90} className="origin-card">
              <div className="origin-stage" style={{ '--from': g.from, '--to': g.to }}>
                {photoFor(`ambergris-${g.id}`) ? (
                  <img className="origin-photo" src={photoFor(`ambergris-${g.id}`)} alt={t(g.title)} loading="lazy" />
                ) : (
                  <Ambergris seed={`grade-${g.id}`} tones={g.tones} count={g.id === 'black' ? 3 : g.id === 'white' ? 2 : 3} className="origin-art" />
                )}
              </div>
              <div className="origin-body">
                <h3>{t(g.title)}</h3>
                <p>{t(g.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="sub-head">{t('A short history of ambergris')}</h3>
        <ol className="timeline timeline-light">
          {AMBERGRIS_HISTORY.map((h, i) => (
            <Reveal as="li" key={h.when} delay={(i % 3) * 70} className="tl-item">
              <span className="tl-when">{t(h.when)}</span>
              <div>
                <h3>{t(h.title)}</h3>
                <p>{t(h.text)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section container guide-cta">
        <Reveal>
          <h2 className="display-md">{rich(t('Find your *oud.*'))}</h2>
          <p className="lede">{t('Start with a single oil or a few chips, and let two free samples with your order help you decide.')}</p>
          <Link to="/products" className="btn btn-solid btn-lg">
            {t('Shop oud')} <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
