import type { QuizText } from '~/types/quiz'
import { useAuthStore } from '~/stores/auth'

type UseTextQuizReturnType = {
	/** Whether the texts are loading or not */
	loading: Ref<boolean>
	/** The text that the user is currently answering */
	text: Ref<QuizText | undefined>
	/** Fetch the text */
	fetchText: () => Promise<void>
	/** Answer the text */
	answer: (textId: string, remembered: boolean) => Promise<void>
}

/**
 * Composable for managing text-based quiz functionality
 *
 * @param level - The level of the text to get
 * @returns {UseTextQuizReturnType} Object containing quiz state and methods
 */
export function useTextQuiz(level: MaybeRefOrGetter<number>): UseTextQuizReturnType {
	const loading = shallowRef(false)
	const text = shallowRef<QuizText>()
	const authStore = useAuthStore()

	async function fetchText(): Promise<void> {
		const result = await $fetch<QuizText>('/api/next-quiz', {
			method: 'POST',
			body: {
				level: toValue(level),
			},
		})

		text.value = {
			...result,
			remembered: undefined,
		}
	}

	async function answer(textId: string, remembered: boolean): Promise<void> {
		const userId = authStore.userId
		if (userId === undefined) return

		await $fetch('/api/answer-text', {
			method: 'POST',
			body: {
				textId,
				remembered,
			},
		})
	}

	return {
		loading,
		text,
		fetchText,
		answer,
	}
}
