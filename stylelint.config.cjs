module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
	plugins: ['stylelint-use-logical-spec'],
	rules: {
		'liberty/use-logical-spec': ['always'],

		// Disable rules
		'hue-degree-notation': null,
	},
}
