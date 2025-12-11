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
        <div className="space-y-12">
          {data.services.map((service: any, i: number) => {
            // Always alternate: even index = content left/image right, odd index = image left/content right
            const imageOnLeft = i % 2 === 1;
            // Alternating theme: even index = light, odd index = dark
            const isDarkCard = i % 2 === 1;
            
            return (
              <div
                key={service.id}
                className={`relative w-full rounded-3xl overflow-hidden shadow-xl ${
                  isDarkCard ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 items-stretch relative`}
                >
                  {/* CONTENT */}
                  <div
                    className={`relative p-10 lg:p-14 lg:col-span-6 flex flex-col justify-center
                    ${imageOnLeft ? "lg:order-2" : "lg:order-1"}`}
                  >
                    {/* Soft Gradient Background */}
                    <div className={`absolute inset-0 opacity-60 ${
                      isDarkCard 
                        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
                    }`}></div>

                    {/* ARC SHAPE touching the S-divider */}
                    <div
                      className={`absolute top-0 bottom-0 
                      ${imageOnLeft ? "left-[-120px]" : "right-[-120px]"} 
                      w-[240px] bg-primary/10 rounded-full blur-xl`}
                    ></div>

                    <div className="relative z-10">
                      <h3 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                        {service.title}
                      </h3>

                      <p className={`text-lg leading-relaxed mb-4 ${
                        isDarkCard ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {service.description}
                      </p>

                      {service.content && (
                        <p className={`text-base leading-relaxed mb-8 ${
                          isDarkCard ? 'text-gray-400' : 'text-gray-700'
                        }`}>
                          {service.content}
                        </p>
                      )}

                      <a
                        href={`/service/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-all"
                      >
                        {lang === "en" ? "Learn More" : "ተጨማሪ ይማሩ"}
                      </a>
                    </div>
                  </div>

                  {/* IMAGE SIDE */}
                  <div
                    className={`relative flex items-center ${imageOnLeft ? "justify-start" : "justify-end"} p-10 lg:p-14 lg:col-span-6 h-full
                    ${imageOnLeft ? "lg:order-1" : "lg:order-2"}`}
                  >
                    {/* BACK ARC touching image */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 
                      ${imageOnLeft ? "left-0 -translate-x-1/3" : "right-0 translate-x-1/3"} 
                      w-[300px] h-[300px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px] xl:w-[440px] xl:h-[440px] 2xl:w-[480px] 2xl:h-[480px] border-[14px] border-primary/20 rounded-full`}
                    ></div>

                    {/* S SHAPE (curved separator) */}
                    <div
                      className={`absolute inset-y-0 
                      ${imageOnLeft ? "right-0" : "left-0"}
                      w-28 bg-gradient-to-b from-primary/10 to-secondary/10
                      [clip-path:polygon(0%_0%,100%_15%,100%_85%,0%_100%)]`}
                    ></div>

                    {/* IMAGE - Scales proportionally with card height */}
                    <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] lg:min-h-[340px] xl:w-[380px] xl:h-[380px] xl:min-h-[380px] 2xl:w-[420px] 2xl:h-[420px] 2xl:min-h-[420px] flex-shrink-0 my-auto">
                      {/* glowing ring */}
                      <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-spin-slow"></div>

                      {/* inner ring */}
                      <div className="absolute inset-6 rounded-full border-2 border-secondary/30 animate-spin-slow" style={{ animationDirection: "reverse" }}></div>

                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-full shadow-xl ring-4 ring-primary/20"
                        loading="lazy"
                      />
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
