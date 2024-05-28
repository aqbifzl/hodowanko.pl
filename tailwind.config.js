/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'savebg': '#a80000',
        'countdown-red': '#ce0000',
        'click-btn': '#008af9',
        'click-btn-hover': '#115cb0',
        'price-green': '#00b19e',
        'time-btn': '#63D324',
        'time-btn-hover': '#47a215',
        'wow-blue': '#33ccff',
        'wow-red': '#ff3333',
        'wow-white': 'white',
        'wow-green': '#5eff33',
        'wow-yellow': '#ffdb33',
        'wow-purple': '#fc0cf9',
        'input-border': '#ccc',
      },
       boxShadow: {
        'original': '0px 0px 5px rgba(50, 50, 50, 0.75)',
      },
      textShadow: {
        textpop: '1px 1px 1px #000',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
  safelist: [
    "bg-click-btn",
    "bg-click-btn-hover",
    "bg-time-btn",
    "bg-time-btn-hover",
    "text-wow-blue",
    "text-wow-red",
    "text-wow-white",
    "text-wow-green",
    "text-wow-yellow",
    "text-wow-purple",
  ]
}

