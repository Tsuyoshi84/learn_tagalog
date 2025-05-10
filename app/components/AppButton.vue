<script setup lang="ts"></script>

<template>
	<button
		type="button"
		class="next-button"
	>
		<slot />
	</button>
</template>

<style scoped>
button {
	--color: oklch(0.24 0.0563 233.47);
	background-color: oklch(0.9 0.035 233.47);
	border: 2px solid var(--color);
	border-radius: 2rem;
	color: var(--color);
	padding: 0.5rem 1rem;
	inline-size: fit-content;
	margin-block-start: 1rem;
}
</style>
