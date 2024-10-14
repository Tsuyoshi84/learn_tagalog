import type { Database } from '~/database-generated.types'
import type { Text } from '~/database.types'

/**
 * The number of days after which the next_due_date is updated based on the memory_level
 */
const MEMORY_LEVEL_TO_NEXT_DUE_DATE = {
	1: 1,
	2: 3,
	3: 7,
	4: 14,
	5: 30,
}

const MIN_MEMORY_LEVEL = 1
const MAX_MEMORY_LEVEL = 5

type QuizText = Text & {
	/** Whether the user remembered the text or not. If the user has not answered the text, the value is undefined. */
	remembered: boolean | undefined
	/** The memory level of the text */
	memory_level: number
}

type UseTextQuizReturnType = {
	loading: Ref<boolean>
	texts: Ref<QuizText[]>
	fetchTexts: () => Promise<void>
	answer: (textId: string, remembered: boolean) => Promise<void>
}

function dayToMs(days: number): number {
	return days * 24 * 60 * 60 * 1000
}

export function useTextQuiz(): UseTextQuizReturnType {
	const NUMBER_OF_SESSION = 5
	const supabase = useSupabaseClient<Database>()

	const loading = shallowRef(false)
	const texts = shallowRef<QuizText[]>([])
	const authStore = useAuthStore()

	async function fetchTexts(): Promise<void> {
		const userId = authStore.userId
		if (userId === undefined) return

		const tempTexts: QuizText[] = []

		loading.value = true

		// Fetch untried texts up to 10. When there are no related `user_progress` records, that means the user has not tried it.
		const { data: untriedTexts, error: untriedTextsError } = await supabase
			.from('texts')
			.select('id, en, tl, user_progress (id, user_id)')
			.filter('user_progress.id', 'is', null)
			.eq('user_progress.user_id', userId)
			.limit(NUMBER_OF_SESSION)

		if (untriedTextsError) {
			loading.value = false
			throw new Error('Failed to fetch untried texts', { cause: untriedTextsError })
		}

		tempTexts.push(
			...untriedTexts.map((text) => ({
				...text,
				remembered: undefined,
				memory_level: 1,
			})),
		)

		const remainingCount = NUMBER_OF_SESSION - untriedTexts.length

		if (remainingCount > 0) {
			// If untried texts are less than the specified number, fetch the rest of the texts from the `texts` and `user_progress` tables.
			// Get the texts records that passed the next_due_date only.
			// Sort by the next_due_date in ascending order.
			const now = new Date().toISOString()

			const { data: restTexts, error: restTextsError } = await supabase
				.from('user_progress')
				.select(
					`
					text_id,
					memory_level,
					texts (en, tl)
				  `,
				)
				.eq('user_id', userId)
				.lte('next_due_date', now)
				.order('memory_level', { ascending: true })
				.order('next_due_date', { ascending: true })
				.limit(remainingCount)

			if (restTextsError) {
				loading.value = false
				throw new Error('Failed to fetch rest texts', { cause: restTextsError })
			}

			tempTexts.push(
				...restTexts.map((text) => ({
					id: text.text_id,
					en: text.texts?.en ?? '',
					tl: text.texts?.tl ?? '',
					remembered: undefined,
					memory_level: text.memory_level,
				})),
			)
		}

		// Shuffle the texts
		const shuffledTexts = shuffle(tempTexts)

		loading.value = false
		texts.value = shuffledTexts
	}

	async function answer(textId: string, remembered: boolean): Promise<void> {
		const userId = authStore.userId
		if (userId === undefined) return

		const currentMemoryLevel = texts.value.find((text) => text.id === textId)?.memory_level
		if (currentMemoryLevel === undefined) {
			throw new Error('Current memory level is undefined')
		}

		const nextMemoryLevel = clamp(
			currentMemoryLevel + (remembered ? 1 : -1),
			MIN_MEMORY_LEVEL,
			MAX_MEMORY_LEVEL,
		) as keyof typeof MEMORY_LEVEL_TO_NEXT_DUE_DATE

		const span = dayToMs(MEMORY_LEVEL_TO_NEXT_DUE_DATE[nextMemoryLevel])

		const now = new Date().toISOString()
		const { error } = await supabase.from('user_progress').upsert(
			{
				text_id: textId,
				user_id: userId,
				memory_level: nextMemoryLevel,
				last_answered_at: now,
				next_due_date: new Date(new Date().getTime() + span).toISOString(),
			},
			{ onConflict: 'text_id,user_id' },
		)

		if (error) {
			throw new Error('Failed to answer', { cause: error })
		}
	}

	return {
		loading,
		texts,
		fetchTexts,
		answer,
	}
}
