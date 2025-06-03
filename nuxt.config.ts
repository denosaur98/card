// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image'],
  css: ['public/assets/styles/global.scss'],
  app: {
     pageTransition: {
      name: 'page',
      mode: 'out-in',
      duration: 500
    },
  }
})