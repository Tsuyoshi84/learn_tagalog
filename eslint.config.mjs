import stylisticJs from '@stylistic/eslint-plugin-js'
import * as parserTs from '@typescript-eslint/parser'
import jsdoc from 'eslint-plugin-jsdoc'
import * as parserVue from 'vue-eslint-parser'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([])
	.override('nuxt/javascript', {
		plugins: {
			jsdoc,
			'@stylistic/js': stylisticJs,
		},
		rules: {
			'func-style': ['error', 'declaration'],

			// jsdoc
			'jsdoc/check-param-names': 'error',
			'jsdoc/check-property-names': 'error',
			'jsdoc/check-tag-names': 'error',
			'jsdoc/check-types': 'error',
			'jsdoc/check-values': 'error',

			// stylistic/js
			'@stylistic/js/padding-line-between-statements': [
				'warn',
				{ blankLine: 'always', prev: 'import', next: '*' },
				{ blankLine: 'any', prev: 'import', next: 'import' },
			],
		},
	})
	.override('nuxt/typescript/rules', {
		languageOptions: {
			parser: parserTs,
			parserOptions: {
				project: ['tsconfig.json'],
			},
		},
		rules: {
			// See: https://ts.dev/style/#interfaces-vs-type-aliases
			// See: https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections
			'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
			'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
			'@typescript-eslint/strict-boolean-expressions': [
				'error',
				{
					allowNullableBoolean: true,
				},
			],
		},
	})
	.override('nuxt/vue/rules', {
		plugins: {
			jsdoc,
		},
		languageOptions: {
			parser: parserVue,
			parserOptions: {
				parserOptions: {
					ecmaFeatures: { jsx: true },
					extraFileExtensions: ['.vue'],
					parser: parserTs,
					sourceType: 'module',
				},
				project: ['tsconfig.json'],
			},
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
