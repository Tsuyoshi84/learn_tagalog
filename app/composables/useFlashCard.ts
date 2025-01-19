import type { Text } from '~/database.types'
import { useFetchTexts } from '~/composables/useFetchTexts'

type ReturnType = {
	/** Whether loading data or not */
	loading: Ref<boolean>
	/** Text data. Before data is loaded, all the values are empty strings */
	text: Ref<Text>
	/** Show next text */
	next: () => void
}

/**
 * Fetch text data from database and put one text into `text` ref.
 * When `next` is called, the next text is put into `text` ref.
 */
export function useFlashCard(): ReturnType {
	const index = shallowRef(0)

	const { texts, loading } = useFetchTexts({ shuffleTexts: true })

	const text = computed<Text>(() => {
		return texts.value[index.value] ?? { id: '', en: '', tl: '' }
	})

	function next(): void {
		if (loading.value) return

		index.value = index.value + 1 >= texts.value.length ? 0 : index.value + 1
	}

	return {
		loading,
		text,
		next,
	}
}
