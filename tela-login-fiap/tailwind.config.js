/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        fiap: '#ED145B',
        dark: {
          DEFAULT: '#000',
          card: '#1a1a1a',
          muted: '#2a2a2a',
        },
      },
    },
  },
  plugins: [],
};
