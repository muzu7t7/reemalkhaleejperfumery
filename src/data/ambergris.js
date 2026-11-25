// Editorial content for the ambergris section of the guide. Written from general knowledge: have it checked
// before launch, especially the legal note, which varies by country.

export const AMBERGRIS_STEPS = [
  ['01', 'The whale', 'Sperm whales occasionally form a waxy mass in their gut, thought to protect them from the sharp beaks of squid. Only a small share of whales produce it.'],
  ['02', 'The sea', 'The mass is expelled and floats for years, bleached and hardened by sun, salt and water. When fresh it smells strongly of the sea and is far from pleasant.'],
  ['03', 'The shore', 'Lumps drift ashore or are found floating, and are collected by beachcombers and fishermen. Pale and grey pieces are the most prized.'],
  ['04', 'The ageing', 'With time the scent softens into something sweet, musky and marine, with a warm, skin-like depth. Perfumers use it to make other notes last longer.'],
];

export const AMBERGRIS_GRADES = [
  {
    id: 'black',
    title: 'Black',
    text: 'The youngest and freshest. Dark, soft and strongly marine with an animal edge, and the least refined.',
    tones: ['#6a635a', '#1d1a16', '#8c857a'],
    from: '#4a443b',
    to: '#14110d',
  },
  {
    id: 'grey',
    title: 'Grey (anbar ashhab)',
    text: 'Marbled and waxy, matured by the sea. Warm, sweet and softly marine, and the classic choice for Arabian perfumery.',
    tones: ['#a9a393', '#4f4a40', '#e0dacb'],
    from: '#b3ad9e',
    to: '#58524a',
  },
  {
    id: 'white',
    title: 'White',
    text: 'The most aged and the rarest. Pale, clean and sweet, with almost no animal edge. The most refined form.',
    tones: ['#f0ebdf', '#a79f8d', '#ffffff'],
    from: '#f1ece2',
    to: '#bdb4a0',
  },
];

export const AMBERGRIS_HISTORY = [
  {
    when: 'Antiquity',
    title: 'Incense from the sea',
    text: 'Ambergris is often said to have been burned as incense in the ancient world. The firmest early records come from Arab and Chinese writers.',
  },
  {
    when: 'Medieval China',
    title: 'Dragon’s spittle',
    text: 'Chinese writers called it dragon’s spittle (lóngxián xiāng), and valued it as both incense and medicine.',
  },
  {
    when: 'The Arab world',
    title: 'Anbar',
    text: 'The English word amber comes from the Arabic anbar. Arab navigators and merchants traded it from the coasts of Arabia and East Africa, and it appears in medieval Arabic writing on perfume and medicine. “Ambergris” itself means grey amber in French.',
  },
  {
    when: 'Medieval Europe',
    title: 'The pomander',
    text: 'Ambergris reached Europe along Arab and Venetian trade routes. It scented gloves and rooms, flavoured food and wine, and filled the pomander, from the French pomme d’ambre, carried against the plague.',
  },
  {
    when: '17th century',
    title: 'A royal taste',
    text: 'Charles II of England is said to have enjoyed eggs flavoured with ambergris, a sign of how costly and fashionable it had become.',
  },
  {
    when: '1851',
    title: 'Moby-Dick',
    text: 'Herman Melville gives ambergris a chapter of its own, reflecting the whalers’ view of it as a rare windfall.',
  },
  {
    when: '1970s',
    title: 'Synthetics and protection',
    text: 'As sperm whales gained protection, some countries, including the United States, restricted trade in ambergris. Perfumers increasingly turned to synthetic substitutes such as ambroxan.',
  },
  {
    when: 'Today',
    title: 'Found, not hunted',
    text: 'Ambergris is expelled naturally and collected after it washes ashore, with no whale harmed. It remains legal to trade in many countries, but the rules differ, so check the law where you live. In Gulf perfumery it is still prized beside oud.',
  },
];

// Shown wherever ambergris is sold. Laws change, so keep this wording general and have it checked before launch.
export const isAmbergris = (p) => p.type === 'Ambergris';

export const AMBERGRIS_LEGAL = {
  title: 'Legal notice: ambergris',
  short: 'Ambergris is restricted or illegal to carry, import, export or sell in some countries.',
  text: 'Ambergris comes from sperm whales, and some countries restrict or ban buying, owning, carrying, importing or exporting it, including the United States, Australia and India. Carrying it across a border, even in a small amount or as part of a blend or tincture, can mean seizure, fines or prosecution. We deliver within the UAE only. Reem Al Khaleej Perfumes is not responsible for any seizure, fine, delay or other consequence of carrying, shipping, importing or exporting it outside the UAE. Checking and following the laws of each country is the buyer’s responsibility.',
  confirm: 'I understand this notice. I am buying ambergris for use in the UAE only, and I accept that Reem Al Khaleej Perfumes is not responsible for any seizure, fine, delay or other consequence of carrying, shipping, importing or exporting it outside the UAE.',
};
