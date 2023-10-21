import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import jsdoc from 'eslint-plugin-jsdoc'
import vue from 'eslint-plugin-vue'
import vitest from 'eslint-plugin-vitest'
import eslintConfigPrettier from 'eslint-config-prettier'
import ts from '@typescript-eslint/eslint-plugin'
import js from '@eslint/js'

export default [
	eslintConfigPrettier,
	{
		files: ['src/**/*.ts'],
		plugins: {
			'@typescript-eslint': ts,
			jsdoc,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['tsconfig.json'],
			},
		},
		rules: {
			...js.configs.recommended.rules,
			...ts.configs['recommended-requiring-type-checking'].rules,
			...ts.configs['stylistic-type-checked'].rules,

			'padding-line-between-statements': [
				'warn',
				{ blankLine: 'always', prev: 'import', next: '*' },
				{ blankLine: 'any', prev: 'import', next: 'import' },
			],
			'sort-imports': ['error', { ignoreDeclarationSort: true }],

			// jsdoc plugin
			'jsdoc/check-param-names': 'error',
			'jsdoc/check-property-names': 'error',
			'jsdoc/check-tag-names': 'error',
			'jsdoc/check-types': 'error',
			'jsdoc/check-values': 'error',

			// @typescript-eslint plugin
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{ allowExpressions: true, allowTypedFunctionExpressions: true },
			],
			'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/strict-boolean-expressions': 'error',

			// Disabled rules
			'no-undef': 'off',
		},
	},
	{
		files: ['src/**/*.spec.ts'],
		plugins: {
			vitest,
		},
		rules: {
			// vitest
			'vitest/no-conditional-in-test': 'error',
			'vitest/consistent-test-it': ['error', { fn: 'it' }],
		},
	},
	{
		files: ['src/**/*.vue'],
		plugins: {
			vue: vue,
		},
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				extraFileExtensions: ['.vue'],
				parser: tsParser,
				sourceType: 'module',
			},
		},
		processor: vue.processors['.vue'],
		rules: {
			...vue.configs['vue3-recommended'].rules,

			// vue plugin
			'vue/component-api-style': ['error', ['script-setup', 'composition']],
			'vue/component-name-in-template-casing': [
				'error',
				'PascalCase',
				{
					registeredComponentsOnly: true,
					ignores: [],
				},
			],
			'vue/component-options-name-casing': ['error', 'PascalCase'],
			'vue/component-tags-order': ['error', { order: ['script', 'template', 'style'] }],
			'vue/custom-event-name-casing': ['error', 'camelCase'],
			'vue/define-emits-declaration': ['error', 'type-based'],
			'vue/define-macros-order': [
				'error',
				{ order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] },
			],
			'vue/define-props-declaration': ['error', 'type-based'],
			'vue/html-button-has-type': 'error',
			'vue/html-comment-content-spacing': ['error', 'always'],
			'vue/no-required-prop-with-default': 'error',
			'vue/no-unused-properties': ['error', { groups: ['setup'] }],
			'vue/no-unused-refs': 'error',
			'vue/padding-line-between-blocks': 'error',
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
	},
]
