/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors - Light Mode
        primary: {
          DEFAULT: '#8B1538', // Logo background color (burgundy/maroon)
          dark: '#6B0F2A',
          light: '#A51A45',
        },
        secondary: {
          DEFAULT: '#4A5568', // Light blue-black
          dark: '#2D3748',
          light: '#718096',
        },
        tertiary: {
          DEFAULT: '#2FE90A',
          dark: '#26C008',
          light: '#4FFA2E',
        },
        // Background & Foreground (using CSS variables for theme switching)
        background: {
          DEFAULT: 'var(--background)',
          light: '#ffffff',
          dark: '#0a0a0a',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          light: '#171717',
          dark: '#ededed',
        },
        // Text Colors
        text: {
          primary: {
            DEFAULT: 'var(--text-primary)',
            light: '#111827',
            dark: '#f9fafb',
          },
          secondary: {
            DEFAULT: 'var(--text-secondary)',
            light: '#6b7280',
            dark: '#d1d5db',
          },
          muted: {
            DEFAULT: 'var(--text-muted)',
            light: '#9ca3af',
            dark: '#9ca3af',
          },
        },
        // Border Colors
        border: {
          DEFAULT: 'var(--border)',
          light: '#e5e7eb',
          dark: '#374151',
          'dark-hover': '#4b5563',
        },
        // Gray Scale (standard Tailwind grays)
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Nio Sans Pro', 'system-ui', 'sans-serif'],
        display: ['Nio Sans Pro', 'system-ui', 'sans-serif'],
        mono: ['monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'primary': '0 10px 25px -5px rgba(139, 21, 56, 0.3)',
        'primary-dark': '0 10px 25px -5px rgba(165, 26, 69, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
};

