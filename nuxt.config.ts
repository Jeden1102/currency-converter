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
      stripePk: process.env.STRIPE_PK_KEY
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