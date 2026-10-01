import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { Button } from '../components/Ui.jsx';
import { useCart, FREE_DELIVERY_ABOVE } from '../hooks/useCart.jsx';
import { inr, track, toItem } from '../utils/track.js';

export function Cart() {
  const { items, subtotal, delivery, total, setQty, remove } = useCart();
  useEffect(() => { track('view_cart', { currency: 'INR', value: subtotal, items: items.map((l) => toItem(l.product, l.qty)) }); }, []); // eslint-disable-line
  return (<div className="wrap">
    <Seo path="/cart" title="Your Cart | SweetCrave" description="Review your SweetCrave cart before checkout." noindex />
    <h1>Your cart</h1>
    {!items.length ? <p className="empty">Your cart is empty. <Link to="/cakes">Browse cakes</Link> or <Link to="/desserts">desserts</Link>.</p> : (
      <div className="cartwrap">
        <ul className="lines">{items.map(({ product: p, qty }) => (
          <li key={p.id}><strong><Link to={`/product/${p.slug}`}>{p.name}</Link></strong><span>{inr(p.price)}</span>
            <span className="qty"><button aria-label={`Decrease ${p.name}`} onClick={() => setQty(p.id, qty - 1)}>−</button><output>{qty}</output><button aria-label={`Increase ${p.name}`} onClick={() => setQty(p.id, qty + 1)}>+</button></span>
            <strong>{inr(p.price * qty)}</strong><button className="link" data-event="remove_from_cart" onClick={() => remove(p)}>Remove</button></li>))}</ul>
        <aside className="summary"><h2>Summary</h2>
          <p>Subtotal <b>{inr(subtotal)}</b></p><p>Delivery <b>{delivery ? inr(delivery) : 'Free'}</b></p>
          {delivery > 0 && <small>Free delivery above {inr(FREE_DELIVERY_ABOVE)}</small>}
          <p className="total">Total <b>{inr(total)}</b></p>
          <Button to="/checkout" id="cart-checkout" data-event="begin_checkout">Proceed to Checkout</Button></aside>
      </div>)}
  </div>);
}

export function Checkout() {
  const { items, subtotal, delivery, total, clear } = useCart();
  const nav = useNavigate();
  const [pay, setPay] = useState('cod');
  useEffect(() => { if (items.length) track('begin_checkout', { currency: 'INR', value: subtotal, items: items.map((l) => toItem(l.product, l.qty)) }); }, []); // eslint-disable-line
  if (!items.length) return <Navigate to="/cart" replace />;
  const submit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const order = { number: 'SC-' + Date.now().toString().slice(-7), name: f.name, area: f.area, date: f.date, total, lines: items.map((l) => ({ name: l.product.name, qty: l.qty })) };
    sessionStorage.setItem('sweetcrave_last_order', JSON.stringify(order)); // demo only: no personal data leaves the browser
    track('purchase', { transaction_id: order.number, currency: 'INR', value: total, shipping: delivery, payment_type: pay, items: items.map((l) => toItem(l.product, l.qty)) });
    clear(); nav('/order-confirmation');
  };
  const today = new Date().toISOString().slice(0, 10);
  return (<div className="wrap">
    <Seo path="/checkout" title="Checkout | SweetCrave" description="Demo checkout for SweetCrave. No real payment is processed." noindex />
    <h1>Checkout</h1><p className="notice">Demo checkout. No real payment is taken and nothing is sent anywhere. Please do not enter real card or personal details.</p>
    <div className="cartwrap">
      <form id="checkout-form" onSubmit={submit} className="form">
        <label>Full name<input name="name" required autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
        <label>Phone number<input name="phone" type="tel" required pattern="[0-9+ ]{10,14}" autoComplete="tel" /></label>
        <label className="full">Delivery address<textarea name="address" required rows="2" /></label>
        <label>Area<input name="area" required placeholder="e.g. Model Town" /></label>
        <label>Pincode<input name="pincode" required inputMode="numeric" pattern="[0-9]{6}" /></label>
        <label>Delivery date<input name="date" type="date" min={today} required /></label>
        <label>Preferred delivery time<select name="time"><option>10 AM – 1 PM</option><option>1 PM – 4 PM</option><option>4 PM – 8 PM</option></select></label>
        <label className="full">Order notes<textarea name="notes" rows="2" /></label>
        <fieldset className="full"><legend>Payment method</legend>
          <label className="check"><input type="radio" name="pay" checked={pay === 'cod'} onChange={() => setPay('cod')} /> Cash on Delivery</label>
          <label className="check"><input type="radio" name="pay" checked={pay === 'demo'} onChange={() => setPay('demo')} /> Demo Online Payment (demo only, no payment processed)</label></fieldset>
        <Button type="submit" id="place-order" data-event="purchase">Place Order</Button>
      </form>
      <aside className="summary"><h2>Order</h2>{items.map((l) => <p key={l.id}>{l.product.name} × {l.qty}</p>)}
        <p>Subtotal <b>{inr(subtotal)}</b></p><p>Delivery <b>{delivery ? inr(delivery) : 'Free'}</b></p><p className="total">Total <b>{inr(total)}</b></p></aside>
    </div>
  </div>);
}

export function Confirmation() {
  const raw = sessionStorage.getItem('sweetcrave_last_order');
  const o = raw ? JSON.parse(raw) : null;
  if (!o) return <Navigate to="/" replace />;
  return (<div className="wrap narrow">
    <Seo path="/order-confirmation" title="Order Confirmed | SweetCrave" description="Your demo SweetCrave order is confirmed." noindex />
    <h1>Order Confirmed! 🎉</h1>
    <p>Order number: <strong>{o.number}</strong></p><p>Name: {o.name}</p>
    <ul>{o.lines.map((l) => <li key={l.name}>{l.name} × {l.qty}</li>)}</ul>
    <p>Total: <strong>{inr(o.total)}</strong></p><p>Delivery date: {o.date} · Area: {o.area}, Yamuna Nagar</p>
    <p className="lead">Thank you for choosing SweetCrave. Your celebration just got sweeter!</p>
    <div className="row"><Button to="/cakes">Continue Shopping</Button><Button to="/" variant="ghost">Back to Home</Button></div>
  </div>);
}
