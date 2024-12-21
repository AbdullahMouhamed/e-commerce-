/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      screens: {
        "2xl": "1320px"
      },
      fontFamily: {
        cairoPlay: "Cairo Play Variable",
        cairo: "Cairo Variable",
      }
    },
  },
  plugins: [],
}

