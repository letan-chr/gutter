'use client';

import React from 'react';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const BlogDetails = ({ slug }: { slug: string }) => {
  const { language: lang } = useLanguage();
  const data = getPageData('blog', lang);
  
  // Find the post by slug
  const post = data.posts.find((p: any) => p.slug === slug) || data.posts[0];

  if (!post) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {lang === 'en' ? 'Post not found' : 'ልጥፍ አልተገኘም'}
        </p>
      </div>
    );
  }

  return (
    <article className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <a
            href="/blogs"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {lang === 'en' ? 'Back to Blog' : 'ወደ ብሎግ ተመለስ'}
          </a>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{post.date}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 rounded-2xl mb-12 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-24 h-24 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium mb-8">
                {post.excerpt}
              </p>
              <div className="text-base leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {lang === 'en' ? 'Share this post' : 'ይህንን ልጥፍ ያጋሩ'}
            </h3>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </button>
            </div>
          </div>

          {/* Related Posts */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {lang === 'en' ? 'Related Posts' : 'ተዛማጅ ልጥፎች'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.posts
                .filter((p: any) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost: any) => (
                  <a
                    key={relatedPost.id}
                    href={`/blogs/${relatedPost.slug}`}
                    className="group block bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogDetails;
