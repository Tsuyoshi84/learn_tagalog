import { Database } from '~/database-generated.types'
import type { Text } from '~/database.types'

type FetchedText = Pick<Text, 'id' | 'en' | 'tl'>

type ReturnType = {
	loading: Ref<boolean>
	texts: Ref<FetchedText[]>
	searchWords: Ref<string[]>
}

export function useTextSearch(searchText: MaybeRefOrGetter<string>): ReturnType {
	const loading = shallowRef(false)
	const texts = shallowRef<FetchedText[]>([])
	const searchWords = shallowRef<string[]>([])

	const _searchWords = computed(() => {
		return toValue(searchText)
			.trim()
			.split(' ')
			.filter((word) => word !== '')
	})

	const searchQuery = computed(() => {
		if (_searchWords.value.length === 0) return null

		return _searchWords.value.map((word) => `${word}`).join(' & ')
	})

	const supabase = useSupabaseClient<Database>()

	watchDebounced(
		searchQuery,
		async (searchQuery) => {
			if (loading.value) return

			loading.value = true

			let query = supabase.from('texts').select('id, en, tl')

			if (searchQuery !== null) {
				query = query.textSearch('tl', searchQuery, {
					type: 'websearch',
				})
			}

			const { data } = await query
			texts.value = data ?? []
			searchWords.value = _searchWords.value

			loading.value = false
		},
		{ debounce: 500, immediate: true },
	)

	return { loading, texts, searchWords }
}
