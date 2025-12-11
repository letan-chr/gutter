'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const BlogDetails = ({ slug }: { slug: string }) => {
  const { language: lang } = useLanguage();
  const data = getPageData('blog', lang);
  
  // Find the post by slug
  const post = data.posts.find((p: any) => p.slug === slug) || data.posts[0];

  // Create gallery array - use post.gallery if exists, otherwise create from main image
  const galleryImages = useMemo(() => {
    if (post.gallery && Array.isArray(post.gallery) && post.gallery.length > 0) {
      return post.gallery;
    }
    // Create a gallery from the main image with some variations
    const baseImage = post.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop';
    return [
      baseImage,
      baseImage.replace('w=800&h=400', 'w=800&h=400&q=80'),
      baseImage.replace('w=800&h=400', 'w=800&h=400&q=75'),
      baseImage.replace('w=800&h=400', 'w=800&h=400&q=70'),
    ];
  }, [post]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get related posts from the same category
  const relatedPosts = useMemo(() => {
    return data.posts
      .filter((p: any) => p.id !== post.id && p.category === post.category)
      .slice(0, 4);
  }, [data.posts, post]);

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
    <article className="py-12 lg:py-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Back Button */}
      

        {/* Full Width Big Card: Left Image, Right Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            {/* Left Image Section - Banner with Gallery */}
            <div className="lg:w-1/2 flex flex-col">
              {/* Banner Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                {galleryImages[selectedImageIndex] ? (
                  <Image
                    src={galleryImages[selectedImageIndex]}
                    alt={post.title}
                    fill
                    className="object-cover transition-opacity duration-300"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                    <svg className="w-24 h-24 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails Below Banner - Limited to Banner Column */}
              {galleryImages.length > 1 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    {lang === 'en' ? 'Gallery' : 'ጋለሪ'}
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {galleryImages.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? 'border-primary dark:border-primary-light ring-2 ring-primary/20'
                            : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {selectedImageIndex === index && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content Section - Description and Details */}
            <div className="lg:w-1/2 px-8 lg:px-10 pt-0 lg:pt-0 pb-8 lg:pb-10 flex flex-col items-start">


              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm">{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{post.date}</span>
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Share Section */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {lang === 'en' ? 'Share this post' : 'ይህንን ልጥፍ ያጋሩ'}
                </h3>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section Inside Big Card - Full Width */}
          <div className="p-8 lg:p-10 border-t border-gray-200 dark:border-gray-700">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                <div className="text-base leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts - Full Width, 4 Cards in One Row */}
        {relatedPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {lang === 'en' ? 'Related Posts' : 'ተዛማጅ ልጥፎች'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <a
                  key={relatedPost.id}
                  href={`/blogs/${relatedPost.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {relatedPost.image ? (
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                        <svg className="w-16 h-16 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span>{relatedPost.date}</span>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <span>{relatedPost.author}</span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2 leading-relaxed">
                      {relatedPost.excerpt}
                    </p>
                    <span className="inline-flex items-center text-primary dark:text-primary-light font-medium text-sm group-hover:gap-1 transition-all">
                      {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default BlogDetails;
