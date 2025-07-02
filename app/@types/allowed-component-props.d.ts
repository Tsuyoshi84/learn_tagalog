import 'vue'

declare module 'vue' {
	interface AllowedComponentProps {
		// Events
		onClick?: (event: MouseEvent) => void
	}
}
