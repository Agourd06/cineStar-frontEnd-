/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**",
    './node_modules/tw-elements-react/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Playfair Display', 'sans-serif'],  
        serif: ['Merriweather', 'serif'], 
      },
    },
  },
  plugins: [
  ],
}

