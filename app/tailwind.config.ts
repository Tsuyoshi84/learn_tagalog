import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindcssForms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

const colors = {
	white: '#ffffff',
	red: {
		'50': '#fae6e9',
		'100': '#f6ced3',
		'200': '#ec9ca7',
		'300': '#e36b7a',
		'400': '#d9394e',
		'500': '#d00822',
		'600': '#a6061b',
		'700': '#7d0514',
		'800': '#53030e',
		'900': '#2a0207',
	},
	blue: {
		'50': '#e8ebf7',
		'100': '#d1d7ee',
		'200': '#a2afdd',
		'300': '#7486cc',
		'400': '#455ebb',
		'500': '#1736aa',
		'600': '#122b88',
		'700': '#0e2066',
		'800': '#091644',
		'900': '#050b22',
	},
	yellow: {
		'50': '#fefbe7',
		'100': '#fdf6d0',
		'200': '#fceda0',
		'300': '#fae471',
		'400': '#f9db41',
		'500': '#f7d212',
		'600': '#c6a80e',
		'700': '#947e0b',
		'800': '#635407',
		'900': '#312a04',
	},
	gray: {
		'50': '#f7f7f7',
		'100': '#efefef',
		'200': '#dcdcdc',
		'300': '#c9c9c9',
		'400': '#a4a4a4',
		'500': '#7f7f7f',
		'600': '#6f6f6f',
		'700': '#5f5f5f',
		'800': '#4f4f4f',
		'900': '#3f3f3f',
	},
	inherit: 'inherit',
	current: 'currentColor',
	transparent: 'transparent',
}

export default {
	content: [],
	theme: {
		colors,
		fontFamily: {
			main: ['Gabarito', 'cursive'],
			sans: ['Roboto', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			backgroundColor: {
				primary: 'oklch(1 0 0)',
				card: '#fef08a',
			},
			width: {
				'page-max': '40rem',
			},
			gridTemplateColumns: {
				page: '1fr min(40rem, 100%) 1fr',
			},
		},
	},
	plugins: [tailwindcssForms],
} satisfies Config
