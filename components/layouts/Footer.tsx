'use client';

import React from 'react';
import { getLayoutData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Footer = () => {
  const { language: lang, toggleLanguage } = useLanguage();
  const data = getLayoutData('footer', lang);

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              {data.company.logo}
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {data.company.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {data.social.links.map((social: any, index: number) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold text-white mb-4">
              {data.links.quickLinks.title}
            </h4>
            <ul className="space-y-3">
              {data.links.quickLinks.items.map((link: any, index: number) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-display font-semibold text-white mb-4">
              {data.links.services.title}
            </h4>
            <ul className="space-y-3">
              {data.links.services.items.map((link: any, index: number) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h4 className="text-lg font-display font-semibold text-white mb-4">
              {data.links.company.title}
            </h4>
            <ul className="space-y-3 mb-6">
              {data.links.company.items.map((link: any, index: number) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">{data.contact.title}</p>
                <p className="text-gray-400">{data.contact.address}</p>
              </div>
              <div>
                <p className="text-gray-400">
                  <a href={`tel:${data.contact.phone}`} className="hover:text-primary transition-colors">
                    {data.contact.phone}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  <a href={`mailto:${data.contact.email}`} className="hover:text-primary transition-colors">
                    {data.contact.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              {data.copyright}
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="text-sm text-gray-400 hover:text-primary transition-colors"
              >
                {lang === 'en' ? 'አማርኛ' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
