'use client';

import React from 'react';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Partners = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData('partners', lang);

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-gray-900">
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

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {data.partners.map((partner: any) => (
            <div
              key={partner.id}
              className="group flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Placeholder for partner logo */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-primary dark:text-primary-light">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;
