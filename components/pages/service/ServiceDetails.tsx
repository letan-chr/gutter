'use client';

import React from 'react';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const ServiceDetails = ({ slug }: { slug: string }) => {
  const { language: lang } = useLanguage();
  const data = getPageData('services', lang);
  
  const service = data.services.find((s: any) => s.slug === slug) || data.services[0];

  if (!service) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {lang === 'en' ? 'Service not found' : 'አገልግሎት አልተገኘም'}
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <a
            href="/service"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {lang === 'en' ? 'Back to Services' : 'ወደ አገልግሎቶች ተመለስ'}
          </a>

          {/* Service Header */}
          <div className="mb-12">
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 rounded-2xl overflow-hidden mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                  <svg className="w-32 h-32 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-6">
              {lang === 'en' ? 'Service Features' : 'የአገልግሎት ባህሪያት'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-tertiary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              {lang === 'en' ? 'Ready to Get Started?' : 'ለመጀመር ዝግጁ ነዎት?'}
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              {lang === 'en' 
                ? 'Contact us today for a free consultation and quote.' 
                : 'ለነጻ ምክክር እና ዋጋ ማግኘት ዛሬ ያግኙን።'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacts"
                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                {lang === 'en' ? 'Get Free Quote' : 'ነጻ ዋጋ ያግኙ'}
              </a>
              <a
                href="/contacts"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                {lang === 'en' ? 'Contact Us' : 'ያግኙን'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetails;
