import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { Art, Breadcrumbs, Button, Stars } from '../components/Ui.jsx';
import { ProductGrid } from '../components/ProductCard.jsx';
import { NotFound } from './Misc.jsx';
import { getProduct, products } from '../data/products.js';
import { useCart } from '../hooks/useCart.jsx';
import { inr, track, toItem } from '../utils/track.js';

export default function Product() {
  const { slug } = useParams();
  const p = getProduct(slug);
  const { add } = useCart();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('Standard');
  const [message, setMessage] = useState('');
  useEffect(() => { if (p) track('view_item', { currency: 'INR', value: p.price, items: [toItem(p)] }); }, [p]);
  if (!p) return <NotFound />;
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).concat(products.filter((x) => x.group === p.group && x.category !== p.category)).slice(0, 3);
  const group = p.group === 'cakes' ? 'Cakes' : 'Desserts';
  const schema = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.description, category: p.category, brand: { '@type': 'Brand', name: 'SweetCrave' }, offers: { '@type': 'Offer', priceCurrency: 'INR', price: p.price, availability: 'https://schema.org/InStock', url: `https://www.sweetcrave.example/product/${p.slug}` } };
  // aggregateRating intentionally omitted: demo ratings must not be marked up as real reviews.
  const addNow = () => add(p, qty, { size, message });
  return (<div className="wrap">
    <Seo title={`${p.name} in Yamuna Nagar | SweetCrave`} description={`${p.shortDescription} Order ${p.name.toLowerCase()} online from SweetCrave in Yamuna Nagar for ${inr(p.price)}.`} path={`/product/${p.slug}`} schema={schema} />
    <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: group, to: `/${p.group}` }, { label: p.category, to: `/${p.group}` }, { label: p.name }]} />
    <div className="detail">
      <Art p={p} big />
      <div>
        <h1>{p.name}</h1><Stars rating={p.rating} count={p.reviewCount} />
        <p className="price big">{inr(p.price)}</p>
        <p>{p.description}</p>
        <p><strong>Ingredients:</strong> {p.ingredients}</p>
        <p className={p.availability === 'In stock' ? 'ok' : 'warn'}><strong>Availability:</strong> {p.availability}{p.sameDayAvailable && ' · Same-day delivery in Yamuna Nagar'}</p>
        <p><strong>Delivery:</strong> Yamuna Nagar only. ₹49 delivery, free above ₹999.</p>
        <div className="opts">
          <label>Size<select value={size} onChange={(e) => setSize(e.target.value)}><option>Standard</option><option>Large (+₹0, demo)</option></select></label>
          <label>Quantity<input type="number" min="1" max="10" value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} /></label>
          <label className="full">Custom message (optional)<input maxLength="40" placeholder="Happy Birthday Riya!" value={message} onChange={(e) => setMessage(e.target.value)} /></label>
        </div>
        <div className="row">
          <Button id="pdp-add" data-event="add_to_cart" onClick={addNow}>Add to Cart</Button>
          <Button id="pdp-buy" variant="dark" data-event="click_order" onClick={() => { addNow(); track('click_order', { location: 'pdp_buy_now', item_id: p.id }); nav('/checkout'); }}>Buy Now</Button>
        </div>
      </div>
    </div>
    <h2>You may also like</h2><ProductGrid list={related} listName="related_products" />
  </div>);
}
