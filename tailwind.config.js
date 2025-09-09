/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wfp-blue': '#0066CC',
        'wfp-orange': '#FF6B35',
      },
      fontFamily: {
        'sans': ['IBM Plex Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
