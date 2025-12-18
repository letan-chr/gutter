"use client";
import Hero from "@/components/sections/Hero";
import WhyChooseus from "@/components/sections/WhyChooseus";

import Products from "@/components/sections/Products";
import Partners from "@/components/sections/Partners";
import Cta from "@/components/sections/Cta";
import Blog from "@/components/sections/Blog";
import Service from "@/components/sections/Service";
import About from "@/components/sections/About";
import { AboutContent, Feature } from "@/types/types";
import { useEffect, useState } from "react";
import { getBatchData } from "@/api/Api";
import { resolveCoreValue } from "@/lib/resolvers/resolveCoreValue";
import { resolveAboutContent } from "@/lib/resolvers/resolveAbout";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Home() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const features: Feature[] = [{ name: "about_content", amount: 4 }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        const rawAbout = data.about_content?.data ?? null;
        if (!rawAbout) return;

        // 🔹 Resolve about content
        const resolvedAbout = resolveAboutContent(rawAbout, language);

        // 🔹 Resolve core values
        const resolvedCoreValues = resolvedAbout.core_values.map((cv) =>
          resolveCoreValue(cv, language)
        );

        setAboutContent({
          ...resolvedAbout,
          core_values: resolvedCoreValues,
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [language]);

  console.log("about", aboutContent);
  console.log("lang", language);

  return (
    <>
      <Hero />
      <About about={aboutContent} />

      <Service />
      <WhyChooseus />
      <Products />

      <Cta />
      <Blog />
      <Partners />
    </>
  );
}
