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
        <div className="space-y-0">
          {data.services.map((service: any, i: number) => {
            const isEven = i % 2 === 0;
            
            return (
              <div key={service.id}>
                {/* Diagonal Separator */}
                {i > 0 && (
                  <div className="relative h-6 lg:h-10 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gray-50 dark:bg-gray-900"
                      style={{
                        clipPath: isEven 
                          ? 'polygon(0 0, 100% 0, 100% 100%, 0 85%)'
                          : 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)'
                      }}
                    ></div>
                  </div>
                )}
                
                <div className="w-full bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative group">
                  {/* Decorative Background Graphics */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                      backgroundSize: '50px 50px',
                    }}></div>
                    
                    {/* Geometric Shapes */}
                    <div className={`absolute ${isEven ? 'top-10 right-10' : 'top-10 left-10'} w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse`}></div>
                    <div className={`absolute ${isEven ? 'bottom-20 left-20' : 'bottom-20 right-20'} w-24 h-24 bg-secondary/20 rounded-full blur-2xl`} style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Animated Border Gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 bg-[length:200%_200%] animate-gradient-x"></div>
                  </div>

                  {/* Floating Decorative Elements */}
                  <div className={`absolute ${isEven ? 'top-0 right-0' : 'top-0 left-0'} w-64 h-64 opacity-10 pointer-events-none`}>
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="80" fill={`url(#gradient-${i})`} className="text-primary" />
                      <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
                    {/* Content Section - col-7 */}
                    <div className={`relative p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      {/* Decorative Accent Line */}
                      <div className={`absolute ${isEven ? 'left-0' : 'right-0'} top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary opacity-30`}></div>
                      
                      {/* Content Background Pattern */}
                      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                          backgroundSize: '30px 30px',
                        }}></div>
                      </div>

                      <div className="relative z-10">
                        {/* Decorative Icon/Shape */}
                        <div className="absolute -top-4 -left-4 w-20 h-20 opacity-10 pointer-events-none">
                          <div className="w-full h-full bg-primary rounded-full blur-xl"></div>
                        </div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
                          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {service.title}
                          </span>
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-lg lg:text-xl leading-relaxed mb-8 relative z-10">
                          {service.description}
                        </p>

                        <a
                          href={`/service/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:from-primary-dark hover:to-primary transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl w-fit text-lg relative z-10 group/btn"
                        >
                          {lang === "en" ? "Learn More" : "ተጨማሪ ይማሩ"}
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Image Section - col-5 */}
                    <div className={`relative flex items-center justify-center p-8 lg:p-12 lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} bg-gradient-to-br from-gray-100/50 to-transparent dark:from-gray-900/50`}>
                      {/* Decorative Background Circles */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className={`absolute ${isEven ? 'top-1/4 right-1/4' : 'top-1/4 left-1/4'} w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse`} style={{ animationDelay: `${i * 0.5}s` }}></div>
                        <div className={`absolute ${isEven ? 'bottom-1/4 left-1/4' : 'bottom-1/4 right-1/4'} w-32 h-32 bg-secondary/10 rounded-full blur-xl`}></div>
                      </div>

                      <div className="relative w-full aspect-square max-w-md mx-auto z-10">
                        {/* Animated Ring Around Image */}
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20 dark:border-primary/30 animate-spin-slow" style={{ animationDuration: '20s' }}></div>
                        <div className="absolute inset-4 rounded-full border-2 border-secondary/20 dark:border-secondary/30 animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                        
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                        
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full rounded-full object-cover shadow-2xl ring-4 ring-primary/20 dark:ring-primary/30 relative z-10 group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to a placeholder if image fails to load
                            e.currentTarget.src = `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop`;
                          }}
                        />
                      </div>
                    </div>
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
