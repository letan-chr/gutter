"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { getPageData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BlogCategory, Blog as BlogType, PaginationMeta } from "@/types/types";
import { getAllBlogCategories, getAllBlogsWithPagination } from "@/api/Api";
import { resolveBlog } from "@/lib/resolvers/blogResolver";
import { resolveBlogCategory } from "@/lib/resolvers/blogCategoryResolver";

const Blog = () => {
  const { language: lang } = useLanguage();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const data = getPageData("blog", lang);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          getAllBlogsWithPagination({
            page,
            per_page: 6,
          }),
          getAllBlogCategories(),
        ]);

        setBlogs(
          blogsRes.data.map((blog: BlogType) => resolveBlog(blog, lang))
        );
        setMeta(blogsRes.meta);
        setCategories(
          categoriesRes.data.map((cat: BlogCategory) =>
            resolveBlogCategory(cat, lang)
          )
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [page, selectedCategory, searchQuery, lang]);

  const categoryMap = useMemo(() => {
    const map = new Map<number, BlogCategory>();
    categories.forEach((cat) => {
      map.set(cat.id, cat);
    });
    return map;
  }, [categories]);

  const getCategoryTitle = (categoryId?: number) => {
    if (!categoryId) return "";
    return categoryMap.get(categoryId)?.title ?? "";
  };

  const filteredPosts = useMemo(() => {
    return blogs.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category?.id === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Get featured posts (first 2) and regular posts (rest)
  const featuredPosts = filteredPosts.filter((b) => b.is_featured);

  const regularPosts = filteredPosts.filter((b) => !b.is_featured);

  const latestPosts = [...filteredPosts]
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 5);

  return (
    <section className="py-12 lg:py-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Layout: Content (col-8) + Sidebar (col-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Content Section - col-8 */}
          <div className="lg:col-span-8">
            {/* Search Field */}
            <div className="mb-10" data-aos="fade-down">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                  <div className="flex items-center">
                    <div className="pl-6 pr-4">
                      <svg
                        className="w-6 h-6 text-gray-400 dark:text-gray-500 group-focus-within:text-primary dark:group-focus-within:text-primary-light transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder={
                        lang === "en"
                          ? "Search articles, topics, or keywords..."
                          : "ጽሁፎች፣ ርዕሶች ወይም ቁልፍ ቃላትን ይፈልጉ..."
                      }
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 py-5 pr-6 bg-transparent border-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Clear search"
                      >
                        <svg
                          className="w-5 h-5 text-gray-400 dark:text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Blog Cards - Full Width, Left Image, Right Content */}
            <div className="space-y-6 mb-12">
              {featuredPosts.map((post: any, index: number) => (
                <article
                  key={post.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left Image */}
                    <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
                      {post.banner_image ? (
                        <Image
                          src={
                            post.banner_image
                              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.banner_image}`
                              : "/placeholder.jpg"
                          }
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                          <svg
                            className="w-24 h-24 text-primary dark:text-primary-light"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Right Content */}
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                            />
                          </svg>
                          {getCategoryTitle(post.category?.id)}
                        </span>
                        <span className="text-gray-300 dark:text-gray-600">
                          •
                        </span>
                        <span>
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <a
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center text-primary dark:text-primary-light font-semibold hover:gap-2 transition-all group/link"
                      >
                        {lang === "en" ? "Read More" : "ተጨማሪ ያንብቡ"}
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
                  </div>
                </article>
              ))}
            </div>

            {/* Regular Blog Posts - Two Columns, Top Image, Bottom Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {regularPosts.map((post: BlogType, index: number) => (
                <article
                  key={post.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Top Image */}
                  <div className="relative h-48 overflow-hidden">
                    {post.banner_image ? (
                      <Image
                        src={
                          post.banner_image
                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.banner_image}`
                            : "/placeholder.jpg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Bottom Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span>
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">
                        •
                      </span>
                      <span>{getCategoryTitle(post.category?.id)}</span>
                    </div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <a
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center text-primary dark:text-primary-light font-medium text-sm hover:gap-1 transition-all group/link"
                    >
                      {lang === "en" ? "Read More" : "ተጨማሪ ያንብቡ"}
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
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

            {meta && meta.last_page > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>

                <span className="px-4 py-2">
                  Page {meta.current_page} of {meta.last_page}
                </span>

                <button
                  disabled={page === meta.last_page}
                  onClick={() =>
                    setPage((p) => Math.min(meta.last_page, p + 1))
                  }
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {/* No Results Message */}
            {regularPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {lang === "en"
                    ? "No Regular posts found."
                    : "ተራ ልጥፎች አልተገኙም።"}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - col-4 */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-8">
              {/* Latest Blog Posts List */}
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                data-aos="fade-left"
              >
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                  {lang === "en" ? "Latest Posts" : "የቅርብ ጊዜ ልጥፎች"}
                </h3>
                <div className="space-y-4">
                  {latestPosts.map((post: BlogType) => (
                    <a
                      key={post.id}
                      href={`/blogs/${post.slug}`}
                      className="flex gap-3 group hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
                    >
                      {/* Left Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        {post.banner_image ? (
                          <Image
                            src={
                              post.banner_image
                                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.banner_image}`
                                : "/placeholder.jpg"
                            }
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Right Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Categories List */}
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                  {lang === "en" ? "Categories" : "ምድቦች"}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setPage(1);
                    }}
                  >
                    {lang === "en" ? "All Categories" : "ሁሉም ምድቦች"}
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setPage(1);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === category.id
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amazing CTA Design */}
              <div
                className="relative bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl overflow-hidden p-8 text-white"
                data-aos="fade-left"
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
                    {lang === "en"
                      ? "Need Professional Help?"
                      : "የሙያ እርዳታ ይፈልጋሉ?"}
                  </h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    {lang === "en"
                      ? "Get expert gutter services and professional advice from our experienced team."
                      : "ከልምድ ያላቸው ቡድናችን የሙያ የጋተር አገልግሎቶች እና የሙያ ምክር ያግኙ።"}
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
        </div>
      </div>
    </section>
  );
};

export default Blog;
