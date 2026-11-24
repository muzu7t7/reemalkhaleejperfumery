// Editorial content for the Oud Guide page and the home page. Tasting notes are house impressions.

export const NAMES = [
  ['Arabic', 'oud (wood)'],
  ['English', 'agarwood'],
  ['India', 'agar'],
  ['China', 'chénxiāng'],
  ['Japan', 'jinkō'],
  ['Malay', 'gaharu'],
];

export const PROCESS = [
  ['01', 'The tree', 'Aquilaria trees grow across South and Southeast Asia. Healthy wood is pale and has almost no scent.'],
  ['02', 'The wound', 'When a tree is wounded or infected by mould, it defends itself by flooding the heartwood with dark, aromatic resin.'],
  ['03', 'The wait', 'Resin builds slowly, over years or decades. The darker and heavier the wood, the more resin it holds.'],
  ['04', 'The harvest', 'Resinous heartwood is cut out by hand and graded, then sold as chips or distilled into oil.'],
];

export const ORIGINS = [
  {
    id: 'Cambodia',
    region: 'Cardamom Mountains',
    tags: ['Sweet', 'Honeyed', 'Balsamic'],
    text: 'Soft, fruity and smooth, with a honeyed sweetness and a gentle woody base. The easiest oud to love, and the usual first choice.',
    tones: ['#8a5a2a', '#2e1809', '#e0a947'],
    from: '#c9822a',
    to: '#5a2c0a',
  },
  {
    id: 'India',
    label: 'India (Assam)',
    region: 'Brahmaputra Valley, Assam',
    tags: ['Earthy', 'Leathery', 'Animalic'],
    text: 'The classic dark oud: deep, fermented and leathery, with a rich barnyard warmth. Bold, long-lasting and unmistakable.',
    tones: ['#5a3a20', '#150a05', '#c98a36'],
    from: '#7a3b12',
    to: '#241008',
  },
  {
    id: 'Laos',
    region: 'Annamite foothills',
    tags: ['Creamy', 'Cool', 'Mellow'],
    text: 'Sweet and rounded, with a cool woody freshness and a hint of ripe fruit. Gentle enough for warm weather.',
    tones: ['#a06c36', '#3c200c', '#e8b95a'],
    from: '#d0942e',
    to: '#6a3a0a',
  },
  {
    id: 'Vietnam',
    label: 'Vietnam (Kynam)',
    region: 'Khanh Hoa',
    tags: ['Rare', 'Candied', 'Cooling'],
    text: 'Home of kynam, the rarest oud: intensely sweet and cool, with a deep balsamic finish. Prized above every other grade.',
    tones: ['#2a1a0e', '#050302', '#f2c25a'],
    from: '#8f5a1e',
    to: '#1d0f05',
  },
  {
    id: 'Thailand',
    region: 'Trat and Chanthaburi',
    tags: ['Light', 'Floral', 'Clean'],
    text: 'Light, sweet and floral-woody, with a clean smoke. A gentle oud for daily burning and for newcomers.',
    tones: ['#b88a50', '#4a2c12', '#f0c670'],
    from: '#d8ae62',
    to: '#7a4a14',
  },
  {
    id: 'Indonesia',
    label: 'Indonesia (Borneo)',
    region: 'Kalimantan, Borneo',
    tags: ['Woody', 'Smoky', 'Dry-sweet'],
    text: 'Robust, earthy and a little smoky, with a dry sweetness. Approachable, and very good for layering under perfume.',
    tones: ['#7a5a3a', '#2a1a0e', '#c79a4c'],
    from: '#9a7048',
    to: '#33200f',
  },
];

export const FORMS = [
  {
    id: 'oil',
    title: 'Oud oil',
    arabic: 'دهن العود',
    type: 'Oud Oil',
    productId: 'oil-assam',
    text: 'Resinous wood is soaked and slowly distilled, then bottled as dehn al oud. It is the most concentrated form: a single drop on the skin lasts all day.',
    how: 'Dab a drop on pulse points or clothing.',
  },
  {
    id: 'wood',
    title: 'Oud wood',
    arabic: 'عود',
    type: 'Oud Wood',
    productId: 'wood-cambodia',
    text: 'Chips and chunks of resinous heartwood, graded by density and colour. Gently heated on charcoal or in an electric burner, they release a deep, evolving smoke.',
    how: 'Warm one small chip, never flame it.',
  },
  {
    id: 'bakhoor',
    title: 'Bakhoor',
    arabic: 'بخور',
    type: 'Bakhoor & Burners',
    productId: 'bakhoor-royal',
    text: 'Wood chips or paste blended with oud oil, sandalwood, amber and rose, pressed into pieces that burn slowly. The everyday way to perfume a home or a guest.',
    how: 'Burn on a charcoal disc in a mabkhara.',
  },
];

export const HISTORY = [
  {
    when: 'Antiquity',
    title: 'Incense and medicine',
    text: 'Texts from India and China, some about two thousand years old, describe agarwood as incense, medicine and a gift fit for rulers.',
  },
  {
    when: '8th century',
    title: 'A treasure in Nara',
    text: 'A famed fragrant wood, Ranjatai, is preserved in the Shōsōin treasury in Japan. Later, the incense art of kōdō grows up around fine agarwood.',
  },
  {
    when: 'Middle Ages',
    title: 'Across the Indian Ocean',
    text: 'Arab and Persian merchants carry oud from India and Southeast Asia to the ports of Arabia, where it becomes part of weddings, welcomes and the majlis.',
  },
  {
    when: 'The Gulf home',
    title: 'The scent of hospitality',
    text: 'Burning oud and bakhoor for guests, and perfuming clothes in its smoke, becomes everyday custom. It is still how a Gulf home says welcome.',
  },
  {
    when: '1978',
    title: 'Oud meets the West',
    text: 'Yves Saint Laurent’s M7 brings oud to Western perfumery, and a wave of oud fragrances follows over the next decades.',
  },
  {
    when: '2004',
    title: 'Trade comes under control',
    text: 'After years of over-harvesting wild trees, all Aquilaria and Gyrinops species are listed under CITES Appendix II, which regulates international trade.',
  },
  {
    when: 'Today',
    title: 'Plantations and patience',
    text: 'Cultivated trees, wounded or inoculated to form resin, supply a growing share of oud. Wild-grown wood remains scarce and costly.',
  },
  {
    when: '1991',
    title: 'Reem Al Khaleej opens',
    text: 'Our small atelier opens in Ras Al Khaimah, and begins building relationships with growers and distillers in each origin.',
  },
];
