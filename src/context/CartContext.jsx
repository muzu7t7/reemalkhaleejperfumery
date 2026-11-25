import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct, vatIn } from '../data/products';

const CartContext = createContext(null);

export function useCart() {
  return useContext(CartContext);
}

const read = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: state still works for this session */
  }
};

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lines, setLines] = useState(() => read('rk.cart', []));
  const [wishlist, setWishlist] = useState(() => read('rk.wish', []));

  useEffect(() => write('rk.cart', lines), [lines]);
  useEffect(() => write('rk.wish', wishlist), [wishlist]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback((id, qty = 1, { open = true } = {}) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
    if (open) setIsCartOpen(true);
  }, []);

  const updateQty = useCallback((id, qty) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id) => setLines((prev) => prev.filter((l) => l.id !== id)), []);
  const clearCart = useCallback(() => setLines([]), []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const cartItems = useMemo(
    () =>
      lines
        .map((l) => {
          const product = getProduct(l.id);
          return product ? { ...product, quantity: l.qty } : null;
        })
        .filter(Boolean),
    [lines],
  );

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  // Prices already include VAT; cartVat is the VAT portion of cartTotal, shown separately.
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartVat = vatIn(cartTotal);

  const value = {
    isCartOpen,
    openCart,
    closeCart,
    cartItems,
    cartCount,
    cartTotal,
    cartVat,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
