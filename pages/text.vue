<script lang="ts" setup>
const searchText = ref('')
</script>

<template>
	<div>
		<input v-model.trim="searchText" type="search" />
		<TextList :search-text="searchText" />
	</div>
</template>
