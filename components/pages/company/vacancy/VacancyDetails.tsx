'use client';

import React from 'react';
import Link from 'next/link';
import { getPageData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const VacancyDetails = ({ slug }: { slug: string }) => {
  const { language: lang } = useLanguage();
  const data = getPageData('vacancy', lang);
  
  // Find the vacancy by slug
  const vacancy = data.vacancies?.find((v: any) => v.slug === slug);

  if (!vacancy) {
    return (
      <div className="py-20 text-center bg-white dark:bg-gray-900 min-h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
              <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
              {lang === 'en' ? 'Vacancy Not Found' : 'የስራ ቦታ አልተገኘም'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {lang === 'en' 
                ? 'The vacancy you are looking for does not exist or has been removed.'
                : 'የምትፈልጉት የስራ ቦታ የለም ወይም ተወግዷል።'}
            </p>
            <Link
              href="/vacancies"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {data.backToVacancies}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="py-12 lg:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/vacancies"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light mb-8 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {data.backToVacancies}
          </Link>

          {/* Main Content Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header Section with Gradient */}
            <div className="bg-gradient-to-r from-primary via-primary-dark to-primary p-8 lg:p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                    {vacancy.department}
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                    {vacancy.type}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                  {vacancy.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {vacancy.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {lang === 'en' ? 'Posted' : 'የተለጠፈ'}: {new Date(vacancy.postedDate).toLocaleDateString(lang === 'en' ? 'en-US' : 'am-ET', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  {vacancy.deadline && (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {lang === 'en' ? 'Deadline' : 'የመጨረሻ ቀን'}: {new Date(vacancy.deadline).toLocaleDateString(lang === 'en' ? 'en-US' : 'am-ET', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12">
              {/* Job Description */}
              <div className="mb-10">
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                  {data.jobDescription}
                </h2>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {vacancy.description}
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-10">
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-secondary to-tertiary rounded-full"></div>
                  {data.requirements}
                </h2>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <ul className="space-y-4">
                    {vacancy.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-lg flex-1 leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-10">
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-tertiary to-primary rounded-full"></div>
                  {data.benefits}
                </h2>
                <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-tertiary/5 dark:from-primary/10 dark:via-secondary/10 dark:to-tertiary/10 rounded-xl p-6 border border-primary/20 dark:border-primary/30">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vacancy.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mt-0.5 group-hover:bg-primary/30 dark:group-hover:bg-primary/40 transition-colors">
                          <svg className="w-4 h-4 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Apply Button Section */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl p-6">
                  <div>
                    <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
                      {lang === 'en' ? 'Ready to Apply?' : 'ለመመልከት ዝግጁ ነዎት?'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {lang === 'en' 
                        ? 'Send us your resume and cover letter through our contact page.'
                        : 'የእርስዎን የስራ ታሪክ እና የሽፋን ደብዳቤ በእኛ የግንኙነት ገጽ በኩል ይላኩልን።'}
                    </p>
                  </div>
                  <Link
                    href="/contacts"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary via-primary-dark to-primary text-white rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 transform whitespace-nowrap"
                  >
                    {data.applyNow}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Vacancies */}
          {data.vacancies && data.vacancies.length > 1 && (
            <div className="mt-16">
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
                {lang === 'en' ? 'Other Open Positions' : 'ሌሎች ክፍት የስራ ቦታዎች'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.vacancies
                  .filter((v: any) => v.id !== vacancy.id)
                  .slice(0, 2)
                  .map((relatedVacancy: any) => (
                    <Link
                      key={relatedVacancy.id}
                      href={`/vacancies/${relatedVacancy.slug}`}
                      className="group block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-xs font-semibold">
                          {relatedVacancy.department}
                        </span>
                        <span className="px-3 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light rounded-full text-xs font-semibold">
                          {relatedVacancy.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors mb-2">
                        {relatedVacancy.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {relatedVacancy.description}
                      </p>
                      <span className="text-sm font-semibold text-primary dark:text-primary-light group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                        {data.viewDetails}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default VacancyDetails;

