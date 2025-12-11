"use client";

import React from "react";
import { getSectionData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

const About = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData("about", lang);

  return (
    <section className="py-12 lg:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-6 ">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h2>
        
        </div>

        {/* Three Column Card - Content | Image | Content */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Content Column (col-4) */}
            <div className="md:col-span-4 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {data.leftContent.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg leading-relaxed">
                {data.leftContent.description}
              </p>
            </div>

            {/* Image Column (col-4) */}
            <div className="md:col-span-4 relative h-64 md:h-auto overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop`;
                }}
              />
              {/* Overlay gradient for better visual separation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent"></div>
            </div>

            {/* Right Content Column (col-4) */}
            <div className="md:col-span-4 p-8 lg:p-12 flex flex-col justify-center bg-gray-900 dark:bg-gray-950">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                {data.rightContent.title}
              </h3>
              <p className="text-gray-200 dark:text-gray-300 text-base lg:text-lg leading-relaxed">
                {data.rightContent.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
