import { useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { Art, BlogCard, Breadcrumbs, Button } from '../components/Ui.jsx';
import { NotFound } from './Misc.jsx';
import { posts } from '../data/content.js';

export function Blog() {
  return (<div className="wrap">
    <Seo path="/blog" title="Cake & Dessert Blog | SweetCrave Yamuna Nagar" description="Cake ideas, ordering guides and dessert tips from SweetCrave, a bakery in Yamuna Nagar." />
    <h1>SweetCrave Blog</h1><p className="lead">Ideas and guides for birthdays, student treats and celebrations.</p>
    <div className="grid">{posts.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
  </div>);
}
export function Post() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;
  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, datePublished: post.date, author: { '@type': 'Organization', name: 'SweetCrave Team' }, publisher: { '@type': 'Organization', name: 'SweetCrave' }, description: post.desc };
  return (<div className="wrap narrow">
    <Seo path={`/blog/${post.slug}`} title={`${post.title} | SweetCrave`} description={post.desc} schema={schema} />
    <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.title }]} />
    <article>
      <h1>{post.title}</h1>
      <p><small>By SweetCrave Team · <time dateTime={post.date}>{post.date}</time> · {post.category} · {post.read} min read</small></p>
      <Art p={{ ...post, name: post.title }} big />
      {post.body.map((t, i) => <p key={i}>{t}</p>)}
      <div className="cta-box"><strong>Ready to order?</strong> <Button to="/cakes" data-track="click_order" data-location={`blog_${post.slug}`}>View Cakes</Button></div>
    </article>
    <h2>Related articles</h2><div className="grid">{related.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
  </div>);
}
