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
  },
  plugins: [],
};
