"use client";
import Hero from "@/components/sections/Hero";
import WhyChooseus from "@/components/sections/WhyChooseus";

import Products from "@/components/sections/Products";
import Partners from "@/components/sections/Partners";
import Cta from "@/components/sections/Cta";
import Blog from "@/components/sections/Blog";
import Service from "@/components/sections/Service";
import About from "@/components/sections/About";
import {
  AboutContent,
  Feature,
  ServiceType,
  Blog as BlogType,
  Product,
  ProductCategory,
} from "@/types/types";
import { useEffect, useState } from "react";
import {
  getAllBlogs,
  getAllProductCategories,
  getAllProducts,
  getAllServices,
  getBatchData,
} from "@/api/Api";
import { resolveCoreValue } from "@/lib/resolvers/resolveCoreValue";
import { resolveAboutContent } from "@/lib/resolvers/resolveAbout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { resolveService } from "@/lib/resolvers/serviceResolver";
import { resolveBlog } from "@/lib/resolvers/blogResolver";
import { resolveProductCategory } from "@/lib/resolvers/productCategoryResolver";
import { resolveProduct } from "@/lib/resolvers/productResolver";

export default function Home() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
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

        // 🔹 Services
        const serviceResponse = await getAllServices();

        const resolvedServices = serviceResponse.data.map((service) =>
          resolveService(service, language)
        );

        setServices(resolvedServices);

        // 🔹 Blogs (no pagination)
        const blogResponse = await getAllBlogs();

        const resolvedBlogs = blogResponse.data.map((blog) =>
          resolveBlog(blog, language)
        );

        setBlogs(resolvedBlogs);

        // 🔹 Products & Categories
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          getAllProductCategories(),
        ]);

        // Resolve categories
        const resolvedCategories = categoriesRes.data.map((category) =>
          resolveProductCategory(category, language)
        );

        // Resolve products
        const resolvedProducts = productsRes.data.map((product) =>
          resolveProduct(product, language)
        );

        setProductCategories(resolvedCategories);
        setProducts(resolvedProducts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [language]);

  console.log("lang", language);

  return (
    <>
      <Hero />
      <About products={products} about={aboutContent} services={services} />

      <Service services={services} />
      <WhyChooseus />
      <Products products={products} productCategories={productCategories} />

      <Cta />
      <Blog blogs={blogs} />
      <Partners />
    </>
  );
}
