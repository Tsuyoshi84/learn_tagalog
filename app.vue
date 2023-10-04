<script setup lang="ts">
const TITLE = 'Learn Tagalog 🇵🇭'

useHead({
	titleTemplate: (pageTitle) => (pageTitle === undefined ? TITLE : `${pageTitle} | ${TITLE}`),
})
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
