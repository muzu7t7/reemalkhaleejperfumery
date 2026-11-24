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
