'use client';

import React, { useState } from 'react';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Gallery = () => {
  const { language: lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const data = getPageData('gallery', lang);

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            {data.subtitle}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {data.description}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.images.map((image: any) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image.id)}
              className="group relative aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Placeholder Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl">
                  <svg className="w-16 h-16 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm text-white/80">{image.category}</p>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                {image.category}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Image View */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="text-xl mb-2">
                    {data.images.find((img: any) => img.id === selectedImage)?.title}
                  </p>
                  <p className="text-white/80">
                    {data.images.find((img: any) => img.id === selectedImage)?.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
