import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import { track } from './utils/track.js';
import Home from './pages/Home.jsx';
import Listing from './pages/Listing.jsx';
import Product from './pages/Product.jsx';
import Offers from './pages/Offers.jsx';
import { Blog, Post } from './pages/Blog.jsx';
import { Cart, Checkout, Confirmation } from './pages/Shop.jsx';
import { About, Contact, Privacy, Terms, Search, NotFound } from './pages/Misc.jsx';

// Routes: add a <Route> here to create a page. Layout wraps all pages with navbar/footer.
export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); track('page_view', { page_path: pathname, page_title: document.title }); }, [pathname]);
  // Delegated click tracking for any element carrying data-event (GTM can also use a Click trigger on [data-event]).
  useEffect(() => {
    const h = (e) => {
      const el = e.target.closest('[data-track]');
      if (el) track(el.dataset.track, { ...el.dataset });
    };
    document.addEventListener('click', h); return () => document.removeEventListener('click', h);
  }, []);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cakes" element={<Listing group="cakes" />} />
        <Route path="/desserts" element={<Listing group="desserts" />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<Confirmation />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
