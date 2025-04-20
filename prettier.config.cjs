module.exports = {
	semi: false,
	singleQuote: true,
	htmlWhitespaceSensitivity: 'strict',
	printWidth: 100,
	useTabs: true,
	singleAttributePerLine: true,
	plugins: ['prettier-plugin-tailwindcss'],
	// tw`w-2 h-4` のように `tw` tagged literal を使っている箇所に対してソートが行われるようにする
	tailwindFunctions: ['tw'],
	// Transition の prop でも Tailwind の class がソートされるように設定
	// See: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-non-standard-attributes
	tailwindAttributes: [
		'enter-from-class',
		'enter-to-class',
		'leave-from-class',
		'leave-to-class',
		'enter-active-class',
		'leave-active-class',
	],
}
