'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '@/data/utils';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get initial language from localStorage
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en'; // SSR default
  }

  try {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage === 'en' || savedLanguage === 'am') {
      return savedLanguage;
    }
    return 'en';
  } catch {
    // Fallback if localStorage is not available
    return 'en';
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize language from localStorage immediately to prevent hydration mismatch
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync with the actual DOM state (set by LanguageScript)
    const currentLang = document.documentElement.lang as Language;
    const initialLanguage = (currentLang === 'en' || currentLang === 'am') ? currentLang : 'en';
    
    // Update state to match what was applied by the script
    setLanguageState(initialLanguage);
    
    // Ensure localStorage is in sync
    try {
      const savedLanguage = localStorage.getItem('language') as Language | null;
      if (!savedLanguage || savedLanguage !== initialLanguage) {
        localStorage.setItem('language', initialLanguage);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    try {
      localStorage.setItem('language', lang);
      // Update HTML lang attribute
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    } catch {
      // Ignore localStorage errors
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
          if (typeof document !== 'undefined') {
            document.documentElement.lang = newLanguage;
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [mounted]);

  const contextValue = {
    language: mounted ? language : getInitialLanguage(),
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

