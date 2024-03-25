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
        primary: "#6171fe",
        secondary: "#9f6afe",
        tertiary: "#b79dfe",
        highlight: "#ddd0fe",
        light: "#fefefe",
        dark: "#6658fe",
        light_rose: "#FFE4E5",
        light_green: "#E0F7F4",
      },
      animation: {
        background: "background 4s ease-in-out infinite",
        linear: "backgroundLinear 5s linear infinite",
        slide:
          "backgroundSlide 120s linear infinite alternate-reverse forwards;",
      },
      keyframes: {
        background: {
          "0%, 100%": { backgroundPosition: "left 0% bottom 0%" },
          "50%": { backgroundPosition: "left 200% bottom 0%" },
        },
        backgroundLinear: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        backgroundSlide: {
          "0%": { backgroundPosition: "0 0%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
};
