"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { getSectionData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Product as ProductType, ProductCategory } from "@/types/types";
import { getAllProductCategories, getAllProducts } from "@/api/Api";
import { resolveProductCategory } from "@/lib/resolvers/productCategoryResolver";
import { resolveProduct } from "@/lib/resolvers/productResolver";

const Product = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const { language: lang } = useLanguage();
  const data = getSectionData("products", lang);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all"
  );

  useEffect(() => {
    async function fetchData() {
      try {
        // 🔹 Products & Categories
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          getAllProductCategories(),
        ]);

        // Resolve categories
        const resolvedCategories = categoriesRes.data.map((category) =>
          resolveProductCategory(category, lang)
        );

        // Resolve products
        const resolvedProducts = productsRes.data.map((product) =>
          resolveProduct(product, lang)
        );

        setProductCategories(resolvedCategories);
        setProducts(resolvedProducts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [lang]);

  // Get categories from products (if they have category field, otherwise use 'all')
  const categories = useMemo(
    () =>
      [
        { id: "all", title: lang === "en" ? "All Products" : "ሁሉም ምርቶች" },
        ...productCategories.map((cat) => ({
          id: cat.id,
          title: cat.name,
        })),
      ] as const,
    [productCategories, lang]
  );

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;

    return products.filter(
      (product) => product.product_category_id === selectedCategory
    );
  }, [products, selectedCategory]);

  // Separate featured and normal products
  const featuredProducts = useMemo(() => {
    return filteredProducts.filter((product) => product.is_featured);
  }, [filteredProducts]);

  const normalProducts = useMemo(() => {
    return filteredProducts
      .filter((product) => !product.is_featured)
      .slice(0, 8);
  }, [filteredProducts]);

  // Latest products for sidebar
  const latestProducts = [...filteredProducts]
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 5);

  // Helper function to generate slug from title
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  // Category translation helper
  const getCategoryLabel = (category: string) => {
    if (category === "all") {
      return lang === "en" ? "All Products" : "ሁሉም ምርቶች";
    }
    return category;
  };

  return (
    <section className="py-12 lg:py-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Layout: Sidebar (col-4) + Content (col-8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - col-4 */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-8 space-y-8">
              {/* Latest Products List */}
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                data-aos="fade-right"
              >
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                  {lang === "en" ? "Latest Products" : "የቅርብ ጊዜ ምርቶች"}
                </h3>
                <div className="space-y-4">
                  {latestProducts.map((product: ProductType) => (
                    <a
                      key={product.id}
                      href={`/products/${
                        product.slug || generateSlug(product.name)
                      }`}
                      className="flex gap-3 group hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
                    >
                      {/* Left Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        {product.banner_image ? (
                          <Image
                            src={
                              product.banner_image
                                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`
                                : "https://images.unsplash.com/photo-1563453392212-326f5e854473"
                            }
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
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
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Right Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {lang === "en" ? "Comfortable Price" : "በተመጣጣኝ ዋጋ"}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Categories List */}
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                  {lang === "en" ? "Categories" : "ምድቦች"}
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                        selectedCategory === category.id
                          ? "bg-primary text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Design */}
              <div
                className="relative bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl overflow-hidden p-8 text-white"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="mb-4">
                    <svg
                      className="w-12 h-12 text-white/90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">
                    {lang === "en" ? "Need Help Choosing?" : "መምረጥ እርዳታ ይፈልጋሉ?"}
                  </h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    {lang === "en"
                      ? "Get expert advice and professional recommendations from our experienced team."
                      : "ከልምድ ያላቸው ቡድናችን የሙያ ምክር እና የሙያ ምክሮች ያግኙ።"}
                  </p>
                  <a
                    href="/contacts"
                    className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    {lang === "en" ? "Contact Us" : "እኛን ያግኙን"}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - col-8 */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            {/* Page Header */}
            <div className="mb-10" data-aos="fade-down">
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-3">
                {data.title || (lang === "en" ? "Our Products" : "የእኛ ምርቶች")}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {data.description ||
                  (lang === "en"
                    ? "Explore our comprehensive range of products designed for durability and performance."
                    : "የእኛን የምርቶች ስፋት ያስሱ")}
              </p>
            </div>

            {/* Featured Products Section - Two Cards in One Row, Image Top, Content Bottom */}
            {featuredProducts.length > 0 && (
              <div className="mb-12">
                <h2
                  className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-6"
                  data-aos="fade-up"
                >
                  {lang === "en" ? "Featured Products" : "የተመረጡ ምርቶች"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredProducts.map(
                    (product: ProductType, index: number) => (
                      <article
                        key={product.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                      >
                        {/* Top Image */}
                        <div className="relative h-48 overflow-hidden">
                          {product.banner_image ? (
                            <Image
                              src={
                                product.banner_image
                                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`
                                  : "https://images.unsplash.com/photo-1563453392212-326f5e854473"
                              }
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                              <svg
                                className="w-16 h-16 text-primary dark:text-primary-light"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Bottom Content */}
                        <div className="p-5 flex flex-col flex-1">
                          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                            {product.name}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed flex-1">
                            {product.description}
                          </p>

                          {/* CTA Link */}
                          <a
                            href={`/products/${
                              product.slug || generateSlug(product.name)
                            }`}
                            className="inline-flex items-center text-primary dark:text-primary-light font-semibold hover:gap-2 transition-all group/link"
                          >
                            {lang === "en" ? "View Details" : "ዝርዝሮች ይመልከቱ"}
                            <svg
                              className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </a>
                        </div>
                      </article>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Regular Products Section - Three Columns, Top Image, Bottom Content */}
            {normalProducts.length > 0 && (
              <div>
                <h2
                  className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-6"
                  data-aos="fade-up"
                >
                  {lang === "en" ? "Other Products" : "ሌሎች ምርቶች"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {normalProducts.map((product: ProductType, index: number) => (
                    <article
                      key={product.id}
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Top Image */}
                      <div className="relative h-48 overflow-hidden">
                        {product.banner_image ? (
                          <Image
                            src={
                              product.banner_image
                                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`
                                : "https://images.unsplash.com/photo-1563453392212-326f5e854473"
                            }
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                            <svg
                              className="w-16 h-16 text-primary dark:text-primary-light"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Bottom Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed flex-1">
                          {product.description}
                        </p>

                        {/* CTA Link */}
                        <a
                          href={`/products/${
                            product.slug || generateSlug(product.name)
                          }`}
                          className="inline-flex items-center text-primary dark:text-primary-light font-semibold hover:gap-2 transition-all group/link"
                        >
                          {lang === "en" ? "View Details" : "ዝርዝሮች ይመልከቱ"}
                          <svg
                            className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* No Products Message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {lang === "en"
                    ? "No products found in this category."
                    : "በዚህ ምድብ ውስጥ ምርቶች አልተገኙም።"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
