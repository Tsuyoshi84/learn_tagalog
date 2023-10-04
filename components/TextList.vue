<script lang="ts" setup>
const props = defineProps<{
	searchText: string
}>()

const { texts, searchWords } = useTextSearch(() => props.searchText)
</script>

<template>
	<div class="wrapper">
		<TextListItem
			v-for="text in texts"
			:key="text.id"
			:text="text"
			:high-light-words="searchWords"
		/>
	</div>
</template>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
}
</style>
