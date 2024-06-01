import type { Text } from '~/database.types'
import type { Database } from '~/database-generated.types'

type ReturnType = {
	/** Text data. Before data is loaded, the array is empty. */
	texts: Ref<readonly Text[]>
	/** Whether loading data or not */
	loading: Ref<boolean>
}

type Options = {
	/**
	 * Whether shuffle texts or not
	 * @default false
	 */
	shuffleTexts?: boolean
}

export function useFetchTexts(options: Options = {}): ReturnType {
	const { shuffleTexts = false } = options
	const supabase = useSupabaseClient<Database>()

	const loading = shallowRef(false)
	const { data } = useAsyncData(
		'texts',
		async () => {
			loading.value = true
			const result = await supabase.from('texts').select('id, en, tl')
			loading.value = false

			return result
		},
		{
			transform(input) {
				return {
					...input,
					data: shuffleTexts && input.data ? shuffle(input.data) : input.data,
				}
			},
		},
	)

	const texts = computed<readonly Text[]>(() => {
		return data.value?.data ?? []
	})

	return { texts, loading }
}
