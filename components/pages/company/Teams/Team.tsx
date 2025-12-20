"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getPageData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Stat, TeamMember } from "@/types/types";

interface TeamSectionProps {
  teams: TeamMember[];
  stats: Stat[];
}

const Team = ({ teams, stats }: TeamSectionProps) => {
  const members = teams;
  const { language: lang } = useLanguage();
  const data = getPageData("team", lang);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevious = React.useCallback(() => {
    if (selectedMemberIndex === null || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      const newIndex =
        selectedMemberIndex === 0
          ? members.length - 1
          : selectedMemberIndex - 1;
      setSelectedMemberIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 50);
    }, 250);
  }, [selectedMemberIndex, members.length, isAnimating]);

  const handleNext = React.useCallback(() => {
    if (selectedMemberIndex === null || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      const newIndex =
        selectedMemberIndex === members.length - 1
          ? 0
          : selectedMemberIndex + 1;
      setSelectedMemberIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 50);
    }, 250);
  }, [selectedMemberIndex, members.length, isAnimating]);

  // Handle keyboard navigation in modal
  useEffect(() => {
    if (selectedMemberIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setSelectedMemberIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMemberIndex, handlePrevious, handleNext]);

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Team Grid - Three Cards in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {members.map((member: TeamMember, index: number) => (
            <div
              key={member.id}
              onClick={() => setSelectedMemberIndex(index)}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}/${member.image}` ||
                    "/placeholder-team.jpg"
                  }
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content at Bottom with Transparent Backdrop */}
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <div className="backdrop-blur-md bg-black/40 dark:bg-black/50 rounded-xl p-4 border border-white/10">
                  {/* Name */}
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2">
                    {member.name}
                  </h3>

                  {/* Theme */}
                  {/* {member.theme && (
                    <p className="text-primary-light text-sm lg:text-base font-medium mb-1">
                      {member.theme}
                    </p>
                  )} */}

                  {/* Position */}
                  <p className="text-white/90 text-base lg:text-lg font-medium">
                    {member.position}
                  </p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </div>
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
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Team background"
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
              {lang === "en" ? "Meet Our Expert Team" : "የእኛን ባለሙያ ቡድን ይቀድሙ"}
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
                ? "Our dedicated team of professionals is ready to serve you with excellence."
                : "የተገለጸ የሙያዊያን ቡድናችን በምርጥነት አገልግሎት ለመስጠት ዝግጁ ነው።"}
            </p>
            <a
              href="/contacts"
              className="inline-block px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors hover:scale-105 active:scale-95"
            >
              {lang === "en" ? "Contact Our Team" : "ቡድናችንን ያግኙ"}
            </a>
          </div>
        </div>

        {/* Member Modal with Slider */}
        {selectedMemberIndex !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 md:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedMemberIndex(null);
              }
            }}
          >
            {/* Professional Modal Container */}
            <div
              className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Section - Fixed */}
              <div className="flex items-start justify-between px-4 md:px-6 py-3 border-b border-gray-700 dark:border-gray-600 bg-gray-800/50 dark:bg-gray-900/50 flex-shrink-0">
                {/* Member Name, Theme, Position */}
                <div
                  className={`flex-1 transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <h2 className="text-lg lg:text-xl font-display font-bold text-white mb-0.5">
                    {members[selectedMemberIndex].name}
                  </h2>
                  {/* {members[selectedMemberIndex].theme && (
                    <p className="text-primary-light text-xs lg:text-sm font-medium mb-0.5">
                      {members[selectedMemberIndex].theme}
                    </p>
                  )} */}
                  <p className="text-gray-300 text-sm lg:text-base font-medium">
                    {members[selectedMemberIndex].position}
                  </p>
                </div>

                {/* Close Button - Inside Modal */}
                <button
                  onClick={() => setSelectedMemberIndex(null)}
                  className="text-gray-400 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 rounded-full p-2 hover:scale-110 active:scale-95 ml-4 flex-shrink-0"
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

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto">
                {/* Image Section with Navigation Arrows */}
                <div className="relative flex items-center justify-center p-4 md:p-6 bg-gray-900 dark:bg-gray-800 min-h-[250px]">
                  {/* Previous Button - Inside Modal */}
                  {members.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                      }}
                      className="absolute left-4 md:left-6 z-10 text-white hover:text-primary transition-all bg-gray-800/90 hover:bg-gray-700/90 rounded-full p-3 md:p-4 shadow-lg hover:scale-110 active:scale-95 border border-gray-700"
                      aria-label="Previous member"
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
                  <div className="relative w-full max-w-xs md:max-w-sm aspect-[3/4] overflow-hidden rounded-lg bg-gray-800 mx-auto">
                    <div
                      key={selectedMemberIndex}
                      className={`relative w-full h-full transition-opacity duration-300 ease-in-out ${
                        isAnimating ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <Image
                        src={
                          `${process.env.NEXT_PUBLIC_IMAGE_URL}/${members[selectedMemberIndex].image}` ||
                          "/placeholder-team.jpg"
                        }
                        alt={members[selectedMemberIndex].name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        priority
                        quality={90}
                      />
                    </div>
                  </div>

                  {/* Next Button - Inside Modal */}
                  {members.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-4 md:right-6 z-10 text-white hover:text-primary transition-all bg-gray-800/90 hover:bg-gray-700/90 rounded-full p-3 md:p-4 shadow-lg hover:scale-110 active:scale-95 border border-gray-700"
                      aria-label="Next member"
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

                {/* Details Section */}
                <div
                  className={`px-4 md:px-6 py-4 transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <p className="text-gray-400 text-xs lg:text-sm mb-3">
                    {members[selectedMemberIndex].position}
                  </p>

                  {/* Contact Information */}
                  {members[selectedMemberIndex].phone && (
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-primary-light mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href={`tel:${members[selectedMemberIndex].phone}`}
                        className="text-gray-300 text-xs lg:text-sm hover:text-primary transition-colors"
                      >
                        {members[selectedMemberIndex].phone}
                      </a>
                    </div>
                  )}
                  {members[selectedMemberIndex].address && (
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-primary-light mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="text-gray-300 text-xs lg:text-sm">
                        {members[selectedMemberIndex].address}
                      </p>
                    </div>
                  )}
                </div>

                {/* Social Media Links */}
                {members[selectedMemberIndex].social_media && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-700 dark:border-gray-600">
                    {members[selectedMemberIndex].social_media.facebook && (
                      <a
                        href={
                          members[selectedMemberIndex].social_media.facebook
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors hover:scale-110"
                        aria-label="Facebook"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    )}
                    {members[selectedMemberIndex].social_media.linkedin && (
                      <a
                        href={
                          members[selectedMemberIndex].social_media.linkedin
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-700 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors hover:scale-110"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {members[selectedMemberIndex].social_media.twitter && (
                      <a
                        href={members[selectedMemberIndex].social_media.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors hover:scale-110"
                        aria-label="Twitter"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Section with Counter - Fixed */}
            {members.length > 1 && (
              <div className="px-4 md:px-6 py-3 border-t border-gray-700 dark:border-gray-600 bg-gray-800/50 dark:bg-gray-900/50 flex justify-center flex-shrink-0">
                <div
                  className={`text-gray-400 text-sm font-medium transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="text-white font-semibold">
                    {selectedMemberIndex + 1}
                  </span>
                  <span className="mx-2">/</span>
                  <span>{members.length}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
