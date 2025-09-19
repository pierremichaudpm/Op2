import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2.5rem'
      }
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#243768',
          foreground: '#FFFFFF'
        },
        accent: {
          DEFAULT: '#F36911',
          dark: '#DE5600',
          light: '#FFD3B7'
        },
        secondary: {
          DEFAULT: '#111827',
          foreground: '#FFFFFF'
        }
      },
      fontFamily: {
        display: [
          'Gotham',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif'
        ]
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
        '2xl': '24px'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease forwards'
      }
    }
  },
  plugins: []
};

export default config;


