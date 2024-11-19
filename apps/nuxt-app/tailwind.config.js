/** @type {import('tailwindcss').Config} */
export default {
  content: ["app.vue", "pages/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        disabled: "rgb(var(--NN400,170,180,200))",
      },
      backgroundColor: {
        disabled: "rgb(var(--NN100,228,235,245))",
      },
    },
  },
  plugins: [],
};
