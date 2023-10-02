import { Database } from '~/database-generated.types'
import type { Text } from '~/database.types'

type FetchedText = Pick<Text, 'id' | 'en' | 'tl'>

interface ReturnType {
  loading: Ref<boolean>
  texts: Ref<FetchedText[]>
}

export function useTextSearch(searchText: MaybeRefOrGetter<string>): ReturnType {
  const loading = ref(false)
  const texts = ref<FetchedText[]>([])

  const searchQuery = computed(() => {
    const search = toValue(searchText)
    if (search === '') return null

    return search
      .split(' ')
      .filter((word) => word !== '')
      .map((word) => `${word}`)
      .join(' & ')
  })

  const supabase = useSupabaseClient<Database>()
  watchDebounced(
    searchQuery,
    async (searchQuery) => {
      if (loading.value) return

      loading.value = true

      let query = supabase.from('texts').select('id, en, tl')

      if (searchQuery !== null) {
        query = query.textSearch('en', searchQuery, {
          config: 'english',
          type: 'websearch',
        })
      }

      const { data } = await query
      texts.value = data ?? []

      loading.value = false
    },
    { debounce: 500 }
  )

  return { loading, texts }
}
