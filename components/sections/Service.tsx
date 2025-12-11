"use client";

import React from "react";
import { getSectionData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

const Service = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData("service", lang);

  return (
    <section className="py-12 lg:py-12 bg-gray-50 dark:bg-gray-900 relative ">
      <div className="mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {data.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-4 text-lg">
            {data.description}
          </p>
        </div>

        {/* STACKED SERVICE CARDS */}
        <div className="relative space-y-16 ">
          {data.services.map((service: any, i: number) => (
            <div
              key={service.id}
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
              <div className="grid grid-cols-12 gap-6 p-10 items-center relative z-20">
                {/* LEFT TEXT (7/12 width) */}
                <div className="col-span-12 md:col-span-7">
                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <a
                    href={`/service/${service.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition"
                  >
                    {lang === "en" ? "Learn More" : "ተጨማሪ ይማሩ"}
                  </a>
                </div>

                {/* RIGHT IMAGE CIRCLE (5/12 width) */}
                <div className="col-span-12 md:col-span-5 flex justify-center md:justify-end relative">
                  <div
                    className="
                    w-64 h-64 rounded-full overflow-hidden shadow-xl
                    border-[5px] border-white dark:border-gray-900
                    relative right-[-40px]   /* pushes image into curve */
                  "
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
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
