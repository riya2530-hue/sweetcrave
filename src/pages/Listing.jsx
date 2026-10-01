import { useMemo, useState } from 'react';
import Seo from '../components/Seo.jsx';
import { Breadcrumbs } from '../components/Ui.jsx';
import { ProductGrid } from '../components/ProductCard.jsx';
import { products, categories } from '../data/products.js';

const META = {
  cakes: { h1: 'Cakes in Yamuna Nagar', title: 'Birthday & Chocolate Cakes in Yamuna Nagar | SweetCrave', desc: 'Browse birthday, chocolate, red velvet and custom cakes in Yamuna Nagar. Affordable prices with same-day cake delivery on selected cakes.', intro: 'Birthday cakes, chocolate cakes and custom cakes from a local Yamuna Nagar bakery. Look for the same-day badge if you need it today.' },
  desserts: { h1: 'Desserts in Yamuna Nagar', title: 'Brownies, Cupcakes & Dessert Boxes in Yamuna Nagar | SweetCrave', desc: 'Order brownies, cupcakes, cookies and dessert boxes from SweetCrave, a dessert shop in Yamuna Nagar. Student-friendly prices.', intro: 'Brownies, cupcakes, cookies and dessert boxes for small celebrations and everyday cravings.' },
};
export default function Listing({ group }) {
  const m = META[group];
  const [cat, setCat] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sameDay, setSameDay] = useState(false);
  const [sort, setSort] = useState('popular');
  const list = useMemo(() => {
    let l = products.filter((p) => p.group === group && (cat === 'All' || p.category === cat) && p.price <= maxPrice && (!sameDay || p.sameDayAvailable));
    if (sort === 'popular') l = [...l].sort((a, b) => b.reviewCount - a.reviewCount);
    if (sort === 'low') l = [...l].sort((a, b) => a.price - b.price);
    if (sort === 'high') l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [group, cat, maxPrice, sameDay, sort]);
  const schema = { '@context': 'https://schema.org', '@type': 'ItemList', name: m.h1, itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://www.sweetcrave.example/product/${p.slug}`, name: p.name })) };
  return (<div className="wrap">
    <Seo title={m.title} description={m.desc} path={`/${group}`} schema={schema} />
    <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: group === 'cakes' ? 'Cakes' : 'Desserts' }]} />
    <h1>{m.h1}</h1><p className="lead">{m.intro}</p>
    <div className="filters">
      <label>Category<select value={cat} onChange={(e) => setCat(e.target.value)}><option>All</option>{categories[group].map((c) => <option key={c}>{c}</option>)}</select></label>
      <label>Max price: ₹{maxPrice}<input type="range" min="200" max="1000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} /></label>
      <label className="check"><input type="checkbox" checked={sameDay} onChange={(e) => setSameDay(e.target.checked)} /> Same-day available</label>
      <label>Sort by<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="popular">Popular</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></label>
    </div>
    <p aria-live="polite">{list.length} products</p>
    <ProductGrid list={list} listName={group} />
  </div>);
}
