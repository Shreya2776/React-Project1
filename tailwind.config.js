/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#030014',
        'light-100': '#cecefb',
        'light-200': '#a8b5db',
        'gray-100': '#9ca4ab',
        'dark-100': '#0f0d23',
        'shadow-light-100': '#cecefb',
      },
      backgroundImage: {
        'hero-pattern': 'url("/hero-bg.png")',
      },
      placeholderColor: {
        'light-200': '#a8b5db',
      },
    },
  },
  plugins: [],
}

