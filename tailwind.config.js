/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          light: '#828282',
          DEFAULT: '#2F80ED',
          dark: '#4F4F4F',
          contrast: '#E0E0E0',
        },
        indicator: {
          peach: '#F8B76B',
          purple: '#8785FF',
          red: '#EB5757',
          yellow: '#F2C94C',
        },
        chats: {
          lightpeach: '#FCEED3',
          lightpurple: '#EEDCFF',
          mint: '#D2F2EA',
          peach: '#E5A443',
          purple: '#9B51E0',
          green: '#43B78D',
        },
        stickers: {
          lightblue: '#E9F3FF',
          peach: '#FDCFA4',
          yellow: '#F9E9C3',
          mint: '#AFEBDD',
          lightgreen: '#CBF1C2',
          purple: '#CFCEFF',
          pink: '#F9E0FD',
          blue: '#9DD0ED',
        },
      }
    },
  },
  plugins: [],
};
