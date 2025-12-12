"use client";

import React from "react";
import { getSectionData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

const Feature = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData("feature", lang);

  return (
    <section className="py-10 lg:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-6">
        {/* HEADER */}
 

        {/* ===== FULL WIDTH DIAGONAL FEATURE CARD ===== */}
        <div
          className="
          relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl
          overflow-hidden border border-gray-200 dark:border-gray-700
          py-10 lg:py-12
        "
        >
          <div className="grid grid-cols-1 md:grid-cols-4">
            {data.features.map((feature: any, index: number) => (
              <div
                key={feature.id}
                className="relative flex flex-col items-center text-center px-10 py-8"
              >
                {/* DIAGONAL CUT DIVIDER (applies except last) */}
                {index < data.features.length - 1 && (
                  <div
                    className="
                    absolute top-0 right-0 h-full w-[1px] 
                    bg-gradient-to-b from-transparent via-gray-300 to-transparent 
                    dark:via-gray-600
                    rotate-[20deg] origin-top
                    translate-x-7
                  "
                  />
                )}

                {/* ICON */}
                <div className="text-4xl mb-4 text-primary">{feature.icon}</div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
