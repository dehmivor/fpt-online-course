/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'primary': '#673AB7',
      'secondary': '#3C2F80',
      'accent': {
        'light': '#DDD7FF',
        default: '#BBAFFF',
      },
      'gray':{
        'light': '#F7F7F7',
        default: '#616161',
      },
      'green': '#1BC573',
      'red': '#CD0000'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'light-gradient': 'linear-gradient(to bottom left, #FFFFFF 0%, #F7F5FF 25%, #EEEBFF 50%, #E6E1FF 75%, #DDD7FF 100%)',
        'primary-gradient': 'linear-gradient(to bottom left, #673AB7 0%, #5B38A9 25%, #50359C 50%, #45328E 75%, #3C2F80 100%)',
      },
    },
  },
  plugins: [],
}

