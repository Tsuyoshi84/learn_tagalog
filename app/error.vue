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
	min-block-size: 60vh;
	padding-inline: 1rem;
	padding-block: 4rem 8rem;
	place-items: center;
	gap: 1.5rem;
}

.error-title {
	margin-block-end: 1rem;
	font-size: 2.5rem;
	font-weight: bold;
	color: oklch(40% 0.02 30);
}

.error-root p {
	margin-block: 0.25rem;
	font-size: 1.125rem;
	text-align: center;
	color: oklch(40% 0.01 30);
}

.error-link {
	display: inline-block;
	margin-block-start: 2rem;
	padding-inline: 2em;
	padding-block: 0.75em;
	border: none;
	border-radius: 0.5em;
	font-size: 1rem;
	font-weight: 600;
	text-decoration: none;
	color: oklch(30% 0.02 270);
	background: oklch(85% 0.1 270);
	transition:
		background 0.2s,
		color 0.2s;
	cursor: pointer;

	&:hover {
		color: oklch(100% 0 0);
		background: oklch(70% 0.2 270);
	}
}
</style>
