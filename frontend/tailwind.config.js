// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headland: ['"Headland One"', 'serif'], // name must match exactly
      },
    },
  },
  plugins: [],
}
