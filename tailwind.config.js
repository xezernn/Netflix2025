/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px'
      },
      brightness: {
        40: '0.4'
      }
    },
   
    plugins: [],
  }
}
