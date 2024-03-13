/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */

const px50 = { ...Array.from(Array(51)).map((_, i) => `${i}px`) };
const px600 = { ...Array.from(Array(601)).map((_, i) => `${i}px`) };
const px800 = { ...Array.from(Array(801)).map((_, i) => `${i}px`) };

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontSize: px50,
      width: px800,
      height: px800,
      spacing: px600,
      zIndex: {
        "-1": "-1",
      },
      boxShadow: {
        left: "-1px 0px 5px 1px rgba(0, 0, 0, 0.2)",
        down: "0px 1px 3px 1px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        logo_navy: "#17316F",
        logo_blue: "#2D60DC",
      },
      animation: {
        "scale-up": "scale-up 0.3s ease-in-out",
      },
      keyframes: {
        "scale-up": {
          "0%": {
            transform: "scale(0)",
            boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.2)",
          },
          "100%": {
            transform: "scale(1)",
            boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
  },
};
