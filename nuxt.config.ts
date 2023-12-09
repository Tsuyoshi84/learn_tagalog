// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			title: 'Learn Tagalog',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ hid: 'description', name: 'description', content: `Let's learn Tagalog!` },
			],
		},
	},
	css: [],
	devtools: { enabled: true },
	experimental: {
		typedPages: true,
	},
	modules: [
		'@nuxtjs/google-fonts',
		'@nuxtjs/supabase',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'nuxt-vitest',
	],
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
	srcDir: 'src/',
	supabase: {
		redirect: false,
	},
	tailwindcss: {
		configPath: '~/tailwind.config.ts',
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
