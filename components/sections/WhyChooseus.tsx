'use client';

import React from 'react';
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

  // Positions for circular arrangement (6 points around a circle)
  // Using CSS transforms for better circular positioning
  const positions = [
    { top: '5%', left: '50%', transform: 'translateX(-50%)' }, // Top
    { top: '20%', right: '8%', transform: 'translateX(0)' }, // Top-right
    { bottom: '20%', right: '8%', transform: 'translateX(0)' }, // Bottom-right
    { bottom: '5%', left: '50%', transform: 'translateX(-50%)' }, // Bottom
    { bottom: '20%', left: '8%', transform: 'translateX(0)' }, // Bottom-left
    { top: '20%', left: '8%', transform: 'translateX(0)' }, // Top-left
  ];

  return (
    <section className="bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Image from Unsplash - Subtle */}
      <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.15] pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop")`,
            transform: 'rotate(-25deg) scale(1.2)',
            transformOrigin: 'center',
          }}
        ></div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-black dark:text-white mb-4">
            {data.title}
          </h2>
        </div>

        {/* Circular Layout Container */}
        <div className="hidden lg:block relative w-full max-w-6xl mx-auto" style={{ minHeight: '700px', paddingTop: '100px', paddingBottom: '100px' }}>
          {/* Central Figure Area */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              {/* Circular Dark Blue Overlay */}
              <div className="w-72 h-72 xl:w-80 xl:h-80 rounded-full bg-secondary dark:bg-secondary-dark flex items-center justify-center relative overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                {/* Professional Figure Placeholder - You can replace this with an actual image */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-secondary-dark">
                  <div className="text-white text-center p-8">
                    <div className="w-40 h-40 xl:w-48 xl:h-48 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border-2 border-white/20">
                      <Scale className="w-20 h-20 xl:w-24 xl:h-24 text-white" />
                    </div>
                    <p className="text-base xl:text-lg font-semibold opacity-95">
                      {data.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Six Points Arranged in Circle */}
          {data.reasons.map((reason: any, index: number) => {
            const position = positions[index];
            return (
              <div
                key={reason.id}
                className="absolute z-10 group"
                style={{
                  ...position,
                  width: '260px',
                }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
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
