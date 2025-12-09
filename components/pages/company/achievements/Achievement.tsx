'use client';

import React from 'react';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Achievement = () => {
  const { language: lang } = useLanguage();
  const data = getPageData('achievement', lang);

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

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {data.achievements.map((achievement: any) => (
            <div
              key={achievement.id}
              className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              {/* Icon */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>

              {/* Content */}
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-primary dark:text-primary-light mb-3">
                {achievement.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {achievement.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 dark:bg-primary/10 rounded-full blur-2xl -z-10"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary via-secondary to-tertiary rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl font-display font-bold mb-8">
            {lang === 'en' ? 'Our Journey in Numbers' : 'በቁጥሮች ውስጥ ጉዞዎቻችን'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">10+</div>
              <div className="text-white/90">
                {lang === 'en' ? 'Years' : 'ዓመታት'}
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">1000+</div>
              <div className="text-white/90">
                {lang === 'en' ? 'Projects' : 'ፕሮጀክቶች'}
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/90">
                {lang === 'en' ? 'Clients' : 'ደንበኞች'}
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">50+</div>
              <div className="text-white/90">
                {lang === 'en' ? 'Team Members' : 'የቡድን አባላት'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievement;
