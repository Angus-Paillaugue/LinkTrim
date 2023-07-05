/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte}',
  ],
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