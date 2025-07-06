<script setup lang="ts">
/**
 * A button component for displaying a word in the matching game
 */

defineProps<{
	/** The word text to display */
	text: string
	/** Whether the word is currently selected */
	selected: boolean
	/** Whether the word has been matched */
	matched: boolean
	/** Whether the button is disabled */
	disabled: boolean
}>()
</script>

<template>
	<button
		type="button"
		class="word-button"
		:class="{
			default: !matched && !selected,
			selected: selected,
			matched: matched,
			disabled: disabled,
		}"
		:disabled="disabled"
	>
		<span
			class="text"
			:class="{
				default: !matched && !selected,
				selected: selected,
				matched: matched,
			}"
		>
			{{ text }}
		</span>
	</button>
</template>

<style scoped>
.word-button {
	inline-size: 100%;
	border-radius: 0.5rem;
	border-width: 2px;
	padding: 1rem;
	text-align: center;
	transition: all 0.3s;
	scale: 1;
	translate: 0 0;
	rotate: 0deg;
	background: oklch(1 0 0);
	border-color: oklch(0.92 0 0);
	box-shadow: none;

	&.default:hover {
		scale: 1.05;
		border-color: oklch(0.68 0.19 264);
		box-shadow: 0 4px 12px oklch(0.68 0.19 264 / 0.15);
	}
	&.selected {
		scale: 1.05;
		animation: word-button-pulse 1s infinite;
		border-color: oklch(0.68 0.19 264);
		background: oklch(0.97 0.03 264);
		box-shadow: 0 4px 12px oklch(0.68 0.19 264 / 0.15);
	}
	&.matched {
		scale: 1;
		border-color: oklch(0.78 0.17 142);
		background: oklch(0.98 0.03 142);
		box-shadow: 0 2px 6px oklch(0.78 0.17 142 / 0.1);
	}
	&.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
}
@keyframes word-button-pulse {
	0% {
		box-shadow: 0 0 0 0 oklch(0.68 0.19 264 / 0.4);
	}
	70% {
		box-shadow: 0 0 0 10px oklch(0.68 0.19 264 / 0);
	}
	100% {
		box-shadow: 0 0 0 0 oklch(0.68 0.19 264 / 0);
	}
}
.text {
	font-weight: 500;
	&.default {
		color: oklch(0.36 0 0);
	}
	&.selected {
		color: oklch(0.41 0.13 264);
	}
	&.matched {
		color: oklch(0.44 0.13 142);
	}
}
</style>
