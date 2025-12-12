'use client';

import React from 'react';
import Image from 'next/image';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { TrendingUp, Clock, RefreshCw, Smile, Lock, Scale } from 'lucide-react';

const WhyChooseus = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData('whyChooseus', lang);

  // Icon mapping for each reason
  const iconMap: Record<number, React.ReactNode> = {
    1: <TrendingUp className="w-8 h-8" />,
    2: <Clock className="w-8 h-8" />,
    3: <RefreshCw className="w-8 h-8" />,
    4: <Smile className="w-8 h-8" />,
    5: <Lock className="w-8 h-8" />,
    6: <Scale className="w-8 h-8" />,
  };

  // Calculate positions for 6 cards in a circle
  // Each card is positioned at 60-degree intervals (360/6 = 60)
  const radius = 320; // Distance from center
  const getCardPosition = (index: number) => {
    const angle = (index * 60 - 90) * (Math.PI / 180); // Start from top (-90 degrees)
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle: index * 60 };
  };

  return (
    <section className="pt-2 pb-12 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Image from Local */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("/assets/images/image1.jpg")`,
            transform: 'rotate(-25deg) scale(1.2)',
            transformOrigin: 'center',
          }}
        ></div>
        {/* Black Backdrop Overlay */}
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Title Section */}
        <div className="text-center pt-2 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
            {data.title}
          </h2>
        </div>

        {/* Circular Layout Container */}
        <div className="hidden lg:block relative w-full max-w-6xl mx-auto" style={{ minHeight: '700px', paddingBottom: '100px' }}>
          {/* Central Logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden shadow-2xl">
              <Image 
                src="/assets/images/logo/logo.jpg" 
                alt="Gutter Share Company Logo" 
                width={320} 
                height={320} 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Rotating Container for Cards */}
          <div 
            className="absolute top-1/2 left-1/2"
            style={{
              width: '0',
              height: '0',
              animation: 'rotateCircle 30s linear infinite',
              transform: 'translate(-50%, -50%)',
            }}
          >
            
            {/* Six Points Arranged in Circle */}
            {data.reasons.map((reason: any, index: number) => {
              const { x, y } = getCardPosition(index);
              return (
                <div
                  key={reason.id}
                  className="absolute z-10 group"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    width: '260px',
                    transform: 'translate(-50%, -50%)',
                    transformOrigin: 'center',
                    animation: 'counterRotate 30s linear infinite',
                  }}
                >
                  <div 
                    className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700"
                  >
                    {/* Icon */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-secondary dark:text-secondary-light flex-shrink-0 mt-1">
                        {iconMap[reason.id]}
                      </div>
                      <h3 className="text-lg font-display font-bold text-secondary dark:text-secondary-light group-hover:text-secondary-dark dark:group-hover:text-secondary transition-colors leading-tight">
                        {reason.title}
                      </h3>
                    </div>
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-11">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid for Mobile/Tablet */}
        <div className="lg:hidden mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.reasons.map((reason: any) => (
            <div
              key={reason.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-secondary dark:text-secondary-light flex-shrink-0 mt-1">
                  {iconMap[reason.id]}
                </div>
                <h3 className="text-lg font-display font-bold text-secondary dark:text-secondary-light leading-tight">
                  {reason.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-11">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseus;
