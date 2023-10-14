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
          DEFAULT: '#3490dc',
          light: '#6cb2eb',
          dark: '#1c3d5a',
        },
        secondary: {
          DEFAULT: '#e3342f',
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
