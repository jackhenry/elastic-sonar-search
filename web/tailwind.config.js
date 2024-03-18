/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      icons: ["icons"],
      sans: ["Inter", "sans serif"],
    },
    extend: {
      colors: {
        "blue-bg": "#021627",
        "sonar-blue-bg": "#021627",
        "sonar-blue-accent": "#2cbfff",
        "sonar-offwhite": "#f5f7fa",
        "sonar-grey": "#f1f1f4",
        "sonar-fg-dark": "#212b39",
        "sonar-fg-light": "#909dad",
      },
    },
  },
  plugins: [],
};
