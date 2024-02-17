<script lang="ts" setup>
import type { NuxtError } from '#app'

defineProps<{
	/** An error object */
	error: NuxtError
}>()

function handleError() {
	clearError({ redirect: '/' })
}
</script>

<template>
	<NuxtLayout>
		<div class="grid place-items-center">
			<h1 class="text-4xl">Error</h1>
			<p>{{ error.message }}</p>
			<p>It looks like something broke.</p>
			<p>Sorry about that.</p>

			<a @click="handleError">Go to top</a>
		</div>
	</NuxtLayout>
</template>
