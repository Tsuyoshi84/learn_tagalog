// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	extends: ['github:Tsuyoshi84/nuxt-layer-core'],
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
	devtools: { enabled: true },
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
	css: [],
	runtimeConfig: {
		public: {
			baseUrl: '',
		},
	},
	srcDir: 'app/',
	future: {
		compatibilityVersion: 4,
	},
	experimental: {
		typedPages: true,
	},
	compatibilityDate: '2024-04-03',
	vite: {
		vue: {
			script: {
				defineModel: true,
				propsDestructure: true,
			},
		},
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
	eslint: {
		config: {
			nuxt: {
				sortConfigKeys: true,
			},
		},
	},
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
		redirect: true,
	},
	tailwindcss: {
		configPath: '~/tailwind.config.ts',
	},
	testUtils: {},
})
