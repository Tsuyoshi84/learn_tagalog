import type { Database } from '~/database-generated.types.ts'
import type { Text } from '~/database.types.ts'

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

	const _searchWords = computed<string[]>(() => {
		return toValue(searchText)
			.trim()
			.split(' ')
			.filter((word) => word !== '')
	})

	const searchQuery = computed<string | undefined>(() => {
		if (_searchWords.value.length === 0) return undefined

		return _searchWords.value.map((word) => `${word}`).join(' & ')
	})

	const supabase = useSupabaseClient<Database>()

	watchDebounced(
		searchQuery,
		async () => {
			if (loading.value) return
			loading.value = true

			let query = supabase.from('texts').select('id, en, tl')

			if (searchQuery.value !== undefined) {
				query = query.textSearch('tl', searchQuery.value, {
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
