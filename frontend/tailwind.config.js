/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "flipkart-blue": "#2874f0",
        "flipkart-light-blue": "#f1f8ff",
      },
    },
  },
  plugins: [],
};
