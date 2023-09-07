// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages:true,
  modules: [
    'nuxt-lodash',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    classSuffix: ''
  },
  runtimeConfig: {
      public: {
        API_URL: process.env.NUXT_API_URL,
        API_KEY: process.env.NUXT_API_KEY,
    }
  },
  app: {
    head: {
      script: [
        { src: 'https://js.stripe.com/v3/', defer: true }
      ],
    }
  }
})