import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4E44CE',
          dark: '#3B32A8'
        },
        accent: {
          DEFAULT: '#FBBF24',
          dark: '#D97706'
        }
      },
    },
  },
  plugins: [],
};

export default config;