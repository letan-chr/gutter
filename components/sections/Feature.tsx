'use client';

import React from 'react';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Feature = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData('feature', lang);

  return (
    <section className="py-10 lg:py-12 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">
            {data.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.description}
          </p>
        </div>

        {/* Features - Compact Horizontal Layout */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-12">
          {data.features.map((feature: any, index: number) => (
            <div
              key={feature.id}
              className="flex items-center gap-3"
            >
              {/* Icon */}
              <div className="text-xl">
                {feature.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-sm font-display font-semibold text-gray-900 dark:text-white leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Feature;
