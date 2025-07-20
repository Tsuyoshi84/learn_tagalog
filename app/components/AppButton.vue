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
	inline-size: fit-content;
	margin-block-start: 1rem;
	padding-inline: 1rem;
	padding-block: 0.5rem;
	border: 2px solid var(--color);
	border-radius: 2rem;
	color: var(--color);
	background-color: oklch(0.9 0.035 233.47);
}
</style>
