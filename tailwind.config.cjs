/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        secondary: ["Open Sans", "sans-serif"],
        // primary: ["Poppins", "sans-serif"],
        primary: ["Roboto", "sans-serif"],
        fancy: ["Georgia", "serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        // main: "#222529",
        main: "#5A5A5A",
        bgGray: "#F8F8F8",
        secondary: "#F4F4F4",
        mygray: "#777",
      },
      fontSize: {
        txt_navItem: ["14px", { fontWeight: "700" }],
        txt_varTitle: ["12px", { fontWeight: "700" }],
        txt_varItem: ["12px", { fontWeight: "600" }],
      },
      screens: {
        md: "1057px",
        // => @media (min-width: 820px) { ... }
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};

module.exports = config;
