import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '0px',
        // => @media (min-width: 0px) { ... }

        'xm': '400px',
        // => @media (min-width: 400px) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1440px',
        // => @media (min-width: 1280px) { ... }
        // lg1: "1440px",
        // => @media (min-width: 1100px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        '3xl': '1920px',
        // => @media (min-width: 1920px) { ... }
        '4xl': '2100px',
        // => @media (min-width: 2100px) { ... }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        // CustomFont: ["Gmarket Sans"],
      },
      colors: {
        primary: "#F36B31",
        lightColor: "#FFFBA0",
        bgNavbar:"#FFFBA0",
        textColor:"#212529",
        textDarkColor:"#BAA732",
        linearColorOne:"#FFFBA0",
        linearColorTwo:"#FFFDDB",
        linearColorThree:"#BAA732"
      },
    },
  },
  plugins: [],
} satisfies Config;
