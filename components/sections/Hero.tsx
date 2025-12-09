'use client';

import React from 'react';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Hero = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData('hero', lang);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 dark:from-gray-900/90 dark:via-gray-800/85 dark:to-gray-900/90"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 animate-pulse"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-tertiary/15 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Content Container */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge with Glassmorphism */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full mb-8 border border-white/20 shadow-lg animate-slide-up">
            <span className="text-sm font-semibold text-white dark:text-gray-100">
              {lang === 'en' ? 'Professional Gutter Solutions' : 'ሙያዊ የጋተር መፍትሄዎች'}
            </span>
          </div>

          {/* Main Heading with Text Shadow */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-tight drop-shadow-2xl animate-slide-up">
            <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {data.title}
            </span>
          </h1>

          {/* Description with Glassmorphism */}
          <div className="inline-block px-6 py-4 mb-10 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl animate-slide-up">
            <p className="text-xl sm:text-2xl text-gray-100 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
              {data.description}
            </p>
          </div>

          {/* CTA Buttons with Enhanced Styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up">
            <a
              href="/contacts"
              className="group relative w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 hover:scale-110 transform overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {data.cta.primary}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="/company/about"
              className="group w-full sm:w-auto px-10 py-5 bg-white/10 dark:bg-white/5 backdrop-blur-md text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/20 dark:hover:bg-white/10 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-110 transform"
            >
              {data.cta.secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/70 uppercase tracking-wider font-semibold">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
