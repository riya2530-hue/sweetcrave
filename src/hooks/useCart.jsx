import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products.js';
import { track, toItem } from '../utils/track.js';

const KEY = 'sweetcrave_cart';
export const FREE_DELIVERY_ABOVE = 999;
export const DELIVERY_FEE = 49;
const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {} }, [lines]);

  const items = useMemo(() => lines
    .map((l) => ({ ...l, product: products.find((p) => p.id === l.id) }))
    .filter((l) => l.product), [lines]);
  const count = items.reduce((s, l) => s + l.qty, 0);
  const subtotal = items.reduce((s, l) => s + l.qty * l.product.price, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;

  const add = (product, qty = 1, opts = {}) => {
    setLines((ls) => ls.some((l) => l.id === product.id)
      ? ls.map((l) => l.id === product.id ? { ...l, qty: l.qty + qty, ...opts } : l)
      : [...ls, { id: product.id, qty, ...opts }]);
    track('add_to_cart', { currency: 'INR', value: product.price * qty, items: [toItem(product, qty)] });
  };
  const remove = (product) => {
    setLines((ls) => ls.filter((l) => l.id !== product.id));
    track('remove_from_cart', { currency: 'INR', value: product.price, items: [toItem(product)] });
  };
  const setQty = (id, qty) => setLines((ls) => ls.map((l) => l.id === id ? { ...l, qty: Math.max(1, qty) } : l));
  const clear = () => setLines([]);

  return <Ctx.Provider value={{ items, count, subtotal, delivery, total: subtotal + delivery, add, remove, setQty, clear }}>{children}</Ctx.Provider>;
}
export const useCart = () => useContext(Ctx);
