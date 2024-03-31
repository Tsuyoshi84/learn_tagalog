<script lang="ts" setup>
const searchText = shallowRef('')
</script>

<template>
	<div>
		<input v-model.trim="searchText" type="search" />
		<TextList :search-text="searchText" />
	</div>
</template>
