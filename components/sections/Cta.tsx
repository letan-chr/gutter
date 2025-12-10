'use client';

import React from 'react';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface CtaData {
  title: string;
  description: string;
  button: string;
  buttonSecondary: string;
}

const Cta: React.FC = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData<CtaData>('cta', lang);

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-10 rounded-3xl overflow-hidden bg-orange-500 text-white relative">
      {/* Background Decorative Gradient Circles - Half circles on the right */}
      <div className="absolute right-0 top-0 h-full w-[50%] flex items-center justify-center overflow-hidden">
        <div className="absolute w-[450px] h-[450px] rounded-full bg-orange-400 opacity-50 -right-[225px]"></div>
        <div className="absolute w-[350px] h-[350px] rounded-full bg-orange-300 opacity-60 -right-[175px]"></div>
        <div className="absolute w-[250px] h-[250px] rounded-full bg-orange-200 opacity-70 -right-[125px]"></div>
        <div className="absolute w-[150px] h-[150px] rounded-full bg-orange-100 opacity-80 -right-[75px]"></div>
      </div>

      {/* Content */}
      <div className="px-14 py-24 relative z-10 max-w-[550px]">
        <h1 className="text-4xl font-extrabold leading-tight">{data.title}</h1>
        <p className="mt-3 text-sm text-white/90">
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
    </div>
  );
};

export default Cta;
