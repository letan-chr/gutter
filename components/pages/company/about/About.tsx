'use client';

import React from 'react';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const About = () => {
  const { language: lang } = useLanguage();
  const data = getPageData('about', lang);

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
              {data.content.mission.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {data.content.mission.description}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-2xl p-8">
            <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
              {data.content.vision.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {data.content.vision.description}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center">
            {data.content.values.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.content.values.items.map((value: string, index: number) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-tertiary/20 dark:bg-tertiary/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-tertiary">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{value}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {data.content.history.title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {data.content.history.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
