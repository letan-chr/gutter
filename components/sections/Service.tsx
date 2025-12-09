'use client';

import React from 'react';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Service = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData('service', lang);

  return (
    <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            {data.subtitle}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {data.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.services.map((service: any, index: number) => (
            <div
              key={service.id}
              className="group relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    {index + 1}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {service.description}
                </p>
                <a
                  href={`/service/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:gap-2 transition-all group/link"
                >
                  {lang === 'en' ? 'Learn More' : 'ተጨማሪ ይማሩ'}
                  <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Service;
