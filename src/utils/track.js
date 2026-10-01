// Central analytics layer. Every event goes to window.dataLayer.
// GTM reads dataLayer automatically once the container snippet is in index.html.
export function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (import.meta.env.DEV) console.debug('[track]', event, params);
}
export const toItem = (p, qty = 1) => ({
  item_id: p.id, item_name: p.name, item_category: p.category, price: p.price, quantity: qty,
});
export const inr = (n) => '₹' + n.toLocaleString('en-IN');
