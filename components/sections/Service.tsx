"use client";

import React from "react";
import { getSectionData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ServiceType } from "@/types/types";

interface ServiceSectionProps {
  services: ServiceType[];
}

const Service = ({ services }: ServiceSectionProps) => {
  const { language: lang } = useLanguage();
  const data = getSectionData("service", lang);

  console.log("serviceData", services);

  return (
    <section className="py-12 lg:py-12 bg-gray-50 dark:bg-gray-900 relative ">
      <div className="mx-auto px-6">
        {/* Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-8"
          data-aos="fade-down"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {data.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-4 text-lg">
            {data.description}
          </p>
        </div>

        {/* STACKED SERVICE CARDS */}
        <div className="relative space-y-16 ">
          {services.slice(0, 6).map((service: ServiceType, i: number) => (
            <div
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className={`
                sticky top-32
                bg-white dark:bg-gray-800 shadow-2xl
                rounded-l-3xl rounded-r-full relative overflow-visible
                transition-all duration-500 hover:-translate-y-3
                z-[${50 - i}]
              `}
              style={{ marginTop: i * 65 }} // stack effect
            >
              {/* 🔥 RIGHT SIDE ARC SHAPE MATCHING IMAGE */}
              <div
                className="
                absolute right-0 top-0 bottom-0 w-[330px]
                bg-white dark:bg-gray-800
                rounded-l-[190px]
                shadow-inner
                pointer-events-none
              "
              ></div>

              {/* INNER GRID */}
              <div className="grid grid-cols-12 gap-0  items-center relative z-20 overflow-hidden">
                {/* LEFT TEXT (7/12 width) - Content Section with background image and diagonal transparent overlay */}
                <div className="col-span-12 md:col-span-7 relative min-h-[400px]">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-l-3xl"
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.banner_image})`,
                      clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
                    }}
                  ></div>

                  {/* Diagonal Black Backdrop Overlay (following diagonal shape) */}
                  <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
                    }}
                  ></div>

                  {/* Diagonal Line Separator - Full diagonal from top-right (image section) to bottom-left (content section) */}
                  <div
                    className="hidden md:block absolute z-30 pointer-events-none"
                    style={{
                      top: "0",
                      right: "15%",
                      width: "3px",
                      height: "100%",
                      background: "rgba(255,255,255,0.9)",
                      transform: "skewX(-12deg)",
                      transformOrigin: "top center",
                    }}
                  ></div>

                  {/* Content with relative positioning */}
                  <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4 drop-shadow-lg">
                      {service.title}
                    </h3>

                    <p className="text-gray-200 text-lg leading-relaxed mb-6 drop-shadow-md">
                      {service.short_description}
                    </p>

                    <a
                      href={`/service/${service.slug}`}
                      className="px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition inline-block shadow-lg w-fit"
                    >
                      {lang === "en" ? "Learn More" : "ተጨማሪ ይማሩ"}
                    </a>
                  </div>
                </div>

                {/* RIGHT IMAGE SECTION (5/12 width) */}
                <div className="col-span-12 md:col-span-5 relative z-20 min-h-[400px]">
                  {/* Image container covering the curved section */}
                  <div
                    className="absolute inset-0 overflow-hidden shadow-2xl"
                    style={{
                      clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.banner_image}`}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.currentTarget.src = `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop`;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
