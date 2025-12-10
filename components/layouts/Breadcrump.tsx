'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getLayoutData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface BreadcrumpProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

const Breadcrump = ({ 
  backgroundImage, 
  title, 
  
  subtitle 
}: BreadcrumpProps = {}) => {
  const pathname = usePathname();
  const { language: lang } = useLanguage();
  const data = getLayoutData('breadcrumb', lang);

  // Generate breadcrumb items from pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    { label: data.home, href: '/' },
    ...pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { label, href };
    }),
  ];

  // Use provided title or generate from last breadcrumb item
  const displayTitle = title || breadcrumbItems[breadcrumbItems.length - 1]?.label || '';
  const displaySubtitle = subtitle || '';

  return (
    <section 
      className="relative overflow-hidden"
      style={{
        minHeight: backgroundImage ? '400px' : '280px',
      }}
    >
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/80 to-gray-900/85 dark:from-gray-900/90 dark:via-gray-800/85 dark:to-gray-900/90"></div>
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-50"></div>
        </div>
      )}

      {/* Decorative Graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <polygon points="200,50 350,200 200,350 50,200" fill="currentColor" className="text-primary">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 200 200;360 200 200"
                dur="20s"
                repeatCount="indefinite"
              />
            </polygon>
          </svg>
        </div>
        
        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-5">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            <circle cx="150" cy="150" r="120" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
              <animate
                attributeName="r"
                values="120;140;120"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
              {breadcrumbItems.map((item, index) => (
                <li key={item.href} className="flex items-center group">
                  {index > 0 && (
                    <svg 
                      className="mx-2 w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary-light transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {index === breadcrumbItems.length - 1 ? (
                    <span className="text-white dark:text-gray-100 font-semibold px-3 py-1.5 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-200 dark:text-gray-300 hover:text-white dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/20 transition-all duration-300 group/item"
                    >
                      <span className="flex items-center gap-1.5">
                        {index === 0 && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        )}
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Title and Subtitle Section */}
          {(displayTitle || displaySubtitle) && (
            <div className="space-y-4 animate-slide-up">
              {displayTitle && (
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight drop-shadow-2xl">
                  <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    {displayTitle}
                  </span>
                </h1>
              )}
              
              {displaySubtitle && (
                <div className="inline-block px-6 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/20 shadow-lg max-w-3xl">
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-100 dark:text-gray-200 font-medium leading-relaxed">
                    {displaySubtitle}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden z-5">
        <svg 
          className="absolute bottom-0 w-full h-full" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="none"
        >
          <path 
            d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z" 
            fill="currentColor" 
            className="text-white dark:text-gray-900"
            opacity="0.1"
          >
            <animate
              attributeName="d"
              values="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z;M0,60 C300,80 600,40 900,60 C1050,70 1150,50 1200,60 L1200,120 L0,120 Z;M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      {/* Fallback Background (when no image provided) */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      )}
    </section>
  );
}

export default Breadcrump;
