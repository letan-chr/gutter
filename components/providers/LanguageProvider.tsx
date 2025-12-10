'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '@/data/utils';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

// Helper function to set cookie
function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

// Helper function to get initial language - reads from cookie (set by LanguageScript) or defaults to 'en'
// This ensures server and client render the same initial value
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en'; // SSR default - will be overridden by LanguageScript
  }

  // First, try to get from cookie (set by LanguageScript before React hydrates)
  const cookieLang = getCookie('language');
  if (cookieLang === 'en' || cookieLang === 'am') {
    return cookieLang;
  }

  // Fallback to localStorage if cookie not found
  try {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage === 'en' || savedLanguage === 'am') {
      // Sync to cookie
      setCookie('language', savedLanguage);
      return savedLanguage;
    }
  } catch {
    // Ignore localStorage errors
  }

  // Default fallback
  return 'en';
}

export function LanguageProvider({ 
  children,
  initialLanguage 
}: { 
  children: React.ReactNode;
  initialLanguage: Language;
}) {
  // Initialize with the language from server (from cookie)
  // This ensures server and client render the same language
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Sync with the actual DOM state (set by LanguageScript)
    // The LanguageScript should have set the same language as initialLanguage
    const currentLang = document.documentElement.lang as Language;
    const scriptLanguage = (currentLang === 'en' || currentLang === 'am') ? currentLang : initialLanguage;
    
    // Only update if different (shouldn't happen, but just in case)
    if (scriptLanguage !== language) {
      setLanguageState(scriptLanguage);
    }
    
    // Ensure localStorage and cookie are in sync with server-provided language
    try {
      const cookieLang = getCookie('language');
      if (cookieLang === 'en' || cookieLang === 'am') {
        // Cookie exists and matches, sync to localStorage
        localStorage.setItem('language', cookieLang);
      } else {
        // Cookie doesn't exist or is invalid, set it from server-provided language
        setCookie('language', language);
        localStorage.setItem('language', language);
      }
    } catch {
      // Ignore errors
    }
  }, [initialLanguage, language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    try {
      // Update both cookie and localStorage
      setCookie('language', lang);
      localStorage.setItem('language', lang);
      
      // Update HTML lang attribute
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    } catch {
      // Ignore errors
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'am' : 'en';
    handleSetLanguage(newLanguage);
  };

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  // Sync language changes from other tabs/windows
  useEffect(() => {
    if (!mounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && e.newValue) {
        const newLanguage = e.newValue as Language;
        if (newLanguage === 'en' || newLanguage === 'am') {
          setLanguageState(newLanguage);
          setCookie('language', newLanguage);
          if (typeof document !== 'undefined') {
            document.documentElement.lang = newLanguage;
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [mounted]);

  // Always use the current language state (no conditional based on mounted)
  // The LanguageScript ensures the initial value matches
  const contextValue = {
    language,
    setLanguage: handleSetLanguage,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

