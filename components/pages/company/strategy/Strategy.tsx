'use client';

import React from 'react';
import Image from 'next/image';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Strategy = () => {
  const { language: lang } = useLanguage();
  const data = getPageData('strategy', lang);

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">


        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <div className="group relative bg-gradient-to-br from-primary/10 via-primary/5 to-white dark:from-primary/20 dark:via-primary/10 dark:to-gray-900 rounded-2xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 dark:border-primary/30">
            <div className="absolute top-6 right-6 w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  🎯
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white">
                  {data.mission.title}
                </h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {data.mission.description}
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative bg-gradient-to-br from-secondary/10 via-secondary/5 to-white dark:from-secondary/20 dark:via-secondary/10 dark:to-gray-900 rounded-2xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-secondary/20 dark:border-secondary/30">
            <div className="absolute top-6 right-6 w-20 h-20 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  👁️
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white">
                  {data.vision.title}
                </h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {data.vision.description}
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-12 text-center">
            {lang === 'en' ? 'Our Core Values' : 'የእኛ ዋና እሴቶች'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.coreValues.map((value: any, index: number) => (
              <div
                key={value.id}
                className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                {/* Icon Badge */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-display font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm lg:text-base">
                  {value.description}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/5 dark:bg-primary/10 rounded-full blur-2xl -z-10"></div>
              </div>
            ))}
          </div>
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
              {data.stats.map((stat: any) => (
                <div key={stat.id} className="group relative">
                  <div className="backdrop-blur-sm bg-white/10 dark:bg-white/5 rounded-xl p-6 lg:p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:bg-white/15">
                    <div className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-white/90 text-sm lg:text-base font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Strategy;
