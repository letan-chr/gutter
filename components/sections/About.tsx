"use client";

import React from "react";
import { getSectionData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { AboutContent, ServiceType, Setup, Stat } from "@/types/types";

interface AboutSectionProps {
  about: AboutContent | null;
  services: ServiceType[];
}

const About = ({ about, services }: AboutSectionProps) => {
  const { language: lang } = useLanguage();
  const data = getSectionData("about", lang);

  return (
    <section className="py-12 lg:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-6 ">
        {/* Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-12"
          data-aos="fade-down"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h2>
        </div>

        {/* Three Column Card - Content | Image | Content */}
        <div
          className="bg-white dark:bg-gray-800 shadow-2xl overflow-hidden"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Content Column (col-4) */}
            <div className="md:col-span-4 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {data.leftContent.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg leading-relaxed">
                {about?.text ? about?.text : data.leftContent.description}
              </p>
            </div>

            {/* Image Column (col-4) */}
            <div className="md:col-span-4 relative h-64 md:h-auto overflow-hidden">
              <img
                src={
                  about?.about_image
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${about?.about_image}`
                    : data.image
                }
                alt={data.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay gradient for better visual separation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent"></div>
            </div>

            {/* Right Content Column (col-4) */}
            <div className="md:col-span-4 p-8 lg:p-12 flex flex-col justify-center bg-gray-900 dark:bg-gray-950">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                {data.rightContent.title}
              </h3>

              {/* Intro paragraph */}
              {data.rightContent.intro && (
                <p className="text-gray-200 dark:text-gray-300 text-base lg:text-lg leading-relaxed mb-6">
                  {data.rightContent.intro}
                </p>
              )}

              {/* Services List */}
              {services.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    {data.rightContent.servicesTitle || "Our Services Include"}:
                  </h4>
                  <ul className="space-y-2">
                    {services
                      .slice(0, 5)
                      .map((service: ServiceType, index: number) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-200 dark:text-gray-300"
                        >
                          <span className="text-yellow-400 mr-3 mt-1">•</span>
                          <span className="text-base lg:text-lg">
                            {service.title}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Imported Items */}
              {data.rightContent.importedItems && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    {data.rightContent.importedItemsTitle ||
                      "Currently Imported Trade Items"}
                    :
                  </h4>
                  <ul className="space-y-2">
                    {data.rightContent.importedItems.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-200 dark:text-gray-300"
                        >
                          <span className="text-yellow-400 mr-3 mt-1">•</span>
                          <span className="text-base lg:text-lg">{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Fallback for old structure */}
              {data.rightContent.description && !data.rightContent.intro && (
                <p className="text-gray-200 dark:text-gray-300 text-base lg:text-lg leading-relaxed">
                  {data.rightContent.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
