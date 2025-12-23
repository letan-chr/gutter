"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { getPageData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Blog } from "@/types/types";
import { resolveBlog } from "@/lib/resolvers/blogResolver";

interface BlogDetailsProps {
  unResolvedPost: Blog | null;
  unResolvedRelatedPosts: Blog[];
}

const BlogDetails = ({
  unResolvedPost,
  unResolvedRelatedPosts,
}: BlogDetailsProps) => {
  const { language: lang } = useLanguage();
  if (!unResolvedPost) {
    return null;
  }
  const post = resolveBlog(unResolvedPost, lang);
  const relatedPosts = unResolvedRelatedPosts.map((b) => resolveBlog(b, lang));
  const data = getPageData("blog", lang);

  const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_URL;

  const getImageUrl = (path?: string) => {
    if (!path) {
      return "https://images.unsplash.com/photo-1563453392212-326f5e854473";
    }
    return `${IMAGE_BASE}/${path}`;
  };

  const galleryImages = useMemo(() => {
    if (post?.images?.length) {
      return post.images.map((img: any) => getImageUrl(img.image_path));
    }

    if (post?.banner_image) {
      return [getImageUrl(post.banner_image)];
    }

    return [];
  }, [post]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!post) {
    return null;
  }

  return (
    <article className="py-12 lg:py-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Back Button */}

        {/* Full Width Big Card: Left Image, Right Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            {/* Left Image Section - Banner with Gallery */}
            <div className="lg:w-1/2 flex flex-col">
              {/* Banner Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                {galleryImages[selectedImageIndex] ? (
                  <Image
                    src={galleryImages[selectedImageIndex]}
                    alt={post?.title || "blog"}
                    fill
                    className="object-cover transition-opacity duration-300"
                    priority
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

              {/* Gallery Thumbnails Below Banner - Limited to Banner Column */}
              {galleryImages.length > 1 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    {lang === "en" ? "Gallery" : "ጋለሪ"}
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {galleryImages.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? "border-primary dark:border-primary-light ring-2 ring-primary/20"
                            : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {selectedImageIndex === index && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-primary dark:text-primary-light"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content Section - Description and Details */}
            <div className="lg:w-1/2 px-8 lg:px-10 pt-0 lg:pt-0 pb-8 lg:pb-10 flex flex-col items-start">
              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {post?.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">
                    {new Date(post?.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>

          {/* Content Section Inside Big Card - Full Width */}
          <div className="p-8 lg:p-10 border-t border-gray-200 dark:border-gray-700">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                <div
                  className="text-base leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts - Full Width, 4 Cards in One Row */}
        {relatedPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {lang === "en" ? "Related Posts" : "ተዛማጅ ልጥፎች"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <a
                  key={relatedPost.id}
                  href={`/blogs/${relatedPost.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {relatedPost.banner_image ? (
                      <Image
                        src={getImageUrl(relatedPost.banner_image)}
                        alt={relatedPost.title}
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
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span>
                        {new Date(relatedPost.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">
                        •
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2 leading-relaxed">
                      {relatedPost.excerpt}
                    </p>
                    <div className="inline-flex items-center text-primary dark:text-primary-light font-medium text-sm group-hover:gap-1 transition-all">
                      {lang === "en" ? "Read More" : "ተጨማሪ ያንብቡ"}
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogDetails;
