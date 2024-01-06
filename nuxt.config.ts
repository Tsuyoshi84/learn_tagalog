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
	imports: {
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
	experimental: {
		typedPages: true,
	},
	modules: [
		'@nuxtjs/google-fonts',
		'@nuxtjs/supabase',
		'@nuxtjs/tailwindcss',
		'@nuxt/test-utils/module',
		'@pinia/nuxt',
		'@vueuse/nuxt',
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
	testUtils: {},
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
})
