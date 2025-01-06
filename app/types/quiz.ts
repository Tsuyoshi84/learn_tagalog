import type { Text } from '~/database.types'

/**
 * Type representing a text with quiz-specific properties
 */
export type QuizText = Text & {
	/**
	 * Whether the user remembered the text or not.
	 * If the user has not answered the text, the value is undefined.
	 */
	remembered: boolean | undefined
}
