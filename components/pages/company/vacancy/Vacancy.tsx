'use client';

import React from 'react';
import Link from 'next/link';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Vacancy = () => {
  const { language: lang } = useLanguage();
  const data = getPageData('vacancy', lang);
  const vacancies = data.vacancies || [];

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">

        {/* Vacancies List */}
        {vacancies.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {vacancies.map((vacancy: any) => (
              <Link
                key={vacancy.id}
                href={`/vacancies/${vacancy.slug}`}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
             

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                    {vacancy.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                    {vacancy.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {vacancy.location}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(vacancy.postedDate).toLocaleDateString(lang === 'en' ? 'en-US' : 'am-ET', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {vacancy.type}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary dark:text-primary-light group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-2">
                      {data.viewDetails}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* No Vacancies Message */
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
              {data.noVacancies}
            </p>
          </div>
        )}

        {/* Call to Action Section */}
        {vacancies.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-primary via-primary-dark to-primary rounded-2xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                {lang === 'en' ? "Don't see a position that fits?" : 'እንደሚመች የስራ ቦታ አላየንም?'}
              </h2>
              <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
                {lang === 'en' 
                  ? 'We\'re always looking for talented individuals. Send us your resume and we\'ll keep you in mind for future opportunities.'
                  : 'ታላላቅ ሰዎችን ሁልጊዜ እየፈለግን ነው። የእርስዎን የስራ ታሪክ ይላኩልን እና ለወደፊት እድሎች እናስብዎታለን።'}
              </p>
              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform"
              >
                {lang === 'en' ? 'Contact Us' : 'ያግኙን'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Vacancy;
