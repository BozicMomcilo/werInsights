/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#72A0D6',
        secondary: '#9FB8D9',
        accent: '#72A0D6',
        background: '#0A101A',
        text: {
          primary: '#EAEAEA',
          secondary: '#B0B3BA',
        }
      },
      animation: {
        pulse: 'softPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};