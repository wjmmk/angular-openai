/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: false, // or 'media' or 'class'
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts}"],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

