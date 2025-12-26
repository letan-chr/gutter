"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getLayoutData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MapPin, Phone, Mail } from "lucide-react";
import { Feature, ServiceType, Setup } from "@/types/types";
import { getAllServices, getBatchData } from "@/api/Api";
import { resolveService } from "@/lib/resolvers/serviceResolver";

const Footer = () => {
  const { language: lang, toggleLanguage } = useLanguage();
  const [setup, setSetup] = useState<Setup | null>(null);
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    const features: Feature[] = [{ name: "about_setup" }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setSetup(data.about_setup?.data ?? null);

        // 🔹 Services
        const serviceResponse = await getAllServices();

        const resolvedServices = serviceResponse.data.map((service) =>
          resolveService(service, lang)
        );

        setServices(resolvedServices);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [lang]);

  const logoSrc = setup?.logo_small
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup?.logo_small}`
    : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup?.logo_large}`;

  let data;
  try {
    data = getLayoutData("footer", lang);
  } catch (error) {
    console.error("Error loading footer data:", error);
    // Fallback to English if current language fails
    data = getLayoutData("footer", "en");
  }

  const ALLOWED_SOCIALS = ["facebook", "instagram", "twitter", "linkedin"];
  const socialLinks = setup?.social_media
    ? ALLOWED_SOCIALS.map((name) => {
        const url = setup.social_media[name as keyof typeof setup.social_media];
        return url ? { name, url } : null;
      })
        .filter((item): item is { name: string; url: string } => item !== null)
        .slice(0, 4)
    : [];

  // Social media icon components
  const getSocialIcon = (name: string) => {
    const socialName = name.toLowerCase();
    switch (socialName) {
      case "facebook":
        return (
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        );
      case "twitter":
        return (
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        );
      case "instagram":
        return (
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        );
      case "linkedin":
        return (
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        );
      default:
        return (
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        );
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black dark:from-black dark:to-gray-900 text-gray-300 border-t border-gray-800/50">
      <div className="mx-auto  px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src={logoSrc}
                alt="Gutter Share Company Logo"
                width={160}
                height={80}
                className="w-[160px] h-[80px] object-contain"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm lg:text-base">
              {data.company.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social: any, index: number) => (
                <a
                  key={index}
                  href={social.url}
                  className="group w-11 h-11 bg-gray-800/60 hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {getSocialIcon(social.name)}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white mb-6 tracking-wide uppercase">
              {data.links.quickLinks.title}
            </h4>
            <ul className="space-y-3.5">
              {data.links.quickLinks.items.map((link: any, index: number) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-primary transition-all duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-primary group-hover:scale-150 transition-all"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white mb-6 tracking-wide uppercase">
              {data.links.services.title}
            </h4>
            <ul className="space-y-3.5">
              {services
                .slice(0, 5)
                .map((service: ServiceType, index: number) => (
                  <li key={index}>
                    <a
                      href={`/service/${service.slug}`}
                      className="text-gray-400 hover:text-primary transition-all duration-200 text-sm flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-primary group-hover:scale-150 transition-all"></span>
                      {service.title.length > 50
                        ? service.title.slice(0, 50) + " ..."
                        : service.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white mb-6 tracking-wide uppercase">
              {data.links.company.title}
            </h4>
            <ul className="space-y-3.5">
              {data.links.company.items.map((link: any, index: number) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-primary transition-all duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-primary group-hover:scale-150 transition-all"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white mb-6 tracking-wide uppercase">
              {data.contact.title}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="mt-0.5 p-2 bg-gray-800/60 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 group-hover:text-gray-300 transition-colors">
                  {setup?.company_address}
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-gray-800/60 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <a
                  href={`tel:${setup?.phone_numbers[0].value}`}
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  {setup?.phone_numbers[0].value}
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-gray-800/60 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <a
                  href={`mailto:${setup?.email_addresses[0].value}`}
                  className="text-gray-400 hover:text-primary transition-colors text-sm break-all"
                >
                  {setup?.email_addresses[0].value}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 mt-8 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              {data.copyright.replace("{year}", new Date().getFullYear().toString())}
            </p>
            {data.poweredBy && (
              <div className="flex items-center gap-4">
                <a
                  href={data.poweredBy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {data.poweredBy.text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
