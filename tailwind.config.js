/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'prism-image': "url('/prism-bg.svg')",
      },
      fontFamily: {
        exo: [
          "Exo 2",
          "sans-serif",
        ],
      },
    },
  },
  daisyui: {
    themes: ["night"],
  },
  plugins: [daisyui],
};
