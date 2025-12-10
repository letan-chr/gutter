'use client';

import React, { useState } from 'react';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Products = () => {
  const { language: lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const data = getSectionData('products', lang);

  // Get categories from products
  const categories = ['all', ...new Set(data.products.map((product: any) => product.category as string))] as string[];
  
  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? data.products 
    : data.products.filter((product: any) => (product.category as string) === selectedCategory);

  // Get featured products (first 2) and other products (remaining)
  const featuredProducts = filteredProducts.slice(0, 2);
  const otherProducts = filteredProducts.slice(2);
  
  // Split other products into two columns, limit to 3 products per column (3 rows)
  const leftColumnProducts = otherProducts.slice(0, 3);
  const rightColumnProducts = otherProducts.slice(3, 6);

  // Category translation helper
  const getCategoryLabel = (category: string) => {
    if (category === 'all') {
      return lang === 'en' ? 'All' : 'ሁሉም';
    }
    return category;
  };

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
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              {data.viewAll || (lang === 'en' ? 'View All Products' : 'ሁሉንም ምርቶች ይመልከቱ')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category: string) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* Products Layout: 2 Big Cards on Left (col-6), Right Side Split into 2 Columns (col-3 and col-3) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 items-stretch">
            {/* Left Side - 2 Featured Products (Bigger Cards) - col-6 */}
            {featuredProducts.length > 0 && (
              <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-6">
                {featuredProducts.map((product: any) => (
                  <article
                    key={product.id}
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <div className="relative h-52 overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-16 h-16 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      </div>
                      {/* Category Badge */}
                      {product.category && (
                        <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                          {product.category}
                        </div>
                      )}
                      {/* Product Label */}
                      <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                        {lang === 'en' ? 'Product' : 'ምርት'}
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="p-4">
                      <h3 className="text-lg lg:text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary dark:text-primary-light">
                          {product.price}
                        </span>
                        <a
                          href={`/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:gap-1 transition-all group/link text-sm"
                        >
                          {lang === 'en' ? 'View' : 'ይመልከቱ'}
                          <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Right Side - Split into 2 Columns (col-3 and col-3) */}
            {otherProducts.length > 0 && (
              <>
                {/* Left Column - col-3 */}
                <div className="lg:col-span-1 flex flex-col gap-3 lg:gap-4">
                  {leftColumnProducts.map((product: any) => (
                    <article
                      key={product.id}
                      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="relative h-24 overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        </div>
                        {/* Category Badge */}
                        {product.category && (
                          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {product.category}
                          </div>
                        )}
                      </div>

                      {/* Product Content */}
                      <div className="p-3 flex-1 flex flex-col">
                        <h4 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                          {product.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 flex-1">
                          {product.description}
                        </p>
                        <a
                          href={`/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:gap-1 transition-all group/link text-sm mt-auto"
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

                {/* Right Column - col-3 */}
                <div className="lg:col-span-1 flex flex-col gap-3 lg:gap-4">
                  {rightColumnProducts.map((product: any) => (
                    <article
                      key={product.id}
                      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="relative h-24 overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        </div>
                        {/* Category Badge */}
                        {product.category && (
                          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {product.category}
                          </div>
                        )}
                      </div>

                      {/* Product Content */}
                      <div className="p-3 flex-1 flex flex-col">
                        <h4 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                          {product.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 flex-1">
                          {product.description}
                        </p>
                        <a
                          href={`/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:gap-1 transition-all group/link text-sm mt-auto"
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
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {lang === 'en' ? 'No products found in this category.' : 'በዚህ ምድብ ውስጥ ምርቶች አልተገኙም።'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
