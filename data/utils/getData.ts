/**
 * Utility function to fetch data from the data folder based on language
 * Supports English (en) and Amharic (am)
 */

export type Language = 'en' | 'am';

interface GetDataOptions {
  lang?: Language;
  category: 'sections' | 'pages' | 'layouts';
  fileName: string;
}

// Import all data files statically
import heroEn from '@/data/locales/en/sections/hero.json';
import heroAm from '@/data/locales/am/sections/hero.json';
import featureEn from '@/data/locales/en/sections/feature.json';
import featureAm from '@/data/locales/am/sections/feature.json';
import serviceEn from '@/data/locales/en/sections/service.json';
import serviceAm from '@/data/locales/am/sections/service.json';
import whyChooseusEn from '@/data/locales/en/sections/whyChooseus.json';
import whyChooseusAm from '@/data/locales/am/sections/whyChooseus.json';
import productsEn from '@/data/locales/en/sections/products.json';
import productsAm from '@/data/locales/am/sections/products.json';
import partnersEn from '@/data/locales/en/sections/partners.json';
import partnersAm from '@/data/locales/am/sections/partners.json';
import ctaEn from '@/data/locales/en/sections/cta.json';
import ctaAm from '@/data/locales/am/sections/cta.json';
import blogEn from '@/data/locales/en/sections/blog.json';
import blogAm from '@/data/locales/am/sections/blog.json';
import aboutSectionEn from '@/data/locales/en/sections/about.json';
import aboutSectionAm from '@/data/locales/am/sections/about.json';

import blogPageEn from '@/data/locales/en/pages/blog.json';
import blogPageAm from '@/data/locales/am/pages/blog.json';
import productsPageEn from '@/data/locales/en/pages/products.json';
import productsPageAm from '@/data/locales/am/pages/products.json';
import servicesPageEn from '@/data/locales/en/pages/services.json';
import servicesPageAm from '@/data/locales/am/pages/services.json';
import aboutEn from '@/data/locales/en/pages/about.json';
import aboutAm from '@/data/locales/am/pages/about.json';
import teamEn from '@/data/locales/en/pages/team.json';
import teamAm from '@/data/locales/am/pages/team.json';
import testimonialsEn from '@/data/locales/en/pages/testimonials.json';
import testimonialsAm from '@/data/locales/am/pages/testimonials.json';
import achievementEn from '@/data/locales/en/pages/achievement.json';
import achievementAm from '@/data/locales/am/pages/achievement.json';
import galleryEn from '@/data/locales/en/pages/gallery.json';
import galleryAm from '@/data/locales/am/pages/gallery.json';
import documentEn from '@/data/locales/en/pages/document.json';
import documentAm from '@/data/locales/am/pages/document.json';
import contactEn from '@/data/locales/en/pages/contact.json';
import contactAm from '@/data/locales/am/pages/contact.json';
import vacancyEn from '@/data/locales/en/pages/vacancy.json';
import vacancyAm from '@/data/locales/am/pages/vacancy.json';

import headerEn from '@/data/locales/en/layouts/header.json';
import headerAm from '@/data/locales/am/layouts/header.json';
import footerEn from '@/data/locales/en/layouts/footer.json';
import footerAm from '@/data/locales/am/layouts/footer.json';
import breadcrumbEn from '@/data/locales/en/layouts/breadcrumb.json';
import breadcrumbAm from '@/data/locales/am/layouts/breadcrumb.json';

// Data mapping
const dataMap: Record<string, Record<Language, any>> = {
  'sections/hero': { en: heroEn, am: heroAm },
  'sections/feature': { en: featureEn, am: featureAm },
  'sections/service': { en: serviceEn, am: serviceAm },
  'sections/whyChooseus': { en: whyChooseusEn, am: whyChooseusAm },
  'sections/products': { en: productsEn, am: productsAm },
  'sections/partners': { en: partnersEn, am: partnersAm },
  'sections/cta': { en: ctaEn, am: ctaAm },
  'sections/blog': { en: blogEn, am: blogAm },
  'sections/about': { en: aboutSectionEn, am: aboutSectionAm },
  'pages/blog': { en: blogPageEn, am: blogPageAm },
  'pages/products': { en: productsPageEn, am: productsPageAm },
  'pages/services': { en: servicesPageEn, am: servicesPageAm },
  'pages/about': { en: aboutEn, am: aboutAm },
  'pages/team': { en: teamEn, am: teamAm },
  'pages/testimonials': { en: testimonialsEn, am: testimonialsAm },
  'pages/achievement': { en: achievementEn, am: achievementAm },
  'pages/gallery': { en: galleryEn, am: galleryAm },
  'pages/document': { en: documentEn, am: documentAm },
  'pages/contact': { en: contactEn, am: contactAm },
  'pages/vacancy': { en: vacancyEn, am: vacancyAm },
  'layouts/header': { en: headerEn, am: headerAm },
  'layouts/footer': { en: footerEn, am: footerAm },
  'layouts/breadcrumb': { en: breadcrumbEn, am: breadcrumbAm },
};

/**
 * Fetches data from JSON files in the data folder
 * @param options - Configuration object with category, fileName, and optional lang
 * @returns The data object
 */
export function getData<T = any>(options: GetDataOptions): T {
  const { category, fileName, lang = 'en' } = options;
  const key = `${category}/${fileName}`;
  
  if (dataMap[key] && dataMap[key][lang]) {
    return dataMap[key][lang] as T;
  }
  
  // Fallback to English if the requested language doesn't exist
  if (lang !== 'en' && dataMap[key] && dataMap[key]['en']) {
    console.warn(`Data file not found for language '${lang}', falling back to English`);
    return dataMap[key]['en'] as T;
  }
  
  console.error(`Data file not found: ${category}/${fileName}.json`);
  throw new Error(`Failed to load data file: ${category}/${fileName}.json`);
}

/**
 * Helper function to get section data
 */
export function getSectionData<T = any>(
  fileName: string,
  lang: Language = 'en'
): T {
  return getData<T>({
    category: 'sections',
    fileName,
    lang,
  });
}

/**
 * Helper function to get page data
 */
export function getPageData<T = any>(
  fileName: string,
  lang: Language = 'en'
): T {
  return getData<T>({
    category: 'pages',
    fileName,
    lang,
  });
}

/**
 * Helper function to get layout data
 */
export function getLayoutData<T = any>(
  fileName: string,
  lang: Language = 'en'
): T {
  return getData<T>({
    category: 'layouts',
    fileName,
    lang,
  });
}

