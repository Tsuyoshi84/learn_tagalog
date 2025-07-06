<script lang="ts" setup>
import TextListItem from '~/components/TextListItem.vue'
import { useTextSearch } from '~/composables/useTextSearch.ts'

const props = defineProps<{
	/** Text that is used as a search word */
	searchText: string
}>()

const { texts, searchWords } = useTextSearch(() => props.searchText)
</script>

<template>
	<div class="text-list-root">
		<TextListItem
			v-for="text in texts"
			:key="text.id"
			:text="text"
			:high-light-words="searchWords"
		/>
	</div>
</template>

<style scoped>
/**
 * Root container for the text list.
 * - Flex column layout
 * - Center items horizontally
 * - 2rem vertical gap between items
 */
.text-list-root {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
}
</style>
