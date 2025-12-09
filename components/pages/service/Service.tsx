'use client';

import React from 'react';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Service = () => {
  const { language: lang } = useLanguage();
  const data = getPageData('services', lang);

  // Service icons mapping
  const serviceIcons = [
    <svg key="install" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>,
    <svg key="repair" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    <svg key="maintenance" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg key="cleaning" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>,
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Enhanced Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-6 border border-primary/20">
            <span className="text-sm font-semibold text-primary dark:text-primary-light">
              {data.subtitle}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              {data.title}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {data.description}
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12">
          {data.services.map((service: any, index: number) => (
            <div
              key={service.id}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-200 dark:border-gray-700"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative Corner Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Service Header with Icon */}
              <div className="relative h-72 bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/10 dark:from-primary/20 dark:via-secondary/20 dark:to-tertiary/20 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                  }}></div>
                </div>

                {/* Floating Orbs */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-150"></div>

                {/* Icon Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Icon Background Circle */}
                    <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className="relative w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-4 border-primary/20 dark:border-primary/30">
                      <div className="text-primary dark:text-primary-light transform group-hover:scale-110 transition-transform duration-500">
                        {serviceIcons[index % serviceIcons.length]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-primary/20 dark:border-primary/30">
                  <span className="text-lg font-bold text-primary dark:text-primary-light">0{index + 1}</span>
                </div>
              </div>

              {/* Service Content */}
              <div className="relative p-8">
                {/* Title */}
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-lg">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature: string, featureIndex: number) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 group/feature"
                      style={{ animationDelay: `${featureIndex * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-tertiary to-tertiary-dark flex items-center justify-center shadow-lg group-hover/feature:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={`/service/${service.slug}`}
                  className="group/cta relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {lang === 'en' ? 'Learn More' : 'ተጨማሪ ይማሩ'}
                    <svg className="w-5 h-5 transform group-hover/cta:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 dark:group-hover:border-primary/20 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 relative">
          <div className="bg-gradient-to-r from-primary via-primary-dark to-primary rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                {lang === 'en' ? 'Ready to Get Started?' : 'ለመጀመር ዝግጁ ነዎት?'}
              </h3>
              <p className="text-xl mb-8 text-white/90">
                {lang === 'en' 
                  ? 'Contact us today for a free consultation and quote' 
                  : 'ዛሬ ለነጻ ምክክር እና የዋጋ ግምት ያግኙን'}
              </p>
              <a
                href="/contacts"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform shadow-xl"
              >
                {lang === 'en' ? 'Contact Us' : 'ያግኙን'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
