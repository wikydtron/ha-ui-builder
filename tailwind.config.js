/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ha: {
          blue: '#03a9f4',
          darkBlue: '#0288d1',
          bg: '#1c1c1c',
          card: '#2c2c2c',
          sidebar: '#1e1e1e',
          toolbar: '#252525',
          border: '#3a3a3a',
          text: '#e1e1e1',
          textSecondary: '#9e9e9e',
          accent: '#03a9f4',
          success: '#4caf50',
          warning: '#ff9800',
          error: '#f44336',
        },
      },
    },
  },
  plugins: [],
}
