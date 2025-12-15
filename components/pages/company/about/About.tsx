'use client';

import React from 'react';
import { getPageData, getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';
import Partners from '@/components/sections/Partners';

const About = () => {
  const { language: lang } = useLanguage();
  const pageData = getPageData('about', lang);
  const sectionData = getSectionData('about', lang);

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Hero Section - Enhanced Three Column Layout */}
        <div className="mb-20">


          {/* Three Column Card - Content | Image | Content */}
          <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300" data-aos="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Left Content Column */}
              <div className="md:col-span-4 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-primary/5 via-white to-white dark:from-primary/10 dark:via-gray-800 dark:to-gray-800 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6 group-hover:text-primary transition-colors duration-300">
                    {sectionData.leftContent.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg leading-relaxed">
                    {sectionData.leftContent.description}
                  </p>
                </div>
              </div>

              {/* Image Column */}
              <div className="md:col-span-4 relative h-64 md:h-auto overflow-hidden group">
                <img
                  src={sectionData.image}
                  alt={sectionData.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 border-4 border-white dark:border-gray-700 opacity-50"></div>
              </div>

              {/* Right Content Column */}
              <div className="md:col-span-4 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-l from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 transform group-hover:-rotate-6 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4 group-hover:text-secondary transition-colors duration-300">
                    {sectionData.rightContent.title}
                  </h3>
                  {sectionData.rightContent.intro && (
                    <p className="text-gray-200 dark:text-gray-300 text-base lg:text-lg leading-relaxed mb-6">
                      {sectionData.rightContent.intro}
                    </p>
                  )}
                  {sectionData.rightContent.services && sectionData.rightContent.services.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">{sectionData.rightContent.servicesTitle}</h4>
                      <ul className="space-y-2">
                        {sectionData.rightContent.services.map((service: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-gray-200 dark:text-gray-300">
                            <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {sectionData.rightContent.importedItems && sectionData.rightContent.importedItems.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">{sectionData.rightContent.importedItemsTitle}</h4>
                      <ul className="space-y-2">
                        {sectionData.rightContent.importedItems.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-gray-200 dark:text-gray-300">
                            <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Overview Section */}
        {pageData.content.overview && (
          <div className="mb-20">
            <div className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 dark:from-primary/20 dark:via-gray-800 dark:to-secondary/20 rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                    {pageData.content.overview.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {pageData.content.overview.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
                    <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Legal Status</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{pageData.content.overview.legalStatus}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
                    <div className="w-12 h-12 bg-secondary/20 dark:bg-secondary/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Established</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{pageData.content.overview.establishmentDate}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
                    <div className="w-12 h-12 bg-tertiary/20 dark:bg-tertiary/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{pageData.content.overview.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History - Amazing Enhanced Section */}
        <div className="mb-20 relative">
          <div className="relative z-10">
            {/* Main History Content Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-16 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="max-w-4xl mx-auto">
                  {/* Timeline Design */}
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-tertiary opacity-20 dark:opacity-30"></div>
                    
                    {/* Timeline Items */}
                    <div className="space-y-12">
                      {/* History Point */}
                      <div className="relative pl-20">
                        <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-primary to-primary/60 rounded-full border-4 border-white dark:border-gray-800 shadow-lg transform hover:scale-150 transition-transform duration-300"></div>
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-6 lg:p-8 transform hover:scale-105 transition-all duration-300 border border-primary/20 dark:border-primary/30">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pageData.content.history.title}</h3>
                          </div>
                          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {pageData.content.history.description}
                          </p>
                          {pageData.content.history.milestones && pageData.content.history.milestones.length > 0 && (
                            <div className="mt-4 space-y-3">
                              {pageData.content.history.milestones.map((milestone: any, index: number) => (
                                <div key={index} className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <span className="font-semibold text-primary">{milestone.year}</span>
                                    <span className="text-gray-600 dark:text-gray-400 ml-2">- {milestone.event}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Purpose Point */}
                      <div className="relative pl-20">
                        <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-secondary to-secondary/60 rounded-full border-4 border-white dark:border-gray-800 shadow-lg transform hover:scale-150 transition-transform duration-300"></div>
                        <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-2xl p-6 lg:p-8 transform hover:scale-105 transition-all duration-300 border border-secondary/20 dark:border-secondary/30">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pageData.content.mission.title}</h3>
                          </div>
                          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {pageData.content.mission.description}
                          </p>
                          {pageData.content.mission.details && pageData.content.mission.details.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {pageData.content.mission.details.map((detail: string, index: number) => (
                                <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      {/* Vision Point */}
                      <div className="relative pl-20">
                        <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-tertiary to-tertiary/60 rounded-full border-4 border-white dark:border-gray-800 shadow-lg transform hover:scale-150 transition-transform duration-300"></div>
                        <div className="bg-gradient-to-br from-tertiary/10 to-tertiary/5 dark:from-tertiary/20 dark:to-tertiary/10 rounded-2xl p-6 lg:p-8 transform hover:scale-105 transition-all duration-300 border border-tertiary/20 dark:border-tertiary/30">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-tertiary rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pageData.content.vision.title}</h3>
                          </div>
                          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {pageData.content.vision.description}
                          </p>
                          {pageData.content.vision.details && pageData.content.vision.details.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {pageData.content.vision.details.map((detail: string, index: number) => (
                                <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                  <svg className="w-5 h-5 text-tertiary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { label: 'Years Experience', value: '19+', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                { label: 'Happy Clients', value: '500+', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                { label: 'Projects Completed', value: '1000+', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { label: 'Team Members', value: '50+', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 text-center transform hover:scale-110 hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 rounded-xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <Partners />
      </div>
    </section>
  );
}

export default About;
