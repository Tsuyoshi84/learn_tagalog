import { until } from '@vueuse/core'

interface Quiz {
	id: string
	en: string
	tl: string
	remembered: boolean | undefined
	memoryLevel: number
}

interface UseTextQuizReturnType {
	/** The text that the user is currently answering */
	text: Ref<Quiz | undefined>
	/** Load the text to show the quiz */
	loadText: () => Promise<void>
	/** Send the answer result to the server asynchronously */
	answer: (textId: string, remembered: boolean) => void
	/** Whether the user has a quiz to answer */
	hasQuiz: Ref<boolean | undefined>
}

/**
 * Composable for managing text-based quiz functionality.
 * To improve UX, this composable holds two texts inside it:
 * 1. The current text that the user is answering
 * 2. The next text that will be shown after the user answers the current text
 *
 * This way, the user doesn't have to wait for the next text to load before answering the current text.
 *
 * @param level - The level of the text to get
 * @returns {UseTextQuizReturnType} Object containing quiz state and methods
 */
export function useTextQuiz(level: MaybeRefOrGetter<number>): UseTextQuizReturnType {
	/** The current text that the user is answering */
	const text = computed(() => {
		if (currentResult.value === undefined) return undefined
		if (!currentResult.value.hasQuiz) return undefined
		return { ...currentResult.value.text, remembered: undefined }
	})

	/** Whether the user has a quiz to answer */
	const hasQuiz = computed<boolean>(() => currentResult.value?.hasQuiz ?? false)

	const currentResult = shallowRef<Awaited<ReturnType<typeof fetchText>>>()
	const nextResult = shallowRef<Awaited<ReturnType<typeof fetchText>>>()

	async function fetchText(index: number) {
		const result = await $fetch('/api/next-quiz', {
			method: 'POST',
			body: {
				level: toValue(level),
				index,
			},
		})

		return result
	}

	async function loadText(): Promise<void> {
		if (currentResult.value === undefined) {
			// When the current text is undefined, it means that the user is starting the quiz,
			// so we need to fetch the first text
			currentResult.value = await fetchText(0)
			// fetchNextText()
		} else {
			// When the current text is defined, it means that the user is answering the current text,
			// so we use the next text to show the quiz
			await until(nextResult).not.toBeUndefined()
			currentResult.value = nextResult.value
			nextResult.value = undefined
		}
	}

	async function answer(textId: string, remembered: boolean): Promise<void> {
		await $fetch('/api/answer-text', {
			method: 'POST',
			body: {
				textId,
				remembered,
			},
		})
	}

	watch([currentResult, nextResult], async () => {
		if (currentResult.value === undefined) return
		if (nextResult.value !== undefined) return
		if (!currentResult.value.hasQuiz) return

		const result = await fetchText(1)
		nextResult.value = result
	})

	return {
		text,
		loadText,
		answer,
		hasQuiz,
	}
}
