import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

export default {
	content: [],
	theme: {
		fontFamily: {
			main: ['Gabarito', 'cursive'],
			sans: ['Roboto', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			colors: {
				primary: 'oklch(0.32 0 0)',
				accent: 'oklch(0.53 0.16 276.05)',
				'accent-2': 'oklch(0.58 0.21 24.34)',
			},
		},
	},
	plugins: [],
} satisfies Config
