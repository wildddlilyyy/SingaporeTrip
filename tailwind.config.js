/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#176b5f',
        'primary-container': '#238172',
        secondary: '#c44f32',
        'secondary-container': '#f7d8c9',
        'on-secondary-container': '#71301f',
        tertiary: '#2d6476',
        surface: '#f5f8f5',
        'surface-container-low': '#edf4ef',
        'surface-container': '#e3eee7',
        'surface-container-high': '#d7e5dd',
        'on-surface': '#16201c',
        'on-surface-variant': '#53635c',
        outline: '#7d8a84',
        'outline-variant': '#c8d2cc',
        background: '#f5f8f5',
        'on-background': '#16201c',
        error: '#b3261e'
      },
      boxShadow: {
        xs: '0 1px 2px rgba(22, 32, 28, 0.06)'
      }
    }
  },
  plugins: []
};
