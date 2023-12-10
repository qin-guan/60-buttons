// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],
  ssr: false,
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, user-scalable=no" }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:5021'
    }
  }
})
