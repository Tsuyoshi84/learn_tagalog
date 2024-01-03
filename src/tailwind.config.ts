import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindcssForms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

export default {
	content: [],
	theme: {
		fontFamily: {
			main: ['Gabarito', 'cursive'],
			sans: ['Roboto', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			colors: {},
			backgroundColor: {
				primary: 'oklch(1 0 0)',
				card: '#fef08a',
			},
		},
	},
	plugins: [tailwindcssForms],
} satisfies Config
