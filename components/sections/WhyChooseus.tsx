'use client';

import React from 'react';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const WhyChooseus = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData('whyChooseus', lang);

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-6">
              <span className="text-primary dark:text-primary-light font-semibold text-sm">
                {lang === 'en' ? 'Why Choose Us' : 'ለምን እኛን'}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {data.title}
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {data.subtitle}
            </p>
            
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10">
              {data.description}
            </p>

            {/* Reasons List */}
            <div className="space-y-6">
              {data.reasons.map((reason: any, index: number) => (
                <div
                  key={reason.id}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/10 dark:from-primary/20 dark:via-secondary/20 dark:to-tertiary/20 rounded-3xl p-8 lg:p-12">
              {/* Decorative Circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 dark:bg-primary/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/20 dark:bg-secondary/30 rounded-full blur-2xl"></div>
              
              {/* Stats Cards */}
              <div className="relative grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-primary dark:text-primary-light mb-2">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === 'en' ? 'Years' : 'ዓመታት'}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-secondary dark:text-secondary-light mb-2">1000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === 'en' ? 'Projects' : 'ፕሮጀክቶች'}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg col-span-2">
                  <div className="text-4xl font-bold text-tertiary dark:text-tertiary-light mb-2">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === 'en' ? 'Happy Clients' : 'ደስ የሚሉ ደንበኞች'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseus;
