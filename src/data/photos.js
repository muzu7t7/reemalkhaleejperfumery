// Real product photos are picked up automatically: drop a file named after the product id
// (e.g. src/assets/products/oil-cambodia.jpg) and it replaces the drawn illustration everywhere.
const files = import.meta.glob('../assets/products/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const byId = {};
for (const [path, url] of Object.entries(files)) {
  byId[path.split('/').pop().replace(/\.\w+$/, '')] = url;
}

export const photoFor = (id) => byId[id] || null;

// Origin location photos: src/assets/origins/<origin id, lowercase>.jpg (cambodia, india, laos, vietnam, thailand, indonesia).
const originFiles = import.meta.glob('../assets/origins/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const originById = {};
for (const [path, url] of Object.entries(originFiles)) {
  originById[path.split('/').pop().replace(/\.\w+$/, '').toLowerCase()] = url;
}

export const originPhoto = (id) => originById[String(id).toLowerCase()] || null;

// Oud chips photo for an origin: src/assets/origins/chips/<origin id, lowercase>.jpg if you add one,
// otherwise the matching Oud Wood product photo. Returns null when neither exists (the drawn chips are used).
const chipFiles = import.meta.glob('../assets/origins/chips/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const chipById = {};
for (const [path, url] of Object.entries(chipFiles)) {
  chipById[path.split('/').pop().replace(/\.\w+$/, '').toLowerCase()] = url;
}

const ORIGIN_WOOD_PRODUCT = {
  cambodia: 'wood-cambodia',
  india: 'wood-assam',
  laos: 'wood-laos',
  vietnam: 'wood-kynam',
  thailand: 'wood-thai',
};

export const chipsPhoto = (originId) => {
  const id = String(originId).toLowerCase();
  return chipById[id] || photoFor(ORIGIN_WOOD_PRODUCT[id]) || null;
};
