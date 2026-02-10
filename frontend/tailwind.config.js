/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'typewriter': ['Special Elite', 'Courier New', 'monospace'],
        // or
        'typewriter': ['Courier Prime', 'Courier New', 'monospace'],
      }
    }
  }
}