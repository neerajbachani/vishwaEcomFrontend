/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Gupter'],
        // 'ovo': ['Ovo'],
      },
    },

    // colors:{
    //   'primarycolor' : '#e63946',
    //   'secondarycolor' : '#e9edc9',
    //   'secondary-dark-color' : '#1d3557',

    //   'whitecolor' : '#ffe5ec',
    //   'light-bg-color' : '#f1faee',
    //   'light-text-color' : '#f72585',
    //   'border-color' : '#efe8ec',
    //   'blue-primary': '#55bae9'
    // }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

