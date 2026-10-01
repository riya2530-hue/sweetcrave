import { Link } from 'react-router-dom';
import { Art, Button, Stars } from './Ui.jsx';
import { useCart } from '../hooks/useCart.jsx';
import { inr, track, toItem } from '../utils/track.js';

export function ProductCard({ p, listName = 'listing' }) {
  const { add } = useCart();
  const open = () => track('select_item', { item_list_name: listName, items: [toItem(p)] });
  return (
    <article className="card">
      <Link to={`/product/${p.slug}`} onClick={open} aria-label={`View ${p.name}`}><Art p={p} /></Link>
      {p.sameDayAvailable && <span className="badge">Same-day</span>}
      <div className="card-body">
        <h3><Link to={`/product/${p.slug}`} onClick={open}>{p.name}</Link></h3>
        <p>{p.shortDescription}</p>
        <div className="row"><strong className="price">{inr(p.price)}</strong><Stars rating={p.rating} /></div>
        <small className={p.availability === 'In stock' ? 'ok' : 'warn'}>{p.availability}</small>
        <div className="row">
          <Button id={`add-${p.id}`} data-event="add_to_cart" data-item-id={p.id} onClick={() => add(p)}>Add to Cart</Button>
          <Button to={`/product/${p.slug}`} variant="ghost" onClick={open} data-event="select_item">View Details</Button>
        </div>
      </div>
    </article>
  );
}
export const ProductGrid = ({ list, listName }) =>
  list.length ? <div className="grid">{list.map((p) => <ProductCard key={p.id} p={p} listName={listName} />)}</div>
    : <p className="empty">No products match. Try clearing a filter or browse all <Link to="/cakes">cakes</Link> and <Link to="/desserts">desserts</Link>.</p>;
