/**
 * Example usage of the data fetching utilities
 * This file demonstrates how to use the data in your components
 */

'use client';

import { getSectionData, getPageData, getLayoutData, Language } from '@/data/utils';
import { useState } from 'react';

// Example: Using section data in a Hero component
export function HeroExample() {
  const [lang, setLang] = useState<Language>('en');
  const data = getSectionData('hero', lang);
  
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.subtitle}</p>
      <p>{data.description}</p>
      <button onClick={() => setLang(lang === 'en' ? 'am' : 'en')}>
        {lang === 'en' ? 'Switch to Amharic' : 'Switch to English'}
      </button>
    </div>
  );
}

// Example: Using page data in a Blog component
export function BlogExample() {
  const [lang, setLang] = useState<Language>('en');
  const data = getPageData('blog', lang);
  
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <div>
        {data.posts.map((post: any) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example: Using layout data in a Header component
export function HeaderExample() {
  const [lang, setLang] = useState<Language>('en');
  const data = getLayoutData('header', lang);
  
  return (
    <header>
      <div>{data.logo}</div>
      <nav>
        <a href="/">{data.nav.home}</a>
        <a href="/company/about">{data.nav.about}</a>
        <a href="/service">{data.nav.services}</a>
        <a href="/products">{data.nav.products}</a>
        <a href="/blogs">{data.nav.blog}</a>
        <a href="/contacts">{data.nav.contact}</a>
      </nav>
      <button>{data.cta}</button>
    </header>
  );
}

// Example: Server Component usage (Next.js App Router)
export async function ServerComponentExample({ lang = 'en' }: { lang?: Language }) {
  const data = getSectionData('feature', lang);
  
  return (
    <div>
      <h1>{data.title}</h1>
      <div>
        {data.features.map((feature: any) => (
          <div key={feature.id}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

