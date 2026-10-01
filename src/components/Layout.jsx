import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { business } from '../data/content.js';
import { track } from '../utils/track.js';

export function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const close = () => setOpen(false);
  const search = (e) => {
    e.preventDefault();
    const q = new FormData(e.target).get('q').trim();
    if (q) { track('search', { search_term: q }); nav(`/search?q=${encodeURIComponent(q)}`); close(); }
  };
  return (
    <header className="nav">
      <Link to="/" className="logo" onClick={close}>Sweet<b>Crave</b></Link>
      <button className="burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav id="menu" className={open ? 'open' : ''} aria-label="Main">
        {[['/cakes', 'Cakes'], ['/desserts', 'Desserts'], ['/offers', 'Offers'], ['/blog', 'Blog'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, l]) =>
          <NavLink key={to} to={to} onClick={close}>{l}</NavLink>)}
        <form role="search" onSubmit={search}><input name="q" type="search" placeholder="Search cakes, brownies…" aria-label="Search products" /></form>
        <Link to="/cart" className="cartlink" onClick={() => { close(); track('view_cart'); }} data-event="view_cart">Cart ({count})</Link>
      </nav>
    </header>
  );
}
export function Footer() {
  const s = business.social;
  return (
    <footer className="footer">
      <div>
        <strong className="logo">Sweet<b>Crave</b></strong>
        <p>Bakery in Yamuna Nagar, Haryana. Cakes and desserts for celebrations.</p>
        <p><small>Demo brand for educational use. Products, prices and reviews are fictional.</small></p>
      </div>
      <div><h2>Shop</h2><Link to="/cakes">Cakes</Link><Link to="/desserts">Desserts</Link><Link to="/offers">Offers</Link></div>
      <div><h2>Company</h2><Link to="/about">About</Link><Link to="/blog">Blog</Link><Link to="/contact">Contact</Link><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms">Terms &amp; Conditions</Link></div>
      <div><h2>Follow</h2>
        {Object.entries(s).map(([k, href]) => <a key={k} href={href} target="_blank" rel="noopener noreferrer" data-event="click_social" data-social-network={k}>{k[0].toUpperCase() + k.slice(1)}</a>)}
        <p>{business.phone}<br />{business.email}</p>
      </div>
    </footer>
  );
}
export default function Layout() {
  return (<><a href="#main" className="skip">Skip to content</a><Navbar /><main id="main"><Outlet /></main><Footer /></>);
}
