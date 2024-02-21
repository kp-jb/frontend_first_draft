/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      colors: {
        customColor: {
          100: "#f7ede2",
          200: "#f5cac3",
          300: "#f6bd60",
          400: "#f28482",
          500: "#84a59d",
        },
      },
      screens: {
        'xs': "475px",
        
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
      
        'md': '768px',
        // => @media (min-width: 768px) { ... }
      
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
      
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
      
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "typewriter":"url('../public/images/pereanu-sebastian-unsplash.jpg')",
        "corona-kraplak-typewriter":"url('../public/images/daria-kraplak-unsplash.jpg')",
        "corona-fore-typewriter":"url('../public/images/patrick-fore-unsplash.jpg')",
      },
      fontFamily: {
        sans: ["Berkshire Swash","sans-serif"]
      }
    },
  },
  plugins: [],
};
