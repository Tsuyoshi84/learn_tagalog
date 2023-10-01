// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase'],
  supabase: {
    redirect: false,
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
  },
})
