'use client';

import React from 'react';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const ProductDetails = ({ slug }: { slug: string }) => {
  const { language: lang } = useLanguage();
  const data = getPageData('products', lang);
  
  const product = data.products.find((p: any) => p.slug === slug) || data.products[0];

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {lang === 'en' ? 'Product not found' : 'ምርት አልተገኘም'}
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <a
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {lang === 'en' ? 'Back to Products' : 'ወደ ምርቶች ተመለስ'}
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="w-64 h-64 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                  <svg className="w-32 h-32 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                {product.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary dark:text-primary-light">
                  {product.price}
                </span>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {lang === 'en' ? 'Key Features' : 'ዋና ባህሪያት'}
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-tertiary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold text-lg transition-colors">
                  {lang === 'en' ? 'Get Quote' : 'ዋጋ ያግኙ'}
                </button>
                <button className="flex-1 px-8 py-4 bg-secondary hover:bg-secondary-light text-white rounded-lg font-semibold text-lg transition-colors">
                  {lang === 'en' ? 'Contact Us' : 'ያግኙን'}
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {lang === 'en' ? 'Quality Guaranteed' : 'የጥራት ዋስትና'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {lang === 'en' ? 'Premium materials and craftsmanship' : 'ከፍተኛ ቁሳቁሶች እና ሙያ'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {lang === 'en' ? 'Fast Installation' : 'ፈጣን መጫን'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {lang === 'en' ? 'Professional installation service' : 'ሙያዊ የመጫን አገልግሎት'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-tertiary/10 dark:bg-tertiary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {lang === 'en' ? 'Warranty Included' : 'ዋስትና ተካትቷል'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {lang === 'en' ? 'Comprehensive warranty coverage' : 'የተሟላ ዋስትና ሽፋን'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
