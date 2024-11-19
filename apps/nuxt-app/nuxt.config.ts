// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./store/**"],
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});

