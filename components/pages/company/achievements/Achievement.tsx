'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Achievement = () => {
  const { language: lang } = useLanguage();
  const data = getPageData('achievement', lang);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevious = React.useCallback(() => {
    if (selectedImageIndex === null || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      const newIndex = selectedImageIndex === 0 ? data.achievements.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 50);
    }, 250);
  }, [selectedImageIndex, data.achievements.length, isAnimating]);

  const handleNext = React.useCallback(() => {
    if (selectedImageIndex === null || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      const newIndex = selectedImageIndex === data.achievements.length - 1 ? 0 : selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 50);
    }, 250);
  }, [selectedImageIndex, data.achievements.length, isAnimating]);

  // Handle keyboard navigation in modal
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handlePrevious, handleNext]);

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Achievements Grid - Three Cards in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {data.achievements.map((achievement: any, index: number) => (
            <div
              key={achievement.id}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={achievement.image || '/placeholder-achievement.jpg'}
                  alt={achievement.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content at Bottom with Transparent Backdrop */}
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <div className="backdrop-blur-md bg-black/40 dark:bg-black/50 rounded-xl p-4 border border-white/10">
                  {/* Icon */}
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2">
                    {achievement.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/90 text-base lg:text-lg">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Stats background"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/70 dark:bg-black/80"></div>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
          </div>

          {/* Content */}
          <div className="relative p-8 lg:p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-10 lg:mb-12">
              {lang === 'en' ? 'Our Journey in Numbers' : 'በቁጥሮች ውስጥ ጉዞዎቻችን'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              <div className="group relative">
                <div className="backdrop-blur-sm bg-white/10 dark:bg-white/5 rounded-xl p-6 lg:p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:bg-white/15">
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                    10+
                  </div>
                  <div className="text-white/90 text-sm lg:text-base font-medium">
                    {lang === 'en' ? 'Years' : 'ዓመታት'}
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="backdrop-blur-sm bg-white/10 dark:bg-white/5 rounded-xl p-6 lg:p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:bg-white/15">
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                    1000+
                  </div>
                  <div className="text-white/90 text-sm lg:text-base font-medium">
                    {lang === 'en' ? 'Projects' : 'ፕሮጀክቶች'}
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="backdrop-blur-sm bg-white/10 dark:bg-white/5 rounded-xl p-6 lg:p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:bg-white/15">
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                    500+
                  </div>
                  <div className="text-white/90 text-sm lg:text-base font-medium">
                    {lang === 'en' ? 'Clients' : 'ደንበኞች'}
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="backdrop-blur-sm bg-white/10 dark:bg-white/5 rounded-xl p-6 lg:p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:bg-white/15">
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                    50+
                  </div>
                  <div className="text-white/90 text-sm lg:text-base font-medium">
                    {lang === 'en' ? 'Team Members' : 'የቡድን አባላት'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal with Slider */}
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 md:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedImageIndex(null);
              }
            }}
          >
            {/* Professional Modal Container */}
            <div 
              className="relative w-full max-w-6xl bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Section */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 dark:border-gray-600 bg-gray-800/50 dark:bg-gray-900/50">
                {/* Achievement Name and Description */}
                <div className={`flex-1 transition-opacity duration-300 ${
                  isAnimating ? 'opacity-0' : 'opacity-100'
                }`}>
                  <h2 className="text-xl lg:text-2xl font-display font-bold text-white mb-1">
                    {data.achievements[selectedImageIndex].title}
                  </h2>
                  <p className="text-gray-400 text-sm lg:text-base">
                    {data.achievements[selectedImageIndex].description}
                  </p>
                </div>

                {/* Close Button - Inside Modal */}
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="text-gray-400 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 rounded-full p-2 hover:scale-110 active:scale-95 ml-4"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Image Section with Navigation Arrows */}
              <div className="relative flex-1 flex items-center justify-center p-6 md:p-8 bg-gray-900 dark:bg-gray-800 min-h-[400px]">
                {/* Previous Button - Inside Modal */}
                {data.achievements.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="absolute left-4 md:left-6 z-10 text-white hover:text-primary transition-all bg-gray-800/90 hover:bg-gray-700/90 rounded-full p-3 md:p-4 shadow-lg hover:scale-110 active:scale-95 border border-gray-700"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* Image Container */}
                <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-lg bg-gray-800">
                  <div
                    key={selectedImageIndex}
                    className={`relative w-full h-full transition-opacity duration-300 ease-in-out ${
                      isAnimating ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <Image
                      src={data.achievements[selectedImageIndex].image}
                      alt={data.achievements[selectedImageIndex].title}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                      priority
                      quality={90}
                    />
                  </div>
                </div>

                {/* Next Button - Inside Modal */}
                {data.achievements.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 md:right-6 z-10 text-white hover:text-primary transition-all bg-gray-800/90 hover:bg-gray-700/90 rounded-full p-3 md:p-4 shadow-lg hover:scale-110 active:scale-95 border border-gray-700"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Footer Section with Counter */}
              {data.achievements.length > 1 && (
                <div className="px-6 py-4 border-t border-gray-700 dark:border-gray-600 bg-gray-800/50 dark:bg-gray-900/50 flex justify-center">
                  <div className={`text-gray-400 text-sm font-medium transition-opacity duration-300 ${
                    isAnimating ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <span className="text-white font-semibold">{selectedImageIndex + 1}</span>
                    <span className="mx-2">/</span>
                    <span>{data.achievements.length}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Achievement;
