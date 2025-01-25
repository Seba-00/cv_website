// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4caf50',
          dark: '#17a2b8',
        },
        secondary: {
          light: '#8fbc8f',
          dark: '#28a745',
        },
        accent: {
          light: '#ffca28',
          dark: '#ffc107',
        },
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
        'gradient-dark': 'linear-gradient(to bottom, #1a1a1a, #2d2d2d)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
