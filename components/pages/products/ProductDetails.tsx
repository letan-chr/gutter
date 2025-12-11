'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const ProductDetails = ({ slug }: { slug: string }) => {
  const { language: lang } = useLanguage();
  const data = getSectionData('products', lang);
  
  // Helper function to generate slug from title
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };
  
  // Find the product by slug (generate slug from title if slug doesn't exist)
  const product = data.products.find((p: any) => {
    const productSlug = p.slug || generateSlug(p.title);
    return productSlug === slug;
  }) || data.products[0];

  // Create gallery array - use product.gallery if exists, otherwise create from main image
  const galleryImages = useMemo(() => {
    if (product?.gallery && Array.isArray(product.gallery) && product.gallery.length > 0) {
      return product.gallery;
    }
    // Create a gallery from the main image with some variations
    const baseImage = product?.image || 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=400&fit=crop';
    return [
      baseImage,
      baseImage.replace('w=800&h=400', 'w=800&h=400&q=80'),
      baseImage.replace('w=800&h=400', 'w=800&h=400&q=75'),
      baseImage.replace('w=800&h=400', 'w=800&h=400&q=70'),
    ];
  }, [product]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get related products from the same category
  const relatedProducts = useMemo(() => {
    return data.products
      .filter((p: any) => p.id !== product?.id && (p.category === product?.category || (!p.category && !product?.category)))
      .slice(0, 4);
  }, [data.products, product]);

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
    <article className="py-12 lg:py-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
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
                    alt={product.title}
                    fill
                    className="object-cover transition-opacity duration-300"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                    <svg className="w-24 h-24 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {lang === 'en' ? 'Key Features' : 'ዋና ባህሪያት'}
                </h3>
                <ul className="space-y-3">
                  {product.features?.map((feature: string, index: number) => (
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
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 w-full">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors">
                    {lang === 'en' ? 'Get Quote' : 'ዋጋ ያግኙ'}
                  </button>
                  <button className="flex-1 px-6 py-3 bg-secondary hover:bg-secondary-light text-white rounded-lg font-semibold transition-colors">
                    {lang === 'en' ? 'Contact Us' : 'ያግኙን'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section Inside Big Card - Full Width */}
          <div className="p-8 lg:p-10 border-t border-gray-200 dark:border-gray-700">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                {/* Product Details Paragraph */}
                {(product.content || product.description) && (
                  <div className="text-base leading-relaxed whitespace-pre-line mb-6">
                    {product.content || product.description}
                  </div>
                )}
                
                {/* Three Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
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
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
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
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
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
          </div>
        </div>

        {/* Related Products - Full Width, 4 Cards in One Row */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {lang === 'en' ? 'Related Products' : 'ተዛማጅ ምርቶች'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: any) => (
                <a
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {relatedProduct.image ? (
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                        <svg className="w-16 h-16 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span>{relatedProduct.category || (lang === 'en' ? 'Product' : 'ምርት')}</span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2 leading-relaxed">
                      {relatedProduct.description}
                    </p>
                    <div className="flex items-center justify-end">
                      <span className="inline-flex items-center text-primary dark:text-primary-light font-medium text-sm group-hover:gap-1 transition-all">
                        {lang === 'en' ? 'View' : 'ይመልከቱ'}
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
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

export default ProductDetails;
