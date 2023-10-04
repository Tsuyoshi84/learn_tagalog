// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['~/assets/css/reset.css', '~/assets/css/main.css'],
	devtools: { enabled: true },
	modules: ['@nuxtjs/google-fonts', '@nuxtjs/supabase', '@vueuse/nuxt'],
	googleFonts: {
		families: {
			Roboto: {
				wght: [400],
			},
			Gabarito: {
				wght: [400, 500, 700],
			},
		},
	},
	supabase: {
		redirect: false,
	},
	vite: {
		vue: {
			script: {
				defineModel: true,
				propsDestructure: true,
			},
		},
	},
})
