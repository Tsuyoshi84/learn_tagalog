<script lang="ts" setup>
defineProps<{
	/** An error object */
	error: Object
}>()

function handleError() {
	clearError({ redirect: '/' })
}

const error = useError()
</script>

<template>
	<NuxtLayout>
		<div class="grid place-items-center">
			<h1 class="text-4xl">Error</h1>
			<p>{{ error?.message }}</p>
			<p>It looks like something broke.</p>
			<p>Sorry about that.</p>

			<a @click="handleError">Go to top</a>
		</div>
	</NuxtLayout>
</template>
