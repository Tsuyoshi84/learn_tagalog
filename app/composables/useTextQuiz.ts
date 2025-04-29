import { isDefined } from '@vueuse/core'
import type { UnwrapRef } from 'vue'

interface Quiz {
	id: string
	en: string
	tl: string
	remembered: boolean | undefined
	memoryLevel: number
}

interface UseTextQuizReturnType {
	/** The text that the user is currently answering */
	text: ComputedRef<Quiz | undefined>
	/** Whether the user has a quiz to answer. If not fetched yet, it will return undefined */
	hasQuiz: ComputedRef<boolean | undefined>
	/** Send the answer result to the server asynchronously */
	answer: (textId: string, remembered: boolean) => Promise<void>
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
	const fetchIndex = shallowRef(0)

	const { data, refresh } = useFetch('/api/next-quiz', {
		method: 'POST',
		body: {
			level: toValue(level),
			index: fetchIndex,
		},
	})

	const currentResult = shallowRef<UnwrapRef<typeof data>>()
	const nextResult = shallowRef<UnwrapRef<typeof data>>()

	async function answer(textId: string, remembered: boolean): Promise<void> {
		currentResult.value = nextResult.value
		nextResult.value = undefined

		await $fetch('/api/answer-text', {
			method: 'POST',
			body: {
				textId,
				remembered,
			},
		})

		await refresh()
	}

	watch(data, async () => {
		if (!isDefined(data)) return

		if (!isDefined(currentResult)) {
			currentResult.value = data.value
			fetchIndex.value = 1
			return
		}

		if (!isDefined(nextResult)) {
			nextResult.value = data.value
		}
	})

	return {
		text,
		answer,
		hasQuiz,
	}
}
