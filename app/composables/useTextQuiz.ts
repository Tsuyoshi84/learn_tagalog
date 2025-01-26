import type { QuizText } from '~/types/quiz'
import { useAuthStore } from '~/stores/auth'
import { until, whenever } from '@vueuse/core'

type UseTextQuizReturnType = {
	/** The text that the user is currently answering */
	text: Ref<QuizText | undefined>
	/** Load the text to show the quiz */
	loadText: () => Promise<void>
	/** Send the answer result to the server asynchronously */
	answer: (textId: string, remembered: boolean) => void
}

/**
 * Composable for managing text-based quiz functionality
 *
 * @param level - The level of the text to get
 * @returns {UseTextQuizReturnType} Object containing quiz state and methods
 */
export function useTextQuiz(level: MaybeRefOrGetter<number>): UseTextQuizReturnType {
	const text = shallowRef<QuizText>()
	const nextText = shallowRef<QuizText>()

	async function fetchText(index: number): Promise<QuizText> {
		const result = await $fetch<QuizText>('/api/next-quiz', {
			method: 'POST',
			body: {
				level: toValue(level),
				index,
			},
		})

		return result
	}

	async function loadText(): Promise<void> {
		if (text.value === undefined) {
			const result = await fetchText(0)
			text.value = { ...result, remembered: undefined }
		} else {
			await until(nextText).not.toBeUndefined()
			text.value = nextText.value
			nextText.value = undefined
		}
	}

	// Fetch the next text in the background
	whenever(
		() => nextText.value === undefined,
		async () => {
			const result = await fetchText(1)
			nextText.value = { ...result, remembered: undefined }
		},
		{ immediate: true },
	)

	const authStore = useAuthStore()

	function answer(textId: string, remembered: boolean): void {
		const userId = authStore.userId
		if (userId === undefined) return

		$fetch('/api/answer-text', {
			method: 'POST',
			body: {
				textId,
				remembered,
			},
		})
	}

	return {
		text,
		loadText,
		answer,
	}
}
