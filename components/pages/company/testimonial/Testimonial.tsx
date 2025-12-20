"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getPageData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Feature, Stat, Testimonial as TestimonialType } from "@/types/types";
import { getAllTestimonials, getBatchData } from "@/api/Api";
import { resolveTestimonial } from "@/lib/resolvers/testimonialResolver";
import { resolveStat } from "@/lib/resolvers/resolveStats";

const Testimonial = () => {
  const { language: lang } = useLanguage();
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const data = getPageData("testimonials", lang);

  useEffect(() => {
    const features: Feature[] = [{ name: "about_statistic", amount: 4 }];

    async function loadTestimonials() {
      const data = await getBatchData(features);
      const response = await getAllTestimonials();

      const resolved = response.data.map((t) => resolveTestimonial(t, lang));

      setTestimonials(resolved);

      const rawStats = data.about_statistic?.data ?? [];

      const resolvedStats = rawStats.map((stat) => resolveStat(stat, lang));

      setStats(resolvedStats);
    }

    loadTestimonials();
  }, [lang]);

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial: TestimonialType) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(Number(testimonial.rating) || 0)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg italic">
                "{testimonial.description}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-primary dark:text-primary-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Stats Style */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Stats background"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/70 dark:bg-black/80"></div>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
          </div>

          {/* Content */}
          <div className="relative p-8 lg:p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-10 lg:mb-12">
              {lang === "en"
                ? "Join Our Happy Customers"
                : "ደስ የሚሉ ደንበኞቻችንን ይቀላቀሉ"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-8">
              {stats.slice(0, 4).map((s) => (
                <div key={s.id} className="group relative">
                  <div className="backdrop-blur-sm bg-white/10 dark:bg-white/5 rounded-xl p-6 lg:p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:bg-white/15">
                    <div className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                      {s.value}
                    </div>
                    <div className="text-white/90 text-sm lg:text-base font-medium">
                      {s.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/90 mb-8 text-lg">
              {lang === "en"
                ? "Experience the quality service that our customers love."
                : "ደንበኞቻችን የሚወዱትን የጥራት አገልግሎት ይሞክሩ።"}
            </p>
            <a
              href="/contacts"
              className="inline-block px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors hover:scale-105 active:scale-95"
            >
              {lang === "en" ? "Get Started Today" : "ዛሬ ይጀምሩ"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
