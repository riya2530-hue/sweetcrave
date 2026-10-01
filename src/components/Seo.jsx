import { useEffect } from 'react';
// Central SEO manager. Every page renders <Seo title description path schema />.
export const SITE_URL = 'https://www.sweetcrave.example'; // TODO: replace with the real domain

function upsert(tag, attr, key, extra) {
  let el = document.head.querySelector(`${tag}[${attr}="${key}"]`);
  if (!el) { el = document.createElement(tag); el.setAttribute(attr, key); document.head.appendChild(el); }
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
}
export default function Seo({ title, description, path = '/', schema, noindex = false }) {
  useEffect(() => {
    const url = SITE_URL + path;
    document.title = title;
    upsert('meta', 'name', 'description', { content: description });
    upsert('meta', 'name', 'robots', { content: noindex ? 'noindex,follow' : 'index,follow' });
    upsert('link', 'rel', 'canonical', { href: url });
    [['og:title', title], ['og:description', description], ['og:url', url], ['og:type', 'website'], ['og:site_name', 'SweetCrave'], ['og:locale', 'en_IN']]
      .forEach(([k, v]) => upsert('meta', 'property', k, { content: v }));
    let s = document.getElementById('page-schema');
    if (s) s.remove();
    if (schema) {
      s = document.createElement('script'); s.id = 'page-schema'; s.type = 'application/ld+json';
      s.textContent = JSON.stringify(schema); document.head.appendChild(s);
    }
  }, [title, description, path, schema, noindex]);
  return null;
}
