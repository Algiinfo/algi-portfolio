/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./index.html",
    "./assets/**/*.{html,js}"
  ],

  theme: {
    extend: {

      colors: {
        background: "#0B1120",
        surface: "#111827",
        card: "#1E293B",
        border: "#334155",

        primary: "#3B82F6",
        accent: "#14B8A6",

        heading: "#F8FAFC",
        paragraph: "#94A3B8",
      },


      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },


      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "2rem",
          xl: "2rem",
          "2xl": "2rem",
        },
      },


      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.12)",
      },


      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },


    },
  },


  plugins: [],

};