import Seo from '../components/Seo.jsx';
import { Button, CategoryCard, ReviewCard, BlogCard, NewsletterForm } from '../components/Ui.jsx';
import { ProductGrid } from '../components/ProductCard.jsx';
import { products } from '../data/products.js';
import { reviews, posts, business } from '../data/content.js';

const cats = [
  ['/cakes', '🎂', 'Birthday Cakes', '#D6246E'], ['/cakes', '🍫', 'Chocolate Cakes', '#5B3A29'],
  ['/desserts', '🧁', 'Cupcakes', '#EE7FA8'], ['/desserts', '🟫', 'Brownies', '#4A2C1D'],
  ['/desserts', '🍪', 'Cookies', '#B9803F'], ['/desserts', '🎁', 'Dessert Boxes', '#7A3FB5'],
];
const why = [['💸', 'Affordable prices', 'Celebration desserts that fit a student budget.'], ['⏱️', 'Same-day ordering', 'Select items can be ready the day you order.'], ['🥣', 'Freshly prepared', 'Baked for your order, not sitting on a shelf.'], ['🎉', 'Celebration ready', 'Boxes and cakes made for birthdays and small parties.'], ['📍', 'Local service', 'Delivering across Yamuna Nagar.']];

export default function Home() {
  const schema = { '@context': 'https://schema.org', '@type': 'Bakery', name: 'SweetCrave', url: 'https://www.sweetcrave.example', description: 'Affordable cakes and desserts in Yamuna Nagar (demo business).', telephone: '+91 00000 00000', address: { '@type': 'PostalAddress', addressLocality: 'Yamuna Nagar', addressRegion: 'Haryana', addressCountry: 'IN' }, areaServed: 'Yamuna Nagar', priceRange: '₹₹', sameAs: Object.values(business.social) };
  return (<>
    <Seo path="/" title="SweetCrave | Cakes & Desserts in Yamuna Nagar" description="Order affordable cakes and desserts in Yamuna Nagar with SweetCrave. Explore birthday cakes, brownies, cupcakes and same-day celebration options." schema={schema} />
    <section className="hero">
      <div>
        <p className="pill">Same-Day Orders Available in Yamuna Nagar</p>
        <h1>Delicious Moments, Made Sweeter.</h1>
        <p className="lead">Affordable cakes and desserts for birthdays, celebrations and everyday cravings in Yamuna Nagar.</p>
        <div className="row"><Button to="/cakes" id="hero-order" data-event="click_order" data-track="click_order" data-location="hero">Order Now</Button><Button to="/desserts" variant="ghost" data-track="click_explore" data-location="hero">Explore Desserts</Button></div>
      </div>
      <div className="hero-art" role="img" aria-label="Illustration of a layered cake with cupcakes and a brownie"><span>🎂</span><span>🧁</span><span>🟫</span></div>
    </section>
    <section className="wrap"><h2>Pick your treat</h2><div className="cats">{cats.map(([to, e, l, t]) => <CategoryCard key={l} to={to} emoji={e} label={l} tint={t} />)}</div></section>
    <section className="wrap"><h2>Best sellers</h2><ProductGrid list={products.filter((p) => p.featured).slice(0, 8)} listName="home_best_sellers" /></section>
    <section className="band sameday"><div className="wrap"><h2>Need it today? We've got you.</h2><p>Order selected cakes and desserts for same-day preparation and delivery in Yamuna Nagar.</p><Button to="/offers" variant="light" data-track="click_order" data-location="same_day">See Same-Day Options</Button></div></section>
    <section className="wrap"><h2>Why choose SweetCrave?</h2><ul className="why">{why.map(([i, t, d]) => <li key={t}><span aria-hidden="true">{i}</span><strong>{t}</strong><p>{d}</p></li>)}</ul></section>
    <section className="band student"><div className="wrap"><h2>Sweet treats without breaking the budget</h2><p>Student Dessert Combo — ₹299 · Mini Birthday Combo — ₹599 <small>(demo offers)</small></p><Button to="/offers" data-track="view_offer" data-location="home_student">View Offers</Button></div></section>
    <section className="wrap"><h2>What customers say</h2><p><small>Sample reviews for a demo brand. Not real customers.</small></p><div className="reviews">{reviews.slice(0, 4).map((r, i) => <ReviewCard key={i} r={r} />)}</div></section>
    <section className="wrap"><h2>Sweet moments from SweetCrave</h2>
      <div className="insta">{products.slice(0, 6).map((p) => <div key={p.id} className="art" style={{ '--tint': p.tint }} role="img" aria-label={`Sample social post: ${p.name}`}><span>{p.emoji}</span></div>)}</div>
      <a className="btn btn-ghost" href={business.social.instagram} target="_blank" rel="noopener noreferrer" data-event="click_social" data-track="click_social" data-social-network="instagram">Follow SweetCrave</a></section>
    <section className="wrap"><h2>From the blog</h2><div className="grid">{posts.slice(0, 3).map((p) => <BlogCard key={p.slug} post={p} />)}</div></section>
    <section className="band news"><div className="wrap"><h2>Get Sweet Deals in Your Inbox</h2><p>Subscribe for new dessert launches, offers and celebration ideas.</p><NewsletterForm /></div></section>
    <section className="wrap final"><h2>Your Next Celebration Starts Here.</h2><Button to="/cakes" data-track="click_order" data-location="final_cta">Order Now</Button></section>
  </>);
}
