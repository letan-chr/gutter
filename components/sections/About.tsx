"use client";

import React from "react";
import { getSectionData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { AboutContent, Product, ServiceType, Setup, Stat } from "@/types/types";

interface AboutSectionProps {
  about: AboutContent | null;
  services: ServiceType[];
  products: Product[];
}

const About = ({ about, services, products }: AboutSectionProps) => {
  const { language: lang } = useLanguage();
  const data = getSectionData("about", lang);

  return (
    <section className="py-8 lg:py-10 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-6 ">
        {/* Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-8"
          data-aos="fade-down"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
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
            <div className="md:col-span-4 p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850">
              <h3 className="text-xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {data.leftContent.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-xl leading-relaxed">
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
            <div className="md:col-span-4 p-6 lg:p-8 flex flex-col justify-center bg-gray-900 dark:bg-gray-950">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                {data.rightContent.title}
              </h3>

              {/* Intro paragraph */}
              {data.rightContent.intro && (
                <p className="text-gray-200 dark:text-gray-300 text-sm lg:text-base leading-relaxed mb-4">
                  {data.rightContent.intro}
                </p>
              )}

              {/* Services List */}
              {services.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-base font-semibold text-white mb-2">
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
                          <span className="text-sm lg:text-base">
                            {service.title}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Imported Items */}
              {products.length > 0 && (
                <div>
                  <h4 className="text-base font-semibold text-white mb-2">
                    {data.rightContent.importedItemsTitle ||
                      "Currently Imported Trade Items"}
                    :
                  </h4>
                  <ul className="space-y-2">
                    {products
                      .slice(0, 5)
                      .map((item: Product, index: number) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-200 dark:text-gray-300"
                        >
                          <span className="text-yellow-400 mr-3 mt-1">•</span>
                          <span className="text-sm lg:text-base">
                            {item.name}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Fallback for old structure */}
              {data.rightContent.description && !data.rightContent.intro && (
                <p className="text-gray-200 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
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
