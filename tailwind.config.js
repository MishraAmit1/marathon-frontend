/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255, 255, 255, 0.18)",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        slideIn: "slideIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundColor: {
        "custom-white": "#0000",
        "custom-blue": "#16305f",
        "custom-dark-blue": "#0d2b99",
        "custom-light-blue": "#0d34bb",
        "custom-darkest-blue": "#0d2e69",
        "custom-pink": "#d60c61",
      },
    },
  },
  plugins: [],
};
