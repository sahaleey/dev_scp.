/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
