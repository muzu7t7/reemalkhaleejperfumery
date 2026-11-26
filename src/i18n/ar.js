import { UI } from './ar-ui';
import { GUIDE } from './ar-guide';
import { PRODUCTS } from './ar-products';

// English text -> Arabic. Later files win if a key repeats.
export const AR = { ...PRODUCTS, ...GUIDE, ...UI };
