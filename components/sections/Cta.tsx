'use client';

import React from 'react';
import Image from 'next/image';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useTheme } from '@/components/providers/ThemeProvider';

interface CtaData {
  title: string;
  description: string;
  button: string;
  buttonSecondary: string;
}

const Cta: React.FC = () => {
  const { language: lang } = useLanguage();
  const { theme } = useTheme();
  const data = getSectionData<CtaData>('cta', lang);

  return (
    <section className="w-full py-12 lg:py-12 mx-auto rounded-md overflow-hidden text-white relative">
      {/* Background Image for the card */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay for better text readability */}
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/80' : 'bg-gradient-to-r from-orange-600/90 to-orange-500/70'}`}></div>
      </div>

      {/* Background Decorative Gradient Circles - Half circles on the right */}
      <div className="absolute right-0 top-0 h-full w-[50%] flex items-center justify-center overflow-hidden">
        <div className="absolute w-[450px] h-[450px] rounded-full bg-orange-400 opacity-50 -right-[225px]"></div>
        <div className="absolute w-[350px] h-[350px] rounded-full bg-orange-300 opacity-60 -right-[175px]"></div>
        <div className="absolute w-[250px] h-[250px] rounded-full bg-orange-200 opacity-70 -right-[125px]"></div>
        <div className="absolute w-[150px] h-[150px] rounded-full bg-orange-100 opacity-80 -right-[75px]"></div>
      </div>

      {/* Content */}
      <div className="px-14 py-24 relative z-10 max-w-[550px]">
        <h1 className="text-5xl font-extrabold leading-tight text-white">{data.title}</h1>
        <p className="mt-3 text-base text-white">
          {data.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            className="px-8 py-3 rounded-full bg-black flex items-center gap-3 text-white font-medium"
            type="button"
          >
            {data.button}
            <span className="w-4 h-4 rounded-full bg-white block"></span>
          </button>
          <button
            className="px-8 py-3 rounded-full bg-black flex items-center gap-3 text-white font-medium"
            type="button"
          >
            {data.buttonSecondary}
            <span className="w-4 h-4 rounded-full bg-white block"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
