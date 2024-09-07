// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	extends: ['github:Tsuyoshi84/nuxt-layer-core'],
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
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
		},
	},
	compatibilityDate: '2024-04-03',
	css: [],
	devtools: { enabled: true },
	experimental: {
		typedPages: true,
	},
	future: {
		compatibilityVersion: 4,
	},
	imports: {
		dirs: ['composables/*', 'utils/*'],
		presets: [
			{
				from: 'vue',
				imports: ['CSSProperties', 'WritableComputedRef'],
				type: true,
			},
			{
				from: 'vue-component-type-helpers',
				imports: [
					'ComponentType',
					'ComponentProps',
					'ComponentSlots',
					'ComponentEmit',
					'ComponentExposed',
				],
				type: true,
			},
		],
	},
	modules: [
		'@nuxtjs/google-fonts',
		'@nuxtjs/supabase',
		'@nuxtjs/tailwindcss',
		'@nuxt/eslint',
		'@nuxt/test-utils/module',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/icon',
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
	runtimeConfig: {
		public: {
			baseUrl: '',
		},
	},
	srcDir: 'app/',
	supabase: {
		redirect: true,
	},
	testUtils: {},
	tailwindcss: {
		configPath: '~/tailwind.config.ts',
	},
	typescript: {
		tsConfig: {
			compilerOptions: {
				allowUnreachableCode: false,
				exactOptionalPropertyTypes: true,
				forceConsistentCasingInFileNames: true,
				noErrorTruncation: true,
				noFallthroughCasesInSwitch: true,
				noImplicitOverride: true,
				noImplicitReturns: true,
				noPropertyAccessFromIndexSignature: true,
				noUncheckedIndexedAccess: true,
				noUnusedLocals: false,
				noUnusedParameters: false,
			},
		},
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
