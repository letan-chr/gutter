'use client';

import React from 'react';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Service = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData('service', lang);

  return (
    <section className="py-12 lg:py-20 bg-gray-50 dark:bg-gray-900 relative">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* SERVICE CARDS - Full Width with Alternating Layout */}
        <div className="space-y-8 lg:space-y-12">
          {data.services.map((service: any, i: number) => {
            const isEven = i % 2 === 0;
            
            return (
              <div
                key={service.id}
                className="w-full bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Content Section - col-7 */}
                  <div className={`relative p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    {/* Service Number Badge */}
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full mb-6 border-2 border-primary/30">
                      <span className="text-2xl font-bold text-primary dark:text-primary-light">0{i + 1}</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-lg lg:text-xl leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <a
                      href={`/service/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105 transform shadow-lg w-fit text-lg"
                    >
                      {lang === "en" ? "Learn More" : "ተጨማሪ ይማሩ"}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>

                  {/* Image Section - col-5 */}
                  <div className={`relative h-64 lg:h-auto min-h-[400px] lg:min-h-[500px] overflow-hidden lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.currentTarget.src = `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop`;
                      }}
                    />
                    {/* Gradient Overlay for better text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/10 dark:to-gray-900/20 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 lg:mt-28 relative">
          <div className="bg-gradient-to-r from-primary via-primary-dark to-secondary rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden shadow-2xl">
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
