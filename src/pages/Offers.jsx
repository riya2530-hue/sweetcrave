import { useEffect } from 'react';
import Seo from '../components/Seo.jsx';
import { Button } from '../components/Ui.jsx';
import { offers } from '../data/content.js';
import { track } from '../utils/track.js';

export default function Offers() {
  useEffect(() => { track('view_offer', { location: 'offers_page' }); }, []);
  return (<div className="wrap">
    <Seo path="/offers" title="Cake & Dessert Offers in Yamuna Nagar | SweetCrave" description="Student combos, birthday combos and weekend dessert deals from SweetCrave in Yamuna Nagar. Demo offers for a practice project." />
    <h1>Offers &amp; Combos</h1><p className="lead">All offers below are demo content for a practice project.</p>
    <div className="grid">{offers.map((o) => (
      <article className="card offer" key={o.id}><div className="card-body">
        <span className="badge static">Demo offer</span><h2>{o.title}</h2><p className="price big">{o.price}</p>
        <p>{o.desc}</p><p><small>{o.valid}<br />Eligible: {o.eligible}</small></p>
        <Button to={o.slug ? `/product/${o.slug}` : '/desserts'} data-event="view_offer" data-track="view_offer" data-offer-id={o.id}>{o.slug ? 'Order This Offer' : 'See Eligible Products'}</Button>
      </div></article>))}</div>
  </div>);
}
