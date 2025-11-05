/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        myfont: ["MyFont", "sans-serif"],
        main: ["main", "sans-serif"],
        secondary: ["rubik", "mono"],
        lato: ["lato", "sans-serif"],
      },
      colors: {
        primary: "#0c0c0f",
        textPrimary: "#ccd6f6",
        darkBg: "#0a0a0c",
        darkText: "#e2e8f0",
      },
    },
  },
  plugins: [],
};
