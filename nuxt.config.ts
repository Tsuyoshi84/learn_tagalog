// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],
		},
	},
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
