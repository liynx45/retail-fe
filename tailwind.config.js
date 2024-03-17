/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "primary": "#f97316",
      "secondary" : "#fdba74",
      "text": "#e2e8f0",
      "primary-white": "#ffffff",
      "secondary-white": "#f2f2f2",
      "primary-bg": "#e2e8f0",
      "secondary-bg": "#f9fafb"
    },
    fontFamily: {
      "Lato": ["Lato", "sans-serif"]
    },
    extend: {
      boxShadow: {
        DEFAULT: "-3px 7px 55px -4px rgba(0,0,0,0.1)"
      },
      borderColor: {
        DEFAULT: "#E5E1DA"
      }
    },
  },
  plugins: [],
}

