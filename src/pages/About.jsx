import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Hourglass, Hand } from 'lucide-react';
import Bottle from '../components/Bottle';
import Reveal from '../components/Reveal';

const VALUES = [
  { icon: Hourglass, title: 'Unhurried', text: 'Oils are macerated for months and resins aged in cedar. We do not rush a fragrance to meet a calendar.' },
  { icon: Leaf, title: 'Responsibly sourced', text: 'We buy oud from growers and distillers we know across six origins, and pay for quality rather than volume.' },
  { icon: Hand, title: 'Hand-finished', text: 'Each flacon is filled, capped, numbered and inspected by hand before it leaves Ras Al Khaimah.' },
];

const STEPS = [
  ['01', 'Gather', 'Oud arrives from Cambodia, Assam, Laos, Thailand, Vietnam and Indonesia, and is graded by colour, weight and scent on the day.'],
  ['02', 'Compose', 'Our blenders build each accord on paper first, then on skin, then over weeks of adjustment.'],
  ['03', 'Mature', 'Oils and blends rest in glass for up to twelve weeks so the notes marry and the edges soften.'],
  ['04', 'Finish', 'Filtered, bottled or weighed, and numbered by hand, then boxed with two discovery samples.'],
];

export default function About() {
  return (
    <>
      <section className="page-hero pattern about-hero">
        <div className="container">
          <span className="eyebrow">Our story · 35 years of tradition</span>
          <h1 className="display">
            Perfume as <em>hospitality.</em>
          </h1>
          <p className="lede">
            In the Gulf, scent is how you welcome someone. Reem Al Khaleej began 35 years ago as a small atelier in Ras Al Khaimah with a
            simple idea: make the kind of fragrance you would be proud to offer a guest, and proud to wear yourself.
          </p>
        </div>
      </section>

      <section className="section container split">
        <Reveal className="split-visual">
          <div className="arch-frame" style={{ '--t1': '#ead6b6', '--t2': '#c9a06a' }}>
            <Bottle shape="rect" liquid={['#9a5418', '#2a1207']} cap="#c9974a" label="Oud Majesty" className="arch-bottle" />
          </div>
        </Reveal>
        <Reveal delay={100} className="split-copy">
          <span className="eyebrow">The house</span>
          <h2 className="display-md">
            Old methods, <em>modern taste</em>
          </h2>
          <p className="lede">
            We keep the traditions that make Arabian perfumery unique: dense oud, saffron and amber, layered oils on skin. We pair
            them with cleaner compositions, lighter packaging and a quieter kind of luxury.
          </p>
          <p className="muted">
            Everything is made in small batches so each bottle can be checked, numbered and, if it is not right, remade.
          </p>
          <Link to="/products" className="btn btn-solid btn-lg">
            Shop the collection <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>

      <section className="section container legacy">
        <Reveal className="legacy-num">
          <span aria-hidden="true">35</span>
          <strong>Years of tradition</strong>
        </Reveal>
        <Reveal delay={100} className="legacy-copy">
          <span className="eyebrow">Since 1991</span>
          <h2 className="display-md">
            Three and a half decades, <em>one way of working</em>
          </h2>
          <p className="lede">
            Since 1991 we have kept to the same principles: honest raw materials, patient maturation and a finish done by hand.
            Fashions in fragrance change every season. Our standards have not.
          </p>
          <ul className="legacy-facts">
            <li>
              <strong>1991</strong>
              <span>Our atelier opens in Ras Al Khaimah</span>
            </li>
            <li>
              <strong>By hand</strong>
              <span>Filled, capped and finished in Ras Al Khaimah</span>
            </li>
            <li>
              <strong>Numbered</strong>
              <span>Every batch checked and signed off</span>
            </li>
          </ul>
        </Reveal>
      </section>

      <section className="section on-dark pattern" id="craft">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Craftsmanship</span>
              <h2 className="display-md">
                From raw material to <em>flacon</em>
              </h2>
            </div>
          </Reveal>
          <ol className="steps">
            {STEPS.map(([n, t, d], i) => (
              <Reveal as="li" key={n} delay={i * 90} className="step-card">
                <span className="step-n">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head center">
          <div>
            <span className="eyebrow">What we believe</span>
            <h2 className="display-md">
              Three <em>promises</em>
            </h2>
          </div>
        </Reveal>
        <div className="values">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 90} className="value">
              <Icon size={26} />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
