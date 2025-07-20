<script lang="ts" setup>
defineProps<{
	/** The memory level of the text */
	memoryLevel: number
}>()
</script>

<template>
	<div class="meter">
		<div
			v-for="i in 8"
			:key="i"
			class="bar"
			:class="{
				active: i <= memoryLevel,
				inactive: i > memoryLevel,
			}"
			:style="{
				'--hue': `${240 - i * 10}deg`,
				'--lightness': `${50 + i}%`,
				'--chroma': `${0.15 + i * 0.05}`,
			}"
		></div>
	</div>
</template>

<style scoped>
.meter {
	display: flex;
	inline-size: 100%;
	gap: 1rem;

	.bar {
		inline-size: 100%;
		block-size: 1rem;
		border-radius: 9999px;
		transition: background-color 0.2s;

		&.active {
			background: oklch(var(--memory-level-color, var(--lightness) var(--chroma) var(--hue)));
		}
		&.inactive {
			border: 1px solid #e5e7eb;
			background: #f3f4f6;
		}
	}
}
</style>
