// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  runtimeConfig: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  srcDir: "src",
  css: ["~/assets/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],
  modules: ["@pinia/nuxt"],
  plugins: ["./src/plugins/fontAwesome.ts", "./src/plugins/pinia.ts"],
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3, user-scalable=yes",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          href: "/public/favicon.ico",
        },
      ],
    },
  },
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/vue-fontawesome",
    ],
  },
});
