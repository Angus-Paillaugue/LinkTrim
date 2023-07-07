/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte}',
  ],
  theme:{
    extend:{
      fontFamily:{
        sans:["Poppins"]
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui:{
    themes:["forest", "cupcake"],
    logs:false,
    darkTheme:"forest"
  }
}