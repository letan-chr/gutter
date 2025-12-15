'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

const Partners = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData('partners', lang);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Duplicate partners for seamless infinite loop
  const duplicatedPartners = [...data.partners, ...data.partners, ...data.partners];

  return (
    <section className="py-12 lg:py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


        {/* Partners Swiper */}
        <div className="relative" data-aos="fade-up">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 32,
              },
            }}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              stopOnLastSlide: false,
            }}
            loop={true}
            loopAdditionalSlides={data.partners.length}
            speed={10000}
            freeMode={false}
            allowTouchMove={false}
            className="partners-swiper"
          >
            {duplicatedPartners.map((partner: any, index: number) => (
              <SwiperSlide key={`${partner.id}-${index}`}>
                <div className="group relative flex items-center justify-center h-24 md:h-28 lg:h-32 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200/60 dark:border-gray-700/60 shadow-md hover:shadow-2xl hover:border-primary/40 dark:hover:border-primary-light/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden backdrop-blur-sm">
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Logo Image */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                    {imageErrors[partner.id] ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {partner.name}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={() => {
                          setImageErrors((prev) => ({ ...prev, [partner.id]: true }));
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Partners;
