/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        base: ['Brockmann Regular', 'sans-serif'],
        medium: ['Brockmann Medium', 'sans-serif'],
        semibold: ['Brockmann SemiBold', 'sans-serif'],
        bold: ['Brockmann Bold', 'sans-serif'],
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1700px',
    },
  },
  plugins: [],
};
