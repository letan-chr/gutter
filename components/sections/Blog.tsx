'use client';

import React from 'react';
import Image from 'next/image';
import { getSectionData, getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Blog = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData('blog', lang);
  const blogData = getPageData('blog', lang);

  // Get featured posts (first 2) and latest posts (next 4, or all remaining if less than 4)
  const allPosts = blogData.posts || [];
  const featuredPosts = allPosts.slice(0, 2);
  const latestPosts = allPosts.slice(2, 6);

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-gray-900">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Modern Layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
          {/* Left Side - Title and Subtitle */}
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-2">
              {data.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {data.subtitle}
            </p>
          </div>
          
          {/* Right Side - Button */}
          <div className="flex-shrink-0">
            <a
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              {data.viewAll}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Featured Blog Posts - 2 Large Cards */}
        {featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {featuredPosts.map((post: any) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Post Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <a
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:gap-1 transition-all group/link text-sm"
                  >
                    {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
                    <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Latest Blog Posts - 4 Normal Cards */}
        {latestPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestPosts.map((post: any) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Post Image */}
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={post.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Post Content */}
                <div className="p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="truncate">{post.author}</span>
                  </div>
                  <h4 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <a
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:gap-1 transition-all group/link text-sm"
                  >
                    {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
                    <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;
