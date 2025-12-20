"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getPageData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { AboutGalleryImage, GalleryItem } from "@/types/types";

interface GalleryProps {
  albums: GalleryItem[];
  images: (AboutGalleryImage & { albumTitle: string })[];
}

const Gallery = ({ albums, images }: GalleryProps) => {
  const { language: lang } = useLanguage();
  const data = getPageData("gallery", lang);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);

  // const images = data?.images || [];

  const handlePrevious = React.useCallback(() => {
    if (selectedImageIndex === null || isAnimating || images.length === 0)
      return;
    setIsAnimating(true);
    setTimeout(() => {
      const newIndex =
        selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 50);
    }, 250);
  }, [selectedImageIndex, images.length, isAnimating]);

  const handleNext = React.useCallback(() => {
    if (selectedImageIndex === null || isAnimating || images.length === 0)
      return;
    setIsAnimating(true);
    setTimeout(() => {
      const newIndex =
        selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 50);
    }, 250);
  }, [selectedImageIndex, images.length, isAnimating]);

  // Handle keyboard navigation in modal
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, handlePrevious, handleNext]);

  // Safety check for data - after hooks
  if (!data || !images || images.length === 0) {
    return (
      <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No gallery images available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {images.map((image: any, index: number) => (
            <div
              key={image.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedImageIndex(index);
              }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src={
                    image.image
                      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image.image}`
                      : "/placeholder-gallery.jpg"
                  }
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
              </div>

              {/* Content Overlay - Shows on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                <div className="text-white w-full">
                  <h3 className="font-semibold text-lg mb-1 text-white/80">
                    {image.title}
                  </h3>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-primary/90 z-10 pointer-events-none">
                {image.albumTitle}
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal with Slider */}
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 md:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedImageIndex(null);
              }
            }}
          >
            {/* Professional Modal Container */}
            <div
              className="relative w-full max-w-6xl bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Section */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 dark:border-gray-600 bg-gray-800/50 dark:bg-gray-900/50">
                {/* Gallery Name and Category */}
                <div
                  className={`flex-1 transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <h2 className="text-xl lg:text-2xl font-display font-bold text-white mb-1">
                    {images[selectedImageIndex].title}
                  </h2>
                  <p className="text-gray-400 text-sm lg:text-base">
                    {images[selectedImageIndex].albumTitle}
                  </p>
                </div>

                {/* Close Button - Inside Modal */}
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="text-gray-400 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 rounded-full p-2 hover:scale-110 active:scale-95 ml-4"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
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
              </div>

              {/* Image Section with Navigation Arrows */}
              <div className="relative flex-1 flex items-center justify-center p-6 md:p-8 bg-gray-900 dark:bg-gray-800 min-h-[400px]">
                {/* Previous Button - Inside Modal */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="absolute left-4 md:left-6 z-10 text-white hover:text-primary transition-all bg-gray-800/90 hover:bg-gray-700/90 rounded-full p-3 md:p-4 shadow-lg hover:scale-110 active:scale-95 border border-gray-700"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}

                {/* Image Container */}
                <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-lg bg-gray-800">
                  <div
                    key={selectedImageIndex}
                    className={`relative w-full h-full transition-opacity duration-300 ease-in-out ${
                      isAnimating ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <Image
                      src={
                        images[selectedImageIndex].image
                          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[selectedImageIndex].image}`
                          : "/placeholder-gallery.jpg"
                      }
                      alt={images[selectedImageIndex].title}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                      priority
                      quality={90}
                    />
                  </div>
                </div>

                {/* Next Button - Inside Modal */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 md:right-6 z-10 text-white hover:text-primary transition-all bg-gray-800/90 hover:bg-gray-700/90 rounded-full p-3 md:p-4 shadow-lg hover:scale-110 active:scale-95 border border-gray-700"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Footer Section with Counter */}
              {images.length > 1 && (
                <div className="px-6 py-4 border-t border-gray-700 dark:border-gray-600 bg-gray-800/50 dark:bg-gray-900/50 flex justify-center">
                  <div
                    className={`text-gray-400 text-sm font-medium transition-opacity duration-300 ${
                      isAnimating ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <span className="text-white font-semibold">
                      {selectedImageIndex + 1}
                    </span>
                    <span className="mx-2">/</span>
                    <span>{images.length}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
