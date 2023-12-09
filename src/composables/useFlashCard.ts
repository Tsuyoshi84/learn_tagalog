import type { Database } from '~/database-generated.types'
import type { Text } from '~/database.types'

type FetchedText = Pick<Text, 'id' | 'en' | 'tl'>

type ReturnType = {
	/** Whether loading data or not */
	loading: Ref<boolean>
	/** Text data. Before data is loaded, all the values are empty strings */
	text: Ref<FetchedText>
	fetch: () => Promise<void>
	/** Show next text */
	next: () => void
}

/**
 * Fetch text data from database and put one text into `text` ref.
 * When `next` is called, the next text is put into `text` ref.
 */
export function useFlashCard(): ReturnType {
	const supabase = useSupabaseClient<Database>()

	const loading = shallowRef(false)
	const index = shallowRef(0)
	const texts = shallowRef<FetchedText[]>([])

	const text = computed<FetchedText>(() => {
		if (texts.value.length === 0) return { id: '', en: '', tl: '' }

		const _text = texts.value[index.value]
		if (_text === undefined) return { id: '', en: '', tl: '' }

		return _text
	})

	async function fetch(): Promise<void> {
		if (loading.value) return
		loading.value = true

		const { data } = await supabase.from('texts').select('id, en, tl')
		texts.value = data ?? []

		loading.value = false
	}

	function next(): void {
		if (loading.value) return

		index.value = index.value + 1 >= texts.value.length ? 0 : index.value + 1
	}

	return {
		loading,
		text,
		fetch,
		next,
	}
}
