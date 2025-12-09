'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to get initial theme from localStorage or system preference
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'; // SSR default
  }

  try {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    
    // Check system preference if no saved theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch {
    // Fallback if localStorage is not available
    return 'light';
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage immediately to prevent hydration mismatch
  const [theme, setThemeState] = useState<Theme>(() => {
    // On client side, read from DOM (set by ThemeScript) or localStorage
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const isDark = root.classList.contains('dark');
      if (isDark) return 'dark';
      
      try {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme === 'dark' || savedTheme === 'light') {
          return savedTheme;
        }
      } catch {
        // Ignore localStorage errors
      }
      
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  });
  const [mounted, setMounted] = useState(false);

  const applyTheme = (newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  // Apply theme immediately on mount and ensure it persists
  useEffect(() => {
    setMounted(true);
    
    // Get theme from DOM (set by ThemeScript) or localStorage
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    const currentTheme = isDark ? 'dark' : 'light';
    
    // Update state to match what was applied by the script
    setThemeState(currentTheme);
    
    // Ensure localStorage is in sync
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (!savedTheme || savedTheme !== currentTheme) {
        localStorage.setItem('theme', currentTheme);
      }
    } catch {
      // Ignore localStorage errors
    }
    
    // Apply theme immediately to ensure it's set
    applyTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    applyTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // Ignore localStorage errors
    }
  };

  const handleSetTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // Ignore localStorage errors
    }
  };

  // Sync theme changes from other tabs/windows
  useEffect(() => {
    if (!mounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        const newTheme = e.newValue as Theme;
        if (newTheme === 'dark' || newTheme === 'light') {
          setThemeState(newTheme);
          applyTheme(newTheme);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [mounted]);

  // Ensure theme is applied on every render/mount
  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const contextValue = {
    theme: mounted ? theme : getInitialTheme(),
    toggleTheme,
    setTheme: handleSetTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

