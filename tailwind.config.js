/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4A90E2',
          dark: '#64B5F6',
        },
        secondary: {
          light: '#666666',
          dark: '#9E9E9E',
        },
      },
    },
  },
  plugins: [],
} 