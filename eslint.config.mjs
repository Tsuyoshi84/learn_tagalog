import { globalIgnores } from 'eslint/config'
import jsdoc from 'eslint-plugin-jsdoc'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([globalIgnores(['drizzle.config.ts', 'server/@types/env.d.ts'])])
	.override('nuxt/javascript', {
		plugins: {
			jsdoc,
		},
		rules: {
			'func-style': ['error', 'declaration'],

			// jsdoc
			'jsdoc/check-param-names': 'error',
			'jsdoc/check-property-names': 'error',
			'jsdoc/check-tag-names': 'error',
			'jsdoc/check-types': 'error',
			'jsdoc/check-values': 'error',
		},
	})
	.override('nuxt/typescript/rules', {
		rules: {
			// See: https://ts.dev/style/#interfaces-vs-type-aliases
			// See: https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections
			'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
		},
	})
	.override('nuxt/vue/rules', {
		plugins: {
			jsdoc,
		},
		rules: {
			// vue plugin
			'vue/component-api-style': ['error', ['script-setup', 'composition']],
			'vue/component-name-in-template-casing': [
				'error',
				'PascalCase',
				{
					registeredComponentsOnly: false,
					ignores: [],
				},
			],
			'vue/component-options-name-casing': ['error', 'PascalCase'],
			'vue/block-order': ['error', { order: ['docs', 'script', 'template', 'style'] }],
			'vue/custom-event-name-casing': ['error', 'camelCase'],
			'vue/define-emits-declaration': ['error', 'type-based'],
			'vue/define-macros-order': [
				'error',
				{
					order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
				},
			],
			'vue/define-props-declaration': ['error', 'type-based'],
			'vue/html-button-has-type': 'error',
			'vue/html-comment-content-spacing': ['error', 'always'],
			'vue/html-self-closing': [
				'warn',
				{
					html: {
						void: 'any',
						normal: 'any',
						component: 'always',
					},
				},
			],
			'vue/no-boolean-default': 'error',
			'vue/no-required-prop-with-default': 'error',
			'vue/no-unused-properties': ['error', { groups: ['setup'] }],
			'vue/no-unused-refs': 'error',
			'vue/no-useless-mustaches': [
				'error',
				{ ignoreIncludesComment: true, ignoreStringEscape: true },
			],
			'vue/padding-line-between-blocks': 'error',
			'vue/prefer-true-attribute-shorthand': 'error',
			'vue/require-prop-comment': ['warn', { type: 'JSDoc' }],
			'vue/require-macro-variable-name': [
				'error',
				{
					defineProps: 'props',
					defineEmits: 'emit',
					defineSlots: 'slots',
					useSlots: 'slots',
					useAttrs: 'attrs',
				},
			],

			// Disabled rules
			'vue/no-v-html': 'off',
		},
	})
