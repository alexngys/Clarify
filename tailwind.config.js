/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      'custom': ['Bebas Neue', 'sans-serif'], // Name it 'custom' or whatever you prefer
    },},
  },
  plugins: [require("flowbite/plugin")],
};
