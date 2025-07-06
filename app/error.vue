<script lang="ts" setup>
import type { NuxtError } from '#app'

defineProps<{
	/** An error object */
	error: NuxtError
}>()

function handleError(): void {
	clearError({ redirect: '/' })
}
</script>

<template>
	<NuxtLayout>
		<div class="error-root">
			<h1 class="error-title">Error</h1>
			<p>{{ error.message }}</p>
			<p>It looks like something broke.</p>
			<p>Sorry about that.</p>

			<a
				class="error-link"
				@click="handleError"
				>Go to top</a
			>
		</div>
	</NuxtLayout>
</template>

<style scoped>
.error-root {
	display: grid;
	place-items: center;
	min-block-size: 60vh;
	padding-block: 4rem 8rem;
	padding-inline: 1rem;
	gap: 1.5rem;
}

.error-title {
	font-size: 2.5rem;
	font-weight: bold;
	color: oklch(40% 0.02 30);
	margin-block-end: 1rem;
}

.error-root p {
	font-size: 1.125rem;
	color: oklch(40% 0.01 30);
	margin-block: 0.25rem;
	text-align: center;
}

.error-link {
	display: inline-block;
	margin-block-start: 2rem;
	padding: 0.75em 2em;
	border-radius: 0.5em;
	background: oklch(85% 0.1 270);
	color: oklch(30% 0.02 270);
	font-weight: 600;
	font-size: 1rem;
	text-decoration: none;
	transition:
		background 0.2s,
		color 0.2s;
	cursor: pointer;
	border: none;

	&:hover {
		background: oklch(70% 0.2 270);
		color: oklch(100% 0 0);
	}
}
</style>
