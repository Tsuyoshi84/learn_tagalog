<script lang="ts" setup>
import { useTextSearch } from '~/composables/useTextSearch'
import TextListItem from '~/components/TextListItem.vue'

const props = defineProps<{
	/** Text that is used as a search word */
	searchText: string
}>()

const { texts, searchWords } = useTextSearch(() => props.searchText)
</script>

<template>
	<div class="flex flex-col items-center gap-8">
		<TextListItem
			v-for="text in texts"
			:key="text.id"
			:text="text"
			:high-light-words="searchWords"
		/>
	</div>
</template>
