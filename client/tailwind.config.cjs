/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {

      },
      keyframes: {
        changeOpacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        }
      },
      transitionDuration: {
        "0": "0ms",
        "2000": "2000ms",
        "5000": "5000ms",
      }
    },
  },
  plugins: [],
};
