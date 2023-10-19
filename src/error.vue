<script lang="ts" setup>
const props = defineProps<{
	/** An error object */
	error: Object
}>()

const handleError = () => clearError({ redirect: '/' })

definePageMeta({
	title: 'Not Found',
})
</script>

<template>
	<div class="grid place-items-center">
		<h1>Not Found</h1>
		<button type="button" class="btn btn-primary" @click="handleError">Go Home</button>
	</div>
</template>
