/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFaimy: {
      sans: ["montserrat"],
    },
    extend: {
      colors: {
        "primary-100": "#F2F7FD",
        "primary-200": "#66788F",
        "primary-300": "#A5BCD1",
        "primary-400": "rgba(43, 95, 165,.9)",
        "primary-500": "#2B5FA5",
        primary: "#2B5FA5",
        "primary-600": "#193F72",
      },
      spacing: {
        wrapper: "1.5rem",
        "wrapper-md": "3.25rem",
        "wrapper-xl": "2rem",
      },
      screens: {
        "4xl": "2560px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
