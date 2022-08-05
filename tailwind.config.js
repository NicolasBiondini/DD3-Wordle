/** @type {import('tailwindcss').Config} */
module.exports = {
  // Uncomment the line below to enable the experimental Just-in-Time ("JIT") mode.
  // https://tailwindcss.com/docs/just-in-time-mode
  // mode: "jit",
  theme: {
    extend: {
      colors: {
        "backLight": "#E5E5E5",
        "light": "#F3F3F3",
        "fontLight": "#000000",
        "backDark": "#262B3C",
        "dark": "#939B9F",
        "fontDark": "#FFFFFF",
        "white": "#FFFFFF",
        "green": "#6AAA64",
        "yellow": "#CEB02C",
        "grey": "#939B9F",
        "base": "rgba(147, 155, 159, 0.3)",
        "lightKey": "#D3D6DA",
        "darkKey": "#565F7E",
        "backKey": "#DADCE0"
        
      }
    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
    }
  },
  darkMode: "class",
  variants: {},
  plugins: [],
  purge: {
    // Filenames to scan for classes
    content: [
      "./src/**/*.html",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./public/index.html",
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    },
  },
};