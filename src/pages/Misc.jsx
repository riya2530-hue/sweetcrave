import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Seo from '../components/Seo.jsx';
import { Button, Breadcrumbs } from '../components/Ui.jsx';
import { ProductGrid } from '../components/ProductCard.jsx';
import { searchProducts } from '../data/products.js';
import { business } from '../data/content.js';
import { track } from '../utils/track.js';

export function About() {
  const vals = [['Freshness', 'Prepared for your order.'], ['Affordability', 'Prices that suit students and families.'], ['Convenience', 'Simple online ordering with clear delivery slots.'], ['Celebration', 'Desserts that look good on the table.']];
  return (<div className="wrap narrow">
    <Seo path="/about" title="About SweetCrave | Local Bakery in Yamuna Nagar" description="SweetCrave is a demo dessert brand in Yamuna Nagar built around affordable, convenient and celebration-ready cakes and desserts." />
    <h1>About SweetCrave</h1>
    <p className="lead">SweetCrave is a fictional bakery concept for Yamuna Nagar, Haryana, created as a digital marketing practice project.</p>
    <p>The idea: make celebration desserts affordable, convenient, attractive and easy for local customers to order, even on short notice.</p>
    <h2>Our mission</h2><p>Help people celebrate small and big moments without stretching their budget or their time.</p>
    <h2>Our values</h2><ul className="why">{vals.map(([t, d]) => <li key={t}><strong>{t}</strong><p>{d}</p></li>)}</ul>
    <Button to="/cakes" data-track="click_order" data-location="about">View Cakes</Button>
  </div>);
}
export function Contact() {
  const submit = (e) => { e.preventDefault(); track('contact_form_submit', { form_id: 'contact' }); e.target.reset(); alert('Demo only: your message was not sent.'); };
  const schema = { '@context': 'https://schema.org', '@type': 'Bakery', name: 'SweetCrave', address: { '@type': 'PostalAddress', addressLocality: 'Yamuna Nagar', addressRegion: 'Haryana', addressCountry: 'IN' }, telephone: '+91 00000 00000', email: 'hello@sweetcrave.example' };
  return (<div className="wrap">
    <Seo path="/contact" title="Contact SweetCrave | Bakery in Yamuna Nagar" description="Contact SweetCrave, a bakery and dessert shop serving Yamuna Nagar, Haryana. Demo contact details for a practice project." schema={schema} />
    <h1>Contact SweetCrave</h1>
    <div className="cartwrap">
      <form className="form" onSubmit={submit} id="contact-form" data-event="contact_form_submit">
        <label>Name<input required autoComplete="name" /></label><label>Email<input type="email" required autoComplete="email" /></label>
        <label>Phone<input type="tel" autoComplete="tel" /></label><label className="full">Message<textarea rows="4" required /></label>
        <Button type="submit">Send Message</Button>
      </form>
      <aside className="summary"><h2>SweetCrave</h2><p>Yamuna Nagar, Haryana, India</p><p>Phone: {business.phone}</p><p>Email: {business.email}</p>
        <div className="map" role="img" aria-label="Map placeholder for Yamuna Nagar">Map placeholder — embed Google Map later</div></aside>
    </div>
  </div>);
}
const Legal = ({ path, title, children }) => (<div className="wrap narrow"><Seo path={path} title={`${title} | SweetCrave`} description={`${title} for the SweetCrave demo website.`} /><h1>{title}</h1>{children}</div>);
export const Privacy = () => (<Legal path="/privacy-policy" title="Privacy Policy"><p>SweetCrave is a demo site. Forms do not send data to any server. Cart data stays in your browser's localStorage and the last demo order in sessionStorage.</p><p>When analytics (GA4/GTM) is added later, update this page to describe cookies and tracking, and add a consent banner where required.</p></Legal>);
export const Terms = () => (<Legal path="/terms" title="Terms & Conditions"><p>This website is a fictional educational project. No real orders are fulfilled and no real payments are processed. Products, prices, offers and reviews are demo content.</p></Legal>);
export function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const results = searchProducts(q);
  return (<div className="wrap">
    <Seo path="/search" title="Search | SweetCrave" description="Search SweetCrave cakes, brownies, cupcakes, cookies and dessert boxes." noindex />
    <h1>Search results for “{q}”</h1><p aria-live="polite">{results.length} results</p>
    <ProductGrid list={results} listName="search_results" />
  </div>);
}
export function NotFound() {
  useEffect(() => { track('page_not_found', { page_path: location.pathname }); }, []);
  return (<div className="wrap narrow center"><Seo path="/404" title="Page Not Found | SweetCrave" description="This page isn't available at SweetCrave." noindex />
    <h1>Oops! This sweet page isn't available.</h1><p className="lead">The link may be broken or the product may have moved.</p><Button to="/">Back to SweetCrave</Button></div>);
}
