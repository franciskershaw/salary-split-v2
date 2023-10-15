import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2b2b2b',
          light: '#6cb2eb',
          dark: '#1c3d5a',
        },
        secondary: {
          DEFAULT: '#5c5c5c',
          light: '#ef5753',
          dark: '#992d22',
        },
        tertiary: {
          DEFAULT: '#38a169',
          light: '#68d391',
          dark: '#2f855a',
        },
        white: '#FAF9F6',
      },
    },
  },
  plugins: [],
};
export default config;
