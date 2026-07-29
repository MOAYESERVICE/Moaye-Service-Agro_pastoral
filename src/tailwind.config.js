/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'moaye-green': '#1b5e20',
        'moaye-cream': '#f4f1ea',
      },
      animation: {
        'float': 'floatMovement 4s ease-in-out infinite',
      },
      keyframes: {
        floatMovement: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
