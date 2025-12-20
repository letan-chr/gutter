"use client";

import React, { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getLayoutData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Image from "next/image";
import { Feature, Setup } from "@/types/types";
import { getBatchData } from "@/api/Api";

interface NavItem {
  label: string;
  href?: string;
  items?: Array<{ label: string; href: string }>;
}

const Header = () => {
  const { language: lang, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [mobileCompanyDropdownOpen, setMobileCompanyDropdownOpen] =
    useState(false);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const offcanvasRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const data = getLayoutData("header", lang);
  const footerData = getLayoutData("footer", lang);
  const [setup, setSetup] = useState<Setup | null>(null);

  useEffect(() => {
    const features: Feature[] = [{ name: "about_setup" }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setSetup(data.about_setup?.data ?? null);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const logoSrc = setup?.logo_small
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup?.logo_small}`
    : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup?.logo_large}`;

  // Build navigation items
  const navItems: NavItem[] = [
    { label: data.nav.home, href: "/" },
    data.nav.company, // This is now an object with label and items
    { label: data.nav.services, href: "/service" },
    { label: data.nav.products, href: "/products" },
    { label: data.nav.blog, href: "/blogs" },
    { label: data.nav.vacancy, href: "/vacancies" },
    { label: data.nav.contact, href: "/contacts" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Clear any pending timeout
        if (dropdownTimeoutRef.current) {
          clearTimeout(dropdownTimeoutRef.current);
          dropdownTimeoutRef.current = null;
        }
        setCompanyDropdownOpen(false);
      }
    };

    if (companyDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clean up timeout on unmount
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, [companyDropdownOpen]);

  // Close offcanvas when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        offcanvasRef.current &&
        !offcanvasRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement;
        if (!target.closest("[data-offcanvas-trigger]")) {
          setOffcanvasOpen(false);
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && offcanvasOpen) {
        setOffcanvasOpen(false);
      }
    };

    if (offcanvasOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [offcanvasOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg shadow-gray-900/5 dark:shadow-black/20">
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-tertiary opacity-60"></div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="shrink-0">
              <a
                href="/"
                className="text-2xl lg:text-3xl font-display font-bold text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary transition-all duration-300 group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src={logoSrc}
                  alt="Logo"
                  width={80}
                  height={80}
                  className="h-12 lg:h-14 w-auto object-contain relative z-10 group-hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item, index) => {
                // Check if item has dropdown (company)
                if (item.items && item.items.length > 0) {
                  return (
                    <div
                      key={index}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => {
                        // Clear any pending timeout when mouse enters
                        if (dropdownTimeoutRef.current) {
                          clearTimeout(dropdownTimeoutRef.current);
                          dropdownTimeoutRef.current = null;
                        }
                        setCompanyDropdownOpen(true);
                      }}
                      onMouseLeave={() => {
                        // Set a delay before closing the dropdown
                        dropdownTimeoutRef.current = setTimeout(() => {
                          setCompanyDropdownOpen(false);
                          dropdownTimeoutRef.current = null;
                        }, 300); // 300ms delay
                      }}
                    >
                      <button className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-semibold transition-all duration-300 relative group flex items-center gap-1.5 py-2 px-1 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10">
                        {item.label}
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            companyDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                      </button>

                      {/* Dropdown Menu */}
                      {companyDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-2 animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
                          {item.items.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="relative px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 dark:hover:from-primary/20 dark:hover:to-secondary/20 hover:text-primary dark:hover:text-primary-light transition-all duration-200 flex items-center gap-3 group/item"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></span>
                              <span className="flex-1">{subItem.label}</span>
                              <svg
                                className="w-4 h-4 opacity-0 group-hover/item:opacity-100 translate-x-[-4px] group-hover/item:translate-x-0 transition-all duration-200"
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
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Regular nav item
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-semibold transition-all duration-300 relative group py-2 px-1 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </a>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 text-sm font-semibold bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 rounded-lg hover:from-gray-200 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 hover:shadow-md"
                aria-label="Toggle language"
              >
                {lang === "en" ? "EN" : "አማ"}
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* CTA Button */}
              <button className="hidden sm:block px-4 lg:px-6 py-2 bg-gradient-to-r from-primary via-primary-dark to-primary text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 relative overflow-hidden group">
                <span className="relative z-10">{data.cta}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
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
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>

              {/* Company Info Offcanvas Trigger - At the end */}
              <button
                onClick={() => setOffcanvasOpen(true)}
                data-offcanvas-trigger
                className="p-2.5 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-all duration-300 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 border border-transparent hover:border-primary/20 relative group"
                aria-label="Company Information"
                title="Company Information"
              >
                {/* 9 bold dots in 3 columns (3x3 grid) */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* Top row - 3 dots */}
                  <circle cx="6" cy="5" r="2" fill="currentColor" />
                  <circle cx="12" cy="5" r="2" fill="currentColor" />
                  <circle cx="18" cy="5" r="2" fill="currentColor" />
                  {/* Middle row - 3 dots */}
                  <circle cx="6" cy="12" r="2" fill="currentColor" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <circle cx="18" cy="12" r="2" fill="currentColor" />
                  {/* Bottom row - 3 dots */}
                  <circle cx="6" cy="19" r="2" fill="currentColor" />
                  <circle cx="12" cy="19" r="2" fill="currentColor" />
                  <circle cx="18" cy="19" r="2" fill="currentColor" />
                </svg>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4 animate-in slide-in-from-top duration-200">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item, index) => {
                  // Check if item has dropdown (company)
                  if (item.items && item.items.length > 0) {
                    return (
                      <div key={index} className="flex flex-col">
                        <button
                          onClick={() =>
                            setMobileCompanyDropdownOpen(
                              !mobileCompanyDropdownOpen
                            )
                          }
                          className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-medium py-2.5 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                          {item.label}
                          <svg
                            className={`w-5 h-5 transition-transform duration-300 ${
                              mobileCompanyDropdownOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {/* Mobile Dropdown */}
                        {mobileCompanyDropdownOpen && (
                          <div className="pl-4 mt-1 space-y-1 animate-in slide-in-from-top duration-200">
                            {item.items.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileCompanyDropdownOpen(false);
                                }}
                                className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Regular nav item
                  return (
                    <a
                      key={index}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-medium py-2.5 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  );
                })}

                {/* Mobile CTA Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-3 px-4 py-2.5 bg-primary hover:bg-primary-dark dark:bg-primary dark:hover:bg-primary-dark text-white rounded-lg font-medium transition-colors duration-200 text-left"
                >
                  {data.cta}
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Offcanvas - Company Information */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          offcanvasOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOffcanvasOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"></div>

        {/* Offcanvas Panel */}
        <div
          ref={offcanvasRef}
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out ${
            offcanvasOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary via-primary-dark to-primary p-6 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold mb-1 text-white">
                  {footerData.company.title}
                </h2>
                <p className="text-white text-sm">
                  {footerData.company.description}
                </p>
              </div>
              <button
                onClick={() => setOffcanvasOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
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
          </div>

          {/* Content */}
          <div className="overflow-y-auto h-[calc(100%-80px)] p-6 space-y-6">
            {/* Company Description */}
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                About Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {footerData.company.description}
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {footerData.contact.title}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                    <svg
                      className="w-5 h-5 text-primary"
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
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Address
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {footerData.contact.address}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                    <svg
                      className="w-5 h-5 text-primary"
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
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Phone
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                      {footerData.contact.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Email
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                      {footerData.contact.email}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                {footerData.links.quickLinks.title}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {footerData.links.quickLinks.items.map(
                  (link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      onClick={() => setOffcanvasOpen(false)}
                      className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary-light rounded-lg transition-all duration-200 font-medium text-center"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {footerData.social.title}
              </h3>
              <div className="flex gap-3">
                {footerData.social.links.map((social: any, index: number) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 hover:from-primary/20 hover:to-secondary/20 dark:hover:from-primary/30 dark:hover:to-secondary/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 border border-primary/20 dark:border-primary/30"
                    aria-label={social.name}
                  >
                    <svg
                      className="w-6 h-6 text-primary dark:text-primary-light"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
