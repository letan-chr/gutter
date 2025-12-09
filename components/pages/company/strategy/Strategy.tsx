'use client';

import React from 'react';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Strategy = () => {
  const { language: lang } = useLanguage();
  const data = getPageData('strategy', lang);

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

        {/* Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {data.strategies.map((strategy: any, index: number) => (
            <div
              key={strategy.id}
              className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              {/* Number Badge */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {index + 1}
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {strategy.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {strategy.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 dark:bg-primary/10 rounded-full blur-2xl -z-10"></div>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center">
            {lang === 'en' ? 'Our Strategic Process' : 'የእኛ ስትራቴጂክ ሂደት'}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {['Plan', 'Execute', 'Monitor', 'Improve'].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {lang === 'en' ? step : ['ዕቅድ', 'መፈጸም', 'መከታተል', 'ማሻሻል'][index]}
                  </h4>
                </div>
                {index < 3 && (
                  <div className="hidden md:block w-8 h-0.5 bg-primary"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Strategy;
