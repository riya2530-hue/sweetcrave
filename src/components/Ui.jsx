import { Link } from 'react-router-dom';
import { track } from '../utils/track.js';

export function Button({ to, variant = 'primary', children, ...rest }) {
  const cls = `btn btn-${variant}`;
  return to ? <Link to={to} className={cls} {...rest}>{children}</Link> : <button className={cls} {...rest}>{children}</button>;
}
export function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>{trail.map((t, i) => <li key={t.label}>{t.to && i < trail.length - 1 ? <Link to={t.to}>{t.label}</Link> : <span aria-current="page">{t.label}</span>}</li>)}</ol>
    </nav>
  );
}
export const Art = ({ p, big }) => (
  <div className={`art${big ? ' art-big' : ''}`} style={{ '--tint': p.tint }} role="img" aria-label={`${p.name} placeholder image`}>
    <span>{p.emoji}</span>
  </div>
);
export const Stars = ({ rating, count }) => (
  <span className="stars" aria-label={`Rated ${rating} out of 5`}>★ {rating}{count != null && <small> ({count} demo ratings)</small>}</span>
);
export function CategoryCard({ to, emoji, label, tint }) {
  return (
    <Link to={to} className="cat" style={{ '--tint': tint }} data-event="select_content" data-content-type="category" data-item-name={label}>
      <span aria-hidden="true">{emoji}</span><strong>{label}</strong>
    </Link>
  );
}
export const ReviewCard = ({ r }) => (
  <figure className="review"><blockquote>“{r.text}”</blockquote><figcaption>{'★'.repeat(r.rating)} — {r.name} <small>(sample review)</small></figcaption></figure>
);
export function BlogCard({ post }) {
  return (
    <article className="blogcard">
      <Link to={`/blog/${post.slug}`} aria-label={post.title}><Art p={{ ...post, name: post.title }} /></Link>
      <small>{post.category} · {post.read} min read</small>
      <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.desc}</p>
    </article>
  );
}
export function NewsletterForm() {
  const submit = (e) => {
    e.preventDefault();
    track('newsletter_signup', { method: 'footer_or_home_form' });
    e.target.reset(); alert('Demo only: nothing was sent or stored. Connect a real email tool later.');
  };
  return (
    <form className="newsletter" onSubmit={submit} id="newsletter-form" data-event="newsletter_signup">
      <label>Name<input name="name" required autoComplete="given-name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
