// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	extends: ['github:Tsuyoshi84/nuxt-layer-core'],

	modules: [
		'@nuxtjs/google-fonts',
		'@nuxtjs/supabase',
		'@nuxt/eslint',
		'@nuxt/test-utils/module',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/icon',
		'@sentry/nuxt/module',
	],

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
				{
					name: 'description',
					content: `Let's learn Tagalog!`,
				},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
		},
	},

	css: ['~/assets/css/main.css'],

	runtimeConfig: {
		public: {
			baseUrl: '',
		},
	},

	srcDir: 'app/',

	sourcemap: {
		client: 'hidden',
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
				allowImportingTsExtensions: true,
				allowUnreachableCode: false,
				exactOptionalPropertyTypes: true,
				erasableSyntaxOnly: true,
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
		nodeTsConfig: {
			compilerOptions: {
				allowImportingTsExtensions: true,
				allowUnreachableCode: false,
				exactOptionalPropertyTypes: true,
				erasableSyntaxOnly: true,
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
		sharedTsConfig: {
			compilerOptions: {
				allowImportingTsExtensions: true,
				allowUnreachableCode: false,
				exactOptionalPropertyTypes: true,
				erasableSyntaxOnly: true,
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
			Comfortaa: {
				wght: [400, 500, 700],
			},
			Roboto: {
				wght: [400],
			},
			Gabarito: {
				wght: [400, 500, 700],
			},
		},
	},

	sentry: {
		sourceMapsUploadOptions: {
			org: 'tsuyoshi',
			project: 'learn_tagalog',
		},

		autoInjectServerSentry: 'top-level-import',
	},

	supabase: {
		redirect: true,
	},

	testUtils: {},
})
